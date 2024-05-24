<template>
  <header class="nav-bar">
    <div class="nav-container left">
      <img alt="Pokemon" class = "header-logo" src="@/assets/International_Pokémon_logo.svg"/>
      <p class="title">Pokémon TCG 简中</p>
    </div>
    <div class="nav-container right">
      <div class="right-item">
        <p>收藏</p>
      </div>
      <div class="right-item">
        <p>补充包</p>
      </div>
      <div class="right-item">
        <p>联系</p>
      </div>
    </div>
  </header>
</template>


<script>
</script>


<style lang="less" scoped>
.nav-bar{
  display: flex;
  justify-content: space-between;
  flex-direction:row;
  width: 100%;
  background-color: white;
  flex-wrap: nowrap;
  box-shadow: 0 2px 8px #e0e0e0;
  min-height: 64px;
  height: 64px;
}

.nav-container{
  display:flex;
  justify-content: center;
  align-items: center;
  height: 100%;
  width: fit-content;
  p{
    font-weight: 700;
    max-height: 100%;
    color: black;
    text-decoration: none;
    margin-bottom: 0;
  }
}

.left{
    height: 100%;
    cursor: pointer;
    text-align: center;
    margin-left: 50px;
  }
.right{
  .right-item{
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100%;
    padding: 10px;
    margin: 10px;
    cursor: pointer;
  }
}
.nav-container.left:hover{
    background-color:#e0e0e0 ;
  }

.right-item:hover{
    background-color:#e0e0e0 ;
}

.header-logo{
  max-height: 100%;
  width: 100px;
  margin-right: 10px;
}

.header-box{
  display: flex;
  position: relative;
  width:100%;
  height:300px;

  flex-direction: column; /* 根据需要选择flex方向，默认为row */
  justify-content: center; /* 控制垂直方向居中 */
  align-items: center; /* 控制水平方向居中 */
  text-align: center; /* 控制文本居中 */

  
}


.header-intro{
  font-size: 30px;
  font-style:oblique;
}

</style>
