<template>
    <div>
        <back-page></back-page>
    </div>
</template>

<script>
import BackPage from '@/components/public/back-page'
export default {
  name: 'update-trophy',
  components: { BackPage },
  data () {
    return {

    }
  },
  created () {
    document.title = '编辑奖品'
  }
}
</script>

<style scoped>

</style>
