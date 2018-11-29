<template>
  <div id="custom_others">
    <custom-drag></custom-drag>
    <jsx>
      <div slot="title">the demo for jsx</div><el-button>click Me!</el-button>
    </jsx>
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
  import jsx from './components/jsx';

  export default {
    components: {
      ElButton, CustomDrag,
      jsx
    }
  }
</script>