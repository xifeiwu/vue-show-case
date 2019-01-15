<template>
  <div id="h5-svg-basic">
    <div class="item rolling">
      <svg width="300" height="200" viewBox="0, 0, 300, 200">
        <circle cx="100" cy="100" r="100" width="100" height="100" stroke-width="2" fill="none"></circle>
      </svg>
    </div>
    <div class="item">
      <svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg">
        <circle cx="50" cy="50" r="50" stroke-width="20"></circle>
      </svg>
    </div>
    <div class="item">
      <svg width="200" height="150" viewBox="0, 0, 40, 30" style="border:1px solid #cd0000;">
        <rect x="10" y="5" width="20" height="15" fill="#cd0000"></rect>
      </svg>
    </div>
  </div>
</template>

<style lang="scss">
  @keyframes dash {
    from {
      stroke: black
    }
    to {
      stroke: red;
      stroke-dashoffset: 0;
    }
  }
  #h5-svg {
    .item {
      display: inline-block;
      width: 300px;
      height: 200px;
      > svg {
        width: 100%;
        height: 100%;
      }
      &.rolling {
        svg {
        }
        circle {
          stroke: black;
          stroke-dasharray: 15;
          stroke-dashoffset: 1;
          animation: dash 5s linear infinite;
        }
      }
    }
  }
</style>
<script>
  export default {
    created() {},
    mounted() {}
  }
</script>