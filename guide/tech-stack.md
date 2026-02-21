---
title: 技术栈
---

# 技术栈

本文档介绍 HayFrp Web 使用的所有技术栈和依赖。

## 核心框架

### Vue 3.5.13
**官方文档**: https://cn.vuejs.org/

- **Composition API**: 使用 `<script setup>` 语法糖
- **响应式系统**: `ref`, `computed`, `reactive`
- **依赖注入**: `provide/inject` 实现跨组件通信

### Vue Router 4.5.0
**官方文档**: https://router.vuejs.org/zh/

- **路由管理**: 声明式路由配置
- **路由守卫**: `beforeEach` 全局守卫
- **嵌套路由**: 支持嵌套路由
- **路由元信息**: 使用 `meta` 控制权限

### Vite 6.1.0
**官方文档**: https://cn.vitejs.dev/

- **构建工具**: 快速的开发服务器
- **热模块替换**: HMR，开发体验极佳
- **生产构建**: 优化的打包和压缩
- **插件生态**: Vue 插件、TypeScript 插件等

## UI 组件库

### Naive UI 2.41.0
**官方文档**: https://www.naiveui.com/zh-CN/os-web

- **Vue 3 组件库**: 100+ 高质量组件
- **暗色/亮色主题**: 内置主题切换
- **TypeScript 支持**: 完整的类型定义
- **国际化**: 支持多语言

**常用组件**:
- `NCard`: 卡片容器
- `NButton`: 按钮
- `NInput`: 输入框
- `NModal`: 弹窗
- `NDataTable`: 数据表格
- `NTag`: 标签
- `NAvatar`: 头像
- `NIcon`: 图标

## HTTP 客户端

### Axios 1.7.9
**官方文档**: https://axios-http.com/docs/intro

- **HTTP 请求**: GET、POST、PUT、DELETE 等
- **请求拦截器**: 自动添加 Token
- **响应拦截器**: 统一错误处理
- **超时控制**: 30 秒超时

**配置**:
```javascript
const client = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
client.interceptors.request.use(config => {
  const token = localStorage.getItem('verify_access_token')
  if (token) {
    config.headers.Authorization = `Bearer ${token}`
  }
  return config
})

// 响应拦截器
client.interceptors.response.use(
  response => response.data,
  error => {
    if (error.response?.status === 401) {
      clearToken()
      router.push('/login')
    }
    return Promise.reject(error)
  }
)
```

## 图标库

### @vicons/ionicons5 0.13.0
**官方文档**: https://vicons.js.org/

- **Ionicons 图标**: 1000+ 图标
- **Vue 3 支持**: 完整的 Vue 3 支持
- **按需导入**: Tree-shaking 优化

**常用图标**:
- `Sunny`: 太阳（亮色主题）
- `Moon`: 月亮（暗色主题）
- `Settings`: 设置
- `LogOut`: 登出
- `Person`: 用户

## TypeScript

虽然项目使用了 TypeScript 类型注解，但编译时使用的是 JavaScript。

**类型定义**:
- 所有 API 函数都有类型注解
- 组件 props 和 emits 都有类型定义
- 响应式数据都有类型推断

## 状态管理

**LocalStorage**:
- Token 存储: `verify_access_token`
- 用户信息: `verify_user_data`
- CSRF Token: `csrf`

**认证状态管理** (`src/stores/auth.js`):
```javascript
export function getToken() {
  return window.localStorage.getItem('verify_access_token')
}

export function setToken(token) {
  window.localStorage.setItem('verify_access_token', token)
}

export function clearToken() {
  window.localStorage.removeItem('verify_access_token')
}

export function isLoggedIn() {
  return Boolean(getToken())
}
```

## 样式方案

### CSS Modules / Scoped CSS
- 组件内部使用 `<style scoped>` 隔离样式
- 全局样式在 `styles.css` 中定义
- 使用 CSS 变量管理主题颜色

### CSS 变量
```css
:root {
  --primary-color: #18a058;
  --primary-color-hover: #36ad6a;
  --primary-color-pressed: #0c7a43;
}
```

## 构建工具链

### Vite
- **开发服务器**: `npm run dev`
- **构建**: `npm run build`
- **预览**: `npm run preview`

### Nginx（生产环境）
- **静态文件服务**: 托管构建后的 `dist/` 目录
- **反向代理**: 代理 API 请求到后端
- **Gzip 压缩**: 减少传输体积

## 开发工具

### ESLint（推荐）
代码规范检查

### Prettier（推荐）
代码格式化

### Git
版本控制

## 性能优化

### 1. 路由懒加载
```javascript
const Dashboard = () => import('./views/Dashboard.vue')
```

### 2. Tree-shaking
- 按需引入组件
- 使用 `@vicons/ionicons5` 的按需导入

### 3. 图片优化
- 使用 CDN 加速
- 压缩图片资源

### 4. 代码分割
- 路由级别代码分割
- 组件级别代码分割

## 浏览器支持

- **Chrome**: 87+
- **Firefox**: 78+
- **Safari**: 14+
- **Edge**: 87+

## 兼容性

### Polyfills
- ES6+ 语法（通过 Babel 转译）
- Promise（通过 core-js）
- Fetch API（通过 whatwg-fetch）

### 移动端适配
- 响应式布局
- 触摸事件优化
- 移动端浏览器兼容

## 安全性

### HTTPS
- 生产环境强制使用 HTTPS
- 自定义证书配置

### XSS 防护
- Vue 自动转义 HTML
- 使用 `v-html` 时手动清理

### CSRF 防护
- Token 认证
- SameSite Cookie

### 内容安全策略（CSP）
- 配置 CSP 策略
- 白名单域名

## 下一步优化方向

1. **引入 Pinia**: 替代简单的 localStorage 状态管理
2. **TypeScript 严格模式**: 启用严格类型检查
3. **单元测试**: 使用 Vitest + Vue Test Utils
4. **E2E 测试**: 使用 Playwright
5. **CI/CD**: 自动化构建和部署
6. **性能监控**: 集成 Sentry 或类似工具
7. **国际化**: 支持多语言
8. **主题扩展**: 支持更多主题切换
