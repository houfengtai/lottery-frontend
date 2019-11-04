<template>
    <div>
        <div class="logo-box">
            <img src="./assets/images/lottery-logo.svg">
            <div class="title-box">幸运大抽奖后台管理系统</div>
        </div>
        <div class="content-box">
            <div><input placeholder="请输入账号" v-model="userName" maxlength="11"></div>
            <div><input type="password" maxlength="16" v-model="password" placeholder="请输入密码"></div>
            <div><button @click="_save()">登&nbsp;录</button></div>
        </div>
        <div class="copyright-box">©copyright 画风 2019-10-16</div>
    </div>
</template>

<script src="./assets/js/login-page.js"></script>

<style scoped>
@import "./assets/scss/lottery-page.scss";
</style>
