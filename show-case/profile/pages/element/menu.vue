<template>
  <div id="element-menu">
    <el-menu class="header-menu"
             mode="horizontal"
             menuTrigger="click"
             @select="handleMenuClick"
             :defaultActive="defaultActive"
             ref="menu"
             v-clickoutside="handleClickOutsideMenu"
    >
      <el-menu-item index="manage">管理后台</el-menu-item>
      <el-menu-item index="profile">控制台</el-menu-item>
      <el-menu-item index="docs">帮助文档</el-menu-item>
      <el-menu-item index="user/group">团队管理</el-menu-item>
      <el-menu-item index="message" v-show="true">消息中心</el-menu-item>
      <el-submenu index="user" :withDrawOnMouseLeave="false">
        <template slot="title"><i class="paas-icon-user"></i>{{userName}}</template>
        <el-menu-item index="info"><span>用户中心</span></el-menu-item>
        <el-menu-item index="logout"><i class="paas-icon-logout"></i><span>退出</span></el-menu-item>
      </el-submenu>
    </el-menu>
  </div>
</template>
<style lang="scss">
</style>
<script>
  export default {
    created() {
      console.log('created');
    },
    mounted() {
      console.log('mounted');
    },
    data() {
      return {
        defaultActive: 'profile',
        userName: '路人甲'
      }
    },
    methods: {
      handleMenuClick(key, keyPath) {
        console.log(key, keyPath);
      }
    }
  }
</script>