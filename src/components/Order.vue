<template>
  <div class="order">
  	<!-- 订单头部 -->
      
    <div class="orderHeader">
        <img src="../assets/imgs/arrow-sy@2x.png" class="returnHome" v-show="back" @click="backHome">
        <div>订单</div>
        <img src="../assets/imgs/ch@2x.png" class="enterSearch" @click="goToQuery">
    </div>
    <div style="height:44px"></div>
    <div class="min-box" v-infinite-scroll="getOrderData" infinite-scroll-distance="10" infinite-scroll-disabled="loading">
        <mt-loadmore :top-method="loadTop" ref="loadmore" :topDistance="10" topPullText="下拉刷新" topDropText="释放更新"> 
            <div class="orderBoxHeight" >
            <!-- 订单统计 -->
                <div class="orderBox cl" v-show="numStatus">
                    <div>
                        <p>总订单</p>
                        <p class="allNum">{{ totalOrder }}</p>
                    </div>
                    <div>
                        <p>已完成</p>
                        <p class="finishNum">{{ finished }}</p>
                    </div>
                    <div>
                        <p>未完成</p>
                        <p class="notFinishNum">{{ unFinished }}</p>
                    </div>
                </div>
                <!-- 订单列表 -->
                <div>
                        <div class="orderInfo">
                        <div class="oneOrder" v-for="(order,index) in orders" :key='index'>
                            <!-- 收货人 -->
                            <div class="consignee">
                                <i class="blueBg"></i>
                                <span class="shopText">{{ order.receiveMan }}</span>
                                <img src="../assets/imgs/xm@2x.png" class="shopImg" @click="showCompany(index)">
                            </div>
                            <!-- 收货地址 -->
                            <div class="orderNameBox">
                                <img src="../assets/imgs/md@2x.png" alt="" class="orderImg">
                                <span class="orderText">{{ order.receiveAddress }}</span>
                                <div class="orderLabel">
                                    <img src="../assets/imgs/wwc@2x.png" v-if="order.finishedState == 0">
                                    <img src="../assets/imgs/ywc@2x.png" v-else>
                                </div>
                            </div>
                            <!-- 订单状态 -->
                            <div class="progressBar cl">
                                <div class="progressBg">
                                    <div class="progressIn" :class="{'progressInW1':order.sendState==0,'progressInW2':order.sendState==1,'progressInW3':order.sendState==2,'progressInW4':order.sendState==3}">
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
                                <img src="../assets/imgs/sj@2x.png" alt="" class="driverIcon">
                                    <span class="driverName ell">{{ order.driverName }}</span>
                                    <span class="driverNum ell">{{ order.carLicense }}</span>
                                    <a :href="'tel:'+order.mobile"><img src="../assets/imgs/dh@2x.png" alt="" class="driverPhone"></a>
                                    <img src="../assets/imgs/xx@2x.png" alt="" class="driverMessage">
                            </div>
                        </div>
                        <!--显示加载中转菊花-->
                        <div class="loading-box tc" v-if="isLoading">
                            <mt-spinner type="snake" class="loading-more"></mt-spinner>
                            <span class="loading-more-txt">加载中...</span>
                        </div>

                        <div class="no-more" v-if="noMore">没有更多了~</div>
                    </div>
                </div>
            </div>
        </mt-loadmore>
    </div>
        
  </div>
</template>
<script>
import { MessageBox } from 'mint-ui';

export default {
  name: 'Order',
  data () {
    return {
      msg: '订单',
      search: true,
      back: false,
      numStatus: true,
      orders: [],
      filterInput: '',

      totalOrder: "",
      finished: "",
      unFinished: "",

      // 地址栏参数
      token: "",
      userId: "",
      version: "",
      isAuth: "",
      model: "",
      type1: "",
      clientId: "",

      //加载状态参数
      isLoading: false, // 加载中转菊花
      isMoreLoading: true, // 加载更多中
      noMore: false, // 是否还有更多
      pageInfo: { // 分页信息
          page: 1,
          page_size: 15,
          total: 0, // 总条数
          totalPage: 1 // 总分页数
      },
      loading:false,//判断是否是最后一页
      currentPage:1,//请求的第几页


    }
  },
  //加载页面之前调用
  created () {
        this.getOrderData(false);
  },
  methods:{
      loadTop(){
            this.currentPage = 1;
            this.getOrderData(true)
            
      },
  	//订单头部跟搜索头部切换
  	goToQuery() {
  		this.$router.push({
        path: '/query',
        query: {
          token: this.token,
          userId: this.userId,
          version: this.version,
          isAuth: this.isAuth,
          model: this.model,
          type1: this.type1,
          clientId: this.clientId
        }
      });
  	},
  	backHome() {	//返回首页
  		if(this.phoneType() == 1){				//IOS
  			window.webkit.messageHandlers.returnHome.postMessage('');
  		}else if(this.phoneType() == 2){	//Android
  			Order.introduction("1");
  		}
  	},
  	getOrderData(flag) {

  		this.isLoading = true;		//显示加载中状态
        this.loading = true;
  		//获取地址栏参数
  		this.token = this.$route.query.token;
  		this.userId = this.$route.query.userId;
  		this.version = this.$route.query.version;
  		this.isAuth = this.$route.query.isAuth;
  		this.model = this.$route.query.model;
			this.type1 = this.$route.query.type;
  		this.clientId = this.$route.query.clientId;

  		//根据参数判断返回按钮及订单统计的显示状态
  		if(this.isNull(this.type1) || this.isNull(this.clientId)) {
  			//type clientId任意不为空  显示返回按钮
				this.back = !this.back;
				if(!this.search){
					if(this.isNull(this.type1)){//type不为空 隐藏订单统计
						this.numStatus = !this.numStatus;
					}
				}
  		}

  		//携带参数请求后台数据
  		this.axios({
			  method: 'post',
              url: '/account/orderDetail',
              timeout:10000,//设置超时时间10s
			  data: {
			  	"action":"/account/orderDetail",
			  	"data":{"currentPage":this.currentPage,"receiveMan":""},
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
                    //flag用来判断是加载更多还是下啦刷新
                    if(flag){
                        this.orders = result.orderDetail
                        this.$refs.loadmore.onTopLoaded();
                    }else{
                        this.orders = this.orders.concat(result.orderDetail);
                    }
					this.totalOrder = result.totalOrder;
					this.finished = result.finished;
					this.unFinished = result.unFinished;
                    console.log(result);
                    if(this.currentPage == result.totalPage){
                        this.loading = true;
                        this.noMore = true;
                    }else{
                        this.currentPage++;
                        this.loading = false;
                    }
                    
				} else {
                    
				}

				this.isLoading = false;
				
			}).catch((err) => {
                console.log(err);
                if (self.searchCondition.pageNo === 1) {
                    if (str.search('timeout') !== -1) {   // 超时error捕获
                        Toast('请求超时');
                    }
                }
			})
  	},
  	traversalOrder(index){		//返回当前数据
  		for (var i = 0; i < this.orders.length; i++) {
  			return this.orders[index]
  		}
  	},
  	showDaoTime(index) {			//异常到仓时间
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
  	showTiTime(index) {				//异常提货时间
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
  	showQianTime(index) {			//异常签收时间
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
  	showCompany(index) {			//显示公司名
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
  	showDriver(index) {				//司机栏隐藏显示切换
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
  },
  components:{
    // "app-order":OrderInfo
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.order{
	background-color: #f5f5f5;
    height: 100%;
}
.mint-loadmore{
    height: 100%;
}
.mint-loadmore-top{
    margin-top: -20px;
}
.mint-loadmore .mint-loadmore-content{
    height: 100%;
    overflow: hidden;

}
/*订单头部*/
.orderHeader{
	line-height: 44px;
	text-align: center;
	font-size: 0.45rem;
	color: #fff;
	background-color: #1c7ffe;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
    z-index: 10;
}
.enterSearch{
	width: 0.625rem;
	height: 0.625rem;
	position: absolute;
	top: 0.25rem;
	right: 0.25rem;
}
.returnHome{
/*	width: 0.25rem;
	height: 0.5rem;*/
	width: 0.2rem;
	height: 0.45rem;
	transform :scaleX(-1);
	position: absolute;
	top: 0.375rem;
	left: 0.5rem;
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
	background: url(../assets/imgs/ch@2x.png) no-repeat 0.25rem center;
	background-size: 0.5rem 0.5rem;
	background-color: #4594fd;
	text-indent: 0.875rem;
}
.cancel{
	border:none;
	color: #fff;
	font-size: 0.35rem;
	background-color: #1c7ffe;
	outline: none;
	margin-left: 3%;
}
.orderBoxHeight{
	/* padding-top: 44px; */
    height: 100%;
	overflow-y: auto;
	background-color: #f5f5f5;
}
.order .mint-loadmore-top {
    position: absolute;
    top: 0;
    transform: translateX(-50%);
    left: 50%;
}
.orderBox{
	background-color: #fff;
	padding: 0.25rem 0;
}
.orderBox>div{
	width: 33.33%;
	float: left;
}
.orderBox>div>p{
	text-align: center;
	margin: 0.125rem 0;
}
.orderBox>div>p:first-child{
	color: #333;
	font-size: 0.35rem;
}
.orderBox>div>p:last-child{
	font-size: 0.55rem;
}
.allNum{
	color: #1c7ffe;
}
.finishNum{
	color: #48e640;
}
.notFinishNum{
	color: #fca339;
}
/*订单列表*/
.orderInfo{
	/*background-color: #f5f5f5;*/
	padding: 0.375rem 0 1.25rem 0;
}
.oneOrder{
	padding-bottom: 0.25rem;
	position: relative;
	width: 92%;
	/*box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.2);
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
	background:url(../assets/imgs/car.gif);
	background-size: 0.825rem 0.525rem;
	top: -0.3rem;
	left: 0;
}
.car_2{
	width: 0.825rem;
	height: 0.525rem;
	background:url(../assets/imgs/car.gif);
	background-size: 0.825rem 0.525rem;
	top: -0.3rem;
	left: 30%;
}
.car_3{
	width: 0.825rem;
	height: 0.525rem;
	background:url(../assets/imgs/car.gif);
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
	background:url(../assets/imgs/circle1@2x.png);
	background-size: 0.325rem 0.325rem;
}
.status_2{
	width: 0.45rem;
	height: 0.45rem;
	top: -0.25rem;
	background:url(../assets/imgs/circle1-pree@2x.png);
	background-size: 0.45rem 0.45rem;
}
.status_3{
	width: 0.45rem;
	height: 0.45rem;
	top: -0.25rem;
	background:url(../assets/imgs/chidao.gif);
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
	background:url(../assets/imgs/arrow-hs@2x.png) no-repeat 1.725rem 0.08rem;
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
  background: url(../assets/imgs/zk@2x.png) no-repeat center center;
}
.pullDown{
	 background: url(../assets/imgs/sq@2x.png) no-repeat center center;
}
.driverBox{
	display: none;
	padding: 0.125rem .375rem;
}
.driverBox img{
	width: 0.625rem;
	height: 0.625rem;
}

.driverPhone,.driverMessage{
	margin-left: 0.75rem;
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

/*加载区域*/
.loading-box{
	text-align: center;
}
.loading-more{
	display: inline-block;
	vertical-align: middle;
}
.no-more{
	text-align: center;
}
</style>