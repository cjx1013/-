import Compile from "./Compile"
import observe from './observe'
import Watcher from './Watcher'

export default class Vue{
    constructor(options) {
        // 把参数options对象存为$options
        this.$options = options || {}
        // 数据
        this._data = options.data || undefined
        // 数据要变为响应式的
        observe(this._data)
        this._initData()
        // 调用传进来的watch
        this._initWatch()
        // 模板编译，将模板语法变为AST，分析指令等
        new Compile(options.el, this)
        // options.created(),options.mounted()，在这里可以调用生命周期钩子
    }

    _initData() {
        let self = this
        Object.keys(this._data).forEach(key => {
            Object.defineProperty(self, key, {
                get() {
                    return self._data[key]
                },
                set(newVal) {
                    self._data[key] = newVal
                }
            })
        })
    }

    _initWatch() {
        let self = this
        let watch = this.$options.watch
        Object.keys(watch).forEach(key => {
            new Watcher(self, key, watch[key])
        })
    }
}