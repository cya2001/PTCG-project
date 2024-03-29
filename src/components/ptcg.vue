<script setup>
    import router from '@/router/router';
    import Header from './Header.vue';
    import Search from './Search.vue';
    import RandomShow from './RandomShow.vue';
    import { throttle } from 'lodash';
</script>

<script>
  import poke from "../../static/PTCG-CHS-Datasets-main/pokemon.json"

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
        suggestions:[],
        showSuggestion:false,
        suggestionCache:[],
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
      },
      handleInput(){

        clearTimeout()
        //模拟异步获取联想列表
        setTimeout(() => {
          if(this.query!==""){
            this.suggestions = this.generateSuggestions(this.query)
            this.showSuggestion = true
          }
          else{
            this.showSuggestion = false
          }

        }, 300);
      },
      generateSuggestions(query){
        if(this.suggestionCache[query]){
          // console.log("result from cache")
          // console.log(this.suggestionCache)
          return this.suggestionCache[query]
        }
        const data = poke
        const suggestions = []
        for(const item of data){
          const name = item[2]
          if (name.includes(query)){
            suggestions.push(name)
            this.suggestionCache[query] = suggestions
          }
        }
        // console.log("result from generate")
        return suggestions.slice(0,10)
      },
      selectSuggestion(suggestion){
        if (suggestion){
          this.query = suggestion
          this.showSuggestion = false
        }else{
          this.showSuggestion = false
        }
 
      },
      handleInputClose(event){
        const targetElement = event.target
        const suggestionElement = document.querySelector('suggestion-list')
        if(!suggestionElement.contains(targetElement)){
          this.showSuggestion = false
        }
      },
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
          <div class="input-container">
            <select v-model="searchOption" class="form-control mb-2" id="search-option" style="width: 30%;">
              <option value="collection">按组合包名称搜索</option>
              <option value="card">按卡片名称搜索</option>
            </select>
            <!-- <label class="sr-only" for ="search">Type in Pokemon Name</label> -->
            <input type = "text" v-model="query" class="form-control mb-2" id = "search" placeholder="伊布" @input="handleInput">
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
