<template>
  <div class="father">
    <slot></slot>
  </div>
</template>

<style scoped>
</style>
<script>
  export default {
    mounted() {
      console.log(this.$slots.default);
    },
    data: function () {
      return {}
    }
  }
</script>