import { createApp } from 'vue'
import App from './App.vue'
import './index.css'

import router from './router'
import store from './store'

import Antd from 'ant-design-vue'
import 'ant-design-vue/dist/antd.css'

import util from './assets/utils';

createApp(App)
  .use(router)
  .use(store)
  .use(Antd)
  .use(util)
  .mount('#app')
