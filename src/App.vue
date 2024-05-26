<template>
    <Header @bannerFlag="handleBanner"/>
    <FavCard/>
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
  
        <RandomShow  v-if="!showResult && !banner"/> 
        <BannerShow v-if="!showResult && banner"/>
        
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
     
    <Footer/>
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


<style  scoped>
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
