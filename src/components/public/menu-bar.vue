<template>
    <div class="main">
        <div class="padding-div"></div>
        <div class="nav-box"></div>
    </div>
</template>

<script>
export default {
  name: 'menu-bar'
}
</script>

<style scoped>
.main{
    width: 100%;
}
.padding-div{
    height: 50px;
    background: none;
    width:100%;
}
.nav-box{
    height: 50px;
    background: none;
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    border-top:1px solid #e5e5e5;
}
</style>
