const LANGUAGES_ISO_TO_INTERNAL = {
    und: "88e65284-77f2-4cf1-a211-a0294967c9ee",
    bos: "3556210b-7f0a-4a55-ac43-254b83686da8",
    bul: "e4cb4450-c07d-42bd-bc32-945e8b7e1bf1",
    dan: "a9ea0088-75da-40d3-8b0d-63e7f486ec86",
    eng: "4e28320a-1397-47a6-bbfd-e9294ef8b374",
    fin: "256c8d98-4ec6-4a79-8d91-b89999251ae3",
    fre: "3259e5b5-5dbe-433b-84cb-0e659eff4d12",
    gre: "8bac640f-8427-4fb6-9704-68ad0452b279",
    ice: "bb0fc862-7bae-4c01-b716-2d5b14c4cdec",
    ita: "6191b510-08f6-41cd-b996-79fe1a83f41b",
    jpn: "81179155-764c-4f2c-ad78-43269c70bcda",
    chi: "5e029b55-e04d-45c0-b642-8a7df18508ab",
    hrv: "3351e364-a2b5-4e35-ac51-944cb89a4e7f",
    lav: "c2fadac6-d5a7-4bdc-99ae-ec2a0f06a1d3",
    // chi: "bc04bdbf-8695-44bb-84fb-38e46a32d318", // Mandarin
    dut: "92834bcf-edfa-4b7f-85ac-ca8f077b916b",
    nor: "3e74d3bc-5b8d-4f39-9c89-a33cda0c92cd",
    pol: "50e3da53-b706-474c-a6a9-9bc5d4f4ff0b",
    por: "aa9a4edb-ab6f-4c86-be61-5946d6ee40cb",
    rus: "5a5cb7f5-1056-4084-a1a3-1787fa718399",
    srp: "3930222c-4004-4b55-bcaf-c44e9e9c7e43",
    slo: "c23e3628-6fda-4e54-9b50-68f4dc872fcf",
    slv: "719ed594-2560-48b0-8eb3-4aed82df2c8f",
    spa: "4f8c047f-b9b4-4765-b37a-0e7062882d7f",
    swe: "2950f9d6-14af-49a1-9133-adacc07cbb6d",
    cze: "d25c0ffa-434c-4da9-a904-021f416f744a",
    ger: "7ae6feb9-5bcb-4317-9347-808983098c0d",
    hun: "9833bf27-5219-41f2-bb67-6c599f37a307",
    kor: "1501ee29-8dc9-4b83-adbf-707d4540c0ab",
    per: "8861e3ee-2ec3-4d4c-bdfc-b6c9753eb080",
    tur: "faed4fd5-7f2f-4f40-8db1-353e5b01cc51",
    ukr: "9467fd98-edc8-4b95-a250-c86bd2468d1a",
    lit: "2c66c504-7f81-4253-b897-23ab4e40fe0f",
    bel: "069f56bd-5b24-44de-880a-fb8eaa80ee07",
    ara: "c3853b25-9ac2-426b-9cdb-76f6c466d666",
    heb: "4def7f19-4247-4f17-befe-bde937b4e966"
}

const SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE = {
    "doi": "DOI",
    "isi": "WOS_ID",
    "scopus": "SCOPUS_ID",
    "isbn": "ISBN",
    "issn": "ISSN",
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

let createHexHash = async text => (new Uint8Array(await crypto.subtle.digest("SHA-1", new TextEncoder().encode(text)))).toBase64().replace(/\+/g,"-").replace(/\//g,"_").replace(/=/g,"")

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

        res.Title = (t => t && decodePossiblyUnsafeEntities ? t.replace(/&#([0-9]{1,5});/g, (_,x) => String.fromCharCode(x)) : t)(modsEl.children.find(x => x.name === "titleInfo")?.children.find(x => x.name === "title")?.innerText)
        res.Abstract = (t => t && decodePossiblyUnsafeEntities ? t.replace(/&#([0-9]{1,5});/g, (_,x) => String.fromCharCode(x)) : t)(modsEl.children.find(x => x.name === "abstract")?.innerText)

        let originInfoEl = modsEl.children.find(x => x.name === "originInfo")
        let dateIssuedEl = originInfoEl.children.find(x => x.name === "dateIssued")
    
        res.Year = parseInt(dateIssuedEl.innerText) || undefined
        res.Language = (t => t ? { Id:LANGUAGES_ISO_TO_INTERNAL[t], Iso:t } : { Id:LANGUAGES_ISO_TO_INTERNAL["und"], Iso: "und" })(modsEl.children.find(x => x.name === "language")?.children.find(x => x.name === "languageTerm" && x.attrText.match(/authority="iso639-2b"/))?.innerText)

        res.DataObjects = (ft => ft ? [ { Url:ft, DataObjectType:{ Id:"954d52b7-a9d9-4c5c-aa13-351391ed1cc2"} } ] : undefined)(modsEl.children.find(x => x.name === "location")?.children.find(x => x.name === "url" && x.attrText.match(/displayLabel="FULLTEXT"/))?.innerText)

        let relatedItemHostEl = modsEl.children.find(x => x.name === "relatedItem" && x.attrText.match(/type="host"/))
        if (relatedItemHostEl) {
            res.Source = {}
            res.Source.Title = relatedItemHostEl.children.find(x => x.name === "titleInfo")?.children.find(x => x.name === "title")?.innerText
            res.Source.Volume = relatedItemHostEl.children.find(x => x.name === "part")?.children.find(x => x.name === "detail" && x.attrText.match(/type="volume"/))?.children.find(x => x.name === "number")?.innerText
            res.Source.Issue = relatedItemHostEl.children.find(x => x.name === "part")?.children.find(x => x.name === "detail" && x.attrText.match(/type="issue"/))?.children.find(x => x.name === "number")?.innerText
            res.Source.ArticleNo = relatedItemHostEl.children.find(x => x.name === "part")?.children.find(x => x.name === "detail" && x.attrText.match(/type="artNo"/))?.children.find(x => x.name === "number")?.innerText
            res.Source.PageStart = relatedItemHostEl.children.find(x => x.name === "part")?.children.find(x => x.name === "extent")?.children.find(x => x.name === "start")?.innerText
            res.Source.PageEnd = relatedItemHostEl.children.find(x => x.name === "part")?.children.find(x => x.name === "extent")?.children.find(x => x.name === "end")?.innerText
            res.Source.Identifiers = []
            for (const idEl of relatedItemHostEl.children.filter(x => x.name === "identifier")) {
                let typeMatch = idEl.text.match(/type="(.*?)"/s) 
                if (typeMatch && SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE[typeMatch[1]]) {
                    res.Source.Identifiers.push({
                        Type: {
                            Value: SWEPUB_ID_TYPE_TO_RESEARCH_ID_TYPE[typeMatch[1]]
                        },
                        Value: idEl.innerText
                    })
                }
            }
        }
        
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

        let outputType = modsEl.children.find(x => x.name === "genre" && x.attrText.match(/type="outputType"/))?.innerText
        let contentType = modsEl.children.find(x => x.name === "genre" && x.attrText.match(/type="contentType"/))?.innerText

        res.PublicationType = (Id => Id ? {Id} : undefined)(SWEPUB_OUTPUT_AND_CONTENT_TYPE_TO_RESEARCH_PUB_TYPE[outputType + ":" + contentType])

        res.Persons = []
        for (const personEl of modsEl.children.filter(x => x.name === "name" && x.attrText.match(/type="personal"/))) {
            let personOrgRole = {
                PersonData: {
                    FirstName: (fn => fn && decodePossiblyUnsafeEntities ? fn.replace(/&#([0-9]{1,5});/g, (_,x) => String.fromCharCode(x)) : fn)((personEl.innerText.match(/<namePart type="given">(.*?)<\/namePart>/s) || [])[1]),
                    LastName: (ln => ln && decodePossiblyUnsafeEntities ? ln.replace(/&#([0-9]{1,5});/g, (_,x) => String.fromCharCode(x)) : ln)((personEl.innerText.match(/<namePart type="family">(.*?)<\/namePart>/s) || [])[1]),
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
            // Create one diff for each identifier.
            let diffType = "NEW_ID"
            for (const idObj of normalizedData.Identifiers) {
                res.diffs.push({
                    id: await createHexHash(normalizedData.__meta.id + ":" + diffType + ":" + idObj.Type.Value + ":" + idObj.Value),
                    title: normalizedData.Title,
                    year: normalizedData.Year,
                    pubType: RESEARCH_PUB_TYPE_ID_TO_NAME[normalizedData.PublicationType?.Id],
                    source: normalizedData.__meta,
                    connected: [],
                    description: "Found no publications connected to the source data with identifier: " + idObj.Type.Value + ":" + idObj.Value + ".",
                    type: diffType,
                    prio: normalizedData.Year + // Higher number means more prioritized
                        (PRIORITIZED_PUB_TYPE_IDS.includes(normalizedData.PublicationType?.Id) ? 10000 : 0)
                })
            }
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