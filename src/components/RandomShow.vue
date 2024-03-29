<template>
    <div class="card-show">
        <div class="cardshowbox1">
            <img class="showbox-img" :src="randomShow()" alt="rimage">
        </div>
        <div class="cardshowbox2">
            <img class="showbox-img"  :src="randomShow()" alt="rimage">
        </div>
        <div class="cardshowbox3">
            <img class="showbox-img"  :src="randomShow()" alt="rimage">
        </div>
        <div class="cardshowbox4">
            <img class="showbox-img"  :src="randomShow()" alt="rimage">
        </div>
        <div class="cardshowbox5">
            <img class="showbox-img"  :src="randomShow()" alt="rimage">
        </div>
    </div>
</template>

<script>
    export default{
        
        data(){
            return{
                
            }

        },
        methods:{
            randomShow(){
                const random1 = Math.floor(Math.random() * 109)+1;
                const imagePath = `random\\${random1}.png`;
                return new URL('../../static/PTCG-CHS-Datasets-main/'+imagePath,import.meta.url).href;
            }
        },
    }


</script>

<style>
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
    }
</style>