// 扫描器类
export default class Scanner {
    // 用来接受模板字符串，对其进行扫描
    constructor(templateStr) {
        this.templateStr = templateStr
        // 指针
        this.pos = 0
        // 尾巴，就是指针到模板字符串最后的位置
        this.tail = templateStr // 一开始等于整个模板字符串
    }

    // scan的功能弱，就是路过指定内容，没有返回值
    scan(tag) {
        // 如果到了尾巴是以tag开头的位置，则略过它
        if(this.tail.indexOf(tag) == 0) {
            // 指针往后移tag的长度，略过它
            this.pos += tag.length
            // 尾巴也要变化，因为尾巴就是指针到模板字符串最后的位置，指针变了，自然尾巴也变
            this.tail = this.templateStr.substring(this.pos)
        }
    }

    // scanUntil功能就是让指针进行扫描，直到遇见指定内容结束，并且能够返回结束之前路过的文字
    scanUntil(stopTag) {
        // 记录指针开始的位置，以便返回结束之前路过的文字
        const pos_backup = this.pos
        // 当尾巴不是以stopTag开头，就继续循环，也就是遇到了stopTag才停止循环
        while(!this.eos() && this.tail.indexOf(stopTag) != 0) {
            // 指针往后移
            this.pos++
            // 尾巴变化，为pos指针位置到templateStr模板字符串最后的位置
            this.tail = this.templateStr.substring(this.pos)
        }
        // 返回结束之前路过的文字
        return this.templateStr.substring(pos_backup, this.pos)
    }

    // 指针是否已经到头，返回boolean值
    eos() {
        return this.pos >= this.templateStr.length
    }
}