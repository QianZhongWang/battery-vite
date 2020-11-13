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

### 设置别名
npm install path
```
module.exports = {
  chainWebpack: (config) => {
    config.resolve.alias
          .set('@comp', resolve('src/components'))
          .set('@img', resolve('src/assets/images'))
          .set('@inter', resolve('src/interface'))
          .set('@api', resolve('src/api'))
          .set('@assets', resolve('src/assets'))
          .set('@util', resolve('src/util'));
  }
}
```

###　nprogress
npm install --save nprogress 
```
//main.js
//引入 nprogress
import NProgress from 'nprogress' // 进度条
import 'nprogress/nprogress.css' // 引入样式

// 简单配置
NProgress.inc(0.2)
NProgress.configure({ easing: 'ease', speed: 500, showSpinner: false })

// 进度条开始
router.beforeEach((to,from,next) => {
  NProgress.start()  //进度条出现
  next()
})

// 进度条结束
router.afterEach(() => {
  NProgress.done() //进度条消失
})

//style()
#nprogress .bar {
    background: red !important; //自定义颜色
}
```