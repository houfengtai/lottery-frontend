<template>
    <div>
        <back-page></back-page>
        <div>
            <div class="row border-bottom">
                <div class="row-label">手机号码</div>
                <div><input v-model="item.phone" maxlength="11" placeholder="请输入手机号码"></div>
            </div>
            <div class="row border-bottom">
                <div class="row-label">座位号码</div>
                <div><input v-model="item.seatNo" type="number" placeholder="请输入座位号码"></div>
            </div>
            <div class="row border-bottom">
                <div class="row-label">抽奖次数</div>
                <div><input v-model="item.num" type="number" placeholder="请输入可抽奖次数"></div>
            </div>
            <div class="tips">
                <div>温馨提示：</div>
                <div>1.手机号码为作为抽奖时唯一校验，必填</div>
                <div>2.抽奖次数为抽奖时可用次数，必填</div>
            </div>
            <div><button @click="_save()">保 存</button></div>
        </div>
    </div>
</template>

<script src="./assets/js/add-user.js"></script>

<style scoped>
    @import "./assets/scss/user.scss";
</style>
