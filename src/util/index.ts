import { App } from 'vue';
import util from '../assets/utils/util';
import storage from '../assets/utils/storage';

declare interface Utils {
    addN(n: number): number;
    token(val: any): any;
}

// ComponentCustomProperties 扩展方法 $util
// declare module '@vue/runtime-core' {
//     interface ComponentCustomProperties {
//         $util: Utils;
//     }
// }
export function welcome() {
    const arr = ['休息一会儿吧', '准备吃什么呢?', '要不要打一把 DOTA', '我猜你可能累了']
    const index = Math.floor((Math.random() * arr.length))
    return arr[index]
}

export default {
    install(app: App) {
        app.config.globalProperties.$util = {
            // util,
            // storage,
            addN(a: number) {
                return a + 1
            },
            token() {
                return null
            },
        }
    }
}
// plan A  :use
// app.use(Utils);

// plan b
// app.config.globalProperties.$utils = Utils;