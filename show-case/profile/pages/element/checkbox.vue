<template>
  <div id="element-checkbox">
    <div class="item">
      <label><input type="checkbox" v-model="checked">checkbox(原生)</label>
    </div>
    <div class="item">
      <label :class="{'custom-input': true, 'is-checked': isChecked}">
        <span class="inner">
          <span class="status"></span>
          <input type="checkbox" v-model="isChecked"
                 @keydown="handleKeyDown($event, 'custom-input')">
          <span class="desc">checkbox(原生)</span>
        </span>
      </label>
    </div>
    <div class="item">
      <el-checkbox v-model="checked1">checkbox1(备选项)</el-checkbox>
      <el-checkbox-button v-model="checked1">checkbox1(备选项)</el-checkbox-button>
    </div>
    <div class="item">
      <el-checkbox v-model="checked2" disabled>checkbox2(disabled)</el-checkbox>
      <el-checkbox-button v-model="checked2" disabled>checkbox2(disabled)</el-checkbox-button>
    </div>

    <div class="item">
      <el-checkbox-group v-model="checkboxGroup4" size="mini" :disabled="false">
        <el-checkbox-button v-for="city in cityOptions" :label="city" :key="city">{{city}}</el-checkbox-button>
      </el-checkbox-group>
    </div>
  </div>
</template>
<style lang="scss">
  #element-checkbox{
    padding: 10px;
    .item {
      margin: 5px;
      label.custom-input {
        &.is-checked {
          .inner {
            .status {
              background-color: #00b0e8;
              &::after {
                transform: rotate(45deg) scaleY(1);
              }
            }
          }
        }
        .inner {
          position: relative;
          height: 16px;
          .status {
            display: inline-block;
            width: 14px;
            height: 14px;
            vertical-align: middle;
            border: 1px solid #00b0e8;
            &::after {
              box-sizing: content-box;
              content: "";
              border: 1px solid #fff;
              border-left: 0;
              border-top: 0;
              height: 7px;
              top: 1px;
              left: 4px;
              position: absolute;
              transform: rotate(45deg) scaleY(0);
              width: 3px;
              transform-origin: center;
            }
          }
          .desc {
            font-size: 14px;
            line-height: 16px;
          }
        }
        input {
          position: absolute;
          left: -999px;
        }
      }
    }
  }
</style>
<script>
  export default {
    mounted() {},
    data() {
      return {
        checked: true,
        isChecked: false,
        checked1: true,
        checked2: false,
        cityOptions: ['上海', '北京', '广州', '深圳'],
        checkboxGroup4: ['上海'],
      }
    },
    watch: {
      checked(value) {
        console.log(value);
      }
    },
    methods: {
      handleKeyDown(evt, action) {
        switch (action) {
          case 'custom-input':

            break;
        }
      }
    }
  }
</script>