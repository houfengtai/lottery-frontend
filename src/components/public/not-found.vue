<template>
    <div class="index">
        <img src="/404.svg">
        <div>404</div>
        <div>哎呀~访问的资源不存在</div>
    </div>
</template>

<script>
export default {
  name: 'not-found',
  created () {
    document.title = '404'
  }
}
</script>

<style scoped>
.index{
    width:150px;
    margin:50px auto;
    text-align: center;
    color:#999;line-height: 40px;
}
</style>
