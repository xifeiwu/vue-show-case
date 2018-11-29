<template>
  <div id="custom_clipboard">

    <div class="button">
      <span>{{text}}</span>
    </div>
    <i class="paas-icon-copy" slot="reference"
       v-clipboard:copy="text"
       v-clipboard:success="handleClick.bind(this, 'copy')"></i>
  </div>
</template>

<style lang="scss" scoped>
  #custom_clipboard {
    height: 100%;
    position: relative;
  }
</style>
<script>
  export default {
    data() {
      return {
        text: 'to copy'
      }
    },
    methods: {
      handleClick(action) {
        console.log('copy');
      }
    }
  }
</script>