<template>
    <div>
        <back-page></back-page>
    </div>
</template>

<script>
import backPage from '@/components/public/back-page'
export default {
  name: 'add-user-prize',
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
    document.title = '新增指定中奖人信息'
  }
}
</script>

<style scoped>

</style>
