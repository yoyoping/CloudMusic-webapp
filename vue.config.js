const path = require("path");
function resolve(dir) {
  return path.join(__dirname, "..", dir);
}

module.exports = {
  // baseUrl: `./`,
  lintOnSave: true,
  chainWebpack: config => {
    config.resolve.alias
      // .set(`@`, resolve(`src`))
      .set(`@assets`, resolve(`src/assets`))
      .set(`@components`, resolve(`src/components`))
      .set(`@util`, resolve(`src/util`))
      .set(`@views`, resolve(`src/views`));
  },
  devServer: {
    // 设置代理
    proxy: {
      "": {
        target: "http://192.168.2.129:3000", // 域名
        // target: "http://192.168.0.105:3000", // 域名
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^/api": "/"
        }
      }
    }
  }
};
