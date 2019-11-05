<template>
    <div>
        <div class="search-box">
            <div class="search-other"><img src="/user.svg" @click="_go()"></div>
            <div class="search">
                <input v-model="phone" placeholder="请输入要查询的号码">
                <img src="/search.svg" @click="_queryData()">
            </div>
        </div>
        <div class="row-head">
            <div>序号</div>
            <div>手机号码</div>
            <div>座号</div>
            <div>次数</div>
            <div class="action">操作</div>
        </div>
        <div class="list-box">
            <div class="row" v-for="(item,index) in useres" :key="item.id">
                <div>{{index+1}}</div>
                <div>{{item.phone}}</div>
                <div>{{item.seatNo}}</div>
                <div>{{item.time}}</div>
                <div class="action">
                    <img src="/delete.svg" @click="_showDialog(item.id)">
                    <img src="/update.svg" @click="_updateUser(item)">
                </div>
            </div>
        </div>
        <div class="no-data" v-if="useres.length === 0">
            <img src="/no-data.svg">
            <div>暂无数据</div>
        </div>
        <div v-if="isShowBgDialog" class="bg-dialog"></div>
        <div v-if="isShowBgDialog" class="dialog-box">
            <div class="">确定要删除该用户吗?</div>
            <div>
                <button @click="isShowBgDialog=false">取 消</button>
                &nbsp;&nbsp;&nbsp;
                <button @click="_deleteUser()">确 定</button>
            </div>
        </div>
        <add-img url="/admin/prize/add"></add-img>
        <menu-bar :index="3"></menu-bar>
    </div>
</template>

<script src="./assets/js/prize-page.js"></script>

<style scoped>
@import "./assets/scss/prize-page.scss";
</style>
