<template>
    <div>
        <back-page></back-page>
    </div>
</template>

<script>
import backPage from '@/components/public/back-page'
export default {
  name: 'update-user-prize',
  components: { backPage },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {
  },
  created () {
    document.title = '编辑指定中奖人信息'
  }
}
</script>

<style scoped>

</style>
