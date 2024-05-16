<template>
    <ul class="list-group todolist">
        <!-- header  -->
        <li class="list-group-item d-flex justify-content-between align-items-center">
            Task 
            <span class="badge bg-primary rounded-pill">completed?</span>
        </li>
        <!-- cheackbox -->
        <li class="list-group-item d-flex justify-content-between align-items-center"
            v-for="item in todolist" :key="item.id"
        >
            <div class="form-check">
                <input class="form-check-input" type="checkbox" value="" :id="item.id" v-model="item.iscompleted">
                <label class="form-check-label" :for="item.id" :class="item.iscompleted?'delete':''">
                  {{item.taskname}}  
                </label>
            </div>
            <span class="badge bg-primary rounded-pill" v-if="item.iscompleted">已完成</span>
            <span class="badge bg-warning rounded-pill" v-else>未完成</span>
        </li>

    </ul>
</template>
  
<script>
export default {

    props:{
        todolist:{
            type:Array,
            requried:true,
            default:[]
        }
    },
        
    data() {
      return {

      }
    },
    methods: {

    },
}
</script>
  
<style scoped>
.todolist{
    width: 500px;
    margin: 0 auto;
}
.delete{
    text-decoration: line-through;
}
</style>