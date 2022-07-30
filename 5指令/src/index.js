// import observe from './observe.js'
// import Watcher from './watcher.js';
// // 图【Observer】【重写数组】
// var obj = {
//   a: {
//     m: {
//       n: 5
//     }
//   },
//   b: 10,
//   c: {
//     d: {
//       e: {
//         f: 666
//       }
//     }
//   }
// }
// observe(obj);
// new Watcher(obj,'a.m.n',(val)=>{
//   console.log('哈哈哈哈哈')
// })
// obj.a.m.n = 10;
// console.log(obj.c.d.e.f)
import Vue from './Vue.js'

window.Vue = Vue;