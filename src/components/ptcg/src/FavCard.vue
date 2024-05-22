<script setup>
import { usecardStore } from "@/components/ptcg/stores/cardStore";
import {requireImage} from '@/apis/ptcg'

const cardStore = usecardStore()

const isActive = ref(false)

const menuToggle=()=>{
    isActive.value = !isActive.value
}
const favCard = cardStore.favcardList
console.log(favCard)
</script>

<template>
    <div class="toggleIcon" @click="menuToggle" :class="{active:isActive}"></div>
    <div class="menu-overlay" :class="{active:isActive}">
        <div class = "card-container">
            <div  v-for="card in favCard" key="card">
                <img class = "pkmn-card" :src="requireImage(card.image)"  alt="Image" @click=""/>
                <button @click="cardStore.delCard(card)">删除</button>
            </div>
        </div> 
    </div>

</template>
<style lang="less" scoped>
*{
  margin: 0;
  padding: 0;
  font-family: 'Poppins',sans-serif;
}
h1{
  color:aliceblue;
  font-size: 3.5em;
  text-transform: uppercase;
  font-weight: 700;
}
.card-container{
    display: flex;
    .pkmn-card{
        margin: 10px;
        max-width: 100%;
        height: 300px;
        cursor: pointer;
    }

}
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  background-color: grey;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  flex-direction: row;
  transform: scale(0);
  transition: 0.5s;
  z-index: 1;
}
.menu-overlay.active{
    transform: scale(1);
  }
.toggleIcon{
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background:#ff0;
  z-index: 2;
  cursor: pointer;
  background-image: url('../assets/images/open.png');
}
.toggleIcon.active{
  background-image: url('../assets/images/close.png');
}
</style>