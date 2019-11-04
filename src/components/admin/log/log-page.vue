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
                    <span class="content-box">{{item.content}}</span>
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

<script>
import menuBar from '@/components/public/menu-bar'
import axios from 'axios'
import dateUtil from '@/components/public/dateUtil.js'

export default {
  name: 'log-page',
  components: { menuBar },
  data () {
    return {
      isShowOtherList: false,
      activites: [],
      logs: [],
      activityId: 0,
      activityName: '',
      phone: ''
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/activites').then(res => {
        const data = res.data.data
        if (data.length > 0) {
          this.activityId = data[0].id
          this.activityName = data[0].activityName
          this._queryData()
        }
        this.activites = data
      })
    },
    _checkedActivity (id, name) {
      this.activityId = id
      this.isShowOtherList = false
      this.activityName = name
      this._queryData()
    },
    _queryData () {
      const param = `activityId=${this.activityId}&phone=${this.phone}`
      axios.get('/api/admin/user/trophes?' + param).then(res => {
        const data = res.data.data
        this.logs = data
      })
    },
    _getTime (time) {
      return dateUtil.dateFormat('hh:mm', new Date(time))
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '中奖记录查询'
  }
}
</script>

<style scoped>
.search-box{
    height:50px;
    background: #2b2b2b;
    width:100%;
    position: fixed;
    left:0;
    top:0;
}
.search{
    width: 250px;
    height:34px;
    margin-top:8px;
    margin-right:15px;
    border-radius: 20px;
    background: #f5f5f5;
    float: right;
}
.search input{
    height:32px;
    border:0;
    line-height:36px;
    width:220px;
    border-radius: 20px;
    display: block;
    float: left;
    text-indent: 1em;
    background: #f5f5f5;
}
.search img{
    margin-top:3px;
}
.search-other{
    float: left;
    margin-left: 15px;
    margin-top: 10px;
}
.activity-box{
    position: fixed;
    left:0;
    top:50px;
    width: 100%;
    min-height: 50px;
    background: #fff;
    z-index: 2;
}
.activity-box img.jt{
    top: -12px;
    left: 18px;
    position: absolute;
}
.activity-row{
    height:50px;
    line-height: 50px;
    border-bottom:1px solid #e5e5e5;
}
.activity-row span{
    display: inline-block;
}
.seq-no{
    width:30px;
    text-indent: 1em;
    float: left;
}
.activity-title{
    width: calc(100% - 80px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
.activity-row img{
    float: right;
    margin: 15px 15px 0px 0px;
}
.selected-tips{
    position: fixed;
    height:30px;
    line-height: 30px;
    font-size:12px;
    color: #ffbf02;
    width:calc(100% - 15px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
    clear: both;
    top: 50px;
    left:0;
    text-indent: 1em;
    padding-right: 15px;
    background: #f5f5f5;
}
.time-box{
    display: block;
    float: right;
    width: 40px;
    text-align: center;
}
.width-90{
    width:95%;
    margin: auto;
}
.phone-box{
    display: block;
    float:left;
    width:100px;
}
.content-box{
    display: block;
    float:left;
    width:calc(100% - 140px);
    text-overflow: ellipsis;
    white-space: nowrap;
    overflow: hidden;
}
    .trophy-row{
        height: 50px;
        line-height: 50px;
        width:100%;
        border-bottom:1px solid #e5e5e5;
        border-top:1px solid #e5e5e5;
    }
.no-data{
    text-align: center;
    color:#aaa;
    margin-top:200px;
}
</style>
