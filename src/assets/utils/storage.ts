import Storage from 'vue-ls';
import {App} from "@vue/runtime-core";

/**
    Vue.ls.set('foo', 'boo');
    // 设置有效期
    Vue.ls.set('foo', 'boo', 60 * 60 * 1000); //有效1小时
    Vue.ls.get('foo');
    Vue.ls.get('boo', 10); // 如果没有设置boo返回默认值10

    let callback = (val, oldVal, uri) => {
        console.log('localStorage change', val);
    }

    Vue.ls.on('foo', callback) //侦查改变foo键并触发回调
    Vue.ls.off('foo', callback) //不侦查

    Vue.ls.remove('foo'); // 移除
    Vue.ls.clear()  // 清除storage.
 */

const options = {
    namespace: 'vuejs__', // key键前缀
    name: 'ls', // 命名Vue变量.[ls]或this.[$ls],
    storage: 'local', // 存储名称: session, local, memory
};

export default Storage
