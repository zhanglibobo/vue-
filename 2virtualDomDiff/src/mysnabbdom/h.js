import vnode from './vnode.js'

// 编写一个低配版的h函数，这个函数必须接受3个参数，缺一不可
// 相当于重载功能较弱
// 也就是说，调用的时候形态必须是下面的三种之一
// 形态1 h('div', {}, '文字')
// 形态1 h('div', {}, [])
// 形态1 h('div', {}, h())

export default function h(sel, data, c) {
  //  检查参数的个数
  if (arguments.length != 3) {
    throw new Error('h函数必须传入3个参数');
  }
  // 检查参数 c 的类型 
  if (typeof c == 'string' || typeof c == 'number') {
    // 说明现在调用h函数是形态1
    return vnode(sel, data, undefined, c, undefined);
  } else if (Array.isArray(c)) {
    // 说明现在调用h函数是形态2
    let children = [];
    // 遍历 c
    for (var i = 0; i < c.length; i++) {
      // 检查c[i]必须是一个对象
      if (!typeof c[i] == 'object' && c.hasOwnProperty('sel')) {
        throw new Error('传入的数组参数中 有项不是h函数');
      }
      // 这里不用执行c[i]，因为测试语句中已经有了执行
      children.push(c[i])
    }
    // 循环结束，就说明children收集完毕了，此时可以返回虚拟节点了，它有children属性
    return vnode(sel, data, children, undefined, undefined);
  } else if (typeof c == 'Object' && c.hasOwnProperty('sel')) {
    // 说明现在调用h函数是形态3
    // 即：传入的c是唯一的children，不用执行c，因为测试语句中已经执行了
    let children = [c];
    return vnode(sel, data, children, undefined, undefined);
  } else {
    throw new Error('h函数传入的第3个参数类型不对');
  }
}