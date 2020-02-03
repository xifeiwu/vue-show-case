import profile from './index.vue';

import h5 from './h5';
import h5Svg from './h5/svg/index.vue';

import vueIndex from './vue';
import vueBasic from './vue/basic/index.vue';
import vueTransition from './vue/transition/index.vue';
import vueDirective from './vue/directive/index.vue';
import vueEvent from './vue/event.vue';
import vueSlot from './vue/slot/index.vue';
import vueVNode from './vue/vnode/index.vue';

import element from './element';

import elDialog from './element/dialog/index.vue';
import composeInput from './element/compose-input/compose-input.vue';

import elScrollBar from './element/basic/scrollbar.vue';
import elCarousel from './element/basic/carousel.vue';
import elCheckBox from './element/basic/checkbox.vue';
import elSwitch from './element/basic/switch.vue';
import elNotify from './element/basic/notify.vue';
import elPagination from './element/basic/pagination.vue';
import elForm from './element/basic/form.vue';
import elTree from './element/basic/tree.vue';
import elSlider from './element/basic/slider.vue';
import elMenu from './element/basic/menu.vue';
import elInput from './element/basic/input.vue';
import elUpload from './element/basic/upload.vue';
import elSteps from './element/basic/steps.vue';
import elTab from './element/basic/tab.vue';



import custom from './custom';
import CustomTreeNavigation from './custom/tree-navigation.vue';
import ClipBoard from './custom/clipboard.vue';
import others from './custom/others.vue';
import customSvgIcon from './custom/svg-icon.vue';
import customScrollSpy from './custom/scrollspy.vue';
import customSimpleTable from './custom/simple-table.vue';

import echarts from './echarts.vue';
import vCharts from './v-charts/index.vue';
import vChartsLine from './v-charts/line.vue';

import codeMirror from './code-mirror';
import codeMirrorExample from './code-mirror/example.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

class Helper {
  constructor() {
    this.richRouterConfig = [{
      path: '/profile',
      component: profile,
      redirect: '/profile/h5',
      children: [{
        path: 'h5',
        label: 'h5',
        component: h5,
        desc: 'h5原生功能展示',
        redirect: 'h5/svg',
        children: [{
          path: 'svg',
          label: 'svg',
          component: h5Svg,
        }]
      }, {
        path: 'vue',
        label: 'vue',
        desc: 'vue相关功能展示',
        component: vueIndex,
        children: [{
          path: 'basic',
          label: 'basic',
          component: vueBasic
        }, {
          path: 'transition',
          label: 'transition',
          component: vueTransition
        }, {
          path: 'directive',
          label: 'directive',
          component: vueDirective
        }, {
          path: 'event',
          label: 'event',
          component: vueEvent
        }, {
          path: 'slot',
          label: 'slot',
          component: vueSlot
        }, {
          path: 'vnode',
          label: 'vnode',
          component: vueVNode
        }]
      }, {
        path: 'element',
        label: 'element',
        desc: '基于element-ui组件库的展示',
        component: element,
        redirect: 'element/menu',
        children: [{
          path: 'dialog',
          label: 'dialog',
          component: elDialog
        }, {
          path: 'compose-input',
          label: 'compose-input',
          component: composeInput
        }, {
          path: 'carousel',
          label: 'carousel',
          component: elCarousel
        }, {
          path: 'scrollbar',
          label: 'scrollbar',
          component: elScrollBar
        }, {
          path: 'input',
          label: 'input',
          component: elInput
        }, {
          path: 'upload',
          label: 'upload',
          component: elUpload
        }, {
          path: 'checkbox',
          label: 'checkbox',
          component: elCheckBox
        }, {
          path: 'switch',
          label: 'switch',
          component: elSwitch
        }, {
          path: 'form',
          label: 'form',
          component: elForm
        }, {
          path: 'menu',
          label: 'menu',
          component: elMenu
        }, {
          path: 'pagination',
          label: 'pagination',
          component: elPagination,
        }, {
          path: 'notify',
          label: 'notify',
          component: elNotify
        }, {
          path: 'tree',
          label: 'tree',
          component: elTree
        }, {
          path: 'slider',
          label: 'slider',
          component: elSlider
        }, {
          path: 'steps',
          label: 'steps',
          component: elSteps
        }, {
          path: 'tab',
          label: 'tab',
          component: elTab
        }]
      }, {
        path: 'custom',
        label: 'custom',
        desc: '基于自定义组件库的展示',
        component: custom,
        children: [{
          path: 'others',
          label: 'others',
          component: others
        }, {
          path: 'tree-navigation',
          label: 'tree-navigation',
          component: CustomTreeNavigation
        }, {
          path: 'clipboard',
          label: 'clipboard',
          component: ClipBoard
        }, {
          path: 'svg-icon',
          label: 'svg-icon',
          component: customSvgIcon
        }, {
          path: 'scroll-spy',
          label: 'scroll-spy',
          component: customScrollSpy
        }, {
          path: 'simple-table',
          label: 'simple-table',
          component: customSimpleTable
        }]
      }, {
        path: 'echarts',
        label: 'echarts',
        desc: 'echarts接口展示',
        component: echarts
      }, {
        path: 'v-charts',
        label: 'v-charts',
        desc: 'v-charts接口展示',
        redirect: 'v-charts/line',
        component: vCharts,
        children: [{
          path: 'line',
          label: 'line',
          component: vChartsLine,
        }]
      }, {
        path: 'code-mirror',
        label: 'code-mirror',
        desc: 'code-mirror模块展示',
        component: codeMirror,
        children: [{
          path: 'example',
          label: 'example',
          component: codeMirrorExample
        }]
      }]
    }];

    this.addRoutePath(null, this.richRouterConfig);
    this.routePathToConfig = this.getRoutePathToConfig();
    // console.log(this.richRouterConfig);
  }

  /**
   * 变量component，并使用func操作在component的每个元素
   * @param func, used to each element in component tree
   * @param component, target component to traverse
   */
  traverseComponent(func, component) {
    if (Array.isArray(component)) {
      component.forEach(this.traverseComponent.bind(this, func));
    } else if ('object' === typeof(component)) {
      func.call(this, component);
      if (component.hasOwnProperty('children')) {
        this.traverseComponent(func, component['children']);
      }
    }
  }

  /**
   * traverse router config tree to add routerPath to all component:
   * routerPath = parent.path + path, it is the full path of hash in url
   * @param path
   * @param component
   */
  addRoutePath() {
    function updateItem(path, item) {
      if (null !== path) {
        item.routePath = path + '/' + item.path;
      } else {
        item.routePath = item.path;
      }
    }

    function traverseComponent(path, component) {
      if (Array.isArray(component)) {
        component.forEach(traverseComponent.bind(this, path));
      } else if ('object' === typeof(component)) {
        updateItem.call(this, path, component);
        if (component.hasOwnProperty('children')) {
          traverseComponent(component.routePath, component['children']);
        }
      }
    }

    traverseComponent(null, this.richRouterConfig);
    // console.log(this.richRouterConfig);
  }

  // filter out useless config in richRouterConfig
  getVueRouterConfig() {
    function updateItem(item) {
      let keysMap = {
        path: 'path',
        label: 'name',
        redirect: 'redirect',
        component: 'component',
        meta: 'meta',
      };
      let result = {};
      for (let key in item) {
        if (item.hasOwnProperty(key) && keysMap.hasOwnProperty(key)) {
          if ('componentFile' === key) {
            // result[keysMap[key]] = this.load(item[key]);
          } else {
            result[keysMap[key]] = item[key];
          }
        }
      }
      return result;
    }

    function traverseComponent(component) {
      if (Array.isArray(component)) {
        return component.map(traverseComponent.bind(this));
      } else if ('object' === typeof(component)) {
        let config = updateItem.call(this, component);
        if (component.hasOwnProperty('children')) {
          config['children'] = traverseComponent(component['children']);
        }
        return config;
      }
    }

    let vueRouterConfig = traverseComponent(this.richRouterConfig);
    return vueRouterConfig;
  }

  /**
   * get routePath to name, in the following format:
   * {
   *   '/login': "登录",
   *   '/profile':"详情",
   *   '/profile/app':"应用管理",
   *   '/profile/app/add':"创建应用",
   *   '/profile/domain_name':"外网域名",
   *   '/profile/instance':"实例列表",
   *   '/profile/service':"服务管理"
   *  }
   * used in:
   * 1. profile.vue
   */
  getRoutePathToName() {
    let routePath = {};

    function updateItem(item) {
      if (item.hasOwnProperty('routePath') && item.hasOwnProperty('name')) {
        if (item.name && item.routePath) {
          routePath[item.routePath] = item.name;
        }
      }
    }

    this.traverseComponent(updateItem, this.richRouterConfig);
    return routePath;
  }

  getRoutePathToConfig() {
    let result = {};

    function updateItem(item) {
      if (item.hasOwnProperty('routePath') && item.routePath) {
        result[item.routePath] = item;
      }
    }

    this.traverseComponent(updateItem, this.richRouterConfig);
    return result;
  }

  getConfig4NavMenu() {
    // 截取部分属性，没有name属性会被过滤掉
    function updateItem(item) {
      let keysMap = {
        routePath: 'routePath',
        label: 'label',
        desc: 'desc',
        icon: 'icon',
      };
      let result = {};
      for (let key in item) {
        if (item.hasOwnProperty(key) && keysMap.hasOwnProperty(key)) {
          if ('componentFile' === key) {
            // result[keysMap[key]] = this.load(item[key]);
          } else {
            result[keysMap[key]] = item[key];
          }
        }
      }
      return result;
      // filter config has not property 'name'
      // if (result.hasOwnProperty('name')) {
      //   return result;
      // } else {
      //   return null;
      // }
    }

    function traverseComponent(component) {
      if (Array.isArray(component)) {
        return component.map(traverseComponent.bind(this)).filter(it => {
          return it;
        });
      } else if ('object' === typeof(component)) {
        let config = updateItem.call(this, component);
        if (config && component.hasOwnProperty('children')) {
          config['children'] = traverseComponent(component['children']);
        }
        return config;
      }
    }

    var menuConfig = traverseComponent(this.richRouterConfig);
    // return children of route profile
    return menuConfig[0]['children'];
  }
}

const helper = new Helper();
const vueRouter = new VueRouter({
  mode: 'history',
  base: __dirname,
  routes: helper.getVueRouterConfig()
});

vueRouter.helper = helper;
Vue.use(VueRouter);

export default vueRouter;