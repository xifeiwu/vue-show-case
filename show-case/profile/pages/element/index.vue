<template>
  <div id="element">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #element {
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