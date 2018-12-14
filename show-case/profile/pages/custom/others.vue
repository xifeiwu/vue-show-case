<template>
  <div id="custom_others">
    <custom-drag></custom-drag>
    <jsx>
      <div slot="title">the demo for jsx</div><el-button>click Me!</el-button>
    </jsx>
    <click-to-edit v-model="gitBranch"></click-to-edit>
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
  import ClickToEdit from './components/click-to-edit.vue';
  import jsx from './components/jsx';

  export default {
    data() {
      return {
        gitlab: 'http://www.gitlab.com/show-case',
        gitBranch: ''
      }
    },
    components: {
      CustomDrag,
      ClickToEdit,
      jsx
    }
  }
</script>