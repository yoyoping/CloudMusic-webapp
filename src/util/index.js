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
