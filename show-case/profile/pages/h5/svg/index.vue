<template>
  <div id="h5-svg">
    <basic></basic>
  </div>
</template>

<style scoped>
  #h5-svg {
    height: 100%;
    overflow: scroll;
  }
</style>
<script>
  import basic from './basic.vue';
  export default {
    components: {basic},
    data: function () {
      return {}
    }
  }
</script>