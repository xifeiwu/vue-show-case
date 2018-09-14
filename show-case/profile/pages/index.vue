<template>
  <div id="profile" class="spa">
    <nav-menu></nav-menu>
    <div class="main">
      <router-view></router-view>
    </div>
  </div>
</template>
<style lang="scss" scoped>
#profile {
  height: 100%;
  display: flex;
  flex-direction: row;
  .nav-menu {
    height: 100%;
  }
  .main {
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
//      console.log(this.$store);
//      console.log(this.$router);
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