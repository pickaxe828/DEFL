import {DEFLevaluator} from "./utils/evaluator"
import {fetchProxied} from "./utils/fetch"
import {stringToHtml, objectExtractChildren} from "./utils/utils"

let evaluator = new DEFLevaluator()

const onload = async function() {
    try {
        // Resize page
        let zoom = (window.outerWidth / window.innerWidth) * 10
        // Fetch the html
        let retr = await fetchProxied("https://worldpopulationreview.com/")
        // Hacky code XDD
        let data = await JSON.parse(stringToHtml(retr.contents).getElementById("__NEXT_DATA__").innerHTML)
        let regions = objectExtractChildren(data.props.pageProps.countryData, "name").sort()
        
        for (let i of regions) {
            let element = document.createElement('option')
            element.setAttribute("value", i)
            document.getElementsByClassName("regionSearchDropdownOptions")[0].appendChild(element)
        }

        document.getElementById("submitBtn").onclick = async function () {
            let body = document.getElementById("container")
            body.classList.remove("overflow-hidden")
            body.classList.add("overflow-auto")
        }

        //Region searchable dropdown
        document.getElementById("regionSearchDropdown").onchange = function (element: InputEvent|Event) { 
            let target = element.target as HTMLInputElement
            evaluator["region"] = target.value
        }

        //Sex Dropdown
        document.getElementById("sexDropdown").onchange = function (element: InputEvent|Event) { 
            let target = element.target as HTMLInputElement
            evaluator["sex"] = target.value === "Sex" ? undefined : target.value
        }

        //Sexual Preference Dropdown
        document.getElementById("sexPrefDropdown").onchange = function (element: InputEvent|Event) { 
            let target = element.target as HTMLInputElement
            evaluator["sex_ori"] = target.value === "Sexual orientation" ? undefined : target.value
        }

        //Preferred Age Lower Bound
        document.getElementById("prefAgeLower").onchange = function (element: InputEvent|Event) { 
            let target = element.target as HTMLInputElement
            evaluator["pref_age_lower"] = Number(target.value)
        }

        //Preferred Age Upper Bound
        document.getElementById("prefAgeUpper").onchange = function (element: InputEvent|Event) { 
            let target = element.target as HTMLInputElement
            evaluator["pref_age_upper"] = Number(target.value)
        }

        //Age
        document.getElementById("age").onchange = function (element: InputEvent|Event) { 
            let target = element.target as HTMLInputElement
            evaluator["age"] = Number(target.value)
        }

        //Submit
        document.getElementById("submitBtn").onclick = function () { 
            evaluator.evaluate()
        }

    } catch (e) {
        console.error(e)
    }
}

window.onload = onload