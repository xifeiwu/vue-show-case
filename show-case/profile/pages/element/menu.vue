<template>
  <div id="element-menu">
    <el-menu class="header-menu"
             mode="horizontal"
             menuTrigger="click"
             @select="handleMenuClick"
             :defaultActive="defaultActive"
             :collapse="false"
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

    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse" backgroundColor="gray">
      <el-submenu index="1">
        <template slot="title">
          <i class="el-icon-location"></i>
          <span slot="title">导航一</span>
        </template>
        <el-menu-item-group>
          <span slot="title">分组一</span>
          <el-menu-item index="1-1">选项1</el-menu-item>
          <el-menu-item index="1-2">选项2</el-menu-item>
        </el-menu-item-group>
        <el-menu-item-group title="分组2">
          <el-menu-item index="1-3">选项3</el-menu-item>
        </el-menu-item-group>
        <el-submenu index="1-4">
          <span slot="title">选项4</span>
          <el-menu-item index="1-4-1">选项1</el-menu-item>
        </el-submenu>
      </el-submenu>
      <el-menu-item index="2">
        <i class="el-icon-menu"></i>
        <span slot="title">导航二</span>
      </el-menu-item>
      <el-menu-item index="3">
        <i class="el-icon-setting"></i>
        <span slot="title">导航三</span>
      </el-menu-item>
    </el-menu>

    <template v-for="product in productList">
      <h3>{{product['title']}}</h3>
      <ul>
        <li v-for="(item, index) in product['list']" :key="index">
          {{item}}
        </li>
      </ul>
    </template>
  </div>
</template>
<style lang="scss">
</style>
<script>
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  /**
   * this component is used in page:
   * profile, manage, user
   */
  export default {
    directives: { Clickoutside },
    created() {
      console.log('created');
    },
    mounted() {
      console.log('mounted');
    },
    data() {
      return {
        defaultActive: 'profile',
        userName: '路人甲',

        isCollapse: true,

        productList: [{
          title: 'product1',
          list: ['a', 'b', 'c']
        }, {
          title: 'product2',
          list: ['d', 'e', 'f']
        }]
      }
    },
    methods: {
      handleMenuClick(key, keyPath) {
        console.log(key, keyPath);
      },
      handleClickOutsideMenu() {
      },

      handleOpen() {
        console.log('is open');
      },
      handleClose() {
        console.log('is closed');
      }
    }
  }
</script>