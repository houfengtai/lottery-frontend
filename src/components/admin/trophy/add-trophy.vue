<template>
    <div>
        <back-page></back-page>
        <div class="trophy-row margin-bottom-10 border-bottom">
            <div class="row-label">所属活动</div>
            <span class="ac-content" @click="isShowActivites=!isShowActivites">
                <span class="ac-title">{{activityName}}</span>
                <span><img src="/next.svg"></span>
            </span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">奖品名称</div>
            <span><input v-model="item.trophyName" style="width:calc(100% - 85px);" maxlength="10" placeholder="请输入奖品名称"/></span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">奖品概率</div>
            <span><input v-model="item.probability" maxlength="5" type="number" placeholder="请输入奖品概率"/></span>
        </div>
        <div class="trophy-row border-top">
            <div class="row-label">背景颜色</div>
            <span>
                <label style="color: #aaaaaa;font-weight: normal;">#</label>
                <input style="width:120px;" maxlength="6" v-model="selectedColor" placeholder="奖项背景颜色"/>
            </span>
            <span class="color-yl" :style="{background:'#'+ selectedColor}"></span>
        </div>
        <div class="trophy-row border-top border-bottom">
            <div class="row-label">奖品序号</div>
            <span><input v-model="item.seqNo" max="2" type="number" placeholder="请输入奖品序号"/></span>
        </div>
        <div class="tips">
            <div>温馨提示：</div>
            <div>1.中奖概率为正整数,数值越大中奖概率越高,0为不中奖</div>
            <div>2.背景颜色为轮盘奖项背景颜色[1~9a~z]6位数</div>
            <div>3.奖品序号为该奖项所在的顺序</div>
        </div>
        <div><button @click="_save()">保 存</button></div>

        <div v-if="isShowActivites" class="bg-dialog"></div>
        <div class="activity-box" v-show="isShowActivites">
            <div class="activity-row" v-for="(entity, index) in activites" :key="entity.id" @click="_checkedActivity(entity.id,entity.activityName)">
                <span class="seq-no">{{index + 1}}</span>
                <span class="activity-title">{{entity.activityName}}</span>
                <img v-if="entity.id===item.activityId" src="/selected.svg">
            </div>
        </div>
    </div>
</template>

<script src="./assets/js/add-trophy.js"></script>

<style scoped>
@import "./assets/scss/trophy.scss";
</style>
