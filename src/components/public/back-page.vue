<template>
    <div class="back-main">
        <div class="back-box" @click="_goToHistory()"><img src="@/assets/back.svg"><span>返回上一页</span></div>
        <div class="home-box" @click="_goToHome()"><img src="@/assets/home.svg"><span>首页</span></div>
        <div class="clear"></div>
    </div>
</template>

<script>
export default {
  name: 'back-page',
  methods: {
    _goToHistory () {
      this.$router.history.go(-1)
    },
    _goToHome () {
      this.$router.push({ name: 'activity' })
    }
  }
}
</script>

<style scoped>
.back-main{margin-top: 10px;width:100%;height: 20px;color:#666;font-size: 14px;padding-bottom:10px;border-bottom: 1px solid #e5e5e5;}
.back-box{width:90px;margin-left:5px;}
.back-box img{height:16px;margin-top:1px;float: left;}
.back-box span{float: left;}
.home-box{float: right;margin-right:10px;}
.home-box img{height:16px;margin-top:2px;float: left;}
.home-box span{float: right;margin-left:2px;}
</style>
