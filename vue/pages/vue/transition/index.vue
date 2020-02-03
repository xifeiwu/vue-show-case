<template>
  <div id="vue-transition">
    <div class="demo">
      <!--<vue-transition></vue-transition>-->
      <!--<vue-transition-group></vue-transition-group>-->
      <vue-transition-effect></vue-transition-effect>
      <!--<vue-transition-cartoon></vue-transition-cartoon>-->
    </div>
    <!--<div>transition</div>-->
    <!--<div id="animated-number-demo">-->
      <!--<input v-model.number="number" type="number" step="20">-->
      <!--<p>{{ animatedNumber }}</p>-->
    <!--</div>-->
  </div>
</template>

<style scoped>
</style>
<script>
  import vueTransition from './transition.vue';
  import vueTransitionGroup from './transition-group.vue';
  import vueTransitionEffect from './effect.vue';
  import vueTransitionCartoon from './cartoon.vue';

  export default {
    components: { vueTransition, vueTransitionGroup, vueTransitionEffect, vueTransitionCartoon },
    created() {
    },
    async mounted() {
      const url = 'https://cdnjs.cloudflare.com/ajax/libs/gsap/1.20.3/TweenMax.min.js';
      await this.$net.lazyLoad(url);
    },
    data: function () {
      return {
        number: 0,
        tweenedNumber: 0
      }
    },
    watch: {
      number: function(newValue) {
//        TweenLite.to(this.$data, 0.5, { tweenedNumber: newValue });
      }
    },
    computed: {
      animatedNumber: function() {
        return this.tweenedNumber.toFixed(0);
      }
    },
  }
</script>