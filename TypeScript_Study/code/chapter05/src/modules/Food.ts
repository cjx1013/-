// 食物类
class Food{
    element: HTMLElement

    constructor() {
        // 加上个!是让它知道document.getElementById('food')!
        // 得到的DOM元素一定不为空，因为我们这个游戏自己肯定会弄个id为food的DOM
        //否则ts检查会报错，报这个DOM元素
        // 可能为空的错
        this.element = document.getElementById('food')!
    }

    get X() {
        return this.element.offsetLeft
    }

    get Y() {
        return this.element.offsetTop
    }

    // 每次生成不同位置的食物
    change() {
        // 生成的位置让它随机
        // 而且让它每次移动是移动10px的倍数，且不能超过游戏界面
        const left = Math.round(Math.random() * 38) * 10
        const top = Math.round(Math.random() * 38) * 10
        this.element.style.left = left + 'px'
        this.element.style.top = top + 'px'
    }
}

export default Food