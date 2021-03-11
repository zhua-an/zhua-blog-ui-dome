<template>
  <div id="emptyPage">
    <router-view />
  </div>
</template>

<script>
export default {
  name: 'emptyPage',
  data () {
    return {}
  },
  watch: {},
  created () { },
  methods: {},
  computed: {}
}
</script>
<style lang="scss">
#emptyPage {
  width: 100%;
  height: 100%;
}
</style>