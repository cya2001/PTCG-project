<template>
    <div class="time-container">
        <div class="time-info">
            距离<span>{{ this.endtime }}</span>还有
        </div>
        <div class="time-rest">
            <span class="time-number">{{ this.day }}</span><span class="time-type">天</span>
            <span class="time-number">{{ this.hour }}</span><span class="time-type">时</span>
            <span class="time-number">{{ this.minute }}</span><span class="time-type">分</span>
            <span class="time-number">{{ this.second }}</span><span class="time-type">秒</span>
        </div>

    </div>    
    <todoinput @addtask="addtask"></todoinput>
    <todolist :todolist="filterlist()"></todolist>
    <todobutton @changeActive="changeActive" @click="onfilter()"></todobutton>
</template>
  
<script>
  import todolist from "./src/todolist.vue";
  import todobutton from "./src/todobutton.vue";
  import todoinput from "./src/todoinput.vue";
  import { dayjs } from "element-plus";

 
  
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
        active:0,
        starttime:'2024-5-8 00:00',
        endtime:'2024-6-1 00:00',
        now:Number(dayjs()),
      }
    },
    mounted(){
        this.starttimer(()=>{
            this.now = Number(dayjs())
        },Number(this.formattime('second')))
    },
    beforeUnmount(){
        this.cleartimer()
    },
    methods:{
        starttimer(callback,second=0){
            this.cleartimer()
            this.timer = setInterval(() => {
                second --
                callback()
                if(second<=0) this.cleartimer()
            }, 1000);
            
        },
        cleartimer(){
            if(this.timer){
                clearInterval()
                this.timer = null
            }
        },
        fillZero(num){
            num = String(num)
            if (num.length<=1){
                return '0'+num
            }
            return num
        },
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
        diffstarttime(){
            const {now,starttime} = this
            const nowtime = Number(dayjs(now))
            const start = Number(dayjs(starttime))
            return nowtime<start?start:nowtime
           
        },

        formattime(type){
            const {diffstarttime,endtime} = this
            // console.log(type)
            // console.log(dayjs(endtime).diff(diffstarttime,type))
            return type=>{
            const {diffstarttime,endtime} = this
            return dayjs(endtime).diff(diffstarttime,type) }
        },
        
        day(){
            return this.fillZero(this.formattime('day'))
        },
        hour(){
            return this.fillZero(this.formattime('hour')%24)
        },

        minute(){
            return this.fillZero(this.formattime('minute')%60)
        },

        second(){
            return this.fillZero(this.formattime('second')%60)
        },


        filteredTableData(){
            return this.tableData
        }
    }
  };
</script>
  
<style lang="less" scoped>
.time-container{
    width: 100%;
    margin: 50px 0 0 0 ;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    .time-rest {
        font-size: 50px;
        .time-number{
            color: rgb(55, 48, 153); 
            
        }
        .time-type {
            padding: 5px;
            color: white;
            border: rgb(211, 206, 206) solid 1px;
            background-color: rgb(211, 206, 206);
            border-radius: 20%;
        }
    }

    .time-info span{
        font-size:20px;

    }
}


</style>