/**
 * Created by xifei.wu on 2017/11/28.
 */
/* Automatically generated by './build/bin/build-entry.js' */
import '$assets/libs/components/element-ui-fix.scss';

import Menu from 'element-ui/packages/menu/index.js';
import Submenu from 'element-ui/packages/submenu/index.js';
import MenuItem from 'element-ui/packages/menu-item/index.js';
import MenuItemGroup from 'element-ui/packages/menu-item-group/index.js';
import Dialog from 'element-ui/packages/dialog/index.js';
import Input from 'element-ui/packages/input/index.js';
import InputNumber from 'element-ui/packages/input-number/index.js';
import Radio from 'element-ui/packages/radio/index.js';
import RadioGroup from 'element-ui/packages/radio-group/index.js';
import RadioButton from 'element-ui/packages/radio-button/index.js';
import Checkbox from 'element-ui/packages/checkbox/index.js';
import CheckboxButton from 'element-ui/packages/checkbox-button/index.js';
import CheckboxGroup from 'element-ui/packages/checkbox-group/index.js';
import Switch from 'element-ui/packages/switch/index.js';
import Select from 'element-ui/packages/select/index.js';
import Option from 'element-ui/packages/option/index.js';
import OptionGroup from 'element-ui/packages/option-group/index.js';
import Button from 'element-ui/packages/button/index.js';
import ButtonGroup from 'element-ui/packages/button-group/index.js';
import Popover from 'element-ui/packages/popover/index.js';
import Tooltip from 'element-ui/packages/tooltip/index.js';
import MessageBox from 'element-ui/packages/message-box/index.js';
import Tag from 'element-ui/packages/tag/index.js';
import Alert from 'element-ui/packages/alert/index.js';
import Notification from 'element-ui/packages/notification/index.js';
import Loading from 'element-ui/packages/loading/index.js';
import Icon from 'element-ui/packages/icon/index.js';
import Row from 'element-ui/packages/row/index.js';
import Col from 'element-ui/packages/col/index.js';
import Message from 'element-ui/packages/message/index.js';
import Badge from 'element-ui/packages/badge/index.js';
import Scrollbar from 'element-ui/packages/scrollbar/index.js';
import Container from 'element-ui/packages/container/index.js';
import Header from 'element-ui/packages/header/index.js';
import Aside from 'element-ui/packages/aside/index.js';
import Main from 'element-ui/packages/main/index.js';
import Footer from 'element-ui/packages/footer/index.js';
import Tree from 'element-ui/packages/tree/index.js';
import Form from 'element-ui/packages/form/index.js';
import FormItem from 'element-ui/packages/form-item/index.js';

const components = [
  Dialog,
  // Autocomplete,
  // Dropdown,
  // DropdownMenu,
  // DropdownItem,
  Menu,
  Submenu,
  MenuItem,
  MenuItemGroup,
  Input,
  InputNumber,
  Radio,
  RadioGroup,
  RadioButton,
  Checkbox,
  CheckboxButton,
  CheckboxGroup,
  Switch,
  Select,
  Option,
  OptionGroup,
  Button,
  ButtonGroup,
  Popover,
  Tooltip,
  Tag,
  Alert,
  Loading,
  Icon,
  Row,
  Col,
  Badge,
  Scrollbar,
  Container,
  Header,
  Aside,
  Main,
  Footer,
  Tree,
  Form,
  FormItem
];

const install = function(Vue, opts = {}) {
  /* istanbul ignore if */
  if (install.installed) return;

  components.map(component => {
    component.install(Vue);
  });

  Vue.prototype.$msgbox = MessageBox;
  Vue.prototype.$alert = MessageBox.alert;
  Vue.prototype.$confirm = MessageBox.confirm;
  Vue.prototype.$prompt = MessageBox.prompt;
  Vue.prototype.$notify = Notification;
  Vue.prototype.$message = Message;
};

/* istanbul ignore if */
if (typeof window !== 'undefined' && window.Vue) {
  install(window.Vue);
};

let toExports = {
  version: '2.0.3',
  // locale: locale.use,
  // i18n: locale.i18n,
  install,
};

// module.exports.default = module.exports;
export default toExports;