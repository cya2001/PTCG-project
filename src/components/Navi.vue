<template>
    <div class="navigation">
      <h1>导航页面</h1>
      <ul>
        <li><router-link to="/ptcg">PTCG</router-link></li>
        <li><router-link to="/Calendar">Calendar</router-link></li>
      </ul>
    </div>
  </template>
  
  <script>
  export default {
    name: 'Navigation'
  }
  </script>
  
  <style>
  
    .navigation {
      /* 样式代码 */
    }
  </style>