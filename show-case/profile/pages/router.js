import profile from './index.vue';

import h5 from './h5';
import h5Svg from './h5/svg.vue';

import vueIndex from './vue';
import vueTransition from './vue/transition/transition.vue';
import vueDirective from './vue/directive/index.vue';
import vueEvent from './vue/event.vue';
import vueSlot from './vue/slot/index.vue';

import element from './element';
import elNotify from './element/notify.vue';
import elForm from './element/form.vue';
import elTree from './element/tree.vue';
import elSlider from './element/slider.vue';
import elMenu from './element/menu.vue';
import elInput from './element/input.vue';
import elSteps from './element/steps.vue'
import elTab from './element/tab.vue'

import custom from './custom';
import CustomTreeNavigation from './custom/tree-navigation.vue';
import ClipBoard from './custom/clipboard.vue';
import others from './custom/others.vue';
import customSvgIcon from './custom/svg-icon.vue';
import customScrollSpy from './custom/scrollspy.vue';

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
      path: '/',
      redirect: '/profile',
    }, {
      path: '/profile',
      name: 'profile',
      component: profile,
      routePath: '/profile',
      children: [{
        path: 'h5',
        name: 'h5',
        component: h5,
        redirect: 'h5/svg',
        children: [{
          path: 'svg',
          name: 'svg',
          component: h5Svg,
        }]
      }, {
        path: 'vue',
        name: 'vue',
        component: vueIndex,
        children: [{
          path: 'transition',
          name: 'transition',
          component: vueTransition
        }, {
          path: 'directive',
          name: 'directive',
          component: vueDirective
        }, {
          path: 'event',
          name: 'event',
          component: vueEvent
        }, {
          path: 'slot',
          name: 'slot',
          component: vueSlot
        }]
      }, {
        path: 'element',
        name: 'element',
        redirect: 'element/menu',
        component: element,
        children: [{
          path: 'form',
          name: 'form',
          component: elForm
        }, {
          path: 'menu',
          name: 'menu',
          component: elMenu
        }, {
          path: 'notify',
          name: 'notify',
          component: elNotify
        }, {
          path: 'tree',
          name: 'tree',
          component: elTree
        }, {
          path: 'slider',
          name: 'slider',
          component: elSlider
        }, {
          path: 'input',
          name: 'input',
          component: elInput
        }, {
          path: 'steps',
          name: 'steps',
          component: elSteps
        }, {
          path: 'tab',
          name: 'tab',
          component: elTab
        }]
      }, {
        path: 'custom',
        name: 'custom',
        component: custom,
        children: [{
          path: 'others',
          name: 'others',
          component: others
        }, {
          path: 'tree-navigation',
          name: 'tree-navigation',
          component: CustomTreeNavigation
        }, {
          path: 'clipboard',
          name: 'clipboard',
          component: ClipBoard
        }, {
          path: 'svg-icon',
          name: 'svg-icon',
          component: customSvgIcon
        }, {
          path: 'scroll-spy',
          name: 'scroll-spy',
          component: customScrollSpy
        }]
      }, {
        path: 'echarts',
        name: 'echarts',
        component: echarts
      }, {
        path: 'v-charts',
        name: 'v-charts',
        redirect: 'v-charts/line',
        component: vCharts,
        children: [{
          path: 'line',
          name: 'line',
          component: vChartsLine,
        }]
      }, {
        path: 'code-mirror',
        name: 'code-mirror',
        component: codeMirror,
        children: [{
          path: 'example',
          name: 'example',
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
        name: 'name',
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
        name: 'name',
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
      // filter config has not property 'name'
      if (result.hasOwnProperty('name')) {
        return result;
      } else {
        return null;
      }
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