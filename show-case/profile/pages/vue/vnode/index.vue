<template>
  <div id="vue-vnode">
    <father>
      <child></child>
      <child></child>
      <child>
        <template slot-scope="scoped">
          {{scoped.name}}
        </template>
      </child>
    </father>
  </div>
</template>

<style scoped>
  #vue-vnode {
    height: 100%;
    overflow: scroll;
  }
</style>
<script>
  import father from './father.vue';
  import child from './child.vue';
  export default {
    components: {father, child},
    data: function () {
      return {}
    }
  }
</script>