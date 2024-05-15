<template>
  <div class = "card-container">
    <div  v-for="image in paginatedImages" key="image">
      <button class="card-button">
        <img class = "pkmn-card" :src="requireImage(image)" alt="Image" @click="showCardInfo(image)"/>
      </button>
    </div>
  </div> 
  <div class="pagination">
    <button class = "page-button" :disabled = "currentPage == 1" @click="currentPage -= 1">上一页</button>
      <div v-for="page in totalPages" :key="page" 
      :class="{ 'page-item': true, active: currentPage === page }" @click="currentPage = page">
      {{ page }}
      </div>
    <button class = "page-button" :disabled = "currentPage === totalPages" @click="currentPage += 1">下一页</button>
  </div>

  <Details v-if="selectedCard" :selectedCard="selectedCard" @close ='hideCardInfo'/>
</template>
  
<script>
  import Details from './Details.vue'
  import ptcg from "../../static/PTCG-CHS-Datasets-main/ptcg_chs_infos.json"
  
  export default{

    props:['submit','query','searchOption','checkValue'],

    emits:['query-received'],

    mounted(){
      this.handleQuery()
    },
    
    data(){
      return {
        images:[],
        selectedCard:"",
        currentPage:1,
        pageSize:20,
      }
    },

    computed:{
      paginatedImages() {
        const startIndex = (this.currentPage - 1) * this.pageSize;
        const endIndex = startIndex + this.pageSize;
        return this.images.slice(startIndex, endIndex);
      },
      totalPages() {
        return Math.ceil(this.images.length / this.pageSize);
      },
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
        this.selectedCard = ""
      },
    },

    watch:{
      submit:{
        handler:'handleQuery'
      },
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
    transition: all 0.3s;
    box-shadow: 0px 5px 12px rgba(0,0,0,0.5);
  }
  .pkmn-card:hover {
    transform: translateY(-8px) scale(1.01,1.01);
    box-shadow: 0px 10px 20px rgba(0,0,0,0.3);
  }
  .card-container{
    display:flex;
    justify-content: center;
    align-items: center;
    text-align: center; 
    flex-wrap: wrap;
    gap: 10px;
  }

  .card-button{
    border: none;
    background-color: transparent;
    padding:0;
  }
  .pagination{
    display: flex;
    justify-content: center;
    align-items: center;
    margin-bottom: 10px;
    flex-wrap: wrap;
  }
  .page-button{
    display: inline-block;
    outline: none;
    border: none;
    background-color:white;
  }
  .page-item {
    display: inline-block;
    width: 30px;
    height: 30px;
    background-color: #e9e6e6;
    text-align: center;
    margin-right: 5px;
    margin-left: 5px;
    border-radius: 4px;
  }
  .page-item:hover{
    cursor: pointer;
  }
  .active {
    background-color: rgb(247, 232, 32);
    color: #fff;
  }
</style>