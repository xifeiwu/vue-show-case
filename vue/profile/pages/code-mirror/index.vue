<template>
  <div id="code-mirror">
    <router-view></router-view>
  </div>
</template>

<style scoped>
  #code-mirror {
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