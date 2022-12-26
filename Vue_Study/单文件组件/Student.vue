<template>
    <div>
        <h3 class="hh">{{name}}</h3>
    </div>
</template>

<script>
    export default {
        name: 'Student',
        data() {
            return {
                name: 'cjx'       
            }
        }
    }
</script>

<style>
    .hh{
        color: orange;
    }
</style>