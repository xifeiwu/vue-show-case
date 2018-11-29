const ClipBoard = require('element-ui/components/clipboard');

import vueTreeNavigation from '$components/custom/vue-tree-navigation';

const components = [
  vueTreeNavigation
]
export default {
  install(Vue) {
    components.map(it => {
      it.install(Vue);
    })
  }
}