import lookup from "./lookup";
import renderTemplate from "./renderTemplate";
/* 
  处理数组，结合renderTemplate实现递归
  注意，这个函数接收的参数是token，而不是tokens
  token是什么？就是一个简单的 ['#','students',[ ]]

  这个函数要递归调用renderTemplate函数，调用多少次？调用的次数由data决定的
  比如 data 的形式是这样的：
  data = {
      students:[
        {name1:'小明',hobbies:['游泳','健身']},
        {name1:'小红',hobbies:['足球2','健身2']},
        {name1:'小强',hobbies:['吃饭','呵呵']}
      ],
  }
  那么parseArray()函数就要递归调用renderTemplate函数3次，因为数组长度是3
  
*/
export default function parseArray(token, data) {
  // 得到整体数据data中这个数组要使用的部分
  var v = lookup(data, token[1]);
  // 结果字符串
  var resultStr = '';
  // 遍历v数组，v一定是数组
  for (var i = 0; i < v.length; i++) {
    // 这里要补一个.属性
    // 拼接
    resultStr += renderTemplate(token[2], {
      ...v[i],
      '.': v[i]
    });
  }
  return resultStr;
}