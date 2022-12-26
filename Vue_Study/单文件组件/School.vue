<template>
    <!-- 文件的命名一般用比如MySchool或my-school -->
    <!--template里是组件的结构，就跟非单元文件组件里Vue.extend里的template内容差不多
    同样也要在最外围加个div-->
    <div>
        <h3>{{msg}}</h3>
        <button @click="show"></button>
    </div>
</template>

<script>
    //组件交互相关的代码（数据、方法等）
    //以前的写法
    // const school = Vue.extend({
    //     data() {
    //         return {
    //             msg: '666'
    //         }
    //     },
    //     methods: {
    //         show() {
    //             alert(666);
    //         }
    //     }
    // })
    export default{//Vue.extend直接简写为{},const school也不用了，然后再默认暴露
        //name尽量与文件名相同
        name: 'School',
        data() {
            return {
                msg: '666'
            }
        },
        methods: {
            show() {
                alert(666);
            }
        }
    }
</script>

<style>
    /*组件的样式*/
</style>
