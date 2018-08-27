// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import axios from 'axios'
//公共方法
import base from './base'
//mint-ui 方法
// import { InfiniteScroll } from 'mint-ui';
// Vue.use(InfiniteScroll);
// import { Loadmore } from 'mint-ui';
// Vue.component(Loadmore.name, Loadmore);

Vue.prototype.axios = axios

Vue.use(base);

Vue.config.productionTip = false

//根路径
axios.defaults.baseURL = 'http://47.97.96.162:9026/'
// axios.defaults.baseURL = 'http://192.168.0.42:8086/'

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  components: { App },
  template: '<App/>'
})
