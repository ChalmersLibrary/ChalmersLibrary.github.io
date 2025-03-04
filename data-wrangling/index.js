const SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE = {
    "doi": "DOI",
    "isi": "WOS_ID",
    "scopus": "SCOPUS_ID",
    "isbn": "ISBN",
    "pmid": "PUBMED_ID"
}

let matchXmlLevel = (innerText, attributesText, rootElementName, text) => {
    let res = {
        name: rootElementName || "document",
        text: text,
        innerText: innerText,
        attrText: attributesText,
        children: []
    }
    for (const match of innerText.matchAll(/<(.*?)(?: (.*?))?>(.*?)<\/\1>/gs)) {
        res.children.push(matchXmlLevel(match[3], match[2], match[1], match[0]))
    }
    return res
}

export function normalizeSwepub(data, source) {
    let res = {
        __meta:{
            source,
            method: "normalizeSwepub"
        }
    }

    let xmlDoc = matchXmlLevel(data)
    
    let recordEl = xmlDoc.children.find(x => x.name === "record")

    let headerEl = recordEl.children.find(x => x.name === "header")

    res.__meta.id = headerEl.children.find(x => x.name === "identifier")?.innerText
    res.__meta.status = (headerEl.text.match(/status="(.*?)"/s) || [,"unknown"])[1]
    res.__meta.datestamp = headerEl.children.find(x => x.name === "datestamp")?.innerText

    let metadataEl = recordEl.children.find(x => x.name === "metadata")
    if (metadataEl) {
        let modsEl = metadataEl.children.find(x => x.name === "mods")

        res.Title = modsEl.children.find(x => x.name === "titleInfo")?.children.find(x => x.name === "title")?.innerText

        let originInfoEl = modsEl.children.find(x => x.name == "originInfo")
        let dateIssuedEl = originInfoEl.children.find(x => x.name == "dateIssued")
    
        res.Year = parseInt(dateIssuedEl.innerText) || undefined
        res.Identifiers = []
        for (const idEl of modsEl.children.filter(x => x.name === "identifier")) {
            let typeMatch = idEl.text.match(/type="(.*?)"/s)
            if (typeMatch && SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE[typeMatch[1]]) {
                res.Identifiers.push({
                    Type: {
                        Value: SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE[typeMatch[1]]
                    },
                    Value: idEl.innerText
                })
            }
        }

        res.Persons = []
        for (const personEl of modsEl.children.filter(x => x.name === "name")) {
            let personOrgRole = {
                PersonData: {
                    FirstName: (personEl.innerText.match(/<namePart type="given">(.*?)<\/namePart>/s) || [])[1],
                    LastName: (personEl.innerText.match(/<namePart type="family">(.*?)<\/namePart>/s) || [])[1],
                    BirthYear: parseInt((personEl.innerText.match(/<namePart type="date">(.*?)<\/namePart>/s) || [])[1]) || undefined,
                    Organizations: []
                }
            }

            let affOrgLookup = new Map()
            for (const affOrgEl of personEl.children.filter(x => x.name === "affiliation")) {
                let id = (affOrgEl.attrText.match(/valueURI="(.*?)"/s) || [])[1]
                if (id) {
                    let affOrg = affOrgLookup.get(id) || {OrganizationData:{Identifiers:[]}}
                    let lang = (affOrgEl.attrText.match(/lang="(.*?)"/s) || [])[1]
                    if (lang === "swe") {
                        affOrg.OrganizationData.NameSwe = affOrgEl.innerText
                    } else if (lang === "eng") {
                        affOrg.OrganizationData.NameEng = affOrgEl.innerText
                    }

                    if (!affOrg.OrganizationData.Identifiers.find(idObj => idObj.Type.Value === "SWEPUB_AFF_ID" && idObj.Value === id)) {
                        affOrg.OrganizationData.Identifiers.push({
                            Type: {
                                Value: "SWEPUB_AFF_ID"
                            },
                            Value: id
                        })
                    }

                    affOrgLookup.set(id, affOrg)
                }
            }
            personOrgRole.Organizations = [...affOrgLookup.values()]
            
            res.Persons.push(personOrgRole)
        }
    }

    return res
}

export async function findDifferences(normalizedData, esPost) {
    let res = {diffs:[]}
    
    if (normalizedData.__meta.status !== "deleted") {
        // Use identifiers to try to find connected existing publications
        let connectedPublications
        let should = normalizedData.Identifiers.map(idObj => {
            return {
                bool: {
                    must: [
                        {
                            term: {
                                "Identifiers.Type.Value.keyword": {
                                    value: idObj.Type.Value
                                }
                            }
                        },{
                            term: {
                                "Identifiers.Value.keyword": {
                                    value: idObj.Value
                                }
                            }
                        }
                    ]
                }
            }
        })

        if (should.length > 0) {
            connectedPublications = await esPost("/research-publications/_search", {
                size: 1000,
                _source: ["Id"],
                query: {
                    nested: {
                        path: "Identifiers",
                        query: {
                            bool: {
                                should
                            }
                        }
                    }
                }
            })
        }

        if (!connectedPublications?.hits?.total) {
            // We found no connected publications
            res.diffs.push({
                title: normalizedData.Title,
                description: "Found no publications connected to the source data which contains identifiers: " +
                    normalizedData.Identifiers.map(idObj => idObj.Type.Value + ":" + idObj.Value).join(", ") + ".",
                source: normalizedData.__meta,
                connected: [],
                type: "NEW_IDS",
                prio: 0
            })
        } else if (connectedPublications.hits.total === 1) {
            // We found one connected publication
            // description = "Found one publication connected to the source data."
            // connected = connectedPublications.hits.hits.map(x => x._source.Id)

            // TODO: Calculate diffs, for now we return no diff
        } else {
            // We found more than one connected publication
            // description = "Found multiple publications connected to the source data."
            // connected = connectedPublications.hits.hits.map(x => x._source.Id)

            // TODO: Handle this later, this is another type of diff
        }
    }

    return res
}