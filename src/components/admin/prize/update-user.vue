<template>
    <div>
        <back-page></back-page>
    </div>
</template>

<script>
import BackPage from '@/components/public/back-page'
export default {
  name: 'update-user',
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
    document.title = '编辑用户信息'
  }
}
</script>

<style scoped>

</style>
