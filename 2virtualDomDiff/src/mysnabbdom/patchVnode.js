/*
   新创建的节点 newVnode.children[i].elm插入到所有未处理的节点 oldVnode.children[un].elm之前，而不是所有已处理节点之后 
 */
import updateChildren from './updateChildren.js'
import createElement from './createElement.js'

// oldVnode, newVnode 是同一个虚拟节点 sel和key相同
export default function patchVnode(oldVnode, newVnode) {
  // 判断新旧vnode是否是一个对象
  if (oldVnode === newVnode) return;
  // 判断新旧vnode有没有text属性
  if (newVnode.text != undefined && (newVnode.children == undefined || newVnode.children.length == 0)) {
    // 新Vnode有text属性
    if (newVnode.text != oldVnode.text) {
      // 如果新虚拟节点中的text和老虚拟节点中的text不同，那么直接让新的text写入老的elm中即可
      // 如果老的elm中是children，那么也会立即消失掉
      oldVnode.elm.innerText = newVnode.text;
    }
  } else {
    // 新vnode没有text属性 有children
    // 判断老的有没有children
    if (oldVnode.children != undefined && oldVnode.children.length > 0) {
      console.log(oldVnode, newVnode)
      // 老的有children，此时就是最复杂的情况，新老都有children
      updateChildren(oldVnode.elm, oldVnode.children, newVnode.children);
    } else {
      // 老的没有children,新的有children
      // 清空老的节点的内容
      oldVnode.elm.innerText = '';
      // 遍历新的vnode的子节点，创建dom，上树
      for (let i = 0; i < newVnode.children.length; i++) {
        console.log(newVnode.children[i])
        let dom = createElement(newVnode.children[i]);
        oldVnode.elm.appendChild(dom);
      }
    }
  }
}