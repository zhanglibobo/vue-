/* 
  Object.defineProperty()数据劫持/数据代理
  这个方法会直接在一个对象上定义一个新属性，或者修改一个对象的现有属性，并返回此对象
*/
var obj = {};
var temp;
Object.defineProperty(obj, 'a', {
  // value: '哈哈', //get和value不能同时写
  // writable: false, // 是否可写
  enumerable: true, // 是否可被枚举 for in
  configurable: true, // 可以被配置，比如可以被delete
  // getter
  get() {
    console.log('访问obj的a属性');
    return temp;
  },
  // setter
  set(newValue) {
    console.log('改变obj的a属性', newValue)
    temp = newValue
  }

})
Object.defineProperty(obj, 'b', {
  value: '哈哈b',
  enumerable: true
})
// for (var i in obj) {
//   console.log(i)
// }
console.log(obj.a)
obj.a = 'heheh'
console.log(obj.a)