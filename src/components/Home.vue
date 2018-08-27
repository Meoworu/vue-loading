<template>
  <div class="home">
    <h1>{{ msg }}</h1>
    <button @click="clickMe">跳轉</button>
  </div>
</template>

<script>
export default {
  name: 'Home',
  data () {
    return {
      msg: '首页'
    }
  },
  methods:{
  	clickMe() {
  		this.$router.push({
        path: '/order'
      });
  	}
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>

</style>