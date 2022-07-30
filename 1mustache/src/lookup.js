/* 
  功能是可以在dataObj对象中，寻找用连续点符号的keyname属性
  比如：dataObj是{a:{b:{c:'hhh'}}}
  那么lookup(dataObj,'a.b.c')的结果就是hhh
*/
export default function lookup(dataObj, keyName) {
  // 看看keyName中有没有 . 符号
  if (keyName.indexOf('.') != -1 && keyName != '.') {
    // 如果有.符号，那么拆开
    var keys = keyName.split('.');
    var temp = dataObj;
    for (var i = 0; i < keys.length; i++) {
      temp = temp[keys[i]]
    }
    return temp;
  }
  // 如果没有.符号
  return dataObj[keyName];
}