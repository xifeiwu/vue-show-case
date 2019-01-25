<template>
  <div id="element-switch">
    <el-switch
      v-model="value1"
      active-color="#13ce66"
      inactive-color="#ff4949">
    </el-switch>
    <label role="switch" class="el-switch">
      <input type="checkbox" name="" true-value="true" class="el-switch__input"
             @change="handleInputChange($event)">
      <span class="el-switch__core"
            style="width: 40px; border-color: rgb(255, 73, 73); background-color: rgb(255, 73, 73);"
      ></span>
    </label>
  </div>
</template>
<script>
  export default {
    mounted() {},
    data() {
      return {
        value1: true
      }
    },
    methods: {
      handleInputChange(evt) {
        console.log(evt);
      }
    }
  }
</script>