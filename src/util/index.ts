import { App } from 'vue';
// import util from '../assets/utils/util';
// import storage from '../assets/utils/storage';
// console.log(util)
// console.log(storage)

declare interface Utils {
    addN(n: number): number;
}

// ComponentCustomProperties 扩展方法 $util
declare module '@vue/runtime-core' {
    interface ComponentCustomProperties {
        $util: Utils;
    }
}

export default {
    install(app: App) {
        app.config.globalProperties.$util = {
            // util,
            // storage,
            addN(a: number) {
                return a + 1
            }
        }
    }
}
// plan A  :use
// app.use(Utils);

// plan b
// app.config.globalProperties.$utils = Utils;