<template>
  <div class = "card-container">
    <div  v-for="card in paginatedCards" key="card">
      <button class="card-button">
        <!-- <img class = "pkmn-card" v-img-lazy="requireImage(card)"  alt="Image" @click="showCardInfo(card)" /> -->
        <img class = "pkmn-card" :src="requireImage(card.image)"  alt="Image" @click="showCardInfo(card)" />

      </button>
    </div>
  </div> 
  <div class="pagination">
    <button class = "page-button" :disabled = "currentPage == 1" @click="currentPage -= 1">上一页</button>
      <div 
      v-for="(page,index) in pages" 
      :key="index" 
      :class="{ 'page-item': true, active: currentPage === page }" 
      @click="changePage(page)">
      {{ page }}
      </div>
    <button class = "page-button" :disabled = "currentPage === totalPages" @click="currentPage += 1">下一页</button>
  </div>

  <Details v-if="selectedCard" :selectedCard="selectedCard" @close ='hideCardInfo'/>
</template>
  
<script setup>
import Details from './Details.vue'
import { defineProps, ref, onMounted,defineEmits, computed,watch } from 'vue';  
import {requireImage} from '@/apis/ptcg'
import {getptcgAPI} from '@/apis/ptcg'
import {getpokeAPI} from '@/apis/ptcg'
import { setSearchHistory,getSearchHistory } from '@/apis/localstore';

const ptcg = getptcgAPI()

const props = defineProps({
  submit:{
    type:Boolean,
    required:true,
  },
  query:{
    type:String,
    required:true,
  },
  searchOption:{
    type:String,
    required:true,
  },
  checkValue:{
    type:Array,
    required:true,
  }

})
const emit = defineEmits(['query-received'])
const images = ref([])
const cards = ref([])
const selectedCard = ref()
const currentPage=ref(1)
const pageSize = ref(20)
const checkboxLabels = {'无标记':'10','C':'1','U':'2','R':'3','PR':'4','RR':'5','RRR':'6',//
'S':'7','SR':'8','SSR':'9','CHR':'11','A':'12','CSR':'13','HR':'98','UR':'99'}
const foundCards = ref(false)


onMounted(()=>{
  handleQuery()
  console.log(ptcg)
})

const paginatedCards = computed(()=>{
  const startIndex = (currentPage.value - 1) * pageSize.value
  const endIndex = startIndex + pageSize.value
  return cards.value.slice(startIndex,endIndex)
})
const pages = computed(()=>{
  let cur = currentPage.value
  let n = totalPages.value
  if(totalPages.value<10) return Array.from({length: n}, (_, i) => i + 1); 
  if(cur<=5){
    return [1,2,3,4,5,6,'...',totalPages.value]
  }else if(n-cur<5){
    return[1,'...',n-5,n-4,n-3,n-2,n-1,n]
  }else{
    return [1,'...',cur-2,cur-1,cur,cur+1,cur+2,'...',totalPages.value]
  }
})
const changePage=(page)=>{
  if(page==='...'){
    return
  }else{
    currentPage.value = page
  }
  
}
const totalPages = computed(()=>{
  return Math.ceil(cards.value.length/pageSize.value)
})

const handleQuery = ()=>{
  // images.value = searchQuery(props.searchOption,props.query,props.checkValue)
  cards.value = searchQuery(props.searchOption,props.query,props.checkValue)
  if(cards.value.length){
    foundCards.value = true
    setSearchHistory(props.query)
  }else foundCards.value = false
  console.log('接受到查询',props.query,props.checkValue)
  emit('query-received',props.query+props.checkValue)
}

watch(()=>props.submit,(newVal,oldVal)=>{
  if(newVal) handleQuery()
})

const searchQuery = (searchOption,query,checkValue)=>{
  if(searchOption ==='collection'){
    const matches = ptcg.collections.filter(item=>item.name.includes(query))
    const res = matches.flatMap(item=>item.cards.map(card=>card.image))
    return res
  }else{
    const res = []
    const existId = new Set()
    for(const collection of ptcg.collections){
      const matches = collection.cards.filter(card=>{
        const mappedRarity = checkValue.map(item=>parseInt(checkboxLabels[item]))
        if(mappedRarity.length!=0){
          const cardRarity = parseInt(card.details.rarity)
          return card.name.includes(query) && mappedRarity.includes(cardRarity)
        }
        else{
          return card.name.includes(query)
        }
      })
      matches.forEach(card=>{
        if(!existId.has(card.id)){
          res.push(card)
        }
        existId.add(card.id)
      })
    }
    return res
  }
}
const showCardInfo = (card=>{
  selectedCard.value = card
})
const hideCardInfo  =()=>{
  selectedCard.value = ''
}
</script>

<style scoped>
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