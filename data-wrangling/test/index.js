let cacheBuster = Date.now()

let is = (o, fieldOrFn, expectedValue) => {
    let res
    if (typeof fieldOrFn === "function") {
        try {
            let isCorrect = fieldOrFn(o)
            res = isCorrect ? "" : "Check method failed: " + fieldOrFn.toString()
        } catch (err) {
            res = "Got error \"" + err.message + "\" when executing check method: " + fieldOrFn.toString()
        }
    } else {
        res = o[fieldOrFn] === expectedValue ? "" : "Expected " + fieldOrFn + " to be " + expectedValue + " but found " + o[fieldOrFn]
    }
    return res
}

let createBasicTestMethod = (filepath, checkFn, ...moreArgs) => {
    return async function () {
        let response = await fetch(filepath)
        let textData = await response.text()
        let normalizedData = this.normalizeSwepub(textData, ...moreArgs)

        let errors = []
        checkFn(errors, normalizedData)
        errors = errors.filter(x => x.trim())

        return errors.join("\n")
    }
}

const TESTS = [
    {
        name: "Normalization of swepub data, normal post",
        fn: async function () {
            let response = await fetch("data/1.xml")
            let textData = await response.text()
            let normalizedData = this.normalizeSwepub(textData, "FEJKKÄLLAN")
        
            let errors = []
            errors.push(is(normalizedData.__meta, "status", "unknown"))
            errors.push(is(normalizedData.__meta, "id", "oai:fejku.lib.chalmers.se/12345"))
            errors.push(is(normalizedData.__meta, "datestamp", "2024-01-21T21:56:02Z"))
            errors.push(is(normalizedData.__meta, "name", "FEJKKÄLLAN"))
            errors.push(is(normalizedData.__meta, "method", "normalizeSwepub"))
            errors.push(is(normalizedData, "Title", "Den bästa fejktiteln."))
            errors.push(is(normalizedData, "Year", 2008))
            errors.push(is(normalizedData, pub => pub.Language != null && pub.Language.Iso === "eng" && pub.Language.Id === "4e28320a-1397-47a6-bbfd-e9294ef8b374"))
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "67383db1-533a-4ec6-8c58-6922e711b5c2"))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "DOI" && idObj.Value === "10.1234/fejk.1234")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "PUBMED_ID" && idObj.Value === "12345678")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "SCOPUS_ID" && idObj.Value === "12345678909")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "WOS_ID" && idObj.Value === "123456789098765")))
            errors.push(is(normalizedData, pub => !pub.Identifiers.some(idObj => idObj.Type.Value === "ISSN" && idObj.Value === "0001-1234")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "ISBN" && idObj.Value === "1234567890987")))
            errors.push(is(normalizedData, pub => pub.Persons[0].PersonData.FirstName === "Fejk" && pub.Persons[0].PersonData.LastName === "Fejksson"))
            errors.push(is(normalizedData, pub => pub.Persons[0].Organizations[0].OrganizationData.NameSwe === "Fejkuniversitet"))
            errors.push(is(normalizedData, pub => pub.Persons[0].Organizations[0].OrganizationData.NameEng === "Fake University"))
            errors.push(is(normalizedData, pub => pub.Persons[0].Organizations[1].OrganizationData.NameSwe === "Institutionen f&#246;r tester som är fejk"))
            errors.push(is(normalizedData, pub => pub.Persons[0].Organizations[1].OrganizationData.NameEng === "Department of testing that is fake"))
            errors.push(is(normalizedData, pub => pub.Persons[0].Organizations[1].OrganizationData.Identifiers.some(idObj => idObj.Type.Value === "SWEPUB_AFF_ID" && idObj.Value === "fejku.lib.chalmers.se/0001")))
            errors.push(is(normalizedData, pub => pub.Persons[1].Organizations[0].OrganizationData.NameSwe === "Fejkuniversitet"))
            errors.push(is(normalizedData, pub => pub.Persons[1].Organizations[0].OrganizationData.NameEng === "Fake University"))
            errors.push(is(normalizedData, pub => pub.Persons[1].Organizations[1].OrganizationData.NameSwe === "Institutionen f&#246;r tester som är ganska fejk"))
            errors.push(is(normalizedData, pub => pub.Persons[1].Organizations[1].OrganizationData.NameEng === "Department of testing that is pretty fake"))
            errors.push(is(normalizedData, pub => pub.Persons[1].PersonData.FirstName === "Fjek" && pub.Persons[1].PersonData.LastName === "Fjeksson" && pub.Persons[1].PersonData.BirthYear === 1972))
            errors.push(is(normalizedData, pub => pub.Persons[1].Organizations[1].OrganizationData.Identifiers.some(idObj => idObj.Type.Value === "SWEPUB_AFF_ID" && idObj.Value === "fejku.lib.chalmers.se/0002")))
            errors.push(is(normalizedData, pub => pub.Persons[2].PersonData.FirstName === "Anon" && pub.Persons[2].PersonData.LastName === "Fejko"))
            errors.push(is(normalizedData, pub => pub.Persons[3].PersonData.FirstName === "Nymus" && pub.Persons[3].PersonData.LastName === "Fjeko"))
            errors.push(is(normalizedData, pub => pub.Source?.Volume === "261"))
            errors.push(is(normalizedData, pub => pub.Source?.Issue === "3"))
            errors.push(is(normalizedData, pub => pub.Source?.ArticleNo === "6374"))
            errors.push(is(normalizedData, pub => pub.Source?.PageStart === "26"))
            errors.push(is(normalizedData, pub => pub.Source?.PageEnd === "30"))
            errors.push(is(normalizedData, pub => pub.Source?.Identifiers[0].Type.Value === "ISSN" && pub.Source?.Identifiers[0].Value === "0001-1234"))
            errors.push(is(normalizedData, pub => pub.Source?.Identifiers[1].Type.Value === "ISBN" && pub.Source?.Identifiers[1].Value === "00-12345-67-8"))
            errors = errors.filter(x => x.trim())

            return errors.join("\n")
        }
    },
    {
        name: "Normalization of swepub data, deleted post",
        fn: async function () {
            let response = await fetch("data/2.xml")
            let textData = await response.text()
            let normalizedData = this.normalizeSwepub(textData)
        
            let errors = []
            errors.push(is(normalizedData.__meta, "status", "deleted"))
            errors.push(is(normalizedData.__meta, "id", "oai:fejku.lib.chalmers.se/999999"))
            errors.push(is(normalizedData.__meta, "datestamp", "2022-11-30T11:45:48Z"))
            errors = errors.filter(x => x.trim())

            return errors.join("\n")
        }
    },{
        name: "Normalization of swepub data, publication type Artikel, övrig vetenskaplig",
        fn: createBasicTestMethod("data/1-pt1.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "7dc9214c-b2d3-49a7-83e9-a205d06b668e"))
        })
    },{
        name: "Normalization of swepub data, publication type Artikel, recension (forskningsöversikt)",
        fn: createBasicTestMethod("data/1-pt2.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "fb7b28c6-67eb-4a18-969b-93617f17c6fd"))
        })
    },{
        name: "Normalization of swepub data, publication type Artikel i övriga tidskrifter",
        fn: createBasicTestMethod("data/1-pt3.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "2fc3e903-da49-4a79-9f2b-16ff93d34cfe"))
        })
    },{
        name: "Normalization of swepub data, publication type Artikel i dagstidning",
        fn: createBasicTestMethod("data/1-pt4.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "1403066e-9d0c-41fa-ad4a-1d57ffeb04bf"))
        })
    },{
        name: "Normalization of swepub data, publication type Inledande text i tidskrift",
        fn: createBasicTestMethod("data/1-pt5.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "12e4c4f6-4966-473b-ad56-21df59b74e6e"))
        })
    },{
        name: "Normalization of swepub data, publication type Bok",
        fn: createBasicTestMethod("data/1-pt6.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "eef3059a-c32c-4fdc-946a-006e7699e975"))
        })
    },{
        name: "Normalization of swepub data, publication type Bok, refereegranskad",
        fn: createBasicTestMethod("data/1-pt7.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "cc10a3d7-a830-4f25-8473-4aecb9d0fb46"))
        })
    },{
        name: "Normalization of swepub data, publication type Bok, populärvetenskaplig",
        fn: createBasicTestMethod("data/1-pt8.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "af9af7de-b11c-40a2-838e-9c63493ac3a8"))
        })
    },{
        name: "Normalization of swepub data, publication type Samlingsverk (redaktörskap)",
        fn: createBasicTestMethod("data/1-pt9.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "173d963e-5a8d-43b3-9e05-7f860659451c"))
        })
    },{
        name: "Normalization of swepub data, publication type Bok med redaktör, refereegranskad",
        fn: createBasicTestMethod("data/1-pt10.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "56579964-308c-4138-995f-84d5c446b060"))
        })
    },{
        name: "Normalization of swepub data, publication type Tidskrift med redaktör, vetenskaplig",
        fn: createBasicTestMethod("data/1-pt11.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "39f2dbf4-3f0b-40fd-b3e0-78664781f28c"))
        })
    },{
        name: "Normalization of swepub data, publication type Rapport",
        fn: createBasicTestMethod("data/1-pt12.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "4951f99d-df1a-4dec-aca7-11b970192457"))
        })
    },{
        name: "Normalization of swepub data, publication type Kapitel i bok",
        fn: createBasicTestMethod("data/1-pt13.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "4dd8982c-3233-4412-b9c5-34a9e53900ea"))
        })
    },{
        name: "Normalization of swepub data, publication type Kapitel, populärvetenskapligt",
        fn: createBasicTestMethod("data/1-pt14.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "7d7fc5ea-ca2e-4b78-b57a-a20a7ec49bce"))
        })
    },{
        name: "Normalization of swepub data, publication type Konstnärligt arbete",
        fn: createBasicTestMethod("data/1-pt15.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "b9477106-cec2-4ef1-9ccd-676e407f07bf"))
        })
    },{
        name: "Normalization of swepub data, publication type Paper i proceeding",
        fn: createBasicTestMethod("data/1-pt16.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "8bb5ac5b-af8c-4a1e-8fdb-0454d3258990"))
        })
    },{
        name: "Normalization of swepub data, publication type Proceeding (redaktörskap)",
        fn: createBasicTestMethod("data/1-pt17.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "fcbd2df8-7e42-4723-8813-3cb9efeb9505"))
        })
    },{
        name: "Normalization of swepub data, publication type Konferensbidrag (offentliggjort, men ej förlagsutgivet)",
        fn: createBasicTestMethod("data/1-pt18.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "4081fbf3-0bc3-43dc-ae62-4eb69fe94bde"))
        })
    },{
        name: "Normalization of swepub data, publication type Poster (konferens)",
        fn: createBasicTestMethod("data/1-pt19.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "0d689b87-34ff-44da-9af6-56028cd2ba56"))
        })
    },{
        name: "Normalization of swepub data, publication type Licentiatavhandling",
        fn: createBasicTestMethod("data/1-pt20.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "b8917acf-9b24-4103-befd-a9ca42a53e9f"))
        })
    },{
        name: "Normalization of swepub data, publication type Doktorsavhandling",
        fn: createBasicTestMethod("data/1-pt21.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "645ba094-942d-400a-84cc-ec47ee01ec48"))
        })
    },{
        name: "Normalization of swepub data, publication type Patent",
        fn: createBasicTestMethod("data/1-pt22.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "9e42eb8c-5537-4ee8-a098-5e77d1b92453"))
        })
    },{
        name: "Normalization of swepub data, publication type Övrigt",
        fn: createBasicTestMethod("data/1-pt23.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "35dbc28f-316c-43a0-bd30-10bc494f0adb"))
        })
    },{
        name: "Normalization of swepub data, publication type Rapport, populärvetenskaplig",
        fn: createBasicTestMethod("data/1-pt24.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "48ded372-c881-4fc9-bc99-ddd024d595a7"))
        })
    },{
        name: "Normalization of swepub data, publication type Konstnärligt arbete, refereegranskat",
        fn: createBasicTestMethod("data/1-pt25.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.PublicationType.Id === "e4d12779-9fd5-4fa5-9407-df6d4c466ac0"))
        })
    },{
        name: "Normalization of swepub data, HTML entities decoded",
        fn: createBasicTestMethod("data/1-html-entities.xml", (errors, normalizedData) => {
            errors.push(is(normalizedData, pub => pub.Title === "Den bästa fejktiteln. åäöÅÄÖ ’ \r"))
            errors.push(is(normalizedData, pub => pub.Persons[0].PersonData.FirstName === "Fejk åäöÅÄÖ ’ \r"))
            errors.push(is(normalizedData, pub => pub.Persons[0].PersonData.LastName === "Fejksson åäöÅÄÖ ’ \r"))
        }, "FEJKKÄLLAN", true)
    },{
        name: "Find differences, all in query, no hit",
        fn: async function () {
            let response = await fetch("data/1.xml")
            let textData = await response.text()
            let normalizedData = this.normalizeSwepub(textData)

            let shouldQueryArr = []
            let nestedShouldQueryArr = []
            let findDiffsResponse = await this.findDifferences(normalizedData, (path, data) => {
                shouldQueryArr = data?.query?.bool?.should
                nestedShouldQueryArr = shouldQueryArr[0]?.nested?.query?.bool?.should
                return {hits:{total:0}}
            })
            
            let errors = []
            errors.push(is(nestedShouldQueryArr, arr => arr[0]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "URI" &&       arr[0]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "https://fejku.lib.chalmers.se/publication/12345"))
            errors.push(is(nestedShouldQueryArr, arr => arr[1]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "PUBMED_ID" && arr[1]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "12345678"))
            errors.push(is(nestedShouldQueryArr, arr => arr[2]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "DOI" &&       arr[2]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "10.1234/fejk.1234"))
            errors.push(is(nestedShouldQueryArr, arr => arr[3]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "WOS_ID" &&    arr[3]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "123456789098765"))
            errors.push(is(nestedShouldQueryArr, arr => arr[4]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "SCOPUS_ID" && arr[4]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "12345678909"))
            errors.push(is(nestedShouldQueryArr, arr => arr[5]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "ISBN" &&      arr[5]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "1234567890987"))
            errors.push(is(shouldQueryArr, arr => arr[1]?.match?.Title?.query === "Den bästa fejktiteln."))
            errors.push(is(findDiffsResponse.diffs, "length", 1))
            errors.push(is(findDiffsResponse.diffs[0].connected, "length", 0))
            errors.push(is(findDiffsResponse.diffs[0], "type", "NEW_IDS"))
            errors.push(is(findDiffsResponse.diffs[0], "prio", 12008))
            errors.push(is(findDiffsResponse.diffs[0], "title", "Den bästa fejktiteln."))
            errors.push(is(findDiffsResponse.diffs[0], "year", 2008))
            errors.push(is(findDiffsResponse.diffs[0], "pubType", "Artikel i vetenskaplig tidskrift"))
            errors = errors.filter(x => x.trim())

            return errors.join("\n")
        }
    },{
        name: "Find differences, status deleted, no crash",
        fn: async function () {
            let response = await fetch("data/2.xml")
            let textData = await response.text()
            let normalizedData = this.normalizeSwepub(textData)
            
            let findDiffsResponse
            let errors = []
            errors = errors.filter(x => x.trim())
            try {
                findDiffsResponse = await this.findDifferences(normalizedData, (path, data) => {
                    return {hits:{total:0}}
                })
            } catch (err) {
                errors.push("Find differences method crashed.")
            }
            errors.push(is(findDiffsResponse.diffs, val => Array.isArray(val) && val.length === 0))
            errors = errors.filter(x => x.trim())
            return errors.join("\n")
        }
    }
]

export async function runTests() {
    let importedModule = await import("../index.js?v=" + cacheBuster++)

    let res = []
    let failCount = 0, okCount = 0
    for (const test of TESTS) {
        let resultText = await test.fn.call(importedModule)
        if (resultText.trim()) {
            failCount += 1
        } else {
            okCount += 1
        }
        res.push((resultText.trim() ? "FAILED" : "OK") + " - " + test.name + " " + resultText)
    }
    return `
================================================================================
 RESULT FROM TESTING AT ${new Date().toLocaleTimeString()},                         OK: ${okCount} FAILED: ${failCount}
================================================================================
${res.join("\n----------------------------------------\n")}
    `
}