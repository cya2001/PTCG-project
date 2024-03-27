<script setup>
    import router from '@/router/router';
    import Header from './Header.vue';
    import Search from './Search.vue';
    import RandomShow from './RandomShow.vue';
    import { throttle } from 'lodash';
</script>

<script>
  
  export default{
    data(){
      return{
        checkboxLabels : {'无标记':'10','C':'1','U':'2','R':'3','PR':'4','RR':'5','RRR':'6',//
        'S':'7','SR':'8','SSR':'9','CHR':'11','A':'12','CSR':'13','HR':'98','UR':'99'},
        query:'伊布',
        showResult: false,
        searchOption:'card',
        checkValue:[],
        showNewInput:false,
      };
    },
    mounted(){
      window.addEventListener('scroll',throttle(this.handleScroll, 200))
    },
    
    methods:{
      submitForm(){
        this.sendQuery(this.query);
      },
      sendQuery(query){
        console.log('发送查询:',query)
        this.showResult = true
      },
      handleQueryReceived(result){
        console.log('App接收到查询:',result);
      },
      handleScroll(){
        const scrollPostion = document.documentElement.scrollTop
        // console.log(scrollPostion)
        if (scrollPostion>300){
          this.showNewInput = true
        }else{
          this.showNewInput = false
        }
      },
      srcollToTop(){
        window.scrollTo({top:0,behavior:'smooth'})
      }
    },
    components:{
      Search
    },
  };
</script>

<template>
  <Header />

  <main>
    <div class="main-box">

      <form v-show="!showNewInput" class="form-box" @submit.prevent="submitForm">

        <div class="search-info">
          <label class="sr-only" for ="search">Type in Pokemon Name</label>
        </div>

        <div class="search-box">
            <select v-model="searchOption" class="form-control mb-2" id="search-option" style="width: 30%;">
              <option value="collection">按组合包名称搜索</option>
              <option value="card">按卡片名称搜索</option>
            </select>
            <!-- <label class="sr-only" for ="search">Type in Pokemon Name</label> -->
            <input type = "text" v-model.lazy="query" class="form-control mb-2" id = "search" placeholder="伊布">
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

      <form v-if="showResult"  v-show="showNewInput" class="new-form-box" @submit.prevent="submitForm">
        <div class="search-box">
            <select v-model="searchOption" class="form-control mb-2" id="search-option" style="width: 30%;">
              <option value="collection">按组合包名称搜索</option>
              <option value="card">按卡片名称搜索</option>
            </select>
            <input type = "text" v-model.lazy="query" class="form-control mb-2" id = "search" placeholder="伊布">
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
      <RandomShow  v-if="!showResult"/> 
      <Search v-if="showResult" :query="query" :searchOption="searchOption" :checkValue="checkValue" @query-received="handleQueryReceived" />
    </div>
    <div  v-if="showResult" class="navi-box">
        <div class="navi-button">
            <router-link to="/">
                <img class="navi-img" src="../assets/navi.svg">
            </router-link>
        </div>
        <div class="up-button" >
            <button class="up-button-img">
                <img class="up-img" src="../assets/Pikachu.svg" @click="srcollToTop">
            </button>
        </div>
    
    </div>
   
  </main>
</template>

<style >
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
  z-index: 9999;

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
  flex-direction: row; 
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
.navi-button{
    /* background-color:rgb(66, 109, 252); */
    /* border: px solid black; */
}
.navi-img{
    width: 50px;
}
.up-img{
    width: 70px;
}
.up-button{
    margin: 5px;
    /* background-color:rgb(230, 216, 26); */
    /* border: 2px solid rgb(230, 216, 26); */

}
.up-button-img {
  border: none;  /* 移除按钮的边框样式 */
  background-color: transparent;  /* 设置按钮的背景为透明 */
  padding: 0;  /* 移除按钮的内边距 */
}


</style>
