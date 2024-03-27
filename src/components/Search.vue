<!-- <script setup>
  import Details from './Details.vue'
</script> -->

<template>
  <div class = "card-container">
    <div  v-for="image in images" key="image">
      <!-- <p>"{{image}}"</p> -->
      <button class="card-button">
        <img class = "pkmn-card" :src="requireImage(image)" alt="Image" @click="showCardInfo(image)"/>
      </button>
    </div>
  </div> 
  <Details v-if="selectedCard" :selectedCard="selectedCard" :requireImage="requireImage" @close ='hideCardInfo'/>
</template>
  
<script>
  import Details from './Details.vue'
  import ptcg from "../../static/PTCG-CHS-Datasets-main/ptcg_chs_infos.json"
  
  export default{

    props:['query','searchOption','checkValue'],

    emits:['query-received'],

    mounted(){
      this.handleQuery()
    },
    
    data(){
      return {
        images:[],
        selectedCard:null,
      }
    },

    methods:{
      requireImage(imagePath){
        return new URL('../../static/PTCG-CHS-Datasets-main/'+imagePath,import.meta.url).href;
      },
      handleQuery(){
        this.images = []
        if (this.searchOption === 'collection'){
          this.images = searchCollection(this.query)
        } else if (this.searchOption === 'card'){
          this.images = searchCard(this.query,this.checkValue)
        }
        
        console.log('接收到查询:',this.query,this.checkValue);
        this.$emit('query-received',this.query+this.checkValue)
      },
      showCardInfo(image){
        this.selectedCard = image
      },
      hideCardInfo(){
        this.selectedCard = null
      },
    },

    watch:{
      query:{
        handler:'handleQuery',
      },
      checkValue:{
        handler:'handleQuery'
      }
    },
    components:{
      Details
    },

  }

  console.log(ptcg);
  
  const collections = ptcg.collections
  const checkboxLabels = {'无标记':'10','C':'1','U':'2','R':'3','PR':'4','RR':'5','RRR':'6',//
        'S':'7','SR':'8','SSR':'9','CHR':'11','A':'12','CSR':'13','HR':'98','UR':'99'}
  function searchCollection(query){
    const matches = collections.filter(item => item.name.includes(query));
    const images = matches.flatMap(item=> item.cards.map(card=>card.image));
    return images
  }
  
  function searchCard(query,checkValue) {
      const images = []
      const existId = new Set()
      for (const collection of collections){
        const matches = collection.cards.filter(card=>{
          const mappedRarity = checkValue.map(item=>parseInt(checkboxLabels[item]));
          if (mappedRarity.length != 0){
            const cardRarity = parseInt(card.details.rarity);
            return card.name.includes(query) && mappedRarity.includes(cardRarity)
          }
          else{
            return card.name.includes(query)
          }
        });
        matches.forEach(card => {
          // console.log(card)
          if(!existId.has(card.id)){
            images.push(card.image)
          }
          existId.add(card.id)
        });
      }
      return images
    }

</script>

<style>
.pkmn-card {
  width: 215px;
  height: 300px;
  margin: 15px;
  transition: transform 0.3s ease;

}
.pkmn-card:hover {
  transform: scale(1.2);
}
.card-container{
  display:flex;
  justify-content: center;
  align-items: center;
  text-align: center; 
  flex-wrap: wrap;
  gap: 10px;
}

* {
  box-sizing: border-box;
}
.card-button{
  border: none;
  background-color: transparent;
  padding:0;
}
</style>