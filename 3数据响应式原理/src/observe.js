  import Observer from './Observer.js'

  // 创建observe函数
  export default function observe(value) {
    // 如果value不是对象，什么都不做
    if (typeof value != 'object') return
    // 定义 ob
    var ob;
    if (typeof value.__ob__ !== 'undefined') {
      ob = value.__ob__; // 起到一个判定作用
    } else {
      ob = new Observer(value)
    }
    return ob
  }