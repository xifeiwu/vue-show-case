<template>
  <div id="v-charts">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #v-charts {
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