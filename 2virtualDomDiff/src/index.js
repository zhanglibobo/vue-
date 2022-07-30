import h from "./mysnabbdom/h.js";
import patch from "./mysnabbdom/patch.js";

const vnode1 = h('ul', {}, [
  // h('li', {key:'A'}, 'A'),
  h('li', {key:'B'}, 'B'),
  h('li', {key:'C'}, 'C'),
  h('li', {key:'D'}, 'D'),
])
const vnode2 = h('ul', {}, [
  h('li', {key:'B'}, [
    h('span',{},'d')
  ]),
  h('li', {key:'E'}, 'E'),
  h('li', {key:'C'}, 'C'),
  h('li', {key:'D'}, 'D'),
  h('li', {key:'Q'}, 'Q'),
  h('li', {key:'T'}, 'T'),
])
const container = document.getElementById('container')
const btn = document.getElementById('btn')
patch(container, vnode1)
btn.onclick = function() {
  patch(vnode1, vnode2);
}