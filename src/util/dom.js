export function hasClass(el, className) {
  // 开始或空白字符+类名+空白字符或结束
  let reg = new RegExp(`(^|\\s)` + className + `(\\s|$)`);
  // 测试元素是否有该类名，返回布尔值
  return reg.test(el.className);
}

export function addClass(el, className) {
  if (hasClass(el, className)) {
    return;
  }
  // 以空白符为切割位置切割生成新数组
  let newClass = el.className.split(` `);
  // 数组中加入新类名
  newClass.push(className);
  // 将数组元素放入一个字符串，以空白符间隔
  el.className = newClass.join(` `);
}

// 能力检测
let elementStyle = document.createElement(`div`).style;

let vendor = (() => {
  // 定义游览器前缀
  let transformNames = {
    webkit: `webkitTransform`,
    Moz: `MozTransform`,
    O: `OTransform`,
    ms: `msTransform`,
    standard: `transform`
  }

  // 遍历前缀，如果游览器支持的话，就返回对应 key
  for (let key in transformNames) {
    if (elementStyle[transformNames[key]] !== undefined) {
      return key;
    }
  }

  // 如果都不支持，那肯定是有问题的，返回 false
  return false;
})();

export function prefixStyle(style) {
  if (vendor === false) {
    return false;
  }
  // 如果 vendor 为标准，就不改变 style
  if (vendor === `standard`) {
    return style;
  }

  // 否则返回 vender(也就是 webkit Moz O ms 中的一个) + 样式首字母大写
  // 例如：webkit + transform ---> webkitTransform
  return vendor + style.charAt(0).toUpperCase() + style.substr(1);
}
