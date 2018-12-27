const updateContent = (el, binding, vnode) =>{
  var s = JSON.stringify;
  el.innerHTML =
    'name: '       + s(binding.name) + '<br>' +
    'value: '      + s(binding.value) + '<br>' +
    'oldValue: '      + s(binding.oldValue) + '<br>' +
    'expression: ' + s(binding.expression) + '<br>' +
    'argument: '   + s(binding.arg) + '<br>' +
    'modifiers: '  + s(binding.modifiers) + '<br>' +
    'vnode keys: ' + Object.keys(vnode).join(', ')
};

export default {
  inserted(el, binding, vnode) {
    console.log('inserted');
  },
  bind(el, binding, vnode) {
    console.log('bind');
  },
  update(el, binding, vnode) {
    console.log('update');
    updateContent(el, binding, vnode);
  },
  unbind(el, binding, vnode) {
    console.log('unbind');
  },
}