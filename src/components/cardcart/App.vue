<template>
    <cartheader></cartheader>
    <div style="height: 100px;"></div>
    <cardcart :cardlist="cardlist"></cardcart>
    <div style="height: 100px;"></div>
    <cartfooter></cartfooter>
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
                count:'1',
                img:'../../../static/PTCG-CHS-Datasets-main/img/79/0.png',
            },
            {
                id:'2',
                name:'希嘉娜',
                value:'80',
                count:'2',
                img:'../../../static/PTCG-CHS-Datasets-main/img/17/18.png',
            },        {
                id:'3',
                name:'碧蓝',
                value:'200',
                count:'1',
                img:'../../../static/PTCG-CHS-Datasets-main/img/17/23.png',
            },        {
                id:'4',
                name:'竹兰',
                value:'100',
                count:'5',
                img:'../../../static/PTCG-CHS-Datasets-main/img/17/21.png',
            },
            ]
        }
    },


};
</script>

<style>

</style>