// 用来将模板字符串变为tokens

import Scanner from "./Scanner";
import nestTokens from "./nestTokens";

export default function parseTemplateToTokens(templateStr) {
    const scanner = new Scanner(templateStr)
    let tokens = []
    let word
    while(!scanner.eos()) {
        word = scanner.scanUntil('{{')
        if(word != ''){
            tokens.push(['text', word])
        }
        scanner.scan('{{')

        word = scanner.scanUntil('}}')
        if(word != '') {
            // 如果模板字符串中有循环，即{{#arr}}……{{/arr}}，则不是存['name', arr]而是['#', 'arr']和['/', 'arr']
            if(word[0] == '#') {
                tokens.push(['#', word.substring(1)])
            }else if(word[0] == '/') {
                tokens.push(['/', word.substring(1)])
            }else{
                tokens.push(['name', word])
            }
        }
        scanner.scan('}}')
    }

    return nestTokens(tokens)
}