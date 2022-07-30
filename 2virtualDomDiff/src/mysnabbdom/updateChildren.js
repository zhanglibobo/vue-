import patchVnode from "./patchVnode.js";
import createElement from "./createElement.js";
/* 
  diff算法优化策略
  四种命中查找：
  1、新前与旧前
  2、新后与旧后
  3、新后与旧前 （此种发生，涉及移动节点,那么旧前指向的节点，移动到旧后之后）
  4、新前与旧后  (此种发生，涉及移动节点,那么旧后指向的节点，移动到旧前之前）

  新前 新的虚拟节点中没有处理的开头的节点
  新后 新的虚拟节点中没有处理的最后一个的节点

  命中一种就不再进行判断了
  如果都没有命中，就需要用循环来寻找了，移动到oldStartIdx之前
*/

// 判断是否是同一个虚拟节点
function checkoutSameVnode(a, b) {
  return a.sel == b.sel && a.key == b.key
}
export default function updateChildren(parentElm, oldCh, newCh) {
  // 旧前
  let oldStartIdx = 0;
  // 新前
  let newStartIdx = 0;
  // 旧后
  let oldEndIdx = oldCh.length - 1;
  // 新后
  let newEndIdx = newCh.length - 1;
  // 旧前节点
  let oldStartVnode = oldCh[0];
  // 旧后节点
  let oldEndVnode = oldCh[oldEndIdx]
  // 新前节点
  let newStartVnode = newCh[0];
  // 新后节点
  let newEndVnode = newCh[newEndIdx];
  // 
  let keyMap = null;

  while (oldStartIdx <= oldEndIdx && newStartIdx <= newEndIdx) {
    // 首先不是判断1、2、3、4命中，而是要略过已经加了undefined标记的东西
    if (oldStartVnode == null || oldCh[oldStartIdx] == undefined) {
      oldStartVnode = oldCh[++oldStartIdx]
    } else if (oldEndVnode == null || oldCh[oldEndIdx] == undefined) {
      oldEndVnode = oldCh[--oldEndIdx]
    } else if (newStartVnode == null || newCh[newStartIdx] == undefined) {
      newStartVnode = newCh[++newStartIdx]
    } else if (newEndVnode == null || newCh[newEndIdx] == undefined) {
      newEndVnode = newCh[--newEndIdx]
    } else if (checkoutSameVnode(oldStartVnode, newStartVnode)) {
      // 1、新前与旧前
      patchVnode(oldStartVnode, newStartVnode);
      oldStartVnode = oldCh[++oldStartIdx]
      newStartVnode = newCh[++newStartIdx]
    } else if (checkoutSameVnode(oldEndVnode, newEndVnode)) {
      // 2、新后与旧后
      patchVnode(oldEndVnode, newEndVnode);
      oldEndVnode = oldCh[--oldEndIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkoutSameVnode(oldStartVnode, newEndVnode)) {
      // 3、新后与旧前
      patchVnode(oldStartVnode, newEndVnode);
      // 当3、新后与旧前命中的时候，此时要移动节点，移动旧前指向的这个节点到老节点的旧后的后面
      parentElm.insertBefore(oldStartVnode.elm, oldEndVnode.elm.nextSibling); // (nextSibling 属性返回指定节点之后紧跟的节点，在相同的树层级中，空行也算)
      oldStartVnode = oldCh[++oldStartIdx]
      newEndVnode = newCh[--newEndIdx]
    } else if (checkoutSameVnode(oldEndVnode, newStartVnode)) {
      // 4、新前与旧后
      patchVnode(oldEndVnode, newStartVnode);
      // 当4、新前与旧后命中的时候，此时要移动节点。移动新前（旧后）指向的这个节点到老节点的旧前的前面
      parentElm.insertBefore(oldEndVnode.elm, oldStartVnode.elm); // (nextSibling 属性返回指定节点之后紧跟的节点，在相同的树层级中，空行也算)
      // 如何移动节点？？只要插入一个已经在dom树上的节点，他就会移动
      oldEndVnode = oldCh[--oldEndIdx]
      newStartVnode = newCh[++newStartIdx]
    } else {
      // 都没有找到
      // 四种命中都没有命中
      // 寻找key的map
      if (!keyMap) {
        keyMap = {};
        // 从oldStartIdx开始，到oldEndIdx结束，创建keyMap映射对象
        for (let i = oldStartIdx; i <= oldEndIdx; i++) {
          const key = oldCh[i].key;
          if (key !== undefined) {
            keyMap[key] = i;
          }
        }
      }
      // 寻找当前这项（newStartIdx）这项在keyMap中映射的位置序号
      const idxInOld = keyMap[newStartVnode.key];
      if (idxInOld == undefined) {
        // 判断，如果idxInOld是undefined,表示它是全新的项
        parentElm.insertBefore(createElement(newStartVnode), oldStartVnode.elm);
      } else {
        // 如果不是undefined，不是全新的项，而是要移动
        const elmToMove = oldCh[idxInOld];
        patchVnode(elmToMove, newStartVnode);
        // 把这项设置为undefined，表示我已经处理完这项了
        oldCh[idxInOld] = undefined;
        // 移动，调用insertBefore也可以实现
        parentElm.insertBefore(elmToMove.elm, oldStartVnode.elm)
      }
      // 指针下移，移动新的头
      newStartVnode = newCh[++newStartIdx];
    }
  }
  // 循环结束看看有没有剩余的，循环结束了start还是比end小
  if (newStartIdx <= newEndIdx) {
    console.log('new还有剩余节点没有处理,要增加项');
    // 插入的标杆
    // const before = newCh[newEndIdx + 1] == null ? null : newCh[newEndIdx + 1].elm;
    const before = oldCh[oldEndIdx + 1] == null ? null : oldCh[oldEndIdx + 1].elm;
    console.log(newCh[newEndIdx + 1])
    for (let i = newStartIdx; i <= newEndIdx; i++) {
      // insertBefore方法可以自动识别null,如果是null就会自动排队排到队尾去。和appendChild是一致了
      // newCh[i]现在还没有真正的dom,所以要调用createElement()函数变为DOM
      // parentElm.insertBefore(createElement(newCh[i]), before);
      // 遍历新的newCh,添加到老的没有处理的之前
      // parentElm.insertBefore(createElement(newCh[i]), oldCh[oldStartIdx].elm);
      parentElm.insertBefore(createElement(newCh[i]), before);
    }
  } else if (oldStartIdx <= oldEndIdx) {
    console.log('old还有剩余节点没有处理，要删除项')
    // 批量删除oldStart和oldEnd指针之间的项
    for (let i = oldStartIdx; i <= oldEndIdx; i++) {
      if (oldCh[i]) {
        parentElm.removeChild(oldCh[i].elm)
      }
    }
  }

}