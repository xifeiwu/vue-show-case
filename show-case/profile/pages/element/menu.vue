<template>
  <div id="element-menu">
    <div class="header" style="display: flex; justify-content: space-between; background-color: #fafafa; border-bottom: 1px solid #ebebeb;">
      <div class="blank"></div>
      <el-menu class="horizontal-menu"
               mode="horizontal"
               menuTrigger="hover"
               @select="handleMenuClick"
               :defaultActive="defaultActive"
               :collapse="false"
               ref="menu"
               v-clickoutside="handleClickOutsideMenu"
               style="display: inline-block;"
               backgroundColor="#fafafa"
               text-color="#909399"
               active-text-color="#000"
      >
        <el-menu-item index="message" v-show="true"><i class="paas-icon-message"></i><span>消息中心</span></el-menu-item>
        <el-submenu index="d">
          <template slot="title"><i class="paas-icon-level-up"></i><span>页面跳转</span></template>
          <el-menu-item index="manage"><i class="paas-icon-manage"></i><span>管理后台</span></el-menu-item>
          <el-menu-item index="profile"><i class="paas-icon-profile"></i><span>控制台</span></el-menu-item>
          <el-menu-item index="docs"><i class="paas-icon-docs"></i><span>帮助文档</span></el-menu-item>
        </el-submenu>
        <el-submenu index="user" :withDrawOnMouseLeave="false">
          <template slot="title"><i class="paas-icon-user"></i><span>{{userName}}</span></template>
          <el-menu-item index="info"><i class="paas-icon-user"></i><span>用户中心</span></el-menu-item>
          <el-menu-item index="group"><i class="paas-icon-group"></i><span>团队管理</span></el-menu-item>
          <el-menu-item index="logout"><i class="paas-icon-logout"></i><span>退出</span></el-menu-item>
        </el-submenu>
      </el-menu>
    </div>

    <el-radio-group v-model="isCollapse" style="margin-bottom: 20px;">
      <el-radio-button :label="false">展开</el-radio-button>
      <el-radio-button :label="true">收起</el-radio-button>
    </el-radio-group>
    <el-menu default-active="1-4-1" class="el-menu-vertical-demo" @open="handleOpen" @close="handleClose"
             :collapse="isCollapse"
             background-color="#545c64"
             text-color="#fff"
             active-text-color="#ffd04b"
             style="max-width: 300px;">
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
          <el-menu-item index="1-4-2">选项2</el-menu-item>
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

    <!--the use of template-->
    <template v-for="product in productList">
      <h3>{{product['title']}}</h3>
      <ul>
        <li v-for="(item, index) in product['list']" :key="index">
          {{item}}
        </li>
      </ul>
    </template>

    <div class="color-section">
      <div v-for="(item, index) in colorList"
           @mouseover="handleMouseOver(item)"
           class="item"
           :style="{ backgroundColor: item.hover ? item.hover : item.origin }"></div>
    </div>
  </div>
</template>
<style lang="scss">
  #element-menu {
    .header {
      height: 32px;
      .el-menu.horizontal-menu {
        padding-right: 30px;
        /*border-bottom: solid 1px #e6e6e6;*/
        border-bottom-width: 0px;
        .el-submenu {
          .el-submenu__title {
            line-height: 32px;
            height: 32px;
            padding: 0px 8px;
          }
          & > .el-menu {
            top: 36px;
          }
        }
        .el-menu-item {
          line-height: 32px;
          height: 32px;
          padding: 0px 8px;
        }
      }
    }
  }
  .color-section {
    .item {
      display: inline-block;
      margin: 3px;
      width: 50px;
      height: 50px;
      border-radius: 10px;
    }
  }
</style>
<script>
  import Clickoutside from 'element-ui/src/utils/clickoutside';
  import ElSubmenu from "../../../../element-ui/packages/menu/src/submenu";
  /**
   * this component is used in page:
   * profile, manage, user
   */
  export default {
    components: {ElSubmenu}, directives: { Clickoutside },
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

        isCollapse: false,

        productList: [{
          title: 'product1',
          list: ['a', 'b', 'c']
        }, {
          title: 'product2',
          list: ['d', 'e', 'f']
        }],

        colorList: [{
          origin: '#409EFF', hover: ''
        }, {
          origin: '#67C23A', hover: ''
        }, {
          origin: '#E6A23C', hover: ''
        }, {
          origin: '#F56C6C', hover: ''
        }, {
          origin: '#909399', hover: ''
        }, {
          origin: '#ffffff', hover: ''
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
      },

      getColorChannels(color) {
        color = color.replace('#', '');
        if (/^[1-9a-fA-F]{3}$/.test(color)) {
          color = color.split('');
          for (let i = 2; i >= 0; i--) {
            color.splice(i, 0, color[i]);
          }
          color = color.join('');
        }
        if (/^[1-9a-fA-F]{6}$/.test(color)) {
          return {
            red: parseInt(color.slice(0, 2), 16),
            green: parseInt(color.slice(2, 4), 16),
            blue: parseInt(color.slice(4, 6), 16)
          };
        } else {
          return {
            red: 255,
            green: 255,
            blue: 255
          };
        }
      },
      mixColor(color, percent) {
        let { red, green, blue } = this.getColorChannels(color);
        if (percent > 0) { // shade given color
          red *= 1 - percent;
          green *= 1 - percent;
          blue *= 1 - percent;
        } else { // tint given color
          red += (255 - red) * percent;
          green += (255 - green) * percent;
          blue += (255 - blue) * percent;
        }
        return `rgb(${ Math.round(red) }, ${ Math.round(green) }, ${ Math.round(blue) })`;
      },
      handleMouseOver(item) {
        this.colorList.forEach((it) => {
          it.hover = ''
        });
        item.hover = this.mixColor(item.origin, 0.2);
      },
    }
  }
</script>