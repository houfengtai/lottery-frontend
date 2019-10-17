<template>
    <div class="main">
        <div class="padding-div"></div>
        <div class="nav-box">
            <div v-for="nav in navs" :key="nav.id" class="nav-item" :class="{select:index==nav.id}">
                <div><img :src="_getImgUrl(index==nav.id,nav.name)"></div>
                <div>{{nav.label}}</div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
  name: 'menu-bar',
  data () {
    return {
      navs: [
        { id: 1, label: '活动', url: '', name: 'activity' },
        { id: 2, label: '奖品', url: '', name: 'trophy' },
        { id: 3, label: '设置', url: '', name: 'setting' },
        { id: 4, label: '记录', url: '', name: 'log' }
      ]
    }
  },
  props: ['index'],
  methods: {
    _getImgUrl (bool, name) {
      if (bool) return `/${name}-h.svg`
      return `/${name}.svg`
    }
  }

}
</script>

<style scoped>
.main{
    width: 100%;
}
.padding-div{
    height: 50px;
    background: none;
    width:100%;
}
.nav-box{
    height: 50px;
    background: none;
    position: fixed;
    left: 0;
    bottom: 0;
    width:100%;
    border-top:1px solid #e5e5e5;
    display: flex;
}
    .nav-item{
        flex-grow: 1;
        text-align: center;
        font-size:12px;
        color:#cdcdcd;
    }
.nav-item img{width:30px;height:30px;}
    .select{color:#ffbf02}
</style>
