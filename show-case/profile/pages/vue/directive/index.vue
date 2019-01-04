<template>
  <div  id="vue-directive">
    <div v-show-props.message="message" v-if="false">
    </div>
    <div v-show-props.count="count" :title="msg">
    </div>
  </div>
</template>

<style lang="scss">

</style>

<script>
  import showProps from './show-prop';
  export default {
    directives: {showProps},
    mounted() {
      // show the use of vnode.context and directive.update
      this.interval = setInterval(() => {
        this.count += 1;
      }, 3000);
    },
    beforeDestroy() {
//      console.log(this.interval);
      clearInterval(this.interval);
    },
    data() {
      return {
        interval: null,
        count: 0,
        message: 'the message'
      }
    }
  }
</script>