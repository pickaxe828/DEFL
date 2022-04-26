import {DEFLevaluator} from './evaluator'

export function stringToHtml(str) {
    var parser = new DOMParser();
    var doc = parser.parseFromString(str, 'text/html');
    return doc;
}

export function objectExtractChildren(obj: Array<object>, key: string) {
    let res = []
    for (let i of obj) {
        res.push(i[key])
    }
    return res
}