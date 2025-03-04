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
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "DOI" && idObj.Value === "10.1234/fejk.1234")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "PUBMED_ID" && idObj.Value === "12345678")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "SCOPUS_ID" && idObj.Value === "12345678909")))
            errors.push(is(normalizedData, pub => pub.Identifiers.some(idObj => idObj.Type.Value === "WOS_ID" && idObj.Value === "123456789098765")))
            errors.push(is(normalizedData, pub => !pub.Identifiers.some(idObj => idObj.Type.Value === "ISSN" && idObj.Value === "0001-1234")))
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

            errors = errors.filter(x => x.trim())

            return errors.length === 0 ? "OK" : errors.join("\n")
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

            return errors.length === 0 ? "OK" : errors.join("\n")
        }
    },{
        name: "Find differences, all identifiers in query, no hit",
        fn: async function () {
            let response = await fetch("data/1.xml")
            let textData = await response.text()
            let normalizedData = this.normalizeSwepub(textData)

            let shouldQueryArr = []
            let findDiffsResponse = await this.findDifferences(normalizedData, (path, data) => {
                shouldQueryArr = data?.query?.nested?.query?.bool?.should
                return {hits:{total:0}}
            })
            
            let errors = []
            errors.push(is(shouldQueryArr, arr => arr[0]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "PUBMED_ID" && arr[0]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "12345678"))
            errors.push(is(shouldQueryArr, arr => arr[1]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "DOI" && arr[1]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "10.1234/fejk.1234"))
            errors.push(is(shouldQueryArr, arr => arr[2]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "WOS_ID" && arr[2]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "123456789098765"))
            errors.push(is(shouldQueryArr, arr => arr[3]?.bool?.must[0]?.term["Identifiers.Type.Value.keyword"]?.value === "SCOPUS_ID" && arr[3]?.bool?.must[1]?.term["Identifiers.Value.keyword"]?.value === "12345678909"))
            errors.push(is(findDiffsResponse.diffs, "length", 1))
            errors.push(is(findDiffsResponse.diffs[0].connected, "length", 0))
            errors.push(is(findDiffsResponse.diffs[0], "type", "NEW_IDS"))
            errors.push(is(findDiffsResponse.diffs[0], "prio", 0))
            errors.push(is(findDiffsResponse.diffs[0], "title", "Den bästa fejktiteln."))
            errors = errors.filter(x => x.trim())

            return errors.length === 0 ? "OK" : errors.join("\n")
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
            return errors.length === 0 ? "OK" : errors.join("\n")
        }
    }
]

export async function runTests() {
    let importedModule = await import("../index.js?v=" + cacheBuster++)

    let res = []
    for (const test of TESTS) {
        res.push(test.name + " - " + await test.fn.call(importedModule))
    }
    return `
========================================
 RESULT FROM TESTING AT ${new Date().toLocaleTimeString()}
========================================
${res.join("\n----------------------------------------\n")}
    `
}