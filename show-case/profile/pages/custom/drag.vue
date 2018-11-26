<template>
  <div
    class="com-drag"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    :class="{ 'hover': hovering, 'dragging': dragging }"
    :style="wrapperStyle"
    ref="button"
    tabindex="0"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown.left="onLeftKeyDown"
    @keydown.right="onRightKeyDown"
    @keydown.down.prevent="onLeftKeyDown"
    @keydown.up.prevent="onRightKeyDown"
  >
    <span>{{ formatValue }}</span>
  </div>
</template>

<style lang="scss">
  $namespace: 'com';
  $element-separator: '__';
  $modifier-separator: '--';
  $state-prefix: 'is-';

  $--slider-height: 6px !default;
  $--slider-button-size: 16px !default;
  $--slider-button-wrapper-size: 36px !default;
  $--slider-button-wrapper-offset: -15px !default;

  @function hitAllSpecialNestRule($selector) {
    @return false;
  }

  @mixin b($block) {
    $B: $namespace+'-'+$block !global;

    .#{$B} {
      @content;
    }
  }
  @mixin e($element) {
    $E: $element !global;
    $selector: &;
    $currentSelector: "";
    @each $unit in $element {
      $currentSelector: #{$currentSelector + "." + $B + $element-separator + $unit + ","};
    }

    @if hitAllSpecialNestRule($selector) {
      @at-root {
        #{$selector} {
          #{$currentSelector} {
            @content;
          }
        }
      }
    } @else {
      @at-root {
        #{$currentSelector} {
          @content;
        }
      }
    }
  }


  @include b(drag) {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    user-select: none;
    border: solid 2px #409EFF;
    background-color: #fff;
    @include e(inner) {

    }
  }
</style>
<script>

  export default {
    name: 'ComDrag',

    props: {
      value: {
        type: Number,
        default: 0
      },
    },

    data() {
      return {
        hovering: false,
        dragging: false,
        isClick: false,
        startX: 0,
        currentX: 0,
        startY: 0,
        currentY: 0,
        startPosition: 0,
        newPosition: null,
        oldValue: this.value
      };
    },

    computed: {
      disabled() {
        return false;
      }
    },

    watch: {
      dragging(val) {
      }
    },

    methods: {
      displayTooltip() {
//        this.$refs.tooltip && (this.$refs.tooltip.showPopper = true);
      },

      hideTooltip() {
//        this.$refs.tooltip && (this.$refs.tooltip.showPopper = false);
      },

      handleMouseEnter() {
//        this.hovering = true;
//        this.displayTooltip();
      },

      handleMouseLeave() {
//        this.hovering = false;
//        this.hideTooltip();
      },

      onButtonDown(event) {
//        if (this.disabled) return;
//        event.preventDefault();
//        this.onDragStart(event);
//        window.addEventListener('mousemove', this.onDragging);
//        window.addEventListener('touchmove', this.onDragging);
//        window.addEventListener('mouseup', this.onDragEnd);
//        window.addEventListener('touchend', this.onDragEnd);
//        window.addEventListener('contextmenu', this.onDragEnd);
      },
      onLeftKeyDown() {
//        if (this.disabled) return;
//        this.newPosition = parseFloat(this.currentPosition) - this.step / (this.max - this.min) * 100;
//        this.setPosition(this.newPosition);
      },
      onRightKeyDown() {
//        if (this.disabled) return;
//        this.newPosition = parseFloat(this.currentPosition) + this.step / (this.max - this.min) * 100;
//        this.setPosition(this.newPosition);
      },
      onDragStart(event) {
//        this.dragging = true;
//        this.isClick = true;
//        if (event.type === 'touchstart') {
//          event.clientY = event.touches[0].clientY;
//          event.clientX = event.touches[0].clientX;
//        }
//        if (this.vertical) {
//          this.startY = event.clientY;
//        } else {
//          this.startX = event.clientX;
//        }
//        this.startPosition = parseFloat(this.currentPosition);
//        this.newPosition = this.startPosition;
      },

      onDragging(event) {
//        if (this.dragging) {
//          this.isClick = false;
//          this.displayTooltip();
//          this.$parent.resetSize();
//          let diff = 0;
//          if (event.type === 'touchmove') {
//            event.clientY = event.touches[0].clientY;
//            event.clientX = event.touches[0].clientX;
//          }
//          if (this.vertical) {
//            this.currentY = event.clientY;
//            diff = (this.startY - this.currentY) / this.$parent.sliderSize * 100;
//          } else {
//            this.currentX = event.clientX;
//            diff = (this.currentX - this.startX) / this.$parent.sliderSize * 100;
//          }
//          this.newPosition = this.startPosition + diff;
//          this.setPosition(this.newPosition);
//        }
      },

      onDragEnd() {
//        if (this.dragging) {
//          /*
//           * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
//           * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
//           */
//          setTimeout(() => {
//            this.dragging = false;
//            this.hideTooltip();
//            if (!this.isClick) {
//              this.setPosition(this.newPosition);
//              this.$parent.emitChange();
//            }
//          }, 0);
//          window.removeEventListener('mousemove', this.onDragging);
//          window.removeEventListener('touchmove', this.onDragging);
//          window.removeEventListener('mouseup', this.onDragEnd);
//          window.removeEventListener('touchend', this.onDragEnd);
//          window.removeEventListener('contextmenu', this.onDragEnd);
//        }
      },

      setPosition(newPosition) {
//        if (newPosition === null) return;
//        if (newPosition < 0) {
//          newPosition = 0;
//        } else if (newPosition > 100) {
//          newPosition = 100;
//        }
//        const lengthPerStep = 100 / ((this.max - this.min) / this.step);
//        const steps = Math.round(newPosition / lengthPerStep);
//        let value = steps * lengthPerStep * (this.max - this.min) * 0.01 + this.min;
//        value = parseFloat(value.toFixed(this.precision));
//        this.$emit('input', value);
//        this.$nextTick(() => {
//          this.$refs.tooltip && this.$refs.tooltip.updatePopper();
//        });
//        if (!this.dragging && this.value !== this.oldValue) {
//          this.oldValue = this.value;
//        }
      }
    }
  };
</script>
