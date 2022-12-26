class Snake{
    // snake的整个容器
    element: HTMLElement
    // 头部
    head: HTMLElement
    // 身体，collection的特点，向这个集合添加新的元素会实时刷新
    body: HTMLCollection

    constructor() {
        this.element = document.getElementById('snake')!
        this.head = document.querySelector('#snake>div')!
        this.body= this.element.getElementsByTagName('div')
    }

    // 获取蛇头坐标
    get X() {
        return this.head.offsetLeft
    }
    get Y() {
        return this.head.offsetTop
    }

    // 设置蛇头坐标
    set X(x: number) {
        // 蛇没有向左右移动，直接return
        if(x === this.X) return
        // 如果撞到墙了
        if(x < 0 || x > 380) {
            throw new Error('撞墙了！GAME OVER')
        }
        // 检查是否发生了左右掉头
        // 当蛇头到了第二节之前的位置，则发生了左右掉头，不能这样左右掉头
        if(this.body[1] && (this.body[1] as HTMLElement).offsetLeft === x) {
            // console.log(666);
            if(x < this.X) {
                // 如果是本来向右移动，然后向左掉头
                // 不让它掉头，继续往右
                x = this.X + 10
            }else {
                // 如果是本来向左移动，然后向右掉头
                // 不让它掉头，继续往左
                x = this.X - 10
            }
        }

        // 身体跟着移动
        this.moveBody()

        // 头移动
        this.head.style.left = x + 'px'

        // 检查是否撞到自己了
        this.isCrash()
        
    }
    set Y(y: number) {
        // 蛇没有向上下移动，直接return
        if(y === this.Y) return
        // 如果撞到墙了
        if(y < 0 || y > 380) {
            throw new Error('撞墙了！GAME OVER')
        }

        // 检查是否发生了上下掉头
        // 当蛇头到了第二节之前的位置，则发生了上下掉头，不能这样上下掉头
        if(this.body[1] && (this.body[1] as HTMLElement).offsetTop === y) {
            if(y < this.Y) {
                // 如果是本来向上移动，然后向下掉头
                // 不让它掉头，继续往上
                y = this.Y + 10
            }else {
                // 如果是本来向下移动，然后向上掉头
                // 不让它掉头，继续往下
                y = this.Y - 10
            }
        }
        
        // 移动身体
        this.moveBody()

        // 头移动
        this.head.style.top = y + 'px '

        // 检查是否撞到自己了
        this.isCrash()
    }
    
    // 吃一个，身体加一节
    addBody() {
        this.element.insertAdjacentHTML('beforeend', '<div></div>')
    }

    // 身体跟着头移动
    moveBody() {
        // 后一节到前一节的位置
        for(let i = this.body.length - 1; i > 0; i--) {
            let X = (this.body[i-1] as HTMLElement).offsetLeft;
            let Y = (this.body[i-1] as HTMLElement).offsetTop;
            // console.log(x, y);
            (this.body[i] as HTMLElement).style.left = X + 'px';
            (this.body[i] as HTMLElement).style.top = Y + 'px';
        }
    }

    // 检查是否撞到自己了
    isCrash() {
        for(let i = 1; i < this.body.length - 1; i++) {
            let bd = this.body[i] as HTMLElement
            if(this.X === bd.offsetLeft && this.Y === bd.offsetTop) {
                throw new Error('撞到自己了！GAME OVER')
            }
        }
    }
        
        
}

export default Snake