import Scanner from './Sanner.js'
import nestTokens from './nestTokens'
/* 
   将模板字符串变成tokens数组
*/
export default function parseTemplateToTokens(templateStr) {
  var tokens = [];
  // 实例化一个扫描器，构造时候提供一个参数，这个参数就是模板字符串
  // 也就是说这个扫描器就是针对这个模板字符串工作的
  // 创建扫描器
  var scanner = new Scanner(templateStr);
  var words = '';
  // 当scanner没有到头,让扫描器工作
  while (!scanner.eos()) {
    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('{{');
    // 存起来
    if (words != '') {
      // 标签中的空格不能去掉，比如<div class="box"> 不能去掉class前面的空格
      console.log(words);
      var isInJJH = false;
      var _words = '';
      for (var i = 0; i < words.length; i++) {
        // 判断是否在标签里
        if (words[i] == '<') {
          isInJJH = true;
        } else if (words[i] == '>') {
          isInJJH = false;
        }
        // 如果这项不是空格，直接拼接上
        if (!/\s/.test(words[i])) {
          _words += words[i];
        } else {
          // 如果这项是空格，只有当它在标签内的时候，才拼接
          if (isInJJH) {
            _words += ' ';
          }
        }
      }
      tokens.push(['text', _words])
    }
    // 过 {{
    scanner.scan('{{');

    // 收集开始标记出现之前的文字
    words = scanner.scanUtil('}}');
    // 存起来
    if (words != '') {
      // 这个words就是{{}}中间的东西，判断一下首字符
      if (words[0] == '#') {
        // 存起来，从下标为1的项开始存，因为下标为0的项是#
        tokens.push(['#', words.substring(1)]);
      } else if (words[0] == '/') {
        // 存起来，从下标为1的项开始存，因为下标为0的项是/
        tokens.push(['/', words.substring(1)]);
      } else {
        tokens.push(['name', words])
      }
    }
    // 过 }}
    scanner.scan('}}');
  }
  // 返回折叠收集的tokens
  return nestTokens(tokens);
}