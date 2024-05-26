<script setup>
import {requireImage} from '@/apis/ptcg'

const current = ref(0)
const bannerRef = ref(null)  
let len = 10

onMounted(() => {  
    getCard()
  // 在这里，bannerRef.value 将是 DOM 元素的引用  
//   if (bannerRef.value) {  
//     len = bannerRef.value.children.length
//     console.log(len)
//   } 
//   console.log(bannerRef.value) 
//   console.log(bannerRef.value.children)
})  

const changeBanner = ()=>{
    const left = (current.value -1 +len)%len
    const right = (current.value+1)%len
    Array.from(bannerRef.value.children).forEach((item,index)=>{
        item.className = 'banner-item'
    })
    bannerRef.value.children[left].className = 'banner-item left'
    bannerRef.value.children[current.value].className = 'banner-item center'
    bannerRef.value.children[right].className = 'banner-item right'

}
const pre=()=>{
    current.value = (current.value + len-1)%len
    changeBanner()
}
const next=()=>{
    current.value = (current.value + 1 )%len
    changeBanner()
}
const randomCard = ref([])
const getCard = ()=>{
    for(let i=1;i<10;i++){
        randomCard.value.push(`random\\${i}.png`)
    }
    // console.log(randomCard.value)
}
</script>

<template>
    <div class="banner-container">
        <div class="banner" ref="bannerRef">
            <div class="banner-item left">
                <img :src="requireImage(`random\\51.png`)" alt="" class="showbox-img">
            </div>
            <div class="banner-item center">
                <img :src="requireImage(`random\\45.png`)" alt="" class="showbox-img">
            </div>
            <div class="banner-item right">
                <img :src="requireImage(`random\\40.png`)" alt="" class="showbox-img">
            </div>
            <div class="banner-item" v-for="item in randomCard">
                <img :src="requireImage(item)" alt="" class="showbox-img">
            </div>
        </div>
        <div class="menu">
            <span class="btn btn_pre" @click="pre">
                <img src="@/assets/left.png">
            </span>
            <span class="btn btn_next" @click="next">
                <img src="@/assets/right.png">

            </span>

        </div>
    </div>
</template>

<style lang="less" scoped>

.banner-container {
    position: relative;
    width: 100%;
    height: 500px;
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    align-items: center;    
}
.banner{
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}
.banner-item{
    width: 215px;
    overflow: hidden;
    position: absolute;
    border-radius: 16px;
    z-index: 0;
    box-shadow: 0px 5px 12px rgba(0,0,0,0.5);
    transition: all 0.3s;
}
.banner-item.center{
    width:280px;
    z-index: 2;
}
.banner-item.left{
    transform: translateX(-100px);
    z-index: 1;
}
.banner-item.right{
    transform: translateX(100px);
    z-index: 1;

}

.banner-item > img{
    width: 100%;
    display: block;
}
.banner-item.center:hover{
    /* transform: scale(1.2); */
    transform: translateY(-8px) scale(1.01,1.01);
    box-shadow: 0px 10px 20px rgba(0,0,0,0.3);
}

.menu{
    width: 30%;
    height: 50px;
    position: absolute;
    z-index: 2;
}
.menu>.btn{
    width: 50px;
    height: 100%;
    background-color: rgba(0,0,0,0.15);
    border-radius: 50%;
    cursor: pointer;
}
.btn.btn_pre{
    position: absolute;
    left: 0;
}
.btn.btn_next{
    position: absolute;
    right: 0;
}
.btn >img{
    width: 100%;
    height: 100%;
}
</style>