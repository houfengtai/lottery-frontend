<template>
    <div>
        <back-page></back-page>
    </div>
</template>

<script>
import BackPage from '@/components/public/back-page'
export default {
  name: 'add-trophy',
  components: { BackPage },
  data () {
    return {

    }
  },
  created () {
    document.title = '新增奖品'
  }
}
</script>

<style scoped>

</style>
