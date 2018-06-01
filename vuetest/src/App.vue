<template>
  <div id="app">
    <el-menu default-active="1" class="el-menu-demo" mode="horizontal" @select="handleSelect">
      <el-menu-item index="1">
        <router-link class="licss" to="/">首页</router-link>
      </el-menu-item>
      <el-submenu index="2">
        <template slot="title">工程系统</template>
        <el-menu-item index="2-1">
          <router-link class="licss" to="/projectoverview">工程总览</router-link>
        </el-menu-item>
        <el-submenu index="2-2">
          <template slot="title">工程管理</template>
          <el-menu-item index="2-2-1">
            <router-link class="licss" to="">骨干河道</router-link>
          </el-menu-item>
          <el-menu-item index="2-2-2">
            <router-link class="licss" to="">中小河道</router-link>
          </el-menu-item>
          <el-menu-item index="2-2-3">
            <router-link class="licss" to="">小型农田水利</router-link>
          </el-menu-item>
          <el-menu-item index="2-2-4">
            <router-link class="licss" to="">农村生活污水</router-link>
          </el-menu-item>
          <el-menu-item index="2-2-5">
            <router-link class="licss" to="">其他水利工程</router-link>
          </el-menu-item>
        </el-submenu>
        <el-submenu index="2-3">
        <template slot="title">工程统计</template>
          <el-menu-item index="2-3-1">
            <router-link class="licss" to="/gcztStatistics">工程状态统计</router-link> 
          </el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-submenu index="3">
        <template slot="title">水文系统</template>
        <el-menu-item index="3-1">
          <router-link class="licss" to="/zhjc">综合监测</router-link>
        </el-menu-item>
        <el-submenu index="3-2">
          <template slot="title">河道水质评价</template>
          <el-menu-item index="3-2-1">
            <router-link class="licss" to="">单断面水质统计</router-link> 
          </el-menu-item>
          <el-menu-item index="3-2-2">
            <router-link class="licss" to="">单河道水质统计</router-link>  
          </el-menu-item>
          <el-menu-item index="3-2-3">
            <router-link to="" class="licss">重污染河道水质</router-link>  
          </el-menu-item>
          <el-menu-item index="3-2-4">
            <router-link to="" class="licss">水功能区达标统计</router-link>  
          </el-menu-item>
          <el-menu-item index="3-2-5">
            <router-link to="/gghd" class="licss">骨干河道水质情况分析</router-link> 
          </el-menu-item>
          <el-menu-item index="3-2-6">
            <router-link to="" class="licss">清洁水行动水质达标统计</router-link>  
          </el-menu-item>
          <el-menu-item index="3-2-7">
             <router-link to="" class="licss">水质取样统计</router-link>  
          </el-menu-item>
        </el-submenu>
      </el-submenu>
    </el-menu>
    <div>
      <router-view></router-view>
    </div>    
  </div>
</template>

<script>
export default {
  name: "App",
  components: {},
  methods: {
    handleSelect(key, keyPath) {
      // console.log(key,keyPath);
    }
  }
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
.licss {
  text-decoration: none;
}
.el-dropdown-link {
  cursor: pointer;
  color: #409eff;
}
.el-icon-arrow-down {
  font-size: 12px;
}
</style>
