<template>
    <div>
        <div class="search-box">
            <div class="search-other"><img src="/user.svg"></div>
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

<script>
import menuBar from '@/components/public/menu-bar'
import addImg from '@/components/public/add-img'
import axios from 'axios'

export default {
  name: 'prize-page',
  components: { menuBar, addImg },
  data () {
    return {
      useres: [],
      phone: '',
      isShowBgDialog: false,
      id: null
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/prize/user').then(res => {
        if (res.data.code === 200) {
          this.useres = res.data.data
        } else {
          alert(res.data.message)
        }
      })
    },
    _deleteUser () {
      axios.delete(`/api/admin/prize/user/${this.id}`).then(res => {
        if (res.data.code === 200) {
          this.$router.history.go(0)
        } else {
          alert(res.data.message)
        }
      })
    },
    _updateUser (item) {
      window.localStorage.setItem('userItem', JSON.stringify(item))
      this.$router.push({ name: 'updatePrize' })
    },
    _showDialog (id) {
      this.isShowBgDialog = true
      this.id = id
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '抽奖人管理'
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
.no-data{
    text-align: center;
    color:#aaa;
    margin-top:200px;
}
.row-head{
    height: 40px;
    line-height: 40px;
    background: #666666;
    position: fixed;
    left:0;
    top:50px;
    padding:0px 15px;
    width:calc(100% - 30px);
}
.row-head div{
    float: left;
    color:#fff;
}
.list-box{
    margin-top:90px;
    clear: both;
}
.list-box .row{
    height: 50px;
    line-height: 50px;
    border-bottom:1px solid #e5e5e5;
    border-top:1px solid #e5e5e5;
    width:calc(100% - 30px);
    padding:0px 15px;
}
.list-box .row div{
    float: left;
}
.list-box .row div:nth-child(1),.row-head div:nth-child(1){
    width: 30px;
}
.list-box .row div:nth-child(2),.row-head div:nth-child(2){
    width: 100px;
    text-align: center;
}
.list-box .row div:nth-child(3),.row-head div:nth-child(3){
    width: 40px;
    text-align: center;
}
.list-box .row div:nth-child(4),.row-head div:nth-child(4){
    width: calc(100% - 240px);
    text-align: center;
}
.list-box .row div:nth-child(5),.row-head div:nth-child(5){
    width: 60px;
    float: right;
    text-align: center;
}
.list-box .row div.action,.row-head div.action{
    float: right;
}
.action img{
    float: right;
    width:20px;
    height:20px;
    margin: 15px 0px 15px 10px;
}
.dialog-box{
    width: 80%;
    height: 150px;
    position: fixed;
    left: calc( 10%);
    top: calc( 50% - 75px);
    background: #fff;
    border-radius: 5px;
    z-index: 2;
    text-align: center;
    font-size: 18px;
}
.dialog-box div{margin: 25px 0px}
.dialog-box button{
    display: inline-block;
    border: 1px solid #e5e5e5;
    height:40px;
    width: 70px;
    text-align: center;
    font-size: 14px;
    border-radius: 5px;
}
.dialog-box button:last-child{
    background: #ffbf02;
    border: 1px solid #ffbf02;
    color:#fff;
}
</style>
