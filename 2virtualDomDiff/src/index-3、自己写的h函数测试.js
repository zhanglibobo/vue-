import h from './mysnabbdom/h.js'
var myVnode1 = h('div', {}, [
  h('p', {}, '哈哈'),
  h('p', {}, [
    h('span', {}, '测试嵌套')
  ]),
])
console.log(myVnode1);