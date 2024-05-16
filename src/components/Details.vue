<template>
    <div class="cardinfo-hideback">
        <div class="cardinfo-overlay" @click="handleCardInfoClick">
            <div class="cardinfo-content">
                <div class="pkmn-card-large">
                    <img :src="requireImage(selectedCard)">
                </div>
                <div class="cardinfo-other">
                    <select class = "collection-select" @change="handleCollection" >
                        <option value="">选择</option>
                        <option v-for="(collection,index) in collections" :key="collection.name" :value="collection.name" :selected="index===0">
                            {{ collection.name }}</option>
                    </select>
                    <div  v-for="collection in collections" :key="collection.name" class= "cardinfo-collectionbox"  v-show="collection.name === selectedCollection">
                        <!-- <p>{{ collection.name }}</p> -->
                        <img class="collection-cover" :src="requireCollectionImage(collection.name)">
                        
                    </div>
                    <!-- <p>Other info</p> -->
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import ptcg from "../../static/PTCG-CHS-Datasets-main/ptcg_chs_infos.json"
    export default{

        props:{
            selectedCard:{
                type:String,
                required:true
            },
        },

        data(){
            return{
                collections:[],
                selectedCollection:'',
            }
        },
        mounted(){
            this.findCollections()
            this.updateSelectedCollection();
        },
        
        methods:{
            requireImage(imagePath){
                return new URL('../../static/PTCG-CHS-Datasets-main/'+imagePath,import.meta.url).href;
            },
            handleCardInfoClick(event){
                const targetElement = event.target
                const cardInfoElement = document.querySelector('.cardinfo-content');
                if (!cardInfoElement.contains(targetElement)) {
                    // 点击事件在特定区域内，执行相关操作
                    this.hideCardInfo();
                }
            },
            hideCardInfo(){
                this.$emit('close')
            },
            findCollections(){
                const selectedCardID = this.getIdByImagePath(this.selectedCard)
                for (const collection of ptcg.collections){
                    for (const card of collection.cards){
                        if (card.id === selectedCardID){
                            this.collections.push(collection)
                        }
                    }
                }
            },
            getIdByImagePath(imagePath){
                let selectedCardID = null
                for (const collection of ptcg.collections){
                    for (const card of collection.cards){
                        if (card.image === imagePath){
                            selectedCardID = card.id
                            break
                        }
                    }
                }
                return selectedCardID
            },
            requireCollectionImage(collectionName){
                let collectionPath = null
                // console.log(collectionName)
                for (const collection of ptcg.collections){
                    if(collectionName===collection.name){
                        // console.log(collection.name)
                        collectionPath = collection.image
                        break
                    }
                }
                return new URL('../../static/PTCG-CHS-Datasets-main/'+collectionPath,import.meta.url).href;

            },
            handleCollection(event){
                this.selectedCollection = event.target.value
            },
            updateSelectedCollection(){
                this.selectedCollection = this.collections.length > 0 ? this.collections[0].name : ''
            }
        },
        // watch: {
        //     collections() {
        //         this.updateSelectedCollection();
        //     },
        // }
    }
</script>

<style scoped>
.cardinfo-hideback{
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    z-index: 9999;

}
.cardinfo-overlay{
    /* top:100px; */
    /* left: 0; */
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 9999;
    display: flex;
    justify-content: center;
    align-items: center;
}
.cardinfo-content{
    width: 70%;
    height: 500px;
    background-color: #fff;
    padding: 20px;
    border-radius: 4%;
    display: flex;
}
.cardinfo-other{
    margin: 15px;
    width: 100%;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;

}
.cardinfo-collectionbox{
    flex: 1 0 200px;
    margin-bottom: 20px;
    display: flex;
    flex-direction: column; /* 根据需要选择flex方向，默认为row */
    justify-content: center;
    align-items: center;
    text-align: center;
}

.pkmn-card-large {
    width: 300px;
    height: 100%;
    margin: 15px;
}

.collection-cover {
    /* width: 60px; */
    height: auto;
    width: 60%;
    margin: 15px;
}
.collection-select{
    display: flex;
    justify-content: center;
    align-items: center;
    text-align: center;
    height: 50px;
    width: 100%;
}

</style>