import echarts from './echarts.vue';
import vCharts from './v-charts/index.vue';
import vChartsLine from './v-charts/line.vue';

import element from './element';
import notify from './element/notify.vue';
import tree from './element/tree.vue';
import slider from './element/slider.vue';
import menu from './element/menu.vue';
import input from './element/input.vue';

import custom from './custom';
import vueTreeNavigation from './custom/vue-tree-navigation.vue';
import others from './custom/others.vue';

import vueIndex from './vue';
import transition from './vue/transition/transition.vue';

import Vue from 'vue';
import VueRouter from 'vue-router';

class Helper {
  constructor() {
    this.richRouterConfig = [{
      path: '/',
      redirect: '/element',
    }, {
      path: '/element',
      name: 'element',
      redirect: '/element/menu',
      component: element,
      children: [{
        path: 'menu',
        name: 'menu',
        component: menu
      }, {
        path: 'notify',
        name: 'notify',
        component: notify
      }, {
        path: 'tree',
        name: 'tree',
        component: tree
      }, {
        path: 'slider',
        name: 'slider',
        component: slider
      }, {
        path: 'input',
        name: 'input',
        component: input
      }]
    }, {
      path: '/custom',
      name: 'custom',
      component: custom,
      children: [{
        path: 'others',
        name: 'others',
        component: others
      }, {
        path: 'vue-tree-navigation',
        name: 'vue-tree-navigation',
        component: vueTreeNavigation
      }]
    }, {
      path: '/vue',
      name: 'vue',
      component: vueIndex,
      children: [{
        path: 'transition',
        name: 'transition',
        component: transition
      }]
    }, {
      path: '/echarts',
      name: 'echarts',
      component: echarts
    }, {
      path: '/v-charts',
      name: 'v-charts',
      redirect: '/v-charts/line',
      component: vCharts,
      children: [{
        path: 'line',
        name: 'line',
        component: vChartsLine,
      }]
    }];

    this.addRoutePath(null, this.richRouterConfig);
    this.routePathToConfig = this.getRoutePathToConfig();
    console.log(this.richRouterConfig);
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

    let menuConfig = traverseComponent(this.richRouterConfig);
    return menuConfig;
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