<template>
  <div id="h5">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #h5 {
    height: 100%;
    overflow: scroll;
  }
</style>
<script>
  export default {
    data: function () {
      return {}
    }
  }
</script>