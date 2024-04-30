<template>
    <todoinput @addtask="addtask"></todoinput>
    <todolist :todolist="filterlist()"></todolist>
    <todobutton @changeActive="changeActive" @click="onfilter()"></todobutton>
</template>
  
<script>
  import todolist from "./src/todolist.vue";
  import todobutton from "./src/todobutton.vue";
  import todoinput from "./src/todoinput.vue";
 
  
  export default {
    name: "App",
    components: {
        todolist,
        todobutton,
        todoinput,
    },
    data() {
      return {
        tableData: [{
            id:1,
            taskname: '学习',
            iscompleted: true,
        }, 
        {
            id:2,
            taskname: '健身',
            iscompleted: true,
        }, 
        {
            id:3,
            taskname: '复习',
            iscompleted: false,
        },
        ],
        active:0
      }
    },
    methods:{
        changeActive(index){
            this.active = index
            // console.log(this.active)
        },
        filterlist(){
            if (this.active===0){
                return this.tableData
            }else if(this.active===1){
                return this.tableData.filter(item=>item.iscompleted)
            }else{
                return this.tableData.filter(item=>!item.iscompleted)
            }
        },
        onfilter(){
            this.filterlist()
        },
        addtask(taskname){
            this.tableData.push({
                id:this.tableData.length+1,
                taskname:taskname,
                iscompleted:false
            })
        }
    },
    computed:{
        filteredTableData(){
            return this.tableData
        }
    }
  };
</script>
  
<style>

</style>