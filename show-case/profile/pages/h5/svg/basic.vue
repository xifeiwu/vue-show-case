<template>
  <div id="h5-svg">
    <div class="item rolling">
      <svg>
        <circle cx="100" cy="100" r="100" width="100" height="100" stroke-width="2" fill="none"
        ></circle>
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
      width: 200px;
      height: 200px;
      svg {
        width: 100%;
        height: 100%;
      }
      &.rolling {
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