class Promise {
    constructor(executor) {
        // 添加属性
        this.PromiseState = 'pending'
        this.PromiseResult = null
        // 保存回调函数
        this.callbacks = []

        // 保存实例对象的this值，不然在下面的resolve和reject函数
        // 中的this就变成window了，就无法修改上面两个属性值了
        const self = this //取名self _this that都可以

        // resolve函数
        function resolve(data) {
            // 控制状态只能修改一次，只能由pending=>fullfilled(resolved)或rejected
            if (self.PromiseState !== 'pending') return
            // 1、修改对象的状态(PromiseState)
            self.PromiseState = 'fullfilled'
            // 2、修改对象的结果值(PromiseResult)
            self.PromiseResult = data

            setTimeout(() => {
                // 状态变为成功后，调用对应then的回调函数
                self.callbacks.forEach(item => {
                    item.onResolved(data)
                })
            });
        }

        // reject函数
        function reject(data) {
            // 控制状态只能修改一次，只能由pending=>fullfilled(resolved)或rejected
            if (self.PromiseState !== 'pending') return
            // 1、修改对象的状态(PromiseState)
            self.PromiseState = 'rejected'
            // 2、修改对象的结果值(PromiseResult)
            self.PromiseResult = data

            setTimeout(() => {
                // 状态变为失败后，调用对应then的回调函数
                self.callbacks.forEach(item => {
                    item.onRejected(data)
                })
            });
        }

        // 同步调用executor
        try {
            executor(resolve, reject)
        } catch (e) {
            reject(e)
        }
    }
    // 添加then方法
    then(onResolved, onRejected) {
        // 如果then的回调中没有写成功的回调或失败的回调
        if (typeof onRejected !== 'function') {
            onRejected = reason => {
                throw reason//让它至少是个抛出错误的函数，这样会由最后的catch捕获，也就是异常穿透
            }
        }
        if (typeof onResolved !== 'function') {
            onRejected = value => value
            //让它至少是个正常的成功回调
        }
        const self = this
        // then方法返回一个promise对象
        return new Promise((resolve, reject) => {
            function callback(type) {
                try {
                    // 根据then的回调的返回结果决定返回对象状态
                    // 获取回调函数的返回结果
                    let result = type(self.PromiseResult)
                    // 如果结果是Promise的实例
                    // 调用它的then函数，若状态为成功，则调用then中对应成功的回调
                    // 否则调用失败的回调，通过return new Promise((resolve, reject)的
                    // resolve和reject，修改返回对象的状态
                    if (result instanceof Promise) {
                        result.then(v => {
                            resolve(v)
                        }, r => {
                            reject(r)
                        })
                    } else {
                        // 如果不是，返回的promise对象状态为真
                        resolve(result)
                    }
                } catch (e) {
                    reject(e)
                }
            }
            if (this.PromiseState === 'fullfilled') {
                setTimeout(() => {
                    callback(onResolved)
                });
            }
            if (this.PromiseState === 'rejected') {
                setTimeout(() => {
                    callback(onRejected)
                });
            }
            // 当Promise构造函数中有异步任务时，假如定时器，1s后改变状态，
            // 而执行到then时，状态还没改变，还没到1s，then就无法执行
            // 所以这里再加个判断，如果状态没有改变,则先保存所有回调函数，再等
            // 定时器执行完，状态改变后，再执行对应的回调函数
            if (this.PromiseState === 'pending') {
                // 保存到实例对象身上
                this.callbacks.push({
                    // 这里的这两个函数在状态改变后会执行的
                    onResolved: function () {
                        callback(onResolved)
                    },
                    onRejected: function () {
                        callback(onRejected)
                    }
                })
            }
        })
    }

    // 添加catch方法
    catch(onRejected) {
        // console.log(this);
        return this.then(undefined, onRejected)
    }

    // 添加resolve方法
    static resolve(value) {
        return new Promise((resolve, reject) => {
            if (value instanceof Promise) {
                value.then(v => {
                    resolve(v)
                }, r => {
                    reject(r)
                })
            } else {
                resolve(value)
            }

        })
    }

    // 添加reject方法
    static reject(reason) {
        return new Promise((resolve, reject) => {
            reject(reason)
        })
    }

    // 添加all方法
    static all(promises) {
        return new Promise((resolve, reject) => {
            let count = 0
            let arr = []
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 状态为成功的回调
                    count++
                    arr[i] = v
                    if (count === promises.length) resolve(arr)
                }, r => {
                    // 一旦执行这里，代表有一个状态为失败，就可以reject了
                    reject(r)
                })
            }
        })
    }

    // 添加race方法
    static race(promises) {
        return new Promise((resolve, reject) => {
            for (let i = 0; i < promises.length; i++) {
                promises[i].then(v => {
                    // 一旦首次到了这里，意味着第一个promise对象已经状态改变为成功
                    // 直接resolve
                    resolve(v)
                }, r => {
                    // 一旦首次到了这里，意味着第一个promise对象已经状态改变为失败
                    // 直接reject
                    reject(r)
                })
            }
        })
    }
}











