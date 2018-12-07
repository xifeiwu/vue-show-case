import Vue from 'vue';

import store from './store';
import StoreHelper from './store/helper';
Vue.prototype.$storeHelper = new StoreHelper(store);

import Utils from 'assets/js/utils';
Vue.prototype.$utils = new Utils();

import axios from 'axios';
Vue.prototype.$ajax = axios;

import '$assets/css/fix-style.scss';
import 'assets/css/common.scss';

// paas-icons for icon and svg
import 'assets/css/fonts/paas-icon.css';
import 'assets/css/fonts/paas-icon.js';

import indexPage from './pages/index.vue';
import router from './pages/router';

import 'element-ui/packages/theme-chalk/src/index.scss';

import net from './net';
Vue.prototype.$net = net;

import '$assets/libs/components/element-ui-fix.scss';
Promise.all([
  import(/* webpackChunkName: "components-element-ui" */ 'assets/static/components/ele/profile.js'),
  import(/* webpackChunkName: "components-custom" */ 'assets/static/components/custom.js')
])
.then(components => {
  components[0].default.install(Vue);
  components[1].default.install(Vue);
  window.vm = new Vue({ // eslint-disable-line
    render: h => h(indexPage),
    store: store,
    router: router,
  }).$mount('#app');
});

