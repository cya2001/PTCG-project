<template>
    <div class="input-group mb-3">
        <span class="input-group-text" id="basic-addon1">添加任务</span>
        <input type="text" class="form-control" placeholder=" " aria-label="Username" aria-describedby="basic-addon1"
        v-model="taskname">
        <button class="btn btn-outline-secondary" type="button" id="button-addon2" @click="onsubmit">Sumbit</button>
    </div>
</template>


<script>
export default{
    data(){
        return{
            taskname:''
        }
    },
    // emits:['addtask'],
    methods:{
        onsubmit(){
            this.$emit("addtask",this.taskname)
            this.taskname = ""
        }
    }

}

</script>

<style scoped>
.input-group{
    width: 500px;
    margin: 50px auto;
}
</style>