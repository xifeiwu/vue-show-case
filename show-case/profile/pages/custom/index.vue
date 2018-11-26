<template>
  <div id="components">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #components {
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