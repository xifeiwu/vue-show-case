import ClipBoard from '$components/custom/clipboard';
import CustomTreeNavigation from '$components/custom/tree-navigation';

const components = [
  ClipBoard,
  CustomTreeNavigation
];

export default {
  install(Vue) {
    components.map(it => {
      it.install(Vue);
    })
  }
}