// import { scrollWithAnimation, Easing } from './animate.js'


var options = null;
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
const scrollSpyContainer = {}
// 共有多少sections. key: scroll-syp-id
const scrollSpySections = {}
// 通过scrollId得到当前活跃的Element
const activeElement = {}
// 通过scrollId得到所有锚点
const activableElements = {}
// 通过scrollId得到当前活跃的index
const currentIndex = {}

options = Object.assign({
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
}, options || {})

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

const scrollSpy = {
  bind: function (el, binding, vnode) {
    console.log(el, binding, vnode)
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
          console.log(idActiveElement)
          idActiveElement.classList.remove(idActiveElement[scrollSpyContext].options.class)
          activeElement[id] = null
        }

        currentIndex[id] = index
        if (typeof currentIndex !== 'undefined' && Object.keys(activableElements).length > 0) {
          idActiveElement = activableElements[id][currentIndex[id]]
          activeElement[id] = idActiveElement

          console.log(activableElements);

          if (idActiveElement) {
            console.log(idActiveElement[scrollSpyContext])
            idActiveElement.classList.add(idActiveElement[scrollSpyContext].options.class)
          }
        }

        if (options.data) {
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
      options: Object.assign({}, options, binding.value),
      id: scrollSpyId(el),
      eventEl: el,
      scrollEl: el
    }
    // console.log(el[scrollSpyContext])
    // console.log(el);

    scrollSpyContainer[id] = el
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
    el[scrollSpyContext].options = Object.assign({}, options, binding.value)
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

function scrollSpyActiveListener (el, binding) {
  const activeOptions = Object.assign({}, options.active, binding.value)
  const id = scrollSpyId(el)
  // console.log(id);
  // console.log(activeOptions);
  activableElements[id] = findElements(el, activeOptions.selector)
  // const arr = [...activableElements[id]]
  var arr = [].slice.call(activableElements[id])
  arr.map(el => {
    console.log(el);
    el[scrollSpyContext] = {
      options: activeOptions
    }
  })
}

const scrollSpyActive = {
  inserted: scrollSpyActiveListener,
  componentUpdated: scrollSpyActiveListener
}

function scrollLinkClickHandler (index, scrollSpyId, event) {
  scrollTo(scrollSpyContainer[scrollSpyId], index)
}

function initScrollLink (el, selector) {
  const id = scrollSpyId(el)

  const linkElements = findElements(el, selector)

  for (let i = 0; i < linkElements.length; i++) {
    const linkElement = linkElements[i]

    const listener = scrollLinkClickHandler.bind(null, i, id)
    if (!linkElement[scrollSpyContext]) {
      linkElement[scrollSpyContext] = {}
    }

    if (!linkElement[scrollSpyContext].click) {
      linkElement.addEventListener('click', listener)
      linkElement[scrollSpyContext].click = listener
    }
  }
}

const scrollSpyLink = {
  inserted: function (el, binding) {
    const linkOptions = Object.assign({}, options.link, binding.value)
    initScrollLink(el, linkOptions.selector)
  },
  componentUpdated: function (el, binding) {
    const linkOptions = Object.assign({}, options.link, binding.value)
    initScrollLink(el, linkOptions.selector)
  },
  unbind (el) {
    const linkElements = findElements(el)

    for (let i = 0; i < linkElements.length; i++) {
      const linkElement = linkElements[i]
      const id = scrollSpyId(el)
      const listener = scrollLinkClickHandler.bind(null, i, id)
      if (!linkElement[scrollSpyContext]) {
        linkElement[scrollSpyContext] = {}
      }

      if (linkElement[scrollSpyContext].click) {
        linkElement.removeEventListener('click', listener)
        delete linkElement[scrollSpyContext]['click']
      }
    }
  }
}

export {
  scrollSpy,
  scrollSpyActive,
  scrollSpyLink
}
