<template>
  <header>
    <meta charset="utf-8">
    <title>PTCG demo</title>
    <div class = "header-box">
      <img alt="Pokemon" class = "header-logo" src="../assets/International_Pokémon_logo.svg"/>
      <p class="header-intro">This is PTCG-ch search app!</p>
    </div>
  </header>
</template>


<script>
</script>


<style >
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

.header-logo{
  position: relative;
  width: 800px;
  height: 180px;
  margin: 10px;

}
.header-intro{
  font-size: 30px;
  font-style:oblique;
}

</style>
