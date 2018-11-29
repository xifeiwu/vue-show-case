<template>
  <div
    class="custom-drag"
    @mouseenter="handleMouseEnter"
    @mouseleave="handleMouseLeave"
    @mousedown="onButtonDown"
    @touchstart="onButtonDown"
    :class="{ 'hover': hovering, 'dragging': dragging }"
    :style="posStyle"
    tabindex="0"
    ref="button"
    @focus="handleMouseEnter"
    @blur="handleMouseLeave"
    @keydown.left="onLeftKeyDown"
    @keydown.right="onRightKeyDown"
    @keydown.down.prevent="onLeftKeyDown"
    @keydown.up.prevent="onRightKeyDown"
  >
    <div class="custom-drag__button">
      <span v-if="false">{{ status }}</span>
    </div>
  </div>
</template>

<style lang="scss">

  $namespace: 'custom';
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

  @mixin utils-vertical-center {
    $selector: &;
    @at-root {
      #{$selector}::after {
        display: inline-block;
        content: "";
        height: 100%;
        vertical-align: middle
      }
    }
  }


  @include b(drag) {
    position: absolute;
    width: 50px;
    height: 50px;
    /*border: 1px solid gray;*/
    text-align: center;
    @include utils-vertical-center;

    @include e(button) {
      width: 36px;
      height: 36px;
      border-radius: 50%;
      /*user-select: none;*/
      border: solid 2px #409EFF;
      background-color: #fff;
      display: inline-block;
      vertical-align: middle;

      &:hover,
      &.hover {
        transform: scale(1.2);
        cursor: grab;
      }

      &.dragging {
        cursor: grabbing;
      }
    }
  }
</style>
<script>

  export default {
    name: 'CustomDrag',

    mounted() {
      this.posX = this.x;
      this.posY = this.y;
    },

    props: {
      value: {
        type: Number,
        default: 0
      },
      disabled: {
        type: Boolean,
        default: false
      },
      x: {
        type: Number,
        default: 0
      },
      y: {
        type: Number,
        default: 0
      },

    },

    data() {
      return {
        hovering: false,
        dragging: false,
        isClick: false,
        posX: 0,
        posY: 0,
        startPosX: null,
        startPosY: null,
        startX: 0,
        startY: 0,
        currentX: 0,
        currentY: 0,
        dx: 0,
        dy: 0,
        oldValue: this.value
      };
    },

    computed: {
      status() {
        return 'status';
      },
      posStyle() {
        var style = `top: ${this.posY}px; left: ${this.posX}px`;
//        console.log(style);
        return style;
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
        this.hovering = true;
        this.displayTooltip();
      },

      handleMouseLeave() {
//        this.hovering = false;
//        this.hideTooltip();
      },

      onButtonDown(event) {
        if (this.disabled) return;
        event.preventDefault();
        this.onDragStart(event);
        window.addEventListener('mousemove', this.onDragging);
        window.addEventListener('touchmove', this.onDragging);
        window.addEventListener('mouseup', this.onDragEnd);
        window.addEventListener('touchend', this.onDragEnd);
        window.addEventListener('contextmenu', this.onDragEnd);
      },
      onLeftKeyDown() {
        console.log('keydown');
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
        this.dragging = true;
        this.isClick = true;
        if (event.type === 'touchstart') {
          event.clientY = event.touches[0].clientY;
          event.clientX = event.touches[0].clientX;
        }
        this.startX = event.clientX;
        this.startY = event.clientY;

        this.startPosX = this.posX;
        this.startPosY = this.posY;
      },

      onDragging(event) {
        if (this.dragging) {
          this.isClick = false;
          this.displayTooltip();
//          this.$parent.resetSize();
          let diff = 0;
          if (event.type === 'touchmove') {
            event.clientY = event.touches[0].clientY;
            event.clientX = event.touches[0].clientX;
          }
          this.currentX = event.clientX;
          this.currentY = event.clientY;
          this.dx = this.currentX - this.startX;
          this.dy = this.currentY - this.startY;
          this.posX = this.startPosX + this.dx;
          this.posY = this.startPosY + this.dy;
        }
      },

      onDragEnd(evt) {
        if (this.dragging) {
          /*
           * 防止在 mouseup 后立即触发 click，导致滑块有几率产生一小段位移
           * 不使用 preventDefault 是因为 mouseup 和 click 没有注册在同一个 DOM 上
           */
          setTimeout(() => {
            this.dragging = false;
            this.hideTooltip();
            if (!this.isClick) {
//              this.setPosition(this.newPosition);
//              this.$parent.emitChange();
            }
          }, 0);
          window.removeEventListener('mousemove', this.onDragging);
          window.removeEventListener('touchmove', this.onDragging);
          window.removeEventListener('mouseup', this.onDragEnd);
          window.removeEventListener('touchend', this.onDragEnd);
          window.removeEventListener('contextmenu', this.onDragEnd);
        }
//        console.log(evt.target);
//        console.log(document.activeElement);
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
