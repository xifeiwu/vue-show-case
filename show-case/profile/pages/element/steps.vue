<template>
  <div id="element-slider">
    <div style="height: 300px;">
      <el-steps direction="vertical" :active="1">
        <el-step title="步骤 1"></el-step>
        <el-step title="步骤 2"></el-step>
        <el-step title="步骤 3" description="这是一段很长很长很长的描述性文字"></el-step>
      </el-steps>
    </div>
    <el-steps :active="1">
      <el-step title="步骤 1" icon="el-icon-edit"></el-step>
      <el-step title="步骤 2" icon="el-icon-upload"></el-step>
      <el-step title="步骤 3" icon="el-icon-picture"></el-step>
    </el-steps>
  </div>
</template>

<script>
  export default {
    created() {},
    mounted() {}
  }
</script>