<template>
    <div>
        <div class="search-box">
            <div class="search-other"><img src="/list.svg" @click="isShowOtherList=!isShowOtherList"></div>
            <div class="search">
                <input v-model="phone" placeholder="请输入要查询的号码">
                <img src="/search.svg" @click="_queryData()">
            </div>
        </div>
        <div class="activity-box" v-show="isShowOtherList">
            <img class="jt" src="/star-bai.svg">
            <div class="activity-row" v-for="(item, index) in activites" :key="item.id" @click="_checkedActivity(item.id,item.activityName)">
                <span class="seq-no">{{index + 1}}</span>
                <span class="activity-title">{{item.activityName}}</span>
                <img v-if="item.id==activityId" src="/selected.svg">
            </div>
        </div>
        <div class="selected-tips">当前选择 > {{activityName}}</div>
        <div style="margin-top:80px;clear: both;">
            <div class="trophy-row" v-for="item in logs" :key="item.id">
                <div class="width-90">
                    <span class="phone-box">{{item.phone}}</span>
                    <span class="trophy-content-box">{{item.content}}</span>
                    <span class="time-box">{{_getTime(item.createTime)}}</span>
                </div>
            </div>
            <div class="no-data" v-if="logs.length === 0">
                <img src="/no-data.svg">
                <div>暂无数据</div>
            </div>
        </div>
        <menu-bar :index="4"></menu-bar>
    </div>
</template>

<script src="./assets/js/log-page.js"></script>

<style scoped>
@import "./assets/scss/log-page.scss";
</style>
