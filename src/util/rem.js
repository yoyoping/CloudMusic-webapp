/**
 * rem兼容移动端
 */
export default () => {
  let deviceWidth = document.documentElement.clientWidth || window.innerWidth;
  if (deviceWidth >= 750) {
    deviceWidth = 750;
  }
  if (deviceWidth <= 320) {
    deviceWidth = 320;
  }
  document.documentElement.style.fontSize = `${deviceWidth / 7.5} + px`;
};
