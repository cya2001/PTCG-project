<template>
    <div class="app-container">
      <Header @bannerFlag="handleBanner"/>
      <FavCard/>
      <main class="main-content">
        <Input 
          @submit = "handleSubmit" 
          @query="handleQuery" 
          @searchOption="handleSearchOption" 
          @checkValue="handleCheckValue" 
          @showResult="handleShowResult" />
        
        <Search v-if="showResult" 
          :submit = "submit" 
          :query="query" 
          :searchOption="searchOption"
          :checkValue="checkValue" 
          @query-received="handleQueryReceived" />
        
        <div v-if="!showResult" class="showcase-container">
          <RandomShow v-if="!banner"/> 
          <BannerShow v-if="banner"/>
        </div>
      </main>
      
      <div v-if="showResult" class="navi-box">
        <div class="navi-button">
          <router-link to="/" title="返回首页">
            <img class="navi-img" src="@/assets/navi.svg" alt="返回首页">
          </router-link>
        </div>
        <div class="up-button">
          <button class="up-button-img" @click="srcollToTop" title="回到顶部">
            <img class="up-img" src="@/assets/Pikachu.svg" alt="回到顶部">
          </button>
        </div>
      </div>
     
      <Footer/>
    </div>
  </template>
  

<script setup>
import Header from './components/Header.vue';
import Footer from './components/Footer.vue';
import Input from './components/Input.vue'
import BannerShow from './components/BannerShow.vue';
import Search from './components/Search.vue';
import RandomShow from './components/RandomShow.vue';
import FavCard from './components/FavCard.vue';
import { defineProps, ref, onMounted, defineEmits, computed,watch } from 'vue';  

const query = ref('')
const showResult = ref(false)
const searchOption = ref('card')
const checkValue = ref([])
const submit = ref(false)
const banner = ref(true)

// const props = defineProps({
//   bannerFlag:{
//     type:Boolean,
//   },
//   query:{
//     type:String,
//   },
//   submit:{
//     type:Boolean,
//   },
//   searchOption:{
//     type:String,
//   },
//   checkValue:{
//     type:Array,
//   },
//   showResult:{
//     type:Boolean,
//   },
// })
// console.log(props)

const handleBanner=(e)=>{
  banner.value = e
  // console.log('banner:',banner.value)
}

const handleQueryReceived = (res)=>{
  console.log('App接受到查询:',res)
  submit.value = false
}

const srcollToTop = ()=>{
  window.scrollTo({top:0,behavior:'smooth'})
}

const handleSubmit=(q)=>{
    submit.value = q
}
const handleQuery=(q)=>{
    query.value = q
    console.log(q)
}
const handleSearchOption = (q)=>{
    searchOption.value = q
}
const handleCheckValue = (q)=>{
    checkValue.value = q
}
const handleShowResult = (q)=>{
    showResult.value = q
}
</script>


<style scoped>
  .app-container {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
    background-color: #f5f5f5;
  }

  .main-content {
    flex: 1;
    width: 100%;
    max-width: 1400px;
    margin: 0 auto;
    padding: 0 20px;
  }

  .showcase-container {
    width: 100%;
    margin: 40px 0;
  }

  .navi-box {
    position: fixed;
    right: 0px;
    bottom: 10px;
    height: 140px;
    width: 70px;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    background-color: rgba(243, 241, 241, 0.95);
    margin-right: 5px;
    border-radius: 10px 0 0 10px;
    box-shadow: -2px 0 8px rgba(0, 0, 0, 0.1);
    z-index: 100;
    transition: all 0.3s ease;
  }

  .navi-box:hover {
    background-color: rgba(243, 241, 241, 1);
    box-shadow: -2px 0 12px rgba(0, 0, 0, 0.15);
  }

  .navi-button {
    margin-bottom: 10px;
    transition: transform 0.2s ease;
  }

  .navi-button:hover {
    transform: scale(1.1);
  }

  .navi-img {
    width: 50px;
    height: 50px;
    cursor: pointer;
    transition: opacity 0.2s ease;
  }

  .navi-img:hover {
    opacity: 0.8;
  }

  .up-img {
    width: 70px;
    height: 70px;
    cursor: pointer;
    transition: transform 0.2s ease;
  }

  .up-img:hover {
    transform: translateY(-3px);
  }

  .up-button {
    margin: 5px;
  }

  .up-button-img {
    border: none;
    background-color: transparent;
    padding: 0;
    cursor: pointer;
  }

  @media (max-width: 768px) {
    .main-content {
      padding: 0 10px;
    }

    .navi-box {
      width: 60px;
      height: 120px;
    }

    .navi-img {
      width: 40px;
      height: 40px;
    }

    .up-img {
      width: 60px;
      height: 60px;
    }
  }
</style>
