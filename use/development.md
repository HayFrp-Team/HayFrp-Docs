---
title: 开发指南
---

# 开发指南

本文档介绍如何开发、构建和部署 HayFrp Web 项目。

## 环境要求

### 必需工具
- **Node.js**: >= 18.0.0 (推荐 18.16.0+)
- **npm**: >= 9.0.0 或 **yarn**: >= 1.22.0

### 可选工具
- **Git**: 版本控制
- **VS Code**: 代码编辑器（推荐安装 Vue 插件）
- **Postman**: API 测试工具

## 安装步骤

### 1. 克隆项目

```bash
git clone https://github.com/HayFrp-Team/HayFrp-Web.git
cd HayFrp-Web
```

### 2. 安装依赖

```bash
npm install
```

### 3. 配置环境

复制 `.env.example` 为 `.env` 并根据需要修改：

```bash
cp .env.example .env
```

`.env` 文件示例：
```env
VITE_API_BASE_URL=/api/v1
VITE_APP_TITLE=HayFrp Web
```

### 4. 启动开发服务器

```bash
npm run dev
```

访问地址: http://localhost:5173

## 开发规范

### 命名规范

#### 组件文件
- 使用 PascalCase
- 例如：`UserSettings.vue`, `LoginView.vue`

#### API 函数
- 使用 camelCase
- 例如：`getUserInfo()`, `login()`

#### 变量名
- 使用 camelCase
- 例如：`userName`, `isLoggedIn`

#### 常量名
- 使用 UPPER_SNAKE_CASE
- 例如：`TOKEN_KEY`, `API_BASE_URL`

#### 文件名
- 使用 kebab-case
- 例如：`user-settings.vue`, `api-client.js`

### 代码风格

#### 组件结构
```vue
<template>
  <div class="component-name">
    <!-- 组件模板 -->
  </div>
</template>

<script setup>
import { ref, reactive, computed, onMounted } from 'vue'
import { useMessage } from 'naive-ui'
import { someApi } from '../api/api'

// Props 定义
const props = defineProps({
  // props
})

// Emits 定义
const emit = defineEmits(['update', 'delete'])

// 响应式数据
const loading = ref(false)
const data = ref([])
const form = reactive({
  // 表单数据
})

// 计算属性
const computedValue = computed(() => {
  return data.value.map(item => item.name)
})

// 方法
async function fetchData() {
  loading.value = true
  try {
    const { data } = await someApi()
    data.value = data
  } catch (error) {
    message.error(error?.response?.data?.detail || '请求失败')
  } finally {
    loading.value = false
  }
}

// 生命周期
onMounted(() => {
  fetchData()
})
</script>

<style scoped>
.component-name {
  /* 组件样式 */
}
</style>
```

#### API 调用规范
```javascript
// 1. 在 api/api.ts 中定义接口
export function someApi() {
  return client.get('/api/v1/endpoint')
}

// 2. 在组件中使用
import { someApi } from '../api/api'

async function handleClick() {
  loading.value = true
  try {
    const { data } = await someApi()
    data.value = data
  } catch (error) {
    const errorMsg = error?.response?.data?.detail || error?.message || '操作失败'
    message.error(errorMsg)
  } finally {
    loading.value = false
  }
}
```

#### 错误处理
```javascript
try {
  const { data } = await someApi()
  message.success('操作成功')
} catch (error) {
  const errorMsg = error?.response?.data?.detail || error?.message || '操作失败'
  message.error(errorMsg)

  // 特殊处理 401
  if (error?.response?.status === 401) {
    clearToken()
    router.push('/login')
  }
}
```

### Git 提交规范

使用语义化提交信息：

```bash
# 新功能
git commit -m "feat: 添加用户设置页面"

# 修复 bug
git commit -m "fix: 修复登录后自动跳转问题"

# 文档更新
git commit -m "docs: 更新 API 文档"

# 样式调整
git commit -m "style: 优化移动端布局"

# 重构
git commit -m "refactor: 重构 API 调用逻辑"

# 测试
git commit -m "test: 添加单元测试"

# 性能优化
git commit -m "perf: 优化路由懒加载"
```

### 代码审查清单

提交代码前检查：

- [ ] 代码符合命名规范
- [ ] 添加了必要的注释
- [ ] 处理了所有可能的错误
- [ ] 更新了相关文档
- [ ] 没有控制台错误
- [ ] 代码已格式化
- [ ] 通过了所有测试

## 构建和部署

### 开发环境

```bash
# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

访问地址: http://localhost:5173

### 生产环境

```bash
# 安装依赖
npm install

# 构建生产版本
npm run build
```

构建输出: `dist/` 目录

### 预览生产版本

```bash
# 预览构建结果
npm run preview
```

## API 配置

### 代理配置

开发环境使用 Vite 代理：

```javascript
// vite.config.js
server: {
  proxy: {
    '/api': {
      target: 'http://10.0.0.5:9123/api',
      secure: false,
      changeOrigin: true,
      rewrite: (path) => path.replace(/^\/api/, '')
    }
  }
}
```

### API 基础路径

```javascript
// src/api/client.js
const client = axios.create({
  baseURL: '/api/v1',
  timeout: 30000,
})
```

## 常见问题

### 1. 端口被占用

```bash
# 修改端口号
# vite.config.js
server: {
  port: 5174  // 改成其他端口
}
```

### 2. 依赖安装失败

```bash
# 清除缓存
rm -rf node_modules package-lock.json
npm install
```

### 3. 构建失败

```bash
# 清除构建缓存
rm -rf dist
npm run build
```

### 4. 路由不工作

检查路由配置是否正确，确保组件文件名与路由配置一致。

### 5. 样式不生效

确保使用了 `<style scoped>`，避免样式冲突。

## 调试技巧

### 1. 浏览器开发者工具

- **Console**: 查看错误和日志
- **Network**: 查看 API 请求和响应
- **Vue DevTools**: 查看组件状态和 Vuex/Pinia 状态

### 2. Vue DevTools

安装 Vue DevTools 浏览器扩展：
- Chrome: https://chrome.google.com/webstore/detail/vuejs-devtools/lhdgemojpmhgadliminhafijlkkljmbfd
- Firefox: https://addons.mozilla.org/firefox/addon/vue-js-devtools/

### 3. 环境变量

```javascript
// 使用环境变量
const apiUrl = import.meta.env.VITE_API_BASE_URL
const appTitle = import.meta.env.VITE_APP_TITLE
```

### 4. 查看路由配置

```javascript
// router/index.ts
console.log('Routes:', router.getRoutes())
```

## 性能优化

### 1. 路由懒加载

```javascript
// 不要这样
import Dashboard from './views/Dashboard.vue'

// 要这样
const Dashboard = () => import('./views/Dashboard.vue')
```

### 2. 组件懒加载

```javascript
// 动态导入组件
const Modal = defineAsyncComponent(() => import('./components/Modal.vue'))
```

### 3. 图片优化

- 使用 WebP 格式
- 压缩图片大小
- 使用 CDN 加速

### 4. 避免不必要的重新渲染

```javascript
// 使用 computed 而不是方法
const computedValue = computed(() => {
  return expensiveCalculation()
})
```

## 测试

### 单元测试

```bash
# 安装 Vitest
npm install -D vitest @vue/test-utils jsdom

# 运行测试
npm run test
```

### E2E 测试

```bash
# 安装 Playwright
npm install -D @playwright/test

# 运行测试
npm run test:e2e
```

## 部署

### 1. 构建项目

```bash
npm run build
```

### 2. 部署到 Nginx

配置 Nginx：

```nginx
server {
    listen 80;
    server_name example.com;

    root /path/to/dist;
    index index.html;

    # Vue Router history 模式支持
    location / {
        try_files $uri $uri/ /index.html;
    }

    # API 代理
    location /api/ {
        proxy_pass http://backend-server:9123/api/;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

### 3. 部署到 Cloudflare Pages

1. 访问 https://dash.cloudflare.com/
2. 创建 Pages 项目
3. 上传 `dist/` 目录
4. 配置构建设置：
   ```
   Build command: npm run build
   Build output directory: dist
   ```

## 贡献指南

### 如何贡献

1. Fork 项目
2. 创建功能分支: `git checkout -b feature/your-feature`
3. 提交更改: `git commit -m "feat: add your feature"`
4. 推送到分支: `git push origin feature/your-feature`
5. 创建 Pull Request

### Pull Request 检查清单

- [ ] 代码符合规范
- [ ] 添加了必要的注释
- [ ] 更新了文档
- [ ] 通过了所有测试
- [ ] 没有新增 lint 错误
- [ ] 构建成功

## 获取帮助

- **文档**: 查看 [README.md](/README.md)
- **问题**: [GitHub Issues](https://github.com/HayFrp-Team/HayFrp-Web/issues)
- **讨论**: [GitHub Discussions](https://github.com/HayFrp-Team/HayFrp-Web/discussions)
