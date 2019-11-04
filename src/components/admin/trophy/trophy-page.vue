<template>
    <div>
        <div class="list-head">
            <div style="width:60px;float: left;text-indent: 1em;">颜色</div>
            <div style="float: left;">&nbsp;&nbsp;&nbsp;奖品名称</div>
            <div style="float:right;width:150px;">
                <div style="">概率</div>
                <div style="float:right;width:60px;">操作</div>
            </div>
        </div>
        <div class="trophy-box">
            <div v-for="item in trophes" :key="item.id" class="row">
                <span class="bg-color" :style="{background: item.bgColor}">{{item.seqNo}}</span>
                <span>&nbsp;&nbsp;&nbsp;{{item.trophyName}}</span>
                <div class="row-right">
                    <span>{{item.probability}}</span>
                    <div class="img-box">
                        <img src="/delete.svg" @click="_showDialog(item.id)">
                        <img src="/update.svg" @click="_updateTrophy(item)">
                    </div>
                </div>
            </div>
        </div>
        <div class="add-box">
            <img src="/add.svg" @click="_addTrophy()">
        </div>
        <div v-if="isShowBgDialog" class="bg-dialog"></div>
        <div v-if="isShowBgDialog" class="dialog-box">
            <div class="">确定要删除该奖项吗?</div>
            <div>
                <button @click="isShowBgDialog=false">取 消</button>
                &nbsp;&nbsp;&nbsp;
                <button @click="_deleteTrophy()">确 定</button>
            </div>
        </div>
        <menu-bar :index="2"></menu-bar>
    </div>
</template>

<script src="./assets/js/trophy-page.js"></script>

<style scoped>
@import "./assets/scss/trophy-page.scss";
</style>
