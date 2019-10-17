<template>
    <div>
        <div class="activity-box">
            <div v-for="(item,index) in activites" :key="item.id" class="item-content">
                <div @click="_setSelected(index)" class="item-box">
                    <div class="left-box">
                        <div class="label-box"><span>{{item.activityName}}</span></div>
                        <div class="time-box">
                            {{_getTime(item.startTime,item.endTime)}}
                            <span style="float: right;margin-right:15px;">
                            状态:
                            <span :class="{green:item.status==1,red:item.status==0}">{{_getStatus(item.status)}}</span>
                        </span>
                        </div>
                    </div>
                    <div class="right-box">
                        <img v-if="item.status==1" src="./assets/images/stop.svg">
                        <img v-if="item.status==0" src="./assets/images/start.svg">
                        <img src="./assets/images/update.svg">
                    </div>
                </div>
                <div v-show="item.isSelected" class="pointer-img"><img src="./assets/images/triangle.svg"></div>
                <div v-show="item.isSelected" v-html="item.remark" class="desc-box">
                    {{item.remark}}
                </div>
            </div>
            <div class="add-box">
                <img src="./assets/images/add.svg">
            </div>
        </div>
        <menu-bar :index="1"></menu-bar>
    </div>
</template>

<script src="./assets/js/activity-page.js"></script>
<style scoped>
@import "./assets/scss/activity-page.scss";
</style>
