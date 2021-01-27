const path = require("path");
const CompressionPlugin = require("compression-webpack-plugin");

const env = process.env.NODE_ENV;

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
  configureWebpack: () => {
    if (env === "production") {
      // gzip压缩
      return {
        plugins: [
          new CompressionPlugin({
            test: /\.js$|\.html$|.\css/, //匹配文件名
            threshold: 10240, //对超过10k的数据压缩
            deleteOriginalAssets: false //不删除源文件
          })
        ]
      };
    }
  },
  devServer: {
    port: 80,
    // 设置代理
    proxy: {
      "": {
        target: "http://121.196.110.187:3000", // 域名
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^/api": ""
        }
      },
      "/dev": {
        target: "http://localhost:3000", // 域名
        changOrigin: true, //开启代理：在本地会创建一个虚拟服务端，然后发送请求的数据，并同时接收请求的数据，这样服务端和服务端进行数据的交互就不会有跨域问题
        pathRequiresRewrite: {
          "^/dev": ""
        }
      }
    }
  }
};
