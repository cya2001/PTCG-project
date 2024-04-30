<template>
    <div class="btn-group btn" role="group" aria-label="Basic example">
        <button type="button" class="btn" :class="active===0?'btn-primary':''" @click="changeActive(0)">全部</button>
        <button type="button" class="btn" :class="active===1?'btn-primary':''" @click="changeActive(1)">已完成</button>
        <button type="button" class="btn" :class="active===2?'btn-primary':''" @click="changeActive(2)">未完成</button>
    </div>

</template>


<script>
export default{
    name:'todoButton',
    data(){
        return{
            active:0
        }
    },
    // emits:[changeActive],
    methods:{
        changeActive(index){
            this.active = index
            this.$emit("changeActive",index)
        }
    }

}

</script>

<style scoped>
.btn-group{
    width: 500px;
    display: flex;
    margin: 10px auto;
}
</style>