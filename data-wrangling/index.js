const SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE = {
    "doi": "DOI",
    "isi": "WOS_ID",
    "scopus": "SCOPUS_ID",
    "isbn": "ISBN",
    "pmid": "PUBMED_ID"
}

let matchXmlLevel = (innerText, rootElementName, text) => {
    let res = {
        name: rootElementName || "document",
        text: text,
        innerText: innerText,
        children: []
    }
    for (const match of innerText.matchAll(/<(.*?)(?: (?:.*?))?>(.*?)<\/\1>/gs)) {
        res.children.push(matchXmlLevel(match[2], match[1], match[0]))
    }
    return res
}

export function normalizeSwepub(data) {
    let res = {
        __meta:{
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

        for (const personEl of modsEl.children.filter(x => x.name === "personal")) {
            // Persons.PersonData.FirstName, Persons.PersonData.LastName, Persons.PersonData.BirthYear
            // Persons.Organizations.OrganizationData.Identifiers.Type.Value, Persons.Organizations.OrganizationData.Identifiers.Value
        }
    }

    return res
}

export async function findDifferences(normalizedData, esPost) {
    let res = {
        description: "Unknown difference.",
        meta: normalizedData.__meta,
        connected: []
    }

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

    } else if (connectedPublications.hits.total === 1) {
        // We found one connected publication

    } else {
        // We found more than one connected publication

    }
}