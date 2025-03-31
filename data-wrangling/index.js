const SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE = {
    "doi": "DOI",
    "isi": "WOS_ID",
    "scopus": "SCOPUS_ID",
    "isbn": "ISBN",
    "pmid": "PUBMED_ID",
    "uri": "URI"
}

const PRIORITIZED_PUB_TYPE_IDS = [
    "67383db1-533a-4ec6-8c58-6922e711b5c2",
    "fb7b28c6-67eb-4a18-969b-93617f17c6fd",
    "cc10a3d7-a830-4f25-8473-4aecb9d0fb46",
    "8bb5ac5b-af8c-4a1e-8fdb-0454d3258990"
]

const RESEARCH_PUB_TYPE_ID_TO_NAME = {
    "67383db1-533a-4ec6-8c58-6922e711b5c2": "Artikel i vetenskaplig tidskrift",
    "dd361817-de85-477c-ad83-07def68040d5": "Preprint",
    "7dc9214c-b2d3-49a7-83e9-a205d06b668e": "Artikel, övrig vetenskaplig",
    "d0a50011-578e-4b55-b4b5-34f71d507c38": "Reviewartikel",
    "fb7b28c6-67eb-4a18-969b-93617f17c6fd": "Artikel, recension (forskningsöversikt).",
    "2fc3e903-da49-4a79-9f2b-16ff93d34cfe": "Artikel i övriga tidskrifter",
    "1403066e-9d0c-41fa-ad4a-1d57ffeb04bf": "Artikel i dagstidning",
    "12e4c4f6-4966-473b-ad56-21df59b74e6e": "Inledande text i tidskrift",
    "eef3059a-c32c-4fdc-946a-006e7699e975": "Bok",
    "cc10a3d7-a830-4f25-8473-4aecb9d0fb46": "Bok, refereegranskad",
    "af9af7de-b11c-40a2-838e-9c63493ac3a8": "Bok, populärvetenskaplig",
    "173d963e-5a8d-43b3-9e05-7f860659451c": "Samlingsverk (redaktörskap)",
    "56579964-308c-4138-995f-84d5c446b060": "Bok med redaktör, refereegranskad",
    "39f2dbf4-3f0b-40fd-b3e0-78664781f28c": "Tidskrift med redaktör, vetenskaplig",
    "48ded372-c881-4fc9-bc99-ddd024d595a7": "Rapport, populärvetenskaplig",
    "4951f99d-df1a-4dec-aca7-11b970192457": "Rapport",
    "609e6c8d-8565-4cbd-a51e-5a1d2544de70": "Kapitel",
    "4dd8982c-3233-4412-b9c5-34a9e53900ea": "Kapitel i bok",
    "7d7fc5ea-ca2e-4b78-b57a-a20a7ec49bce": "Kapitel, populärvetenskapligt",
    "e4d12779-9fd5-4fa5-9407-df6d4c466ac0": "Konstnärligt arbete, refereegranskat",
    "b9477106-cec2-4ef1-9ccd-676e407f07bf": "Konstnärligt arbete",
    "8bb5ac5b-af8c-4a1e-8fdb-0454d3258990": "Paper i proceeding",
    "fcbd2df8-7e42-4723-8813-3cb9efeb9505": "Proceeding (redaktörskap)",
    "4081fbf3-0bc3-43dc-ae62-4eb69fe94bde": "Konferensbidrag (offentliggjort, men ej förlagsutgivet)",
    "0d689b87-34ff-44da-9af6-56028cd2ba56": "Poster (konferens)",
    "b8917acf-9b24-4103-befd-a9ca42a53e9f": "Licentiatavhandling",
    "645ba094-942d-400a-84cc-ec47ee01ec48": "Doktorsavhandling",
    "9e42eb8c-5537-4ee8-a098-5e77d1b92453": "Patent",
    "35dbc28f-316c-43a0-bd30-10bc494f0adb": "Övrigt"
}

const SWEPUB_OUTPUT_AND_CONTENT_TYPE_TO_RESEARCH_PUB_TYPE = {
    "publication/journal-article:ref"           : "67383db1-533a-4ec6-8c58-6922e711b5c2",   // Artikel i vetenskaplig tidskrift
    // The following could be Preprint (dd361817-de85-477c-ad83-07def68040d5)?
    "publication/journal-article:vet"           : "7dc9214c-b2d3-49a7-83e9-a205d06b668e",   // Artikel, övrig vetenskaplig.
    // The following could be Reviewartikel (d0a50011-578e-4b55-b4b5-34f71d507c38)?
    "publication/review-article:ref"            : "fb7b28c6-67eb-4a18-969b-93617f17c6fd",   // Artikel, recension (forskningsöversikt).
    "publication/magazine-article:vet"          : "2fc3e903-da49-4a79-9f2b-16ff93d34cfe",   // Artikel i övriga tidskrifter
    "publication/newspaper-article:pop"         : "1403066e-9d0c-41fa-ad4a-1d57ffeb04bf",   // Artikel i dagstidning
    "publication/editorial-letter:vet"          : "12e4c4f6-4966-473b-ad56-21df59b74e6e",   // Inledande text i tidskrift
    "publication/book:vet"                      : "eef3059a-c32c-4fdc-946a-006e7699e975",   // Bok
    "publication/book:ref"                      : "cc10a3d7-a830-4f25-8473-4aecb9d0fb46",   // Bok, refereegranskad
    "publication/book:pop"                      : "af9af7de-b11c-40a2-838e-9c63493ac3a8",   // Bok, populärvetenskaplig
    "publication/edited-book:vet"               : "173d963e-5a8d-43b3-9e05-7f860659451c",   // Samlingsverk (redaktörskap)
    "publication/edited-book:ref"               : "56579964-308c-4138-995f-84d5c446b060",   // Bok med redaktör, refereegranskad
    "publication/journal-issue:ref"             : "39f2dbf4-3f0b-40fd-b3e0-78664781f28c",   // Tidskrift med redaktör, vetenskaplig
    "publication/report:pop"                    : "48ded372-c881-4fc9-bc99-ddd024d595a7",   // Rapport, populärvetenskaplig
    "publication/report:vet"                    : "4951f99d-df1a-4dec-aca7-11b970192457",   // Rapport
    // The following could be Kapitel (609e6c8d-8565-4cbd-a51e-5a1d2544de70)?
    "publication/book-chapter:vet"              : "4dd8982c-3233-4412-b9c5-34a9e53900ea",   // Kapitel i bok
    "publication/book-chapter:pop"              : "7d7fc5ea-ca2e-4b78-b57a-a20a7ec49bce",   // Kapitel, populärvetenskapligt
    "artistic-work/original-creative-work:ref"  : "e4d12779-9fd5-4fa5-9407-df6d4c466ac0",   // Konstnärligt arbete, refereegranskat
    "artistic-work/original-creative-work:vet"  : "b9477106-cec2-4ef1-9ccd-676e407f07bf",   // Konstnärligt arbete
    "conference/paper:ref"                      : "8bb5ac5b-af8c-4a1e-8fdb-0454d3258990",   // Paper i proceeding
    "conference/proceeding:vet"                 : "fcbd2df8-7e42-4723-8813-3cb9efeb9505",   // Proceeding (redaktörskap)
    "conference/other:vet"                      : "4081fbf3-0bc3-43dc-ae62-4eb69fe94bde",   // Konferensbidrag (offentliggjort, men ej förlagsutgivet)
    "conference/poster:vet"                     : "0d689b87-34ff-44da-9af6-56028cd2ba56",   // Poster (konferens)
    "publication/licentiate-thesis:vet"         : "b8917acf-9b24-4103-befd-a9ca42a53e9f",   // Licentiatavhandling
    "publication/doctoral-thesis:vet"           : "645ba094-942d-400a-84cc-ec47ee01ec48",   // Doktorsavhandling
    "intellectual-property/patent:vet"          : "9e42eb8c-5537-4ee8-a098-5e77d1b92453",   // Patent
    "publication/other:vet"                     : "35dbc28f-316c-43a0-bd30-10bc494f0adb"    // Övrigt
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

export function normalizeSwepub(data, name, decodePossiblyUnsafeEntities = false) {
    let res = {
        __meta:{
            name,
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

        res.Title = (t => t ? t.replace(/&#([0-9]{1,4});/g, (_,x) => String.fromCharCode(x)) : t)(modsEl.children.find(x => x.name === "titleInfo")?.children.find(x => x.name === "title")?.innerText)

        let originInfoEl = modsEl.children.find(x => x.name == "originInfo")
        let dateIssuedEl = originInfoEl.children.find(x => x.name == "dateIssued")
    
        res.Year = parseInt(dateIssuedEl.innerText) || undefined
        res.Identifiers = []
        for (const idEl of modsEl.children.filter(x => x.name === "identifier")) {
            let typeMatch = idEl.text.match(/type="(.*?)"/s) 
            if (typeMatch && SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE[typeMatch[1]]) {
                let idValue = idEl.innerText
                res.Identifiers.push({
                    Type: {
                        Value: SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE[typeMatch[1]]
                    },
                    Value: idValue
                })
            }
        }

        let outputType = modsEl.children.find(x => x.name === "genre" && x.attrText.match(/type="outputType"/))?.innerText
        let contentType = modsEl.children.find(x => x.name === "genre" && x.attrText.match(/type="contentType"/))?.innerText

        res.PublicationType = (Id => Id ? {Id} : undefined)(SWEPUB_OUTPUT_AND_CONTENT_TYPE_TO_RESEARCH_PUB_TYPE[outputType + ":" + contentType])

        res.Persons = []
        for (const personEl of modsEl.children.filter(x => x.name === "name")) {
            let personOrgRole = {
                PersonData: {
                    FirstName: (fn => fn ? fn.replace(/&#([0-9]{3});/g, (_,x) => String.fromCharCode(x)) : fn)((personEl.innerText.match(/<namePart type="given">(.*?)<\/namePart>/s) || [])[1]),
                    LastName: (ln => ln ? ln.replace(/&#([0-9]{3});/g, (_,x) => String.fromCharCode(x)) : ln)((personEl.innerText.match(/<namePart type="family">(.*?)<\/namePart>/s) || [])[1]),
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
    let res = {
        diffs: []
    }
    
    if (normalizedData.__meta.status !== "deleted") {
        // Use identifiers to try to find connected existing publications
        let connectedPublications
        let nestedShould = normalizedData.Identifiers.map(idObj => {
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

        let should = []
        if (normalizedData.Title) {
            should.push({
                match: {
                    Title: {
                        query: normalizedData.Title,
                        operator: "and"
                    }
                }
            })
        }

        if (nestedShould.length > 0 || should.length > 0) {
            connectedPublications = await esPost("/research-publications/_search", {
                size: 1000,
                _source: ["Id"],
                query: {
                    bool: {
                        should: [
                            {
                                nested: {
                                    path: "Identifiers",
                                    query: {
                                        bool: {
                                            should: nestedShould
                                        }
                                    }
                                }
                            },
                            ...should
                        ]
                    }
                }
            })
        }

        if (!connectedPublications?.hits?.total) {
            // We found no connected publications
            res.diffs.push({
                title: normalizedData.Title,
                year: normalizedData.Year,
                pubType: RESEARCH_PUB_TYPE_ID_TO_NAME[normalizedData.PublicationType?.Id],
                source: normalizedData.__meta,
                connected: [],
                description: "Found no publications connected to the source data with identifiers: " +
                    normalizedData.Identifiers.map(idObj => idObj.Type.Value + ":" + idObj.Value).join(", ") + ".",
                type: "NEW_IDS",
                prio: normalizedData.Year + // Higher number means more prioritized
                    (PRIORITIZED_PUB_TYPE_IDS.includes(normalizedData.PublicationType?.Id) ? 10000 : 0)
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