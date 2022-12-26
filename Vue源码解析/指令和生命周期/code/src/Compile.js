import Watcher from './Watcher'

export default class Compile{
    constructor(el, vue) {
        // vue实例
        this.$vue = vue
        // 挂载点
        this.$el = document.querySelector(el)
        // 如果用户传入了挂载点
        if(this.$el) {
            // 调用函数，让节点变为fragment，类似于mustache中的tokens
            // 实际上用的是AST，这里就是轻量级的，fragment
            let $fragment = this.node2Fragment(this.$el)
            // 编译这个fragment
            this.compile($fragment)
            // 编译好的内容上树
            this.$el.appendChild($fragment)
        }
    }

    node2Fragment(el) {
        let fragment = document.createDocumentFragment()
        // 让所有DOM节点，都进入fragment
        while(el.firstChild) {
            // 节点进入fragment后，原来的DOM节点就会没有
            // 比如第一个孩子为h3，第二个孩子为ul，那么h3进入fragment后，第一个孩子就变为ul
            // 这样继续循环下去
            fragment.appendChild(el.firstChild)
        }
        // console.log(fragment);
        // fragment就类似于mustache中的tokens
        return fragment
    }

    compile(el) {
        // console.log(el);
        // vue底层不是用的fragment，而是用AST来分析，这里为了方便使用
        // createDocumentFragment创建fragment模仿AST
        // 得到子元素
        let childNodes = el.childNodes
        let self = this

        // 匹配{{}}中的文本
        let textReg = /\{\{(.*)\}\}/

        childNodes.forEach(node => {
            let text = node.textContent
            // console.log(node);
            if(node.nodeType == 1) {
                // 如果是元素节点
                // console.log('元素节点');
                self.compileElement(node)
            }else if(node.nodeType == 3 && textReg.test(text)) {
                // 如果是文本节点
                // console.log('文本匹配');
                let name = text.match(textReg)[1]
                self.compileText(node, name)
            }
        })
    }

    compileElement(node) {
        let self = this
        // 处理元素节点
        // console.log(node);
        // attributes属性可以真正获得属性列表的类数组，而不是字符串
        let nodeAttrs = node.attributes
        // console.log(nodeAttrs);
        // slice 方法可以用来将一个类数组（Array-like）对象/集合转换成一个新数组。
        /**
         * 比如function list() {
            return Array.prototype.slice.call(arguments);
            }
            arguments就是一个类数组
            var list1 = list(1, 2, 3); // [1, 2, 3]
         * 
         */
        // 得到的类数组对象变为数组，就可以获得属性列表的数组
        // [].slice.call……也可以
        Array.prototype.slice.call(nodeAttrs).forEach(attr => {
            // console.log(attr);
            // 获得节点的属性列表后，就可以分析指令了
            // 指令名
            let attrName = attr.name
            // 指令的内容
            let attrValue = attr.value
            // 指令都是v-开头的，获取v-后面的指令字符串，比如v-if那么就获取if
            let dir = attrName.substring(2) 

            // 看看是不是指令
            if(attrName.indexOf('v-') == 0) {
                // 是以v-开头
                if(dir == 'model') {
                    // 指令是v-model
                    // v-model的实现
                    // 一、对v-model="xxx"中的xxx监听
                    new Watcher(self.$vue, attrValue, value => {
                        node.value = value
                    })

                    // 二、得到数据，显示在页面上
                    let v = self.getVueVal(self.$vue, attrValue)
                    node.value = v

                    // 三、给节点添加input监听事件，设置值为输入的新值
                    node.addEventListener('input', e => {
                        let newVal = e.target.value
                        // console.log(newVal);
                        // 设置值
                        self.setVueVal(self.$vue, attrValue, newVal)
                    })
                }else if(dir == 'if') {
                    // 指令是v-if
                    console.log('发现了if指令', attrValue);
                }
            }
        })
    }

    compileText(node, name) {
        // 处理文本节点，替换{{}}中的值为数据
        // console.log('AA', name);
        node.textContent = this.getVueVal(this.$vue, name)
        // 将数据变为响应式，监听它
        new Watcher(this.$vue, name, value=> {
            node.textContent = value
        })
    }

    getVueVal(vue, exp) {
        // 读取形如a.b.c的c的值
        exp = exp.split('.')
        let val = vue
        exp.forEach(k => {
            val = val[k]
        })
        return val
    }

    setVueVal(vue, exp, v) {
        // 设置形如a.b.c的c的值
        exp = exp.split('.')
        let val = vue
        exp.forEach((k, i) => {
            if(i < exp.length - 1) {
                // 还没到最底部的c
                val = val[k]
            }else {
                // 到了c
                val[k] = v
            }
        })
    } 
}