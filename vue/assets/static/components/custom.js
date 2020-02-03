import ClipBoard from '$components/custom/clipboard';
import CustomTreeNavigation from '$components/custom/tree-navigation';
import svgIcon from '$components/custom/svg-icon';
import clickToEdit from '$components/custom/click-to-edit';

const components = [
  ClipBoard,
  CustomTreeNavigation,
  svgIcon,
  clickToEdit
];

export default {
  install(Vue) {
    components.map(it => {
      it.install(Vue);
    })
  }
}