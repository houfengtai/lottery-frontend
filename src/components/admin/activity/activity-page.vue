<template>
    <div>
        <div class="foot-box">这是活动设置页面</div>
        <menu-bar :index="1"></menu-bar>
    </div>
</template>

<script>
import menuBar from '@/components/public/menu-bar'
export default {
  name: 'activity-page',
  components: { menuBar },
  created () {
    document.title = '活动管理'
  }
}
</script>

<style scoped>
.foot-box{
    height:1500px;
}
</style>
