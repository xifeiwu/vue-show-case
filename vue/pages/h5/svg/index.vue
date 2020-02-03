<template>
  <div id="h5-svg">
    <div>
      <basic></basic>
    </div>
    <div>
      <pie></pie>
    </div>
    <div>
      <pie2></pie2>
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
  import pie2 from './pie-2.vue';
  export default {
    components: {basic, pie, pie2},
    data: function () {
      return {}
    }
  }
</script>