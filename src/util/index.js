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
