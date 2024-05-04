<template>
    <div class="footer-container">
        <div class="form-check check-box">
            <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault" 
            :checked="checked" @change="handleSelectAll">
            <label class="form-check-label" for="flexCheckDefault">
                全选
            </label>
        </div>
        <div class="sum-container">
            <span class="price">总金额：{{ this.total_value }}</span> 
            <button type="button" class="btn btn-primary btn btn-lg">提交</button>
        </div>
    </div>
</template>

<script>


  export default {
    name: "App",
    props:{
        cardlist:{
            type:Array,
            requried:true,
            default:[],
        },
        // selectall:{
        //     type:Boolean,
        //     requried:true,
        //     // default:false,
        // }
    },
    data() {
      return {
        checked: true,
        total_value:0,
      };
    },
    created(){
        this.sum_value()
        this.selectall()
    },
    computed:{
        // selectall(){
        //     // console.log(this.cardlist)
        //     if(this.cardlist.every(item => item.selected)){
        //         return true
        //     }else{
        //         return false
        //     }
            
        // }
    },
    methods:{
        sum_value(){
            let list = this.cardlist
            let value = 0
            for(let item of list){
                // console.log(item)
                if (item.selected){
                    value += item.value*item.count
                }
                
            }
            this.total_value = value
        },
        selectall(){
            if(this.cardlist.every(item => item.selected)){
                this.checked = true
            }else{
                this.checked = false
            }
            
        },
        handleSelectAll(){
           this.cardlist.forEach(item=>{
            item.selected = !this.checked
           })
           this.sum_value()
           console.log(this.cardlist)
        }
    },
    watch:{
        cardlist:{
            handler:function(){
                this.sum_value()
                this.selectall()
            },
            deep:true,
        },
    }
  };
</script>

<style lang="less" scoped>
.footer-container{
    position: fixed;
    bottom: 0;
    height: 100px;
    width: 100%;
    background-color: #409EFF;
    display: flex;
    justify-content: space-around;
}
.check-box{
    display: flex;
    justify-content: center;
    align-items: center;
    position: relative;
    flex: 1;
    .form-check-input{
        position: absolute;
        left: 50px;
        width: 30px;
        height: 30px;
        border-radius: 80%;
    }
    .form-check-label{
        position: absolute;
        left: 70px;
        font-size: 35px;
        color: white;
    }
}
.sum-container{
    display: flex;
    justify-content: center;
    align-items: center;
    .price{
        font-size: 35px;
        color: white
    }
    .btn{
        --bs-btn-font-size: 30px;
        margin: 0 20px 0 150px;
    }
}
</style>