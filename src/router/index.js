import Vue from 'vue'
import Router from 'vue-router'

//公共样式
import '../assets/css/reset.css'

//MintUI
import MintUI from 'mint-ui'
import 'mint-ui/lib/style.css'

//自定义路由
import Home from '@/components/Home'
import Order from '@/components/Order'
import Mine from '@/components/Mine'
import Query from '@/components/order/Query'

Vue.use(Router)

Vue.use(MintUI)

export default new Router({
  routes: [
    {path: '/',name: 'Home',component: Home},
    {path: '/order',name: 'Order',component: Order},
    {path: '/mine',name: 'Mine',component: Mine},
    {path: '/query',name: 'Query',component: Query}
  ]
})
