<template>
  <div id="profile">
    <nav-menu></nav-menu>
    <div class="main">
      <router-view></router-view>
    </div>
    <el-button @click="handleClick('nofity')">notify</el-button>
  </div>
</template>
<style lang="scss" scoped>
#profile {
  display: flex;
  flex-shrink: row;
  .nav-menu {
    height: 100%;
    flex: 1;
  }
}
</style>

<script>
  import {mapState, mapGetters} from 'vuex';
  import navMenu from './components/nav-menu.vue';
  export default {
    components: {navMenu},
    create() {

    },
    mounted() {
      console.log(this);
      console.log(this.$store);
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