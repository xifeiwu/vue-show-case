<template>
  <div id="profile" class="spa">
    <nav-menu :activeSideMenuItem="activeSideMenuItem"></nav-menu>
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
    height: 100%;
    overflow: scroll;
  }
}
</style>

<script>
  import {mapState, mapGetters} from 'vuex';
  import navMenu from './nav-menu.vue';
  export default {
    components: {navMenu},
    create() {

    },
    mounted() {
      this.onRoute(this.$route);
    },
    watch: {
      '$route': 'onRoute',
    },
    data() {
      return {
        activeSideMenuItem: '/notify'
      }
    },
    methods: {
      onRoute (route, oldValue) {
        const relativePath = route.path;
        this.activeSideMenuItem = relativePath;

      },
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