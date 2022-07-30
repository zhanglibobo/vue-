import {
  init,
  classModule,
  propsModule,
  styleModule,
  eventListenersModule,
  h,
} from "snabbdom";

// 创建patch函数
const patch = init([
  // Init patch function with chosen modules
  classModule, // makes it easy to toggle classes
  propsModule, // for setting properties on DOM elements
  styleModule, // handles styling on elements with support for animations
  eventListenersModule, // attaches event listeners
]);
// 创建虚拟节点
const myVnode1 = h('a', {
  props: {
    href: 'http://www.baidu.com'
  }
}, [
  h('span',{},'文字'),
  h('span',{},'jjj')
])

console.log(myVnode1);
const myVnode2 = h('div', {}, '文字div')
// 让虚拟节点上树
const container = document.getElementById("container");
patch(container, myVnode1);

/* 
  h函数写法
 */
// h('div')
// h('div','文字')
// h('div',[])
// h('div', h())

// h('div', {}, '文字')
// h('div', {}, [])
// h('div', {}, h())

/* 
  虚拟节点的属性：
  {
    sel: "div",
    data: {}, // props等属性
    children: undefined,
    text: "我是一个盒子"
    // key: undefined, // data中的属性
    elm: undefined, // patch上树后才有值
  }
*/

/* 
  测试h函数返回值 h函数  ===》 虚拟dom树
*/
// console.log(h('ul', {}, [
//   h('li', {}, '文字1'),
//   h('li', {}, '文字2'),
//   h('li', {}, '文字3'),
// ]))
// console.log(h('ul',{}, [
//   h('li','文字1'),
//   h('li','文字2'),
// ]))