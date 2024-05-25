<script setup>
import Header from './src/Header.vue';
import Footer from './src/Footer.vue';
import BannerShow from './src/BannerShow.vue';
import Search from './src/Search.vue';
import RandomShow from './src/RandomShow.vue';
import FavCard from './src/FavCard.vue';
import { throttle } from 'lodash';
import {getpokeAPI} from '@/apis/ptcg'
import {getptcgAPI} from '@/apis/ptcg';
import { defineProps, ref, onMounted,defineEmits, computed,watch } from 'vue';  
import { type } from 'jquery';

const poke = getpokeAPI()
onMounted(()=>{
  window.addEventListener('click',handleClickOutside)
  // console.log(poke)
})


const checkboxLabels = {'无标记':'10','C':'1','U':'2','R':'3','PR':'4','RR':'5','RRR':'6',//
        'S':'7','SR':'8','SSR':'9','CHR':'11','A':'12','CSR':'13','HR':'98','UR':'99'}
const query = ref('')
const showResult = ref(false)
const searchOption = ref('card')
const checkValue = ref([])
const showNewInput = ref(false)
const suggestions = ref([])
const showSuggestion = ref(false)
const suggestionCache = ref([])
const submit = ref(false)
const banner = ref(true)

const props = defineProps({
  bannerFlag:{
    type:Boolean,
  }
})

const handleBanner=(e)=>{
  banner.value = e
  // console.log('banner:',banner.value)
}

const submitForm=()=>{
  submit.value = true
  console.log('发送查询:',query.value)
  showResult.value = true
  suggestionCache.value.push(query.value)
}
const handleQueryReceived = (res)=>{
  console.log('App接受到查询:',res)
  submit.value = false
}
onMounted(()=>{window.addEventListener('scroll',throttle(handleScroll,200))})
const handleScroll = ()=>{
    const scrollPostion = document.documentElement.scrollTop
    if (scrollPostion>500){
      showNewInput.value = true
    }else{
      showNewInput.value = false
    }
}
const srcollToTop = ()=>{
  window.scrollTo({top:0,behavior:'smooth'})
}
const handleInput=()=>{
  clearTimeout()
  setTimeout(()=>{
    if(query.value!==''){
      suggestions.value = generateSuggestions(query.value)
      showSuggestion.value = true
    }else{
      showSuggestion.value = false
    }
  },300)
}
const generateSuggestions=(query)=>{
  console.log('suggestionCache:',suggestionCache.value)
  const suggestions=[]
  for(let item of poke){
    if(item[2].includes(query)){
      suggestions.push(item[2])
    }
  }
  return suggestions.slice(0,10)
}

const selectSuggestion = (suggestion)=>{
  if(suggestion){
    query.value = suggestion
    showSuggestion.value = false
  }else{
    showSuggestion.value = false
  }
}

const handleSuggest = ()=>{
  if(suggestionCache.value.length){
    suggestions.value = suggestionCache.value
    showSuggestion.value = true
  }else{
    showSuggestion.value = false
  }
}


// const des = beforeDestroy(()=>window.removeEventListener('click', this.handleClickOutside))
const handleClickOutside = (e)=>{
  if(showSuggestion.value){
    const targetElement = e.target
    const suggestionElement = document.getElementsByClassName('search-box')[0]
    if(!suggestionElement.contains(targetElement)){
      showSuggestion.value = false
    }
  }
}
</script>

<template>
  <Header @bannerFlag="handleBanner"/>
  <div class="greeting-box">
      <h1 class="titel">Pokémon TCG Search!</h1>
    <h2 class="subtitle">The Ultimate Pokémon Card Database ch.</h2>
  </div>

  <FavCard/>
  <main>
    <div class="main-box">

      <form v-show="!showNewInput" class="form-box" @submit.prevent="submitForm">

        <div class="search-info">
          <label class="sr-only" for ="search">Type in Pokemon Name</label>
        </div>

        <div class="search-box">
          <div class="input-container">
            <select v-model="searchOption" class="form-control mb-2" id="search-option" style="width: 30%;">
              <option value="collection">按组合包名称搜索</option>
              <option value="card">按卡片名称搜索</option>
            </select>
            <!-- <label class="sr-only" for ="search">Type in Pokemon Name</label> -->
            <input type = "text" v-model="query" class="form-control mb-2" id = "search" placeholder="" @input="handleInput" @click="handleSuggest">
            <button type="submit" class="btn btn-primary mb-2" id="submit-button" style="width: 20%;">Submit</button>
            
          
          </div>
            <ul v-if="showSuggestion" class="suggestion-list" >
              <li v-for="suggestion in suggestions" :key="suggestion" @click="selectSuggestion(suggestion)">
                {{ suggestion }}
              </li>
            </ul>
          </div>

        <div class="rarity-check">
          <li class="cheack-box" style="list-style-type: none;">
            <div v-for="label in Object.keys(checkboxLabels)" :key="label" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :id="label" :value="label" v-model="checkValue"> 
              <label  :for="label">{{ label }}</label>
            </div>
          </li>
        </div>

      </form>

      <form v-if="showResult"  v-show="showNewInput" class="new-form-box" @submit.prevent="submitForm">
        <div class="new-search-box">
            <select v-model="searchOption" class="form-control mb-2" id="search-option" style="width: 30%;">
              <option value="collection">按组合包名称搜索</option>
              <option value="card">按卡片名称搜索</option>
            </select>
            <input type = "text" v-model.lazy="query" class="form-control mb-2" id = "search" placeholder="伊布" @input="handleInput">
            <button type="submit" class="btn btn-primary mb-2" id="submit-button">Submit</button>
        </div>

        <div class="rarity-check">
          <li class="cheack-box" style="list-style-type: none;">
            <div v-for="label in Object.keys(checkboxLabels)" :key="label" class="form-check form-check-inline">
              <input class="form-check-input" type="checkbox" :id="label" :value="label" v-model="checkValue"> 
              <label  :for="label">{{ label }}</label>
            </div>
          </li>
        </div>
      </form>
      
      <Search v-if="showResult" :submit = "submit" :query="query" :searchOption="searchOption" :checkValue="checkValue" @query-received="handleQueryReceived" />

      <RandomShow  v-if="!showResult && !banner"/> 
      <BannerShow v-if="!showResult && banner"/>
      <!-- <Details v-if="selectedCard" :selectedCard="selectedCard" :requireImage="requireImage" @close ='hideCardInfo'/> -->
      
    </div>
    <div  v-if="showResult" class="navi-box">
        <div class="navi-button">
            <router-link to="/">
                <img class="navi-img" src="@/assets/navi.svg">
            </router-link>
        </div>
        <div class="up-button" >
            <button class="up-button-img">
                <img class="up-img" src="@/assets/Pikachu.svg" @click="srcollToTop">
            </button>
        </div>
    
    </div>
   
  </main>
  <Footer/>
</template>



<style  scoped>

.greeting-box{
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  margin-top: 40px;
  margin-bottom: 20px;
  h1{
    font-weight: 600;
  }
  h2{
    font-weight: 200;
  }
}
  .form-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;

  }
  .new-form-box{
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    background-color: rgb(243, 241, 241);
    border-end-start-radius: 10%;
    border-end-end-radius: 10%;
    padding: 10px;
    z-index: 9;

  }

  .search-info{
    width: 50%;
    text-align: left;
  }

  .btn{
    margin-left:5px;
  }

  .search-box{
    width: 50%;
    display: flex;
    flex-direction: column; 
    position: relative;
  }
  .new-search-box{
    width: 50%;
    display: flex;
    /* flex-direction: column;  */
    position: relative;
  }
  .input-container{
    display: flex;
    align-items: center;
    /* width: 70%; */
  }
  
  .suggestion-list{
    position: absolute;
    /* background-color: white; */
    background-color: rgba(255, 255, 255, 0.9); 
    border-radius: 5px;
    top:100%;
    width: 65%;
    left: 20%;
    border: 1px solid #ccc;
    margin-top: -5px;
    border-top: none;
    padding: 0px;
    list-style-type: none;
    z-index: 999;
  }
  ul.suggestion-list li {
    padding: 5px;
}

  .rarity-check{
    /* width: 50%; */
    display: flex;
    flex-direction: row; 
  }

  .navi-box{
    position: fixed;
    right: 0px;
    bottom: 10px;
    height: 140px;
    width: 70px;
    /* border: 2px solid black; */
    display: flex;
    flex-direction: column; /* 根据需要选择flex方向，默认为row */
    justify-content: center; /* 控制垂直方向居中 */
    align-items: center; /* 控制水平方向居中 */
    /* text-align: center; 控制文本居中 */
    background-color: rgb(243, 241, 241);
    margin-right: 5px;


  }

  .navi-img{
    width: 50px;
  }
  .up-img{
    width: 70px;
  }
  .up-button{
    margin: 5px;

  }
  .up-button-img {
    border: none;  /* 移除按钮的边框样式 */
    background-color: transparent;  /* 设置按钮的背景为透明 */
    padding: 0;  /* 移除按钮的内边距 */
  }


</style>
