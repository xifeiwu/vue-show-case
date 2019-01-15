<template>
  <div id="h5-svg">
    <div>
      <basic></basic>
    </div>
    <div>
      <pie></pie>
    </div>
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
  import pie from './pie.vue';
  export default {
    components: {basic, pie},
    data: function () {
      return {}
    }
  }
</script>