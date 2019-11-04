<template>
    <div>
        <div class="trophy-box">
            <div v-for="item in trophes" :key="item.id" class="row">
                <span class="bg-color" :style="{background: item.bgColor}">{{item.seqNo}}</span>
                <span>&nbsp;&nbsp;&nbsp;{{item.trophyName}}</span>
                <div class="row-right">
                    <span>概率：{{item.probability}}</span>
                    <div class="img-box" @click="_updateTrophy(item)">
                        <img src="/update.svg">
                    </div>
                </div>
            </div>
        </div>
        <div class="add-box">
            <img src="/add.svg" @click="_addTrophy()">
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
      trophes: []
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
</style>
