import { createApp } from 'vue'
import App from './App.vue'
import './index.css'
import 'nprogress/nprogress.css' // 进度条样式

import router from './router/index'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

// import util from './util/index';


// createApp(App)

  // .use(util)
  // .mount('#app');

const app = createApp(App);
app.use(router);
app.use(store);
app.use(Antd);
// app.use(util);
app.mount("#app");
