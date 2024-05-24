<script setup>
import { usecardStore } from "@/components/ptcg/stores/cardStore";
import {requireImage} from '@/apis/ptcg'

const cardStore = usecardStore()

const isActive = ref(false)

const menuToggle=()=>{
    isActive.value = !isActive.value
    if(isActive.value){
      document.body.classList.add('no-scroll')
    }else{
      document.body.classList.remove('no-scroll')
    }
}
const favCard = cardStore.favcardList
console.log(favCard)
const xMax = [-10,10]
const yMax = [-10,10]
const width = ref(215)
const height = ref(300)
const xdeg = ref(0)
const ydeg = ref(0)
const onMousemove = (e)=>{
  ydeg.value = -(e.offsetX*(xMax[1]-xMax[0])/width.value+xMax[0])
  xdeg.value = e.offsetY*(yMax[1]-yMax[0])/height.value+yMax[0]
}
const onMouseleave = (e)=>{
  ydeg.value=0
  xdeg.value=0
}

</script>

<template>
    <div class="toggleIcon" @click="menuToggle" :class="{active:isActive}">
      <img src="@/assets/pokemon/pokeball.png" class="toggleIcon" v-if="!isActive">
      <img src="@/assets/pokemon/pokeball-active.png" class="toggleIcon" v-else>
    </div>
    <div class="menu-overlay" :class="{active:isActive}">
      <button @click="cardStore.clearCard()">清除</button>

        <div class = "favcard-container">
            <div  v-for="card in favCard" key="card">
                <img class = "favpkmn-card" :src="requireImage(card.image)"  alt="Image" 
                :style="{width:`${width}px`,height:`${height}px`,'--xdeg':`${xdeg}deg`,'--ydeg':`${ydeg}deg`}"
                @mouseenter="onMouseenter"
                @mousemove="onMousemove"
                @mouseleave="onMouseleave"
                
                />
                <button @click="cardStore.delCard(card)">删除</button>
            </div>
        </div> 
    </div>

</template>
<style lang="less">
*{
  margin: 0;
  padding: 0;
  // font-family: 'Poppins',sans-serif;
}
.favcard-container{
  position: relative;
  width: 100%;
  height: 100%;
  display: flex;
  flex-wrap: wrap;
}
.favpkmn-card{
  margin: 10px;
  cursor: pointer;
  border-radius: 6px;
  box-shadow: 1px 1px 7px 5px #cecaca44;
}
.favpkmn-card:hover{
  transform: perspective(500px) rotateX(var(--xdeg,0deg)) rotateY(var(--ydeg,0deg));
}

.menu-overlay {
  position: absolute;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  background-image: url('@/assets/pokemon/favbag.png');
  background-size: cover;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  overflow: auto;
  transform: scale(0);
  transition: 0.5s;
  z-index: 10;
}
.menu-overlay.active{
    transform: scale(1);
  }
.toggleIcon{
  position: fixed;
  top: 80px;
  right: 20px;
  width: 50px;
  height: 50px;
  z-index: 20;
  cursor: pointer;
}

body.no-scroll{
  overflow: hidden;
  height: 100%;
  position: fixed;
  width: 100%;
}
</style>