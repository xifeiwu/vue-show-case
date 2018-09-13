<template>
  <div id="echarts">
    <el-button @click="handleClick('nofity')">notify</el-button>
  </div>
</template>

<style lang="scss" scoped>

</style>

<script>
  export default {
    create() {

    },
    mounted() {
      this.$net.lazyLoad('/assets/libs/echarts.simple.min.js').then(result => {
        console.log(result);
      }).catch(err => {
        conosle.log(err);
      });
    },
    methods: {
      handleClick(action) {
        switch (action) {
          case 'nofity':
            const title = '错误';
            const message = 'message';
            this.$notify.error({
              title,
              message: message,
              duration: 0
            });
            break;
        }
      }
    }
  }
</script>