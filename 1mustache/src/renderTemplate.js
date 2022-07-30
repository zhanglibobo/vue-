import lookup from "./lookup.js";
import parseArray from "./parseArray.js";

/* 
   
*/
export default function renderTemplate(tokens, data) {
  // 结果字符串
  var resultStr = '';
  // 遍历tokens
  for (var i = 0; i < tokens.length; i++) {
    let token = tokens[i]
    // 判断类型
    if (token[0] == 'text') {
      resultStr += token[1];
    } else if (token[0] == 'name') {
      // 如果是name类型，那么就直接使用它的值，当然要用lookup
      // 防止是‘a.b.c’的形式
      resultStr += lookup(data, token[1]);
    } else if (token[0] == '#') {
      resultStr += parseArray(token, data);
    }
  }
  return resultStr;
}