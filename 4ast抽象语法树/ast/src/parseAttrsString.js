// 把attrsString变为数组返回
export default function (attrsString) {
  if (attrsString == undefined) return [];
  // 当前是否在引号内
  var isYinhao = false;
  // 断点
  var point = 0;
  var result = [];
  // 遍历attrsString，而不是你想的用split()这种方法
  for (let i = 0; i < attrsString.length; i++) {
    let char = attrsString[i];
    if (char == '"') {
      isYinhao = !isYinhao
    } else if (char == ' ' && !isYinhao) {
      // 遇见了空格，并且不在引号中
      if (!/^\s*$/.test(attrsString.substring(point, i))) {
        result.push(attrsString.substring(point, i));
        point = i
      }
    }
  }
  //  循环结束，最后还剩下一个属性k="v"
  result.push(attrsString.substring(point).trim())
  console.log(result, 'hh')
  result = result.map(item => {
    const o = item.match(/^(.+)=(.+)$/);
    return {
      name: o[1],
      value: o[2]
    }
  })
  return result
}