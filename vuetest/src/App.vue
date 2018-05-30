<template>
  <div id="app">
    <div id="navi" class="navi">
      <ul class="ulcss">
      <li><router-link class="licss" to="/">Home&nbsp;|</router-link></li>
      <li><router-link class="licss" to="/gcztStatistics">工程状态统计&nbsp;|</router-link></li> 
      <li><router-link class="licss" to="/projectoverview">工程总览&nbsp;|</router-link></li>    
      <li><router-link class="licss" to="/zhjc">综合监测&nbsp;|</router-link></li>      
    </ul>
    </div>
    <div>
      <router-view></router-view>
    </div>    
  </div>
</template>

<script>
export default {
  name: "App",
  components: {}
};
</script>

<style>
#app {
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  /* text-align: center; */
  color: #2c3e50;
  /* margin-top: 60px; */
}
.navi {
  width: 100%;
  height: 30px;
}
.ulcss{
  list-style-type: none;
  padding-left: 14px;
}
.licss{
  float: left;
  text-decoration: none;
  margin-left: 5px;
}
.licss:hover{
  background-color: aqua;
}
</style>
