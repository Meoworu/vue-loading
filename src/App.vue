<template>
	<div id="app">
		<router-view/>
		<footer class="footer">
			<router-link to="/">
				<i class="icon1"></i>
				<p>首页</p>
			</router-link>
			<router-link to="/order">
				<i class="icon2"></i>
				<p>订单</p>
			</router-link>
			<router-link to="/mine">
				<i class="icon3"></i>
				<p>我的</p>
			</router-link>
		</footer>
	</div>
</template>

<script>
export default {
  name: 'App'
}
</script>

<style>
#app{
	-webkit-overflow-scrolling: touch;
    height: 100%;
	/*font-family: "SimSun";*/
}
.footer{
	position: fixed;
	bottom: 0;
	left: 0;
	right: 0;
	/*padding: 0.125rem 0;*/
	background-color: #fff;
  box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.6);
  -webkit-box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.6);
  -moz-box-shadow: 0 0 0.25rem 0 hsla(0,6%,58%,.6);
  display: none;
  
}
.footer a{
	float: left;
	width: 33.33%;
	text-align: center;
}
.footer i{
	display: inline-block;
	width: 0.6rem;
	height: 0.6rem;
	background-size: 0.6rem 0.6rem;
	background-repeat: no-repeat;
	background-position: center center;
}
/*.footer a:first-child i{
	background-image: url(assets/home.png);
}
.footer a:nth-child(2) i{
	background-image: url(assets/order.png);
}
.footer a:last-child i{
	background-image: url(assets/mine.png);
}*/
.footer p{
	font-size: 0.3rem;
}





</style>
