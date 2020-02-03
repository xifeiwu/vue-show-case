// import { scrollWithAnimation, Easing } from './animate.js'


const bodyScrollEl = {}

// For ff, ie
Object.defineProperty(bodyScrollEl, 'scrollTop', {
  get () {
    return document.body.scrollTop || document.documentElement.scrollTop
  },
  set (val) {
    document.body.scrollTop = val
    document.documentElement.scrollTop = val
  }
})

Object.defineProperty(bodyScrollEl, 'scrollHeight', {
  get () {
    return document.body.scrollHeight || document.documentElement.scrollHeight
  }
})

Object.defineProperty(bodyScrollEl, 'offsetHeight', {
  get () {
    return window.innerHeight
  }
})

const scrollSpyContext = '@@scrollSpyContext'
// 通过scroll得到锚点的宿主结点
const containerMap = {}
// 共有多少sections. key: scroll-syp-id
const scrollSpySections = {}
// 通过scrollId得到当前活跃的Element
const activeElement = {}
// 通过scrollId得到所有锚点
const activableElements = {}
// 通过scrollId得到当前活跃的index
const currentIndex = {}

const DEFAULT_OPTIONS = Object.assign({
  allowNoActive: false,
  sectionSelector: null,
  data: null,
  offset: 0,
  time: 500,
  steps: 50,
  easing: null,
  active: {
    selector: null,
    class: 'active'
  },
  link: {
    selector: 'a'
  }
}, {})

function findElements (container, selector) {
  if (!selector) {
    return container.children
  }
  const id = scrollSpyId(container)
  const elements = []
  for (const el of container.querySelectorAll(selector)) {
    // Filter out elements that are owned by another directive
    if (scrollSpyIdFromAncestors(el) === id) {
      elements.push(el)
    }
  }
  return elements
}

function scrollSpyId (el) {
  return el.getAttribute('data-scroll-spy-id') || el.getAttribute('scroll-spy-id') || 'default'
}

function scrollSpyIdDefined (el) {
  return !!el.getAttribute('data-scroll-spy-id') || !!el.getAttribute('scroll-spy-id')
}

function scrollSpyIdFromAncestors (el) {
  do {
    if (scrollSpyIdDefined(el)) {
      return scrollSpyId(el)
    }
    el = el.parentElement
  } while (el)
  return 'default'
}

function initScrollSections (el, sectionSelector) {
  const id = scrollSpyId(el)
  const scrollSpyContextEl = el[scrollSpyContext]
  const idScrollSections = findElements(el, sectionSelector)
  scrollSpySections[id] = idScrollSections

  if (idScrollSections[0] && idScrollSections[0].offsetParent !== el) {
    scrollSpyContextEl.eventEl = window
    scrollSpyContextEl.scrollEl = bodyScrollEl
  }
}

function getOffsetTop (elem, untilParent) {
  let offsetTop = 0
  do {
    if (!isNaN(elem.offsetTop)) {
      offsetTop += elem.offsetTop
    }
    elem = elem.offsetParent
  } while (elem && elem !== untilParent)
  return offsetTop
}

function scrollTo (el, index) {
  const id = scrollSpyId(el)
  const idScrollSections = scrollSpySections[id]

  var scrollEl = el
  const { options } = el[scrollSpyContext]
  const current = scrollEl.scrollTop

  if (idScrollSections[index]) {
    const target = getOffsetTop(idScrollSections[index]) - options.offset
    if (options.easing) {
      // scrollWithAnimation(scrollEl, current, target, options.time, options.easing)
      return
    }

    const time = options.time
    const steps = options.steps
    const timems = parseInt(time / steps)
    const gap = target - current
    for (let i = 0; i <= steps; i++) {
      const pos = current + (gap / steps) * i
      setTimeout(() => {
        scrollEl.scrollTop = pos
      }, timems * i)
    }
  }
}

const scrollSpyContainer = {
  bind: function (el, binding, vnode) {
    // console.log(el, binding, vnode)
    function onScroll () {
      const id = scrollSpyId(el)
      const idScrollSections = scrollSpySections[id]

      var scrollEl = el;
      const { options } = el[scrollSpyContext]
      // console.log('onScroll');
      // console.log(idScrollSections)
      // console.log(scrollEl)
      // console.log(scrollEl.offsetHeight)
      // console.log(scrollEl.scrollTop)
      // console.log(el.scrollTop)
      // console.log(scrollEl.scrollHeight)

      let index

      if ((scrollEl.offsetHeight + scrollEl.scrollTop) >= scrollEl.scrollHeight - 10) {
        index = idScrollSections.length
      } else {
        for (index = 0; index < idScrollSections.length; index++) {
          if (getOffsetTop(idScrollSections[index], scrollEl) - options.offset > scrollEl.scrollTop) {
            break
          }
        }
      }

      index = index - 1

      if (index < 0) {
        index = options.allowNoActive ? null : 0
      } else if (options.allowNoActive && index >= idScrollSections.length - 1 &&
        getOffsetTop(idScrollSections[index]) + idScrollSections[index].offsetHeight < scrollEl.scrollTop) {
        index = null
      }
      // console.log(activeElement)
      // console.log(id)
      // console.log(index, currentIndex[id])

      if (index !== currentIndex[id]) {
        let idActiveElement = activeElement[id]
        if (idActiveElement) {
          // console.log(idActiveElement)
          idActiveElement.classList.remove(idActiveElement[scrollSpyContext].options.class)
          activeElement[id] = null
        }

        currentIndex[id] = index
        if (typeof currentIndex !== 'undefined' && Object.keys(activableElements).length > 0) {
          idActiveElement = activableElements[id][currentIndex[id]]
          activeElement[id] = idActiveElement

          // console.log(activableElements);

          if (idActiveElement) {
            // console.log(idActiveElement[scrollSpyContext])
            idActiveElement.classList.add(idActiveElement[scrollSpyContext].options.class)
          }
        }

        if (options.data) {
          vnode.context[options.data] = index;
          // Vue.set(vnode.context, options.data, index)
        }
      }
    }

    vnode.context.$scrollTo = scrollTo.bind(null, el)

    const id = scrollSpyId(el)

    // console.log(options)
    // console.log(binding.value)
    el[scrollSpyContext] = {
      onScroll,
      options: Object.assign({}, DEFAULT_OPTIONS, binding.value),
      id: scrollSpyId(el),
      eventEl: el,
      scrollEl: el
    }
    // console.log(el[scrollSpyContext])
    // console.log(el);

    containerMap[id] = el
    delete currentIndex[id]
  },
  inserted: function (el) {
    const {
      options: { sectionSelector }
    } = el[scrollSpyContext]
    initScrollSections(el, sectionSelector)
    const { onScroll } = el[scrollSpyContext]
    el.addEventListener('scroll', onScroll)

    onScroll()
  },
  componentUpdated: function (el, binding) {
    el[scrollSpyContext].options = Object.assign({}, DEFAULT_OPTIONS, binding.value)
    const {
      onScroll, options: { sectionSelector }
    } = el[scrollSpyContext]

    initScrollSections(el, sectionSelector)
    onScroll()
  },
  unbind: function (el) {
    const { eventEl, onScroll } = el[scrollSpyContext]
    eventEl.removeEventListener('scroll', onScroll)
  }
}

class ScrollSpyLinkHelper {
  constructor() {
    this.clickListener = null;
  }
  update(el, binding) {
    // this.el = el;
    // this.binding = binding;
    const id = scrollSpyId(el)
    const options = Object.assign({}, DEFAULT_OPTIONS.link, binding.value)
    const linkElements = [].slice.call(findElements(el, options.selector));
    linkElements.forEach((it, index) => {
      it[scrollSpyContext] = {
        options: options
      }
    });
    activableElements[id] = linkElements;

    this.id = id;
    this.options = options;
    this.linkElements = linkElements;

  }
  removeClickListener(el) {
    if (this.clickListener) {
      el.addEventListener('click', this.clickListener);
    }
  }
  // only one listener for click
  addClickListener(el, binding) {
    if (this.clickListener) {
      el.addEventListener('click', this.clickListener);
    }
    this.clickListener = (evt) => {
      const id = this.id;
      const linkElements = this.linkElements;
      var target = evt.target;
      while(target && linkElements.indexOf(target) === -1) {
        target = target.parentElement
      }
      var index = linkElements.indexOf(target);
      if (index > -1) {
        scrollTo(containerMap[id], index)
      }
    };
    el.addEventListener('click', this.clickListener);
  }
}

const scrollSpyLinkHelper = new ScrollSpyLinkHelper();
const scrollSpyLink = {
  bind(el, binding) {
    scrollSpyLinkHelper.update(el, binding);
    scrollSpyLinkHelper.addClickListener(el, binding);
  },
  inserted(el, binding) {
  },
  update(el, binding) {
    // console.log('update')
    // console.log(binding);
    scrollSpyLinkHelper.update(el, binding);
  },
  unbind(el) {
    scrollSpyLinkHelper.removeClickListener(el);
  }
}

export {
  scrollSpyContainer,
  scrollSpyLink
}
