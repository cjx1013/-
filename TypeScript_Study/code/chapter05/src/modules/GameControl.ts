import Food from './Food'
import ScorePanel from './ScorePanel'
import Snake from './Snake'

class GameControl{
    snake: Snake
    food: Food
    scorePanel: ScorePanel

    // 蛇的运动方向
    direction: string = 'Right'

    // 碰到墙或自己则失败
    isAlive: boolean = true


    constructor() {
        this.snake = new Snake()
        this.food = new Food()
        this.scorePanel = new ScorePanel(1, 10)
        this.init()
    }

    // 游戏初始化
    init() {
        // console.log(666);
        
        // 绑定键盘按下事件
        // 这里的this.keydownHandler中的this是document
        // 因为this.keydownHandler是document.addEventListener的参数
        // document调用的
        // 要把它改成GameControl的当前对象，通过bind方法
        // bind() 方法创建一个新的函数，在 bind() 被调用时，
        // 这个新函数的 this 被指定为 bind() 的第一个参数，而其余参数将作为新函数的参数，供调用时使用。
        // 而bind里的this是当前对象
        document.addEventListener('keydown', this.keydownHandler.bind(this))
        this.run()
    }

    keydownHandler(e: KeyboardEvent) {
        // chrome浏览器中上下左右按键是ArrowRight……
        // ie浏览器中是Right……
        // console.log(e.key);
        
        this.direction = e.key
        // console.log(this.direction);
    }

    run(){
        let x = this.snake.X
        let y = this.snake.Y
        
        switch(this.direction) {
            case 'ArrowRight':
            case 'Right':
                x += 10
                break
            case 'ArrowLeft':
            case 'Left':
                x -= 10
                break
            case 'ArrowUp':
            case 'Up':
                y -= 10
                break
            case 'ArrowDown':
            case 'Down':
                y += 10
                break
        }

        this.checkEat(x, y)

        try{
            this.snake.X = x
            this.snake.Y = y
        }catch(e:any){
            alert(e.message)
            this.isAlive = false
        }
        
        // 这个定时器写在run方法里，调用一次，执行run，run里又调用这个方法
        // 所以会一直执行run方法
        this.isAlive && setTimeout(this.run.bind(this), 300 - (this.scorePanel.level - 1) * 30);
    }

    checkEat(x: number, y: number) {
        if(x === this.food.X && y === this.food.Y) {
            // 说明吃到了食物
            // 加分
            this.scorePanel.addScore()
            // 加一节身体
            this.snake.addBody()
            // 改变食物位置
            this.food.change()
        }
    }
}

export default GameControl