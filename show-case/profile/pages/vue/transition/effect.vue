<template>
  <div id="vue-transition-effect">
    <template v-for="item in effectList">
      <transition :name="item">
        <ul v-show="show" style="border: 1px solid gray; display: block; max-width: 300px; margin: 10px;">
          <li>{{item}}</li>
          <li>{{item}}</li>
          <li>{{item}}</li>
          <li>{{item}}</li>
          <li>{{item}}</li>
        </ul>
      </transition>
    </template>
    <el-button @click="handleClick('toggle-show')">toggle</el-button>
  </div>
</template>

<style lang="scss">
  $--all-transition: all .3s cubic-bezier(.645,.045,.355,1) !default;
  $--fade-transition: opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) !default;
  $--fade-linear-transition: opacity 200ms linear !default;
  $--md-fade-transition: transform 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms, opacity 300ms cubic-bezier(0.23, 1, 0.32, 1) 100ms !default;
  $--border-transition-base: border-color .2s cubic-bezier(.645,.045,.355,1) !default;
  $--color-transition-base: color .2s cubic-bezier(.645,.045,.355,1) !default;
  .el-zoom-in-center-enter-active,
  .el-zoom-in-center-leave-active {
    transition: all .3s cubic-bezier(.55,0,.1,1);
  }
  .el-zoom-in-center-enter,
  .el-zoom-in-center-leave-active {
    opacity: 0;
    transform: scaleX(0);
  }

  .el-zoom-in-top-enter-active,
  .el-zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: $--md-fade-transition;
    transform-origin: center top;
  }
  .el-zoom-in-top-enter,
  .el-zoom-in-top-leave-active {
    opacity: 0;
    transform: scaleY(0);
  }

  .el-zoom-in-bottom-enter-active,
  .el-zoom-in-bottom-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: $--md-fade-transition;
    transform-origin: center bottom;
  }
  .el-zoom-in-bottom-enter,
  .el-zoom-in-bottom-leave-active {
    opacity: 0;
    transform: scaleY(0);
  }

  .el-zoom-in-left-enter-active,
  .el-zoom-in-left-leave-active {
    opacity: 1;
    transform: scale(1, 1);
    transition: $--md-fade-transition;
    transform-origin: top left;
  }
  .el-zoom-in-left-enter,
  .el-zoom-in-left-leave-active {
    opacity: 0;
    transform: scale(.45, .45);
  }
</style>

<script>
  export default {
    data() {
      return {
        show: true,
        effectList: ['el-zoom-in-top', 'el-zoom-in-bottom', 'el-zoom-in-left']
      }
    },
    methods: {
      handleClick(action) {
        switch (action) {
          case 'toggle-show':
            this.show = !this.show;
            break;
        }
      }
    }
  }
</script>