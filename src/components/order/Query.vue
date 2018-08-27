<template>
  <div class="query">
     <!-- 搜索头部 -->
    <div class="header">
      <!-- <form action="javascript:return true;"> -->
        <input type="search" 
        placeholder="请输入关键字" class="queryInput" 
        id="queryInput" v-model="filterInput" ref="input1" @keyup.13="searchForm">
      <!-- </form> -->
      <button class="cancel" @click="goToOrder">取消</button>
    </div>
    <div class="orderList">
     <div class="oneOrder" v-for="(order,index) in orders" :key='index'>
        <!-- 收货人 -->
        <div class="consignee">
          <i class="blueBg"></i>
          <span class="shopText">{{ order.receiveMan }}</span>
          <img src="../../assets/imgs/xm@2x.png" class="shopImg" @click="showCompany(index)">
        </div>
        <!-- 收货地址 -->
        <div class="orderNameBox">
          <img src="../../assets/imgs/md@2x.png" alt="" class="orderImg">
          <span class="orderText">{{ order.receiveAddress }}</span>
          <div class="orderLabel">
            <img src="../../assets/imgs/wwc@2x.png" v-if="order.finishedState == 0">
            <img src="../../assets/imgs/ywc@2x.png" v-else>
          </div>
        </div>
        <!-- 订单状态 -->
        <div class="progressBar cl">
          <div class="progressBg">
            <div class="progressIn" :class="{'progressInW1':order.sendState==1,'progressInW2':order.sendState==2,'progressInW3':order.sendState==3,'progressInW4':order.sendState==4}">
            </div>
            <div class="circleBox">
              <span class="daocang status_1" :class="{'status_2':order.sendState==1,'status_2':order.sendState==2,'status_2':order.sendState==3,'status_3':order.wareHouseState==1}"></span>
              <span class="tihuo status_1" :class="{'status_2':order.sendState==2,'status_2':order.sendState==3,'status_3':order.pickState==1}"></span>
             <span class="qianshou status_1" :class="{'status_2':order.sendState==3,'status_3':order.signState==1}"></span>
             <span class="car" :class="{'car_1':order.sendState==0,'car_2':order.sendState==1,'car_3':order.sendState==2,'car_4':order.sendState==3}"></span>
            </div>
            <div class="circleText">
              <p v-if="order.wareHouseState==1" class="lateBtn" @click="showDaoTime(index)">到仓</p>
              <p v-else>到仓</p>
              <p v-if="order.pickState==1" class="lateBtn" @click="showTiTime(index)">提货</p>
              <p v-else>提货</p>
              <p v-if="order.signState==1" class="lateBtn" @click="showQianTime(index)">签收</p>
              <p v-else>签收</p>
            </div>
          </div>
        </div>
        <!-- 切换按钮 -->
        <div class="pullBox">
          <span class="pullBtn pullUp" @click="showDriver(index)"></span>
        </div>
        <!-- 司机信息 -->
        <div class="driverBox">
          <img src="../../assets/imgs/sj@2x.png" alt="" class="driverIcon">
          <span class="driverName ell">{{ order.driverName }}</span>
          <span class="driverNum ell">{{ order.carLicense }}</span>
          <a :href="'tel:'+order.mobile"><img src="../../assets/imgs/dh@2x.png" alt="" class="driverPhone"></a>
          <img src="../../assets/imgs/xx@2x.png" alt="" class="driverMessage">
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import { MessageBox } from 'mint-ui';     //弹窗

export default {
  name: 'Query',
  data () {
    return {
      msg: '订单搜索',
      filterInput: '',
      orders: [],

      // 地址栏参数
      token: "",
      userId: "",
      version: "",
      isAuth: "",
      model: "",
      type1: "",
      clientId: ""

    }
  },
  //加载页面之前调用
  created () {
    this.getOrderData();
  },
  mounted() {
    //设置输入框焦点
    this.$refs['input1'].focus();
  },
  methods:{
    searchForm() {
     // alert("nihao");
    this.getOrderData();
    // alert(this.filterInput);
    },
    getOrderData() {
      //获取地址栏参数
      this.token = this.$route.query.token;
      this.userId = this.$route.query.userId;
      this.version = this.$route.query.version;
      this.isAuth = this.$route.query.isAuth;
      this.model = this.$route.query.model;
      this.type1 = this.$route.query.type;
      this.clientId = this.$route.query.clientId;

      // alert(this.filterInput);
      // this.filterInput = this.$refs.input1
      // console.log(this.$refs.input1);

      //携带参数请求后台数据
      this.axios({
        method: 'post',
        url: '/account/orderDetail',
        data: {
          "action":"/account/orderDetail",
          "data":{"currentPage":"1","receiveMan":this.filterInput},
          "isAuth":"true",
          "model":"1",
          // "sign":"B971661C4FC51A7898CE00538C02FA1C",
          "token":this.token,
          "userId":this.userId,
          "version":this.version
        }
      }).then((res) => {

        // Indicator.open();
        if(res.data.code == 200) {
          let result = res.data.result;
          this.orders = result.orderDetail;
          console.log(this.orders);
        } else {
          // console.log(res.data.code);
        }
        this.isLoading = false;
      }).catch((err) => {
        console.log(err);
      })

    },
  	//跳转到上一次浏览的页面
  	goToOrder() {
      this.$router.push({
        path: '/order',
        query: {
          token: this.token,
          userId: this.userId,
          version: this.version,
          isAuth: this.isAuth,
          model: this.model,
          type1: this.type1,
          clientId: this.clientId
        }
      })
  	},
    traversalOrder(index){    //返回当前数据
      for (var i = 0; i < this.orders.length; i++) {
        return this.orders[index]
      }
    },
    showDaoTime(index) {      //异常到仓时间
      let message = '';
      let o = this.traversalOrder(index);
      message = '<p style="color:#6b6b6b;font-size:.4rem">要求到仓时间 : '+o.askArriveWareHouseDate+'</p><p style="color:#6b6b6b;font-size:.4rem"">实际到仓时间 : <span style="color:red">'+o.realArriveWareHouseDate+'</span></p>';
    
      MessageBox({
        title: '',
        message: message,
        showCancelButton: false,
        confirmButtonText: "知道了",
        closeOnClickModal:false
      });
    },
    showTiTime(index) {       //异常提货时间
      let message = '';
      let o = this.traversalOrder(index);
      message = '<p style="color:#6b6b6b;font-size:.4rem">要求提货时间 : '+o.askPickDate+'</p><p style="color:#6b6b6b;font-size:.4rem"">实际提货时间 : <span style="color:red">'+o.realPickDate+'</span></p>';
      MessageBox({
        title: '',
        message: message,
        showCancelButton: false,
        confirmButtonText: "知道了",
        closeOnClickModal:false
      });
    },
    showQianTime(index) {     //异常签收时间
      let message = '';
      let o = this.traversalOrder(index);
      message = '<p style="color:#6b6b6b;font-size:.4rem">要求签收时间 : '+o.askSignDate+'</p><p style="color:#6b6b6b;font-size:.4rem"">实际签收时间 : <span style="color:red">'+o.realSignDate+'</span></p>';
      MessageBox({
        title: '',
        message: message,
        showCancelButton: false,
        confirmButtonText: "知道了",
        closeOnClickModal:false
      });
    },
    showCompany(index) {      //显示公司名
      let message = '';
      let o = this.traversalOrder(index);
      message = '<p style="color:#6b6b6b">'+o.companyName+'</p>';
      MessageBox({
        title: '',
        message: message,
        showCancelButton: false,
        confirmButtonText: "知道了",
        closeOnClickModal:false
      });
      // console.log(this.traversalOrder(index).time1);
    },
    showDriver(index) {       //司机栏隐藏显示切换
      let pull = document.querySelectorAll('.pullBtn');
      let driver = pull[index].parentNode.nextElementSibling;
      if ( driver.style.display == 'block' ) {
        driver.style.display = 'none';
        pull[index].style.transform = 'scaleY(1)';
      } else {
        driver.style.display = 'block';
        pull[index].style.transform = 'scaleY(-1)';
      }
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.query{
  overflow-y: auto;
}
/*搜索头部*/
.header{
  line-height: 44px;
  font-size: 0.45rem;
  color: #fff;
  background-color: #1c7ffe;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
}
.queryInput{
  width: 80%;
  height: 0.875rem;
  font-size: 0.3rem;
  border-radius: 0.2rem;
  outline: none;
  border:1px solid #1c7ffe;
  margin-left: 5%;  
  color: #fff;
  background: url(../../assets/imgs/ch@2x.png) no-repeat 0.25rem center;
  background-size: 0.5rem 0.5rem;
  background-color: #4594fd;
  text-indent: 0.875rem;
}
.queryInput::-webkit-input-placeholder{
  color: #fff;
}
.cancel{
  border:none;
  color: #fff;
  font-size: 0.35rem;
  background-color: #1c7ffe;
  outline: none;
  margin-left: 3%;
}
.orderList{
	position: fixed;
	top: 44px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-y: auto;
  background-color: #f5f5f5;
  padding-top: .375rem;
}
/*订单列表*/
.oneOrder{
  padding-bottom: 0.25rem;
  position: relative;
  width: 92%;
 /* box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.2);
  -webkit-box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.2);
  -moz-box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.2);*/
  margin: 0 auto 0.375rem;
  background-color: #ffffff;
  border-radius: 5px;
}
.orderNameBox{
  padding: 0.25rem 2rem 0.5rem 1rem;
  position: relative;
}
.orderImg{
  width: 0.625rem;
  height: 0.625rem;
  float: left;
  margin: 0 0 0 -.8rem;
}
.orderText{
  font-size: 0.45rem;
}
.consignee{
  padding: .2rem 1rem .2rem 0.5rem;
  border-bottom: 1px solid #dddddd;
  position: relative;
}
.blueBg{
  display: inline-block;
  width: 2px;
  height: 0.3rem;
  background-color: #1c7ffe;
  position: absolute;
  top: 0.325rem;
  left: 0.275rem; 
}
.shopImg{
  width: 0.625rem;
  height: 0.625rem;
  position: absolute;
  top: 0.125rem;
  right: .375rem;
}
.shopText{
  font-size: 0.4rem;
  color: #333333;
}
.orderLabel{
  position: absolute;
  top: 0.25rem;
  right: 0.5rem;
}
.orderLabel img{
  width: 1.625rem;
  height: 1.0rem;
}
.progressBar{
  padding: 0 0.75rem;
}
.progressBg{
  height: 2px;
  background-color: #dcdcdc;
  margin: 0.525rem 0;
}
.progressIn{
  height: 100%;
  background-color: #18be47;
}
.progressInW1{
  width: 0;
}
.progressInW2{
  width: 30%;
}
.progressInW3{
  width: 60%;
}
.progressInW4{
  width: 100%;
}
.circleBox{
  width: 100%;
  position: relative;
}
.circleBox span{
  display: inline-block;
  position: absolute;
  background-repeat: no-repeat;
  background-position: center center;
}
.car_1{
  width: 0.825rem;
  height: 0.525rem;
  background:url(../../assets/imgs/car.gif);
  background-size: 0.825rem 0.525rem;
  top: -0.3rem;
  left: 0;
}
.car_2{
  width: 0.825rem;
  height: 0.525rem;
  background:url(../../assets/imgs/car.gif);
  background-size: 0.825rem 0.525rem;
  top: -0.3rem;
  left: 30%;
}
.car_3{
  width: 0.825rem;
  height: 0.525rem;
  background:url(../../assets/imgs/car.gif);
  background-size: 0.825rem 0.525rem;
  top: -0.3rem;
  left: 60%;
}
.daocang{
  left: 14%;
}
.status_1{
  width: 0.325rem;
  height: 0.325rem;
  top: -0.175rem;
  background:url(../../assets/imgs/circle1@2x.png);
  background-size: 0.325rem 0.325rem;
}
.status_2{
  width: 0.45rem;
  height: 0.45rem;
  top: -0.25rem;
  background:url(../../assets/imgs/circle1-pree@2x.png);
  background-size: 0.45rem 0.45rem;
}
.status_3{
  width: 0.45rem;
  height: 0.45rem;
  top: -0.25rem;
  background:url(../../assets/imgs/chidao.gif);
  background-size: 0.45rem 0.45rem;
}
.tihuo{
  left: 48%;
}
.qianshou{
  left: 81%;
}
.circleText{
  margin-top: 0.3rem;
}
.circleText p{
  color: #666666;
  font-size: 0.3rem;
  width: 33.33%;
  text-align: center;
  float: left;
}
.lateBtn{
  background:url(../../assets/imgs/arrow-hs@2x.png) no-repeat 1.725rem 0.08rem;
  background-size: 0.125rem 0.25rem;
}
.pullBox{
  position: relative;
  padding: 0.375rem 0 0.25rem 0;
}
.pullBox span{
  display: inline-block;
  width: 0.35rem;
  height: 0.35rem;
  position: absolute;
  left: 50%;
  top: 50%;
  margin-top: -0.175rem;
  margin-left: -0.175rem;
  background-size: 0.35rem 0.35rem;
}
.pullUp{
  background: url(../../assets/imgs/zk@2x.png) no-repeat center center;
}
.pullDown{
   background: url(../../assets/imgs/sq@2x.png) no-repeat center center;
}
.driverBox{
  display: none;
  padding: 0.125rem .375rem;
}
.driverBox img{
  width: 0.625rem;
  height: 0.625rem;
}
.driverIcon{

}
.driverPhone,.driverMessage{
  margin-left: 0.75rem;
}
.driverName,.driverNum{
  
}
.driverName{
  font-size: .4rem;
  color: #747474;
  margin-left: 0.25rem;
}
.driverNum{
  font-size: .4rem;
  color: #1a7bfe;
  margin-left: 0.75rem;
}
</style>