# 路由列表

> 本文档描述 HayFrp Web 应用的所有前端路由及页面功能

## 路由一览表

| 路径 | 页面名称 | 功能描述 | 权限要求 |
|------|----------|----------|----------|
| `/` | Landing (首页) | 展示系统信息、流量统计、在线客户端数等 | 公开 |
| `/login` | Login (登录) | 用户登录，支持账号密码和二维码登录 | 访客(未登录) |
| `/register` | Register (注册) | 用户注册，需邮箱验证码 | 访客(未登录) |
| `/dashboard` | Dashboard (控制台) | 用户仪表盘，展示账户概览、流量使用、隧道状态 | 需要登录 |
| `/proxies` | Proxies (隧道管理) | 创建、编辑、删除、启用/禁用隧道 | 需要登录 |
| `/settings` | Settings (用户设置) | 修改个人信息、头像、密码等 | 需要登录 |
| `/customize` | Customize (面板个性化) | 自定义面板主题、颜色等外观设置 | 需要登录 |
| `/nodes` | Nodes (节点列表) | 查看可用节点信息、状态、负载 | 公开 |
| `/download` | Download (下载) | 下载 Frp 客户端各平台版本 | 公开 |
| `/about关于) | 关于` | About (页面，展示版本信息、服务商列表 | 公开 |
| `/sp` | ServiceProvider (服务商控制台) | 服务商管理后台 | 需要登录(服务商) |
| `/chat` | Chat (聊天室) | 用户聊天室 | 需要登录 |
| `/bind` | Bind (绑定账户) | 第三方账户绑定页面 | 公开 |
| `/:pathMatch(.*)*` | NotFound (404) | 页面未找到 | 公开 |

## 路由文件结构

```
src/
├── router/
│   └── index.ts          # 路由配置及守卫
└── views/
    ├── Landing.vue       # 首页
    ├── Login.vue         # 登录
    ├── Register.vue      # 注册
    ├── Dashboard.vue    # 控制台
    ├── Proxies.vue       # 隧道管理
    ├── UserSettings.vue  # 用户设置
    ├── Customize.vue     # 面板个性化
    ├── Nodes.vue         # 节点列表
    ├── Download.vue     # 下载
    ├── About.vue         # 关于
    ├── ServiceProvider.vue # 服务商控制台
    ├── Chat.vue          # 聊天室
    ├── Bind.vue          # 绑定账户
    └── NotFound.vue      # 404
```

## 路由元信息 (Meta)

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 页面标题 |
| `requiresAuth` | boolean | 是否需要登录 |
| `guest` | boolean | 是否为访客页面(已登录不可访问) |
