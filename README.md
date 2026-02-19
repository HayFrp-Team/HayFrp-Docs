# HayFrp Web 前端路由文档

> 本文档描述 HayFrp Web 应用的所有前端路由及页面功能

## 路由列表

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
| `/about` | About (关于) | 关于页面，展示版本信息、服务商列表 | 公开 |
| `/sp` | ServiceProvider (服务商控制台) | 服务商管理后台 | 需要登录(服务商) |
| `/chat` | Chat (聊天室) | 用户聊天室 | 需要登录 |
| `/bind` | Bind (绑定账户) | 第三方账户绑定页面 | 公开 |
| `/:pathMatch(.*)*` | NotFound (404) | 页面未找到 | 公开 |

## 路由详情

### 公开路由

#### 1. 首页 `/`
- **组件**: `Landing.vue`
- **标题**: HayFrp - 免费内网穿透
- **功能**: 
  - 展示系统总流量、今日流量、在线客户端数
  - 全屏滚动展示页面
  - 功能介绍和导航

#### 2. 登录页 `/login`
- **组件**: `Login.vue`
- **标题**: 登录
- **功能**:
  - 用户名/邮箱 + 密码登录
  - 二维码登录支持
  - 登录后自动跳转回原页面
- **权限**: 仅访客访问，已登录用户会自动跳转

#### 3. 注册页 `/register`
- **组件**: `Register.vue`
- **标题**: 注册
- **功能**:
  - 用户名、邮箱、密码注册
  - 邮箱验证码验证
  - 发送验证码冷却时间

#### 4. 节点列表 `/nodes`
- **组件**: `Nodes.vue`
- **标题**: 节点列表
- **功能**:
  - 查看所有可用节点
  - 节点状态、负载、位置信息
  - 节点详情探针信息

#### 5. 下载页 `/download`
- **组件**: `Download.vue`
- **标题**: 下载
- **功能**:
  - 下载各平台 Frp 客户端
  - Android、iOS、Windows、Linux、Mac 版本
  - 显示版本号和更新日志

#### 6. 关于页 `/about`
- **组件**: `About.vue`
- **标题**: 关于
- **功能**:
  - 展示系统版本信息
  - 服务商列表展示

#### 7. 绑定账户 `/bind`
- **组件**: `Bind.vue`
- **标题**: 绑定账户
- **功能**:
  - 第三方账户绑定

### 需要登录的路由

#### 8. 控制台 `/dashboard`
- **组件**: `Dashboard.vue`
- **标题**: 控制台
- **功能**:
  - 账户概览信息
  - 流量使用统计
  - 隧道在线状态
  - 快速操作入口

#### 9. 隧道管理 `/proxies`
- **组件**: `Proxies.vue`
- **标题**: 隧道管理
- **功能**:
  - 隧道列表展示
  - 创建新隧道
  - 编辑隧道配置
  - 删除隧道
  - 隧道启用/禁用
  - 隧道在线状态检查
  - 获取隧道配置文件

#### 10. 用户设置 `/settings`
- **组件**: `UserSettings.vue`
- **标题**: 用户设置
- **功能**:
  - 修改用户名
  - 修改邮箱
  - 修改密码
  - 设置头像(QQ号)
  - 实名认证
  - 重置 Token

#### 11. 面板个性化 `/customize`
- **组件**: `Customize.vue`
- **标题**: 面板个性化
- **功能**:
  - 自定义面板主题
  - 颜色配置
  - 布局设置

#### 12. 聊天室 `/chat`
- **组件**: `Chat.vue`
- **标题**: 聊天室
- **功能**:
  - 用户在线聊天
  - 实时消息推送

#### 13. 服务商控制台 `/sp`
- **组件**: `ServiceProvider.vue`
- **标题**: 服务商控制台
- **功能**:
  - 服务商账户管理
  - 节点管理
  - 用户管理
  - 流量统计

### 特殊路由

#### 14. 404 页面
- **路径**: `/:pathMatch(.*)*`
- **组件**: `NotFound.vue`
- **标题**: 页面未找到
- **功能**:
  - 展示 404 错误
  - 提供返回首页/上一页按钮

## 路由守卫

路由守卫实现于 `router/index.ts`：

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

### 权限判断逻辑

| 页面类型 | 未登录 | 已登录 |
|----------|--------|--------|
| 公开页面 | 正常访问 | 正常访问(部分会重定向首页) |
| 需要登录 | 重定向 `/login?redirect=原路径` | 正常访问 |
| 访客页面 | 正常访问 | 重定向 `/` |

## 路由元信息 (Meta)

| 属性 | 类型 | 说明 |
|------|------|------|
| `title` | string | 页面标题 |
| `requiresAuth` | boolean | 是否需要登录 |
| `guest` | boolean | 是否为访客页面(已登录不可访问) |

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

---

# HayFrp OpenAPI 文档

> API 地址: `https://api.hayfrp.com`
> 
> **注意**: 调用 API 时需要添加请求头 `waf: off` 绕过雷池防火墙

## 用户账号 API

### 基础信息
- **接口地址**: `/user`
- **请求方式**: `POST`
- **Content-Type**: `application/json;charset=UTF-8`

### API 列表

| 序号 | 接口 | type 值 | 功能 |
|------|------|---------|------|
| 1 | 登录 | `login` | 用户登录获取 Token |
| 2 | 验证 Token | `csrf` | 验证 CSRF Token 是否有效 |
| 3 | 发送注册验证码 | `sendregcode` | 发送注册邮箱验证码 |
| 4 | 注册 | `register` | 用户注册 |
| 5 | 获取用户信息 | `info` | 获取用户详细信息 |
| 6 | 签到 | `sign` | 每日签到领取流量 |
| 7 | 重置 Token | `retoken` | 重置 Frp 链接 Token |
| 8 | 发送重置密码验证码 | `findpassem` | 发送密码重置验证码 |
| 9 | 重置密码 | `findpassct` | 使用验证码重置密码 |

### 1. 登录 API

**type**: `login`

```json
{
    "type": "login",
    "user": "用户名或邮箱",
    "passwd": "密码"
}
```

**返回**:
```json
{
    "status": 200,      // 200成功, 403密码错误, 404用户不存在
    "message": "登录成功，欢迎使用HayFrp！",
    "token": "xxxxxxxxxxx"  // 登录成功后返回的 CSRF Token
}
```

> Token 有效期 7 天，每次登录会使上次 Token 失效

### 2. 验证 Token API

**type**: `csrf`

```json
{
    "type": "csrf",
    "csrf": "Token值"
}
```

**返回**:
```json
{
    "status": 200,  // 200有效, 403无效
    "message": "登录成功，欢迎使用HayFrp！",
    "token": "1145141919810"
}
```

### 3. 发送注册验证码

**type**: `sendregcode`

```json
{
    "type": "sendregcode",
    "user": "用户名",
    "device": "用户名",
    "email": "邮箱地址"
}
```

**返回**:
```json
{
    "status": 200,  // 200成功, 403频繁, 500服务器错误
    "message": "系统已将验证码发送到您的账户，请查收."
}
```

### 4. 注册 API

**type**: `register`

```json
{
    "type": "register",
    "user": "用户名",
    "device": "用户名",
    "email": "邮箱地址",
    "passwd": "密码",
    "regcode": "验证码"
}
```

**返回**:
```json
{
    "status": 200,  // 200成功, 403用户名已存在, 404验证码错误
    "message": "注册成功，欢迎使用HayFrp."
}
```

### 5. 获取用户信息

**type**: `info`

```json
{
    "type": "info",
    "csrf": "Token值"
}
```

**返回**:
```json
{
    "status": true,
    "id": "114514",
    "username": "用户名",
    "token": "Frp链接Token",
    "email": "邮箱@example.com",
    "traffic": "剩余流量(MB)",
    "realname": "true/false",
    "proxies": "隧道上限",
    "useproxies": "已用隧道数",
    "regtime": "注册时间戳",
    "signdate": "上次签到时间",
    "totalsign": "总签到天数",
    "totaltraffic": "总签到流量(GB)",
    "todaytraffic": "今日流量(Bytes)",
    "qid": "QQ号",
    "sprovider": "true/false",
    "uuid": "唯一用户标识符"
}
```

### 6. 签到 API

**type**: `sign`

```json
{
    "type": "sign",
    "csrf": "Token值"
}
```

**返回**:
```json
{
    "status": 200,  // 200成功, 404已签到
    "message": "签到成功，您今天获得了114514GB的流量",
    "signflow": 114514,
    "flow": 1145141919810
}
```

### 7. 重置 Token

**type**: `retoken`

```json
{
    "type": "retoken",
    "csrf": "Token值"
}
```

**返回**:
```json
{
    "status": 200,
    "message": "重置成功，您的Token为已被重置为xxxxxxxxxx.",
    "token": "新Token"
}
```

### 8. 发送重置密码验证码

**type**: `findpassem`

```json
{
    "type": "findpassem",
    "user": "用户名或邮箱"
}
```

### 9. 重置密码

**type**: `findpassct`

```json
{
    "type": "findpassct",
    "token": "邮箱收到的临时Token",
    "newpass": "新密码"
}
```

---

## 隧道管理 API

### 基础信息
- **接口地址**: `/proxy`
- **请求方式**: `POST`
- **Content-Type**: `application/json;charset=UTF-8`

### API 列表

| 序号 | 接口 | type 值 | 功能 |
|------|------|---------|------|
| 1 | 添加隧道 | `add` | 创建新隧道 |
| 2 | 编辑隧道 | `edit` | 修改隧道配置 |
| 3 | 删除隧道 | `remove` | 删除隧道 |
| 4 | 列出隧道 | `list` | 获取隧道列表 |
| 5 | 获取配置 | `config` | 获取配置文件 |
| 6 | 切换状态 | `toggle` | 启用/禁用隧道 |
| 7 | 检查状态 | `check` | 检查隧道在线状态 |
| 8 | 强制下线 | `forcedown` | 强制下线隧道 |

### 1. 添加隧道

**type**: `add`

```json
{
    "type": "add",
    "csrf": "Token值",
    "proxy_name": "隧道名称",
    "proxy_type": "tcp/udp/http/https/xtcp/stcp",
    "local_ip": "127.0.0.1",
    "local_port": 端口,
    "remote_port": 端口,
    "use_encryption": "true/false",
    "use_compression": "true/false",
    "sk": "连接密钥(P2P用)",
    "node": "节点ID",
    "domain": "域名(HTTP(S)用)"
}
```

### 2. 编辑隧道

**type**: `edit`

```json
{
    "type": "edit",
    "csrf": "Token值",
    "id": "隧道ID",
    "proxy_name": "隧道名称",
    "proxy_type": "tcp/udp/http/https/xtcp/stcp",
    "local_ip": "127.0.0.1",
    "local_port": 端口,
    "remote_port": 端口,
    "use_encryption": "true/false",
    "use_compression": "true/false",
    "node": "节点ID"
}
```

### 3. 删除隧道

**type**: `remove`

```json
{
    "type": "remove",
    "csrf": "Token值",
    "id": "隧道ID"
}
```

### 4. 列出隧道

**type**: `list`

```json
{
    "type": "list",
    "csrf": "Token值",
    "id": "隧道ID(可选，不填则返回全部)"
}
```

**返回**:
```json
{
    "status": 200,
    "proxies": [
        {
            "id": "隧道ID",
            "proxy_name": "隧道名称",
            "proxy_type": "tcp/udp/http/https/xtcp/stcp",
            "local_ip": "本地IP",
            "local_port": "本地端口",
            "remote_port": "远程端口",
            "use_encryption": "true/false",
            "use_compression": "true/false",
            "status": "true/false",
            "node": "节点ID",
            "node_name": "节点名称",
            "node_domain": "节点域名"
        }
    ]
}
```

### 5. 获取配置文件

**type**: `config`

```json
{
    "type": "config",
    "format": "ini/toml",
    "csrf": "Token值",
    "node": "节点ID或隧道ID"
}
```

### 6. 切换隧道状态

**type**: `toggle`

```json
{
    "type": "toggle",
    "csrf": "Token值",
    "id": "隧道ID",
    "toggle": "true/false"
}
```

### 7. 检查隧道状态

**type**: `check`

```json
{
    "type": "check",
    "csrf": "Token值",
    "id": "隧道ID"
}
```

**返回**:
```json
{
    "status": 200,  // 200在线, 500离线
    "message": "隧道在线.",
    "ostatus": "online/offline"
}
```

### 8. 强制下线

**type**: `forcedown`

```json
{
    "type": "forcedown",
    "csrf": "Token值",
    "id": "隧道ID"
}
```

---

## 公共 API (无需登录)

### 基础信息
- **请求方式**: `GET`

### API 列表

| 接口 | 路径 | 功能 |
|------|------|------|
| 节点探针 | `/node` | 获取节点详细信息 |
| 节点列表 | `/nodes` | 获取在线节点列表 |
| 公告 | `/notice` | 获取系统公告 |
| 统计信息 | `/info` | 获取服务统计信息 |
| 下载列表 | `/downlist` | 获取客户端下载列表 |
| 版本信息 | `/version` | 获取版本信息 |

### 1. 节点探针信息

**路径**: `/node`

```json
{
    "status": 200,
    "number": 10,
    "servers": [
        {
            "id": "1",
            "name": "节点名称",
            "version": "0.59.0",
            "bind_port": "7000",
            "vhost_http_port": "80",
            "vhost_https_port": "443",
            "total_traffic_in": "入站流量",
            "total_traffic_out": "出站流量",
            "cur_conns": "当前连接数",
            "client_counts": "客户端数量",
            "cpu_usage": "0.00%",
            "ram_usage": "0.01%",
            "disk_usage": "95.65%",
            "status": "高负荷"
        }
    ]
}
```

### 2. 节点列表

**路径**: `/nodes`

```json
{
    "status": 200,
    "number": 10,
    "servers": [
        {
            "id": "1",
            "name": "节点名称",
            "description": "[|1000Mbps | 国内穿透推荐]"
        }
    ]
}
```

### 3. 服务统计

**路径**: `/info`

```json
{
    "status": 200,
    "aflow": "总流量(MB)",
    "aflowin": "总入站(MB)",
    "aflowout": "总出站(MB)",
    "eflow": "今日流量(MB)",
    "eflowin": "今日入站(MB)",
    "eflowout": "今日出站(MB)",
    "oclient": 107,
    "totalrun": "总启动次数",
    "todayrun": "今日启动次数"
}
```

### 4. 下载列表

**路径**: `/downlist`

```json
{
    "status": 200,
    "source": [
        {
            "name": "下载源名称",
            "url": "https://down.hxit.top/HayFrp/Releases/"
        }
    ],
    "lists": [
        {
            "name": "文件名",
            "url": "文件地址",
            "arch": "android_arm64",
            "version": "0.56.0"
        }
    ]
}
```

### 5. 版本信息

**路径**: `/version`

```json
{
    "ver_hayfrps": "0.59.0",
    "ver_frpc": "0.59.0",
    "ver_launcher": "3.0",
    "ver_console": "3.0",
    "ver_dashboard": "1.0",
    "url_launcher": "http://114514.cn"
}
```

---

## 状态码说明

| 状态码 | 含义 |
|--------|------|
| 200 | 成功 |
| 403 | 权限错误/密码错误/Token无效 |
| 404 | 参数缺失/用户不存在 |
| 500 | 服务器异常 |

---

## 前端 API 调用封装

项目中使用 `src/services/api.ts` 封装了 API 调用:

```typescript
import { api } from '@/services/api'

// 登录
await api.login(user, passwd)

// 获取用户信息
await api.getUserInfo(csrf)

// 获取隧道列表
await api.getProxyList(csrf)

// 添加隧道
await api.addProxy({ ... })

// 节点列表
await api.getNodeList()
```
