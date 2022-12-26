class ScorePanel{
    // 分数
    score = 0
    // 等级
    level = 1

    // 分数DOM
    scoreElement: HTMLElement
    // 等级DOM
    levelElement: HTMLElement

    // 多少分加一级
    upScore: number
    //等级上限
    maxLevel: number

    constructor(upScore: number = 10, maxLevel: number = 10) {
        this.upScore = upScore
        this.maxLevel = maxLevel
        this.scoreElement = document.getElementById('score')!
        this.levelElement = document.getElementById('level')!
    }

    // 加分的方法
    addScore() {
        this.scoreElement.innerHTML = 'score: ' + (++this.score) + ''
         // 每加upScore个分数就升一级
        if(this.score % this.upScore == 0){
            this.addLevel()
        }
    }

    // 加等级的方法
    addLevel() {
        // 如果小于最大等级
        if(this.level < this.maxLevel){
            this.levelElement.innerHTML = 'level: ' + (++this.level) + ''
        }
    }

}

export default ScorePanel