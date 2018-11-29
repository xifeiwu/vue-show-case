// const ClipBoard = require('element-ui/components/clipboard');
import vueTreeNavigation from '$components/custom/vue-tree-navigation';
import ClipBoard from '$components/custom/clipboard';

const components = [
  vueTreeNavigation,
  ClipBoard
]
export default {
  install(Vue) {
    components.map(it => {
      it.install(Vue);
    })
  }
}