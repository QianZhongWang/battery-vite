### 运行
npm run dev

### 打包
npm run build

### ant
~~npm i --save ant-design-vue@next -S~~

### route
npm install vue-router@next -S

### vuex
npm i vuex@next -S

### axios
npm install axios -S 

### vue-ls
<del> npm install vue-ls --save </del>

### less
npm i less-loader less --save-dev
```
module.exports = {
 css: {
    loaderOptions: {
      less: {
        modifyVars: {
          // test theme-color
          // 'theme-color': '#421466',
          /* less 变量覆盖，用于自定义 ant design 主题 */
          'primary-color': '#1890FF',
          'link-color': '#1890FF',
          'border-radius-base': '4px'
        },
        javascriptEnabled: true
      }
    }
  }
}
```

### compression-webpack-plugin ( js,css 压缩 )
npm i -D compression-webpack-plugin
```
const CompressionWebpackPlugin = require("compression-webpack-plugin");
module.exports = {
  chainWebpack: (config) => {
    // 生产环境，开启js\css压缩
    if (process.env.NODE_ENV === 'production') {
      config.plugin('compressionPlugin').use(
        new CompressionPlugin({
          test: /\.js$|.\css|.\less/, // 匹配文件名
          threshold: 10240, // 对超过10k的数据压缩
          deleteOriginalAssets: false // 不删除源文件
        })
      )
    }
  }
}
```
