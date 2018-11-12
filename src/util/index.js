/**
 * 格式化歌手姓名
 * @param {Array} arr 歌手列表数组
 */
export function singer(arr) {
  const name = arr.map(item => {
    return item.name;
  });
  return name.join(`/`);
}

/**
 * 获取两个数字区间的一个随机数
 * @param {Number} minNum 区间最小值
 * @param {*} maxNum 区间最大值
 */
export function randomNum(minNum, maxNum) {
  switch (arguments.length) {
    case 1:
      return parseInt(Math.random() * minNum + 1, 10);
    case 2:
      return parseInt(Math.random() * (maxNum - minNum + 1) + minNum, 10);
    default:
      return 0;
  }
}

// 判断是否是ios客户端
const u = navigator.userAgent;
export const isiOS = !!u.match(/\(i[^;]+;( U;)? CPU.+Mac OS X/);

export const isAndroid = u.indexOf(`Android`) > -1 || u.indexOf(`Adr`) > -1;

/**
 * 格式化时间 时间戳->2018年12月12日
 */
export const format = (val, type) => {
  const d = new Date(val)
  const newTime = {
    year: d.getFullYear(),
    month: (d.getMonth() + 1) < 10 ? `0${(d.getMonth() + 1)}` : (d.getMonth() + 1),
    day: d.getDay() < 10 ? `0${d.getDay()}` : d.getDay(),
    hour: d.getHours() < 10 ? `0${d.getHours()}` :d.getHours(),
    minute: d.getMinutes() < 10 ? `0${d.getMinutes()}` : d.getMinutes(),
    second: d.getSeconds() < 10 ? `0${d.getSeconds()}` : d.getSeconds()
  }
  const { year, month, day, hour, minute, second } = newTime
  if (type === 'all') {
    return year + '年' + month + '月' + day + '日' + ' ' + hour + ':' + minute + ':' + second
  }
  return year + '年' + month + '月' + day + '日'
}