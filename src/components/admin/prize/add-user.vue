<template>
    <div>
        <back-page></back-page>
    </div>
</template>

<script>
import BackPage from '@/components/public/back-page'
export default {
  name: 'add-user',
  components: { BackPage },
  data () {
    return {

    }
  },
  methods: {

  },
  mounted () {

  },
  created () {
    document.title = '设置用户信息'
  }
}
</script>

<style scoped>

</style>
