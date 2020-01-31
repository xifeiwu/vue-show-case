<template>
  <div id="element-tab">
    <el-tabs>
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>

    <el-tabs type="border-card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-tabs type="card">
      <el-tab-pane>
        <span slot="label"><i class="el-icon-date"></i> 我的行程</span>
        我的行程
      </el-tab-pane>
      <el-tab-pane label="消息中心">消息中心</el-tab-pane>
      <el-tab-pane label="角色管理">角色管理</el-tab-pane>
      <el-tab-pane label="定时任务补偿">定时任务补偿</el-tab-pane>
    </el-tabs>
    <el-tabs type="border-card" @tab-click="handleClick">
      <el-tab-pane label="我的行程"></el-tab-pane>
      <el-tab-pane label="消息中心"></el-tab-pane>
      <el-tab-pane label="角色管理"></el-tab-pane>
      <el-tab-pane label="定时任务补偿"></el-tab-pane>
    </el-tabs>

    <el-tabs type="border-tab" @tab-click="handleClick">
      <el-tab-pane label="我的行程"></el-tab-pane>
      <el-tab-pane label="消息中心"></el-tab-pane>
      <el-tab-pane label="角色管理"></el-tab-pane>
      <el-tab-pane label="定时任务补偿"></el-tab-pane>
    </el-tabs>
  </div>
</template>
<style lang="scss" scoped>
  #element-tab {
    .el-tabs {
      margin-top: 5px;
      &.el-tabs--border-tab {
        display: inline-block;
      }
    }
  }
</style>
<script>
  export default {
    methods: {
      handleClick(tab, tabName, event) {
        console.log(tab, tabName, event);
//        console.log(event);
      }
    }
  }
</script>