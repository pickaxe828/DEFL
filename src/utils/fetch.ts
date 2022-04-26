let proxy_url = "https://api.allorigins.win/get?url="
// "https://worldpopulationreview.com/"

export async function fetchProxied(url) {
    let response = await fetch(proxy_url + url)
    let data = await response.json()
    return data
}