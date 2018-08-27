<template>
  <div class="orderInfo">
  	<div class="oneOrder" v-for="(order,index) in filterBy(orders,filterInput)" :key='index'>
  		<div class="orderNameBox ell">
  			<img src="../../assets/imgs/md@2x.png" alt="" class="orderImg">
  			<span class="orderText">{{ order.address }}</span>
  		</div>
  		<div class="consignee">收货人 : {{ order.consignee }}</div>
  		<div class="progressBar cl">
  			<div class="progressBg">
  				<div class="progressIn" :class="{'progressInW1':order.status==1,'progressInW2':order.status==2,'progressInW3':order.status==3,'progressInW4':order.status==4}">
  				</div>
  				<div class="circleBox">
  					<span class="daocang" :class="{'status_1':order.daoStatus==1,'status_2':order.daoStatus==2,'status_3':order.daoStatus==3}"></span>
  					<span class="tihuo" :class="{'status_1':order.tiStatus==1,'status_2':order.tiStatus==2,'status_3':order.tiStatus==3}"></span>
  					<span class="qianshou" :class="{'status_1':order.qianStatus==1,'status_2':order.qianStatus==2,'status_3':order.qianStatus==3}"></span>
  					<span class="car" :class="{'car_1':order.status==1,'car_2':order.status==2,'car_3':order.status==3,'car_4':order.status==4}"></span>
  				</div>
  				<div class="circleText">
  					<p v-if="order.daoStatus==3" class="lateBtn" @click="showDaoTime(index)">到仓</p>
  					<p v-else>到仓</p>
  					<p v-if="order.tiStatus==3" class="lateBtn" @click="showTiTime">提货</p>
  					<p v-else>提货</p>
  					<p v-if="order.qianStatus==3" class="lateBtn" @click="showQianTime">签收</p>
  					<p v-else>签收</p>
  				</div>
  			</div>
  		</div>
  		<div class="pullBox">
  			<span class="pullBtn pullUp" @click="showDriver(index)"></span>
  		</div>
  		<div class="driverBox">
  			<img src="../../assets/imgs/sj@2x.png" alt="" class="driverIcon">
				<span class="driverName ell">{{ order.driverName }}</span>
				<span class="driverNum ell">{{ order.driverNum }}</span>
				<img src="../../assets/imgs/dh@2x.png" alt="" class="driverPhone">
				<img src="../../assets/imgs/xx@2x.png" alt="" class="driverMessage">
  		</div>
  		<div class="orderLabel">
  			<img src="../../assets/imgs/wwc@2x.png" v-if="order.orderLabel == 1">
  			<img src="../../assets/imgs/ywc@2x.png" v-else>
  		</div>
  	</div>
  </div>
</template>

<script>

import { MessageBox } from 'mint-ui';

export default {
  name: 'OrderInfo',
  data () {
  	return {
      // orderLabel: 2,//已完成,未完成状态
      // status:4,			//进度条/小车 状态,进度条的状态还有点问题
      // order:1,
      // daoStatus:2,
      // tiStatus:3,
      // qianStatus:3,
      // isPull:false,
      orders: [],
      filterInput:""
    }
  },
  created () {
  	this.getOrderData();
  },
  methods:{
  	getOrderData() {
  		this.axios.get('/order').then(res => {
  			
  			if (res.status === 200) {
  				this.orders = res.data;
  				console.log(res.data);
  			} else {
  				alert("数据获取失败");
  			}
  		}, err => {
  			console.log(err);
  		});
  	},
  	filterBy(orders,value) {
  		return orders.filter(function(order){
  			return order.consignee.match(value);
  		})
  	},
  	showDaoTime(index) {
  		console.log(index);
  		let message = '';
  		for (var i = 0; i < this.orders.length; i++) {
  			let o = this.orders[index];
  			message = '<p style="color:#6b6b6b">要求到仓时间 : '+o.time1+'</p><p style="color:#6b6b6b">实际到仓时间 : <span style="color:red">'+o.time2+'</span></p>';
  		}
  	
  		MessageBox({
			  title: '',
			  message: message,
			  showCancelButton: false,
			  confirmButtonText: "知道了",
			  closeOnClickModal:false
			});
  	},
  	showTiTime() {
  		let message = '<p style="color:#6b6b6b">要求提货时间 : 2018-8-6 05:30</p><p style="color:#6b6b6b">实际提货时间 : <span style="color:red">2018-8-6 05:50</span></p>'
  		MessageBox({
			  title: '',
			  message: message,
			  showCancelButton: false,
			  confirmButtonText: "知道了",
			  closeOnClickModal:false
			});
  	},
  	showQianTime() {
  		let message = '<p style="color:#6b6b6b">要求签收时间 : 2018-8-6 05:30</p><p style="color:#6b6b6b">实际签收时间 : <span style="color:red">2018-8-6 05:50</span></p>'
  		MessageBox({
			  title: '',
			  message: message,
			  showCancelButton: false,
			  confirmButtonText: "知道了",
			  closeOnClickModal:false
			});
  	},
  	showDriver(index) {
  		console.log(index);
  		let pull = document.querySelectorAll('.pullBtn');
  		let driver = pull[index].parentNode.nextElementSibling;
  		if ( driver.style.display == 'block' ) {
  			driver.style.display = 'none';
  			pull[index].style.transform = 'rotateX(0deg)';
  			
  		} else {
  			driver.style.display = 'block';
  			pull[index].style.transform = 'rotateX(180deg)';
  		}
  	}
  }
    
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.orderInfo{
	background-color: #fff;
	padding-bottom: 50px;
}
.oneOrder{
	padding: 0 .375rem 0.25rem .375rem;
	position: relative;
	border-bottom: 1px solid #dcdcdc;
}
.orderNameBox{
	padding-top: 0.25rem;
	position: relative;
}
.orderImg{
	width: 0.625rem;
	height: 0.625rem;
}
.orderText{
	font-size: 0.4rem;
}
.consignee{
	font-size: 0.35rem;
	color: #666666;
	line-height: 0.75rem;
	padding-left: 0.8rem;
}
.orderLabel{
	position: absolute;
	top: 0;
	right: 0;
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
	margin: 21px 0;
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
/*.car{
	width: 0.825rem;
	height: 0.525rem;
	background:url(../../assets/imgs/car.gif);
	background-size: 0.825rem 0.525rem;
	top: -0.3rem;
}*/
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
	height: 0.5rem;
	margin-top: 0.125rem;
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
  /*background: url(../../assets/imgs/zk@2x.png) no-repeat center center;*/
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