import ClipBoard from '$components/custom/clipboard';
import CustomTreeNavigation from '$components/custom/tree-navigation';
import svgIcon from '$components/custom/svg-icon';

const components = [
  ClipBoard,
  CustomTreeNavigation,
  svgIcon
];

export default {
  install(Vue) {
    components.map(it => {
      it.install(Vue);
    })
  }
}