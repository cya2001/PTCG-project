<template>
    <div class="card-show">
        <div class="cardshowbox1">
            <img class="showbox-img" :src="requireImage(randomCard[0])" alt="rimage" @click = "showCardInfo(randomCard[0])">
        </div>
        <div class="cardshowbox2">
            <img class="showbox-img" :src="requireImage(randomCard[1])" alt="rimage" @click = "showCardInfo(randomCard[1])">
        </div>
        <div class="cardshowbox3">
            <img class="showbox-img" :src="requireImage(randomCard[2])" alt="rimage" @click = "showCardInfo(randomCard[2])">
        </div>
        <div class="cardshowbox4">
            <img class="showbox-img" :src="requireImage(randomCard[3])" alt="rimage" @click = "showCardInfo(randomCard[3])">
        </div>
        <div class="cardshowbox5">
            <img class="showbox-img" :src="requireImage(randomCard[4])" alt="rimage" @click = "showCardInfo(randomCard[4])">
        </div>
    </div>
    <Details v-show="selectedCard" :selectedCard="selectedCard"  @close ='hideCardInfo'/>
</template>

<script>
import Details from './Details.vue'
import {requireImage} from '@/apis/ptcg'

export default{
    components:{
        Details
    },
    setup(){
        const selectedCard = ref('')
        const randomCard = ref([])
        const randomImagePath = ref('')

        onMounted(()=>{
            randomShow()
        })

        // const requireImage = (imagePath)=>{
        //     return new URL('/../../static/PTCG-CHS-Datasets-main/'+imagePath,import.meta.url).href;
        // }

        const showCardInfo = (image)=>{
            selectedCard.value = image
        }
        const randomShow = ()=>{
            for(let i = 0;i<5;i++){
                let random1 = Math.floor(Math.random() * 109)+1;
                let imagePath = `random\\${random1}.png`;
                randomImagePath.value = requireImage(imagePath)
                randomCard.value.push(imagePath)
            }
        }
        const hideCardInfo = () => {  
            selectedCard.value = ''
        }
        return{
            selectedCard,  
            randomCard,  
            randomImagePath,  
            showCardInfo,  
            hideCardInfo, 
            requireImage, 
        }
    }
    
}


</script>

<style scoped>
    .card-show {
        position: relative;
        width: 100%;
        height: 100%;
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        align-items: center;    
        max-width: 1000px;
        margin: auto;
        margin-top: 80px;

    }

    .cardshowbox1,
    .cardshowbox2,
    .cardshowbox3 {
        width: 40%;
        margin: -50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .cardshowbox4,
    .cardshowbox5 {
        width: 33.3%;
        position: relative;
        top: -50px;
        display: flex;
        justify-content: center;
        align-items: center;
    }

    .showbox-img{
        width: 215px;
        height: 300px;
        margin: 10px;
        box-shadow: 0px 5px 12px rgba(0,0,0,0.5);
        transition: all 0.3s;

    }
    .showbox-img:hover{
        /* transform: scale(1.2); */
        transform: translateY(-8px) scale(1.01,1.01);
        box-shadow: 0px 10px 20px rgba(0,0,0,0.3);
    }
</style>