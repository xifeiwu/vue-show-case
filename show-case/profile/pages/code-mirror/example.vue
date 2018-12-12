<template>
  <div id="code-mirror-examples">
    <example-01></example-01>
    <example-15></example-15>
    <example-16></example-16>
  </div>
</template>
<style lang="scss"></style>
<script>
  import Vue from 'vue';

  import {
    example01,
    example02,
    example03,
    example04,
    example05,
    example06,
    example07,
    example08,
    example09,
    example10,
    example11,
    example12,
    example13,
    example14,
    example15,
    example16
  } from './example/index';

  export default {
    components: {
      example01,
      example02,
      example03,
      example04,
      example05,
      example06,
      example07,
      example08,
      example09,
      example10,
      example11,
      example12,
      example13,
      example14,
      example15,
      example16
    },
    created() {
    },
    mounted() {
//      console.log(example01);
    }
  }
</script>