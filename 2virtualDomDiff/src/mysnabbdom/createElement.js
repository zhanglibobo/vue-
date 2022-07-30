// 真正的创建节点，将vnode创建为dom，是孤儿节点，不进行插入
export default function createElement(vnode) {
  // 创建一个dom节点, 这个节点现在还是孤儿节点
  let domNode = document.createElement(vnode.sel);
  // 内部有文本 还是子节点
  if (vnode.text != '' && (vnode.children == undefined || vnode.children.length == 0)) {
    // 内部是文字
    domNode.innerText = vnode.text;
  } else if (Array.isArray(vnode.children) && vnode.children.length > 0) {
    // 它的内部是子节点，就要递归创建节点
    for (let i = 0; i < vnode.children.length; i++) {
      let ch = vnode.children[i];
      // 创建出它的dom,一旦调用createElement意味着：创建出dom了，并且它的elm属性指向了创建出的dom，
      // 但是还没有上树，是一个孤儿节点
      //（递归生成dom树，然后统一挂载）
      let chDom = createElement(ch);
      // 上树
      domNode.appendChild(chDom);
    }
  }
  // 补充elm属性
  vnode.elm = domNode
  // 返回elm，elm属性是一个纯dom对象
  return vnode.elm
}