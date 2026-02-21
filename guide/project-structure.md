---
title: 项目结构
---

# 项目结构

本文档描述 HayFrp Web 项目的目录结构。

## 目录结构

```
HayFrp-Web/
├── src/
│   ├── api/                    # API 接口定义
│   │   ├── api.ts             # API 调用封装
│   │   └── client.js          # Axios 客户端配置
│   ├── components/            # 公共组件
│   │   └── AppLayout.vue      # 主布局组件
│   ├── router/                # 路由配置
│   │   └── index.ts           # 路由定义和守卫
│   ├── stores/                # 状态管理
│   │   └── auth.js            # 认证状态管理
│   ├── styles.css             # 全局样式
│   ├── App.vue                # 根组件
│   ├── main.js                # 应用入口
│   └── views/                 # 页面组件
│       ├── Landing.vue        # 首页
│       ├── Login.vue          # 登录页
│       ├── Register.vue       # 注册页
│       ├── Dashboard.vue      # 控制台
│       ├── Proxies.vue        # 隧道管理
│       ├── UserSettings.vue   # 用户设置
│       ├── Customize.vue      # 面板个性化
│       ├── Nodes.vue          # 节点列表
│       ├── Download.vue       # 下载页
│       ├── About.vue          # 关于页
│       ├── ServiceProvider.vue # 服务商控制台
│       ├── Chat.vue           # 聊天室
│       ├── Bind.vue           # 绑定账户
│       └── NotFound.vue       # 404 页面
├── dist/                      # 构建输出
├── index.html                 # HTML 模板
├── package.json               # 项目配置
├── vite.config.js             # Vite 配置
└── README.md                  # 项目说明
```

## 目录说明

### src/api/
存放所有 API 接口定义和封装。

**api.ts**: API 调用函数封装
**client.js**: Axios 客户端配置（拦截器、错误处理）

### src/components/
存放可复用的公共组件。

**AppLayout.vue**: 主布局组件，包含导航栏、主题切换、用户菜单

### src/router/
路由配置文件。

**index.ts**: 路由定义、路由守卫、权限控制

### src/stores/
状态管理文件。

**auth.js**: 认证状态管理（Token、登录状态）

### src/views/
存放所有页面组件。

**Landing.vue**: 首页（公开）
**Login.vue**: 登录页（公开）
**Register.vue**: 注册页（公开）
**Dashboard.vue**: 控制台（需要登录）
**Proxies.vue**: 隧道管理（需要登录）
**UserSettings.vue**: 用户设置（需要登录）
**Customize.vue**: 面板个性化（需要登录）
**Nodes.vue**: 节点列表（公开）
**Download.vue**: 下载页（公开）
**About.vue**: 关于页（公开）
**ServiceProvider.vue**: 服务商控制台（需要登录）
**Chat.vue**: 聊天室（需要登录）
**Bind.vue**: 绑定账户（公开）
**NotFound.vue**: 404 页面（公开）

## 配置文件说明

### package.json
项目依赖和脚本配置。

```json
{
  "dependencies": {
    "@vicons/ionicons5": "^0.13.0",  // 图标库
    "axios": "^1.7.9",               // HTTP 客户端
    "naive-ui": "^2.41.0",           // UI 组件库
    "vue": "^3.5.13",                // Vue 框架
    "vue-router": "^4.5.0"           // 路由管理
  },
  "scripts": {
    "dev": "vite",                   // 开发模式
    "build": "vite build",           // 构建生产版本
    "preview": "vite preview"        // 预览生产版本
  }
}
```

### vite.config.js
Vite 构建工具配置。

```javascript
export default defineConfig({
  base: '/web/',                    // 基础路径
  plugins: [vue()],                 // Vue 插件
  server: {
    host: '0.0.0.0',                // 允许外部访问
    port: 5173,                     // 端口
    proxy: {                        // 代理配置
      '/api': {
        target: 'http://10.0.0.5:9123/api',
        secure: false,
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, '')
      }
    }
  }
})
```

## 文件命名规范

### 组件文件
- 使用 PascalCase 命名
- 例如：`UserSettings.vue`, `LoginView.vue`

### API 文件
- 使用 camelCase 命名
- 例如：`getUserInfo()`, `login()`

### 路由文件
- 使用 camelCase 命名
- 例如：`index.ts`, `routes.ts`

### 样式文件
- 使用 kebab-case 命名
- 例如：`styles.css`, `main.css`

## 代码组织规范

### 单一职责原则
每个组件、函数只负责一个功能。

### 组件拆分
- 组件尽量保持简洁
- 复杂组件拆分为子组件
- 组件内部使用 `<script setup>` 语法

### API 封装
- 所有 API 调用统一封装在 `src/api/api.ts`
- 使用 TypeScript 类型注解
- 统一错误处理

### 状态管理
- 认证状态使用 localStorage
- 使用 Pinia（虽然未安装，但预留了 stores 目录）

### 路由配置
- 路由定义与组件分离
- 使用路由元信息（meta）控制权限
- 统一的路由守卫处理
