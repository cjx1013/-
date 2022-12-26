import parse from "./parse";

let templateStr = `
    <div class="d" id="did">
        <h3>你好</h3>
        <ul>
            <li>A</li>
            <li>B</li>
            <li>C</li>
        </ul>
    </div>

`

const ast = parse(templateStr)
console.log(ast);