<template>
  <div id="vue-transition-effect">
    <div v-for="item in effectList" style="min-height: 120px; display: flex; flex-direction: row; justify-content: flex-start; align-items: center">
      <el-button @click="handleClick('toggle-show', item)" style="width: 240px;">toggle-{{item}}</el-button>
      <transition :name="item">
        <ul v-show="showStatus[item]" style="border: 1px solid gray; width: 200px; margin-left: 10px;">
          <li>{{item}}</li>
          <li>{{item}}</li>
          <li>{{item}}</li>
          <li>{{item}}</li>
          <li>{{item}}</li>
        </ul>
      </transition>
      <ul :class="['manual', item, showStatus[item] ? 'show':'']" style="border: 1px solid gray; width: 300px; margin-left: 10px;">
        <li>{{item}}</li>
        <li>{{item}}</li>
        <li>{{item}}</li>
        <li>{{item}}</li>
        <li>{{item}}</li>
      </ul>
    </div>
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
    transform: scaleX(0.75);
  }

  .el-zoom-in-top-enter-active,
  .el-zoom-in-top-leave-active {
    opacity: 1;
    transform: scaleY(1);
    transition: $--md-fade-transition;
    transform-origin: center top;
  }
  .el-zoom-in-top-enter,
  .el-zoom-in-top-leave {
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

  .custom-zoom-in-left-enter-active,
  .custom-zoom-in-left-leave-active {
    opacity: 1;
    transform: scaleX(1);
    transition: $--md-fade-transition;
    transform-origin: top left;
  }
  .custom-zoom-in-left-enter,
  .custom-zoom-in-left-leave-active {
    opacity: 0;
    transform: scaleX(.45);
  }

  .manual {
    &.el-zoom-in-left {
      transition: $--md-fade-transition;
      transform-origin: top left;
      opacity: 0;
      transform: scale(.45, .45);
      &.show {
        opacity: 1;
        transform: scale(1, 1);
      }
    }
  }
</style>

<script>
  export default {
    created() {
      this.effectList.forEach(it => {
        this.showStatus[it] = true;
      });
    },
    mounted() {
      setTimeout(() => {
        const elZoomInLeft = this.$el.querySelector('.manual.el-zoom-in-left');
        elZoomInLeft && elZoomInLeft.addEventListener('transitionend', (evt) => {
          const target = evt.target;
//          console.log(target);
          if (target.classList.contains('show')) {
            target.style.display = 'block';
          } else {
            target.style.display = 'none';
          }
        });
      });
    },
    data() {
      return {
        show: true,
        showStatus: {
          'el-zoom-in-top': true,
          'el-zoom-in-bottom': true,
          'el-zoom-in-left': true,
          'el-zoom-in-center': true,
          'custom-zoom-in-left': true
        },
        effectList: ['el-zoom-in-center', 'el-zoom-in-top', 'el-zoom-in-bottom', 'el-zoom-in-left', 'custom-zoom-in-left']
      }
    },
    methods: {
      handleClick(action, effect) {
        switch (action) {
          case 'toggle-show':
//            this.show = !this.show;
            this.showStatus[effect] = !this.showStatus[effect];
            const elZoomInLeft = this.$el.querySelector(`.manual.${effect}`);
            if (elZoomInLeft) {
              elZoomInLeft.style.display = 'block';
            }
            break;
        }
      }
    }
  }
</script>