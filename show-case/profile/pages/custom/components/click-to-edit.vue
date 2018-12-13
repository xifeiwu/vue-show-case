<template>
  <div class="click-to-edit">
    <input type="text"
           v-if="edit"
           :value="valueLocal"
           @blur.native="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal);"
           @keyup.enter.native="valueLocal = $event.target.value; edit = false; $emit('input', valueLocal);"
           v-focus=""
    />
    <p v-else @click="edit = true;">
      {{valueLocal}}
    </p>
  </div>
</template>

<style lang="scss">

</style>
<script>
  export default {

    props: ['value'],

    data () {
      return {
        edit: false,
        valueLocal: this.value
      }
    },

    watch: {
      value: function() {
        this.valueLocal = this.value;
      }
    },

    methods: {
      handleClick(evt, action) {

      }
    }

  }
</script>