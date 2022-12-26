import parseTemplateToTokens from "./parseTemplateToTokens"
import renderTemplate from "./renderTemplate"

// 全局提供cjx_templateEngine对象
window.cjx_templateEngine = {
    render(templateStr, data) {
        let tokens = parseTemplateToTokens(templateStr)
        // console.log(tokens);
        let resultStr = renderTemplate(tokens, data)
        // console.log(resultStr);
        return resultStr
    }

}