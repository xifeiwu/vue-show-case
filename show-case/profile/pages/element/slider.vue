<template>
  <div id="element-slider">
    <div class="section-1">
      <div class="block">
        <span class="demonstration">默认</span>
        <el-slider v-model="value1" :showInput="true"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">自定义初始值</span>
        <el-slider v-model="value2"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">隐藏 Tooltip</span>
        <el-slider v-model="value3" :show-tooltip="false"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">格式化 Tooltip</span>
        <el-slider v-model="value4" :format-tooltip="formatTooltip"></el-slider>
      </div>
      <div class="block">
        <span class="demonstration">禁用</span>
        <el-slider v-model="value5" disabled></el-slider>
      </div>
    </div>
  </div>
</template>

<style lang="scss">
  #element-slider {
    max-width: 800px;
    margin: 0px auto;
    .section-1 {
      border: 1px solid #ebebeb;
      border-bottom-width: 0px;;
      border-radius: 3px;
      .block {
        padding: 30px 24px;
        overflow: hidden;
        border-bottom: 1px solid #eff2f6;
        .demonstration {
          font-size: 14px;
          color: #8492a6;
          line-height: 44px;
        }
        .el-slider {
          float: right;
          width: 70%;
          margin-right: 10px;
        }
      }
    }
  }
</style>
<script>
  export default {
    data() {
      return {
        value1: 0,
        value2: 50,
        value3: 36,
        value4: 48,
        value5: 42
      }
    },
    methods: {
      formatTooltip(val) {
        return val / 100;
      }
    }
  }
</script>