<template>
  <div class="mine">
		<div class="mineHeader">我的</div>
		<div class="mineBox">
			<div class="accountBox cl">
	    	<img src="../assets/imgs/tx@2x.png" alt="" class="accountHeader">
	    	<div class="account">{{ userName }}</div>
	    </div>
	    <div class="proName">我的项目</div>
			<div class="myProject">	
				<p class="" v-for="(pro,index) in clientList" :key='index' v-show='index < num'>
					<i></i>
					<span>{{ pro }}</span>
				</p>
	    </div>
	    <div class="showAllBox" v-show='clientList.length > 5'>
	    	<span class="showAll" v-text="btnText" @click='showAll'></span>
	    </div>
	    <div class="version cl">
	    	<img src="../assets/imgs/bb@2x.png" alt="">
	    	<span>当前版本</span>
	    	
	    	<span class="verNum">{{ version }}</span>
	    	<button class="updateBtn" v-show="updateFlag == 0" @click="updateApp">更新</button>
	    </div>
	    <div class="backBox">
	    	<button class="backBtn" @click="exitApp">退出</button>
	    </div>
		</div>
    

   
  </div>
</template>

<script>
export default {
  name: 'Mine',
  data () {
    return {
      isShow: true,
      num: 5,
      btnText: "查看更多",
      clientList: [],
      userName: "",
      version: "",
      updateFlag: ""
    }
  },
  created () {
  	this.getPro();
  },	
  methods:{
  	exitApp() {//退出登录
  		if(this.phoneType() == 1){				//IOS
  			window.webkit.messageHandlers.logOut.postMessage('');
  		}else if(this.phoneType() == 2){	//Android
  			Login.introductionLogin("1");
  		}
  	},
  	getPro() {
  		let token = this.$route.query.token;
  		let userId = this.$route.query.userId;
  		let version = this.$route.query.version;
  		let isAuth = this.$route.query.isAuth;
  		let model = this.$route.query.model;
  		// alert(model);

  		this.axios({
			  method: 'post',
			  url: '/account/myPage',
			  data: {
			  	"action":"/account/myPage",
			  	"data":{},
			  	"isAuth":"true",
			  	"model":"1",
			  	// "sign":"B971661C4FC51A7898CE00538C02FA1C",
			  	"token":token,
			  	"userId":userId,
			  	"version":version
			  }
			})
			.then((res) => {
				if (res.status === 200) {
  				// console.log(res.data.result);
  				let result = res.data.result;
  				this.clientList = result.clientList;
  				this.userName = result.userName;
  				this.version = result.nowVersion;
  				this.updateFlag = result.updateFlag;
  			} else {
  				alert("数据获取失败");
  			}
			})
			.catch(err => {
				console.log(err);
			})
  	},
  	showAll() {

  		let num = this.num,
  				len = this.clientList.length;
  		num == 5 ? this.num = len : this.num = 5;

  		this.isShow = !this.isShow;
			if (this.isShow) {
				this.btnText = "查看更多"
			} else {
				this.btnText = "隐藏更多"
			}
  	},
  	updateApp() {
  		if(this.phoneType() == 1){				//IOS
  			window.webkit.messageHandlers.sureUpdate.postMessage('');
  		}else if(this.phoneType() == 2){	//Android
  			Login.setupdate("1");
  		}
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.mine{
	background-color: #ffffff;
	-webkit-overflow-scrolling : touch;
}
.mineHeader{
	line-height: 44px;
	text-align: center;
	font-size: 0.45rem;
	color: #fff;
	background-color: #1c7ffe;
	position: fixed;
	top: 0;
	left: 0;
	right: 0;
}
.mineBox{
	position: fixed;
	top: 44px;
	left: 0;
	right: 0;
	bottom: 0;
	overflow-y: scroll;
	-webkit-overflow-scrolling: touch;
}
.accountBox{
	padding: 0.5rem 0 0.5rem 0.375rem;
}
.accountHeader{
	float: left;
	width: 1.425rem;
	height: 1.425rem;
}
.account{
	float: left;
	font-size: 0.4rem;
	line-height: 1.425rem;
	margin-left: 0.375rem;
}
.proName{
	font-size: 0.4rem;
	color: #000000;
	background: url(../assets/imgs/xm@2x.png) no-repeat 0.375rem center;
	background-size: 0.525rem 0.525rem;
	text-indent: 0.625rem;
	padding-left: 0.375rem;
	letter-spacing:1px;
}
.myProject{
	margin-top: 0.25rem;
	padding-left: 1.125rem;
/*	height: 120px;
	overflow-y: auto;*/
}
.myProject p{
	line-height: 0.625rem;
	padding-right: 0.5rem;
	padding-left: 0.25rem;
}
.myProject i{
	display: inline-block;
	width: 0.125rem;
	height: 0.125rem;
	border-radius: 50%;
	background-color: #ff7f34;
	float: left;
	margin: 0.225rem 0 0 -0.25rem;
}
.myProject span{
	font-size: 0.35rem;
	color: #666666;
	letter-spacing:1px;
}
.showAllBox{
	margin: .25rem 0 0 1.375rem;
}
.showAll{
	color: #1c7ffe;
	font-size: 0.35rem;
	letter-spacing:1px;
}
.version{
	height: 1.1rem;
	line-height: 1.1rem;
	background-color: #f5f5f5;
	padding: 0 0.375rem;
	margin-top: 0.5rem;
}
.version img{
	width: 0.525rem;
	height: 0.525rem;
	position: relative;
	top: -0.05rem;
}
.version span{
	color: #333333;	
	font-size: 0.35rem;	
	letter-spacing:1px;
}
.verNum{
	float: right;
}
.backBox{
	width: 90%;
	height: 1rem;
	margin: 3.0rem auto 0;		
}
.backBtn{
	width: 100%;
	height: 100%;
	background-color: #2986fd;
	border: 1px solid #2986fd;
	color: #fff;
	letter-spacing: 2px;
	font-size: 0.35rem;
	border-radius: 0.075rem;
	outline: none;
}
.updateBtn{
	color: #fff;
	background-color: #1c7ffe;
	border: 1px solid #1c7ffe;
	outline: none;
	font-size: 0.3rem;
	padding: 0.05rem 0.15rem;
	border-radius: 0.075rem;
	margin-left: 50%;
	position: relative;
	top: -2px;

}
</style>