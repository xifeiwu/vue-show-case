<template>
  <div id="custom_others">
    <custom-drag></custom-drag>
  </div>
</template>

<style lang="scss" scoped>
  #custom_others {
    height: 100%;
    position: relative;
  }
</style>
<script>
  import CustomDrag from './components/drag.vue';
  export default {
    components: {CustomDrag}
  }
</script>