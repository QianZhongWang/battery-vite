import { resolve } from "path";

function pathResolve(dir: string) {
    return resolve(__dirname, ".", dir);
}
module.exports = {
    alias: {
        "/@/": pathResolve("src"),
        "@api/": pathResolve("src/api"),
        "@util/": pathResolve("src/util"),
        "@assets": pathResolve("src/assets"),
        "@img": pathResolve("src/assets/images"),
        "@comp": pathResolve("src/components"),
        "@inter": pathResolve("src/interface")
    },
    optimizeDeps: {
        include: ["@ant-design/icons-vue"],
    },
};
