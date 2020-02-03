/**
 * Created by xifei.wu on 2017/12/4.
 */

import Vue from 'vue';
import Vuex from 'vuex';
import global from 'assets/js/store/modules/global';
import createPersistedState from 'vuex-persistedstate';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    constants: {
      sideMenuWidth: 180
    },
    config: {
    },
    navMenu: {},
    menuList: [],
    userInfo: {},
    echarts: require('./mock/echarts.json'),
  },
  mutations: {
    SET_CONFIG(state, config) {
      if (!state.config) {
        state.config = {};
      }
      for (let key in config) {
        // localStorage will not update if code run in the following way
        Vue.set(state.config, key, config[key]);
      }
    },
    SET_MENUS_LIST(state, menuList) {
      state.menuList = menuList;
    },
    SET_USER_INFO(state, userInfo) {
      if (!userInfo) {
        state.userInfo = {};
      } else {
        if (!state.userInfo) {
          state.userInfo = {};
        }
        for (let key in userInfo) {
          // localStorage will not update if code run in the following way
          // state.info[key] = userInfo[key];
          Vue.set(state.userInfo, key, userInfo[key]);
        }
      }
    }
  },
  actions: {
    addMenuList ({ commit, state }, menuList) {
      if (Array.isArray(menuList) && menuList.length > 0) {
        commit('SET_MENUS_LIST', menuList)
      }
    },
    setConfig({commit}, config) {
      commit('SET_CONFIG', config)
    },
    updateUserInfo ({ commit, state }, userInfo) {
      commit('SET_USER_INFO', userInfo)
    },
  },
  getters: {
    config(state, getters) {
      return state.config
    },
    constants(state, getters) {
      return state.constants;
    },
    'collapseMenu': (state, getters) => {
      if (!state.config) {
        state.config = {}
      }
      return state.config.collapseMenu;
    }
  },
  modules:{
    global
  },
  plugins: [createPersistedState({
    key: 'vue-components',
    // 暂时只持久化 etc 模块，防止冲突
    paths: ['config', 'menuList', 'userInfo']
  })]
})
