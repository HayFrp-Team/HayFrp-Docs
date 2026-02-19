# 路由守卫

> 路由守卫实现于 `router/index.ts`

## 实现代码

```typescript
router.beforeEach((to, _from, next) => {
  document.title = `${to.meta.title || 'HayFrp'} - HayFrp`

  // 从 localStorage 直接读取登录状态
  const csrf = localStorage.getItem('csrf')
  const isLoggedIn = !!csrf

  // 需要登录但未登录，跳转登录页
  if (to.meta.requiresAuth && !isLoggedIn) {
    next({ name: 'Login', query: { redirect: to.fullPath } })
  }
  // 访客页面但已登录，跳转首页(除非有 redirect_url)
  else if (to.meta.guest && isLoggedIn) {
    if (to.query.redirect_url) {
      next()
    } else {
      next({ path: '/' })
    }
  }
  else {
    next()
  }
})
```

## 权限判断逻辑

| 页面类型 | 未登录 | 已登录 |
|----------|--------|--------|
| 公开页面 | 正常访问 | 正常访问(部分会重定向首页) |
| 需要登录 | 重定向 `/login?redirect=原路径` | 正常访问 |
| 访客页面 | 正常访问 | 重定向 `/` |

## 路由守卫流程图

```
用户访问路由
    │
    ▼
检查页面元信息
    │
    ├─ 公开页面 ──────────────▶ 允许访问
    │
    ├─ 需要登录 ──┬─ 未登录 ──▶ 重定向到登录页
    │            │
    │            └─ 已登录 ──▶ 允许访问
    │
    └─ 访客页面 ──┬─ 未登录 ──▶ 允许访问
                 │
                 └─ 已登录 ──▶ 重定向到首页
```
