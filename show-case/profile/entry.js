import Vue from 'vue';

import store from './store';
import StoreHelper from './store/helper';
Vue.prototype.$storeHelper = new StoreHelper(store);

import Utils from '$assets/js/utils';
Vue.prototype.$utils = new Utils();

import axios from 'axios';
Vue.prototype.$ajax = axios;

import 'assets/css/fix-style.scss';
import '$assets/css/common.scss';

import indexPage from './index.vue';

import(/* webpackChunkName: "components-docs" */ '$assets/libs/components/profile.js').then(components => {
  components.default.install(Vue);
  window.vm = new Vue({ // eslint-disable-line
    render: h => h(indexPage),
    store: store,
  }).$mount('#app');
});

