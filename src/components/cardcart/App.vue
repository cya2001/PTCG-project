<template>
    <cartheader></cartheader>
    <div style="height: 100px;"></div>
    <cardcart :cardlist="cardlist" ></cardcart>
    <div style="height: 100px;"></div>
    <cartfooter :cardlist="cardlist" :selectall="selectall"></cartfooter>
</template>
  
<script>
import cartheader from './src/cartheader.vue'
import cardcart from './src/cardcart.vue'
import cartfooter from './src/cartfooter.vue'

export default {
    name: "App",
    components:{
        cartheader,
        cardcart,
        cartfooter,
    },
    data(){
        return{
            cardlist:[
            {
                id:'1',
                name:'喷火龙',
                value:'400',
                count:1,
                img:'../../../static/PTCG-CHS-Datasets-main/img/79/0.png',
                selected:true,
            },
            {
                id:'2',
                name:'希嘉娜',
                value:'80',
                count:5,
                img:'../../../static/PTCG-CHS-Datasets-main/img/17/18.png',
                selected:false,
            },        
            {
                id:'3',
                name:'碧蓝',
                value:'200',
                count:1,
                img:'../../../static/PTCG-CHS-Datasets-main/img/17/23.png',
                selected:true,
            },        
            {
                id:'4',
                name:'竹兰',
                value:'100',
                count:3,
                img:'../../../static/PTCG-CHS-Datasets-main/img/17/21.png',
                selected:true,
            },
            ],
            // selectall:true,
        }
    },
    computed:{
        selectall(){
            let count = this.cardlist.filter(item=>!item.selected)
            // console.log(count)
            if(count.length==0){
                return true
            }else{
                return false
            }
        }
    },
    methods:{
        stagechange(){

        }
    },
    watch:{
        cardlist:{
            handler:function(){
                // console.log(this.cardlist)
            },
            deep:true,
        }
    }


};
</script>

<style scoped>

</style>