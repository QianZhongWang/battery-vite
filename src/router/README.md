# vue-next-router

### 构建选项 mode
```
 import { createRouter, createWebHistory } from  vue-next-router
 const router = createRouter({
   history: createWebHistory(),
 })
 // createWebHashHistory() : hash路由
 // createWebHistory() : history路由
```

### 构建选项 base (/)
```
import { createRouter, createWebHistory } from  vue-next-router
const router = createRouter({
  history: createWebHistory( / ),
})
```

### 捕获所有路由
```
const router = createRouter({
  history: createWebHistory(),
  routes: [
    { path:  /user/:a:catchAll(.*) , component: component },
  ],
})
```

### resolve
```
 function resolve(
    rawLocation: Readonly<RouteLocationRaw>,
    currentLocation?: Readonly<RouteLocationNormalizedLoaded>
  ): RouteLocation & { href: string } {
  let matchedRoute = matcher.resolve(matcherLocation, currentLocation)
  return {
    fullPath,
    hash,
    query: normalizeQuery(rawLocation.query),
    ...matchedRoute,
    redirectedFrom: undefined,
    href: routerHistory.base + fullPath,
  }
}
```

### router.getMatchedComponents
```
// 返回目标位置或是当前路由匹配的组件数组 (是数组的定义/构造类，不是实例)。
// 通常在服务端渲染的数据预加载时使用。
[{
  aliasOf: undefined
  beforeEnter: undefined
  children: []
  components: {default: {…}, other: {…}}
  instances: {default: null, other: Proxy}
  leaveGuards: []
  meta: {}
  name: undefined
  path: "/"
  props: ƒ (to)
  updateGuards: []
}]
```