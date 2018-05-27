// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import VueRouter from 'vue-router'
import App from './App'
import Home from './Home'
import GCZTStatisticsIndex from './Views/GcztStatistics/Index'

Vue.config.productionTip = false
Vue.use(ElementUI)
Vue.use(VueRouter)

//配置路由
const router = new VueRouter({
  routes: [{
      path: "/",
      component: Home
    },
    {
      path: "/gcztStatistics",
      component: GCZTStatisticsIndex
    }
  ],
  mode: 'history'
})

/* eslint-disable no-new */
new Vue({
  router,
  el: '#app',
  components: {
    App
  },
  template: '<App/>'
})
