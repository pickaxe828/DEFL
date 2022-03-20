import {DEFLevaluator} from "./utils/evaluator.js"
import {fetchProxied} from "./utils/fetch.js"
import {stringToHtml, objectExtractChildren} from "./utils/utils.js"

const onload = async function() {
    try {
        console.log("Window is loaded.")
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

        document.getElementById("regionSearchDropdown").onchange = async function (element) { 
            console.log(element.target.value)
        }

        document.getElementById("sexDropdown").onchange = async function (element) { 
            console.log(element.target.value)
        }

    } catch (e) {
        console.error(e)
    }
}

window.onload = onload