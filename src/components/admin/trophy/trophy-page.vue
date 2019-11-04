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

<script>
import menuBar from '@/components/public/menu-bar'
import axios from 'axios'

export default {
  name: 'trophy-page',
  components: { menuBar },
  data () {
    return {
      trophes: [],
      isShowBgDialog: false,
      id: null
    }
  },
  methods: {
    _initData () {
      axios.get('/api/admin/trophes').then(res => {
        this.trophes = res.data.data
      })
    },
    _updateTrophy (item) {
      window.localStorage.setItem('trophyItem', JSON.stringify(item))
      this.$router.push({ name: 'updateTrophy' })
    },
    _addTrophy () {
      this.$router.push({ name: 'addTrophy' })
    },
    _showDialog (id) {
      this.isShowBgDialog = true
      this.id = id
    },
    _deleteTrophy () {
      axios.delete(`/api/admin/trophy/${this.id}`).then(res => {
        const code = res.data.code
        if (code === 200) {
          this.$router.history.go(0)
        }
      })
    }
  },
  mounted () {
    this._initData()
  },
  created () {
    document.title = '奖品管理'
  }
}
</script>

<style scoped>
.list-head{
    position: fixed;
    top: 0;
    left: 0;
    height: 40px;
    line-height: 40px;
    color: #fff;
    background: #2b2b2b;
    width: 100%;
}
.list-head div{
    float:left;
}
.trophy-box{margin-top:40px;}
.trophy-box .row{
    height: 50px;
    border-bottom: 1px solid #e5e5e5;
    border-top: 1px solid #e5e5e5;
    background: #fff;
    margin-top: 5px;
}
.trophy-box .row span{
    display: block;
    line-height:50px;
    height:50px;
    float: left;
}

.bg-color{
    width:60px;
    height:20px;
    text-indent: 1em;
}
.row-right{
    width: 150px;
    float: right;
}
.img-box{
   height: 50px;
   float: right;
}
.row-right img{
    float: right;
    margin-right:10px;
    height:20px;
    width:20px;
    margin-top: 15px;
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
