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

const showStatus = (status) => {
  console.log(status);
};

export default {
  inserted(el, binding, vnode) {
    showStatus('inserted');
  },
  bind(el, binding, vnode) {
    showStatus('bind');
    vnode.context.msg = 'context.data';
  },
  update(el, binding, vnode) {
    showStatus('update');
    updateContent(el, binding, vnode);
    console.log(vnode);
  },
  unbind(el, binding, vnode) {
    showStatus('unbind');
  },
}