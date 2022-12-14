import vnode from './vnode.js'
import createElement from './createElement.js'
import patchVnode from './patchVnode.js'

export default function patch(oldVnode, newVnode) {
  // 判断传入的第一个参数，是dom节点还是虚拟节点
  if (oldVnode.sel == '' || oldVnode.sel == undefined) {
    // (document.getElementById('container'))
    // 传入的第一个参数是dom节点，此时需要包装成虚拟节点
    oldVnode = vnode(oldVnode.tagName.toLowerCase(), {}, [], undefined, oldVnode)
  }
  // 判断oldVnode和newVnode是不是同一个节点
  if (oldVnode.key == newVnode.key && oldVnode.sel == newVnode.sel) {
    // 是同一个节点
    patchVnode(oldVnode, newVnode);
  } else {
    // 不是同一个节点，暴力插入新的，删除旧的
    let newVnodeElm = createElement(newVnode)
    // 插入到老节点之前
    if (oldVnode.elm.parentNode && newVnodeElm) {
      oldVnode.elm.parentNode.insertBefore(newVnodeElm, oldVnode.elm)
    }
    // 删除老节点
    oldVnode.elm.parentNode.removeChild(oldVnode.elm)
  }
}