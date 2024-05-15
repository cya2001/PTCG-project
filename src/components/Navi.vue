<template>
    <div class="toggleIcon" @click="menuToggle" :class="{active:isActive}"></div>
    <div class="menu-overlay" :class="{active:isActive}">
      <h1>Navigation</h1>
      <li><router-link to="/ptcg">PTCG</router-link></li>
      <li><router-link to="/Calendar">Calendar</router-link></li>
      <li><router-link to="/todolist">todolist</router-link></li>
      <li><router-link to="/cardcart">cardcart</router-link></li>
      <li><router-link to="/shop">shop</router-link></li>
    </div>
</template>

<script>
import { ref } from 'vue';

export default{
  setup(){
    const isActive = ref(true)

    function menuToggle(){
      isActive.value = !isActive.value
    }

    return{
      isActive,
      menuToggle,
    }
  }
}

</script>

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
.menu-overlay {
  position: fixed;
  top: 0;
  left: 0;
  right:0;
  bottom: 0;
  background-color: #f00;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow-y: auto;
  flex-direction: column;
  transform: scale(0);
  transition: 0.5s;
}
.menu-overlay.active{
    transform: scale(1);
  }

.menu-overlay li{
  position: relative;
  list-style: none;
  text-align: center;
  display: block;
  a{
    position: relative;
    text-decoration: none;
    font-size: 3.5em;
    padding: 0 10px;
    color: aliceblue;
    font-weight: 700;
    text-transform: uppercase;
    display: inline-block;
  }
}

.menu-overlay li a:before{
  content: '';
  position: absolute;
  top: 50%;
  left: 0;
  width: 100%;
  height: 8px;
  background: #ff0;
  transform: translateY(-50%) scaleX(0);
  transform-origin: right;
  transition: 0.5s transform;
}

.menu-overlay li a:hover:before{
  transform: translateY(-50%) scaleX(1);
  transform-origin: left;
  transition: 0.5s transform;
}
.toggleIcon{
  position: fixed;
  top: 20px;
  right: 20px;
  width: 50px;
  height: 50px;
  background:#ff0;
  z-index: 1;
  cursor: pointer;
  background-image: url('../assets/images/open.png');
}
.toggleIcon.active{
  background-image: url('../assets/images/close.png');
}
</style>