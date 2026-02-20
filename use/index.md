---
title: 使用指南
---

# FRP 使用教程

本教程将帮助您快速上手 HayFrp 内网穿透服务。

**官网地址**: [https://console.hayfrp.com/](https://console.hayfrp.com/)

## 📖 什么是 FRP？

FRP (Fast Reverse Proxy) 是一个高性能的反向代理应用，可以将内网服务暴露到公网。通过 HayFrp，您可以：

- 在家中搭建网站，对外提供服务
- 远程访问内网的 NAS、服务器
- 进行 Minecraft 等游戏联机
- 映射远程桌面，随时随地办公

---

## 🚀 快速开始

### 步骤一：注册账号

1. 访问 [HayFrp 官网](https://console.hayfrp.com/)，点击「注册」或直接访问 [注册页面](https://console.hayfrp.com/register)
2. 填写用户名、邮箱、密码
3. 获取邮箱验证码完成验证
4. 登录后自动跳转至 [控制台](https://console.hayfrp.com/dashboard)

> 💡 登录后可在控制台进行每日签到获取免费流量

### 步骤二：下载客户端

访问 [下载页面](https://console.hayfrp.com/download) 获取对应平台的 FRP 客户端：

| 平台 | 文件名格式 |
|------|-----------|
| Windows | `frp_windows_amd64.zip` |
| Linux | `frp_linux_amd64.tar.gz` |
| macOS | `frp_darwin_amd64.tar.gz` |
| Android | `frp_android_arm64.apk` |

## 🔧 隧道类型说明

| 类型 | 说明 | 适用场景 |
|------|------|----------|
| TCP | TCP 协议隧道 | 游戏服务器、数据库、SSH |
| UDP | UDP 协议隧道 | 游戏语音、视频流 |
| HTTP | HTTP 协议隧道 | 网站、Web 应用 |
| HTTPS | HTTPS 协议隧道 | 安全网站 |
| STCP | 密钥保护 TCP | 需要额外安全的连接 |
| XTCP | P2P 穿透 | 大流量传输、降低延迟 |

---

## ⚠️ 使用规范

在使用 FRPC 服务前，请务必遵守以下规定，否则账户将被**永久封禁**：

- **禁止**搭建任何色情、暴力、血腥，或违反国家法律的服务
- **禁止**滥用 FRP 服务（如挖矿、攻击他人）
- **禁止**使用被公开的身份证信息

> ⚠️ **注意**：因未阅读网站公告导致的业务损失或问题，一律不予回复。

---

## 🖥️ 远程桌面安全提示

映射远程桌面存在一定风险，请务必注意：

### 强烈建议

- 启用 **Windows Update**，避免 0day 漏洞攻击
- 设置**强密码**，避免使用弱密码

### ❌ 禁止使用的弱密码

| 账户 | 密码 |
|------|------|
| Administrator | 无 |
| Administrator | 123456 |
| root | password |
| ... | 键盘上的连续字母/数字 |
| ... | 密码与用户名相同 |

### 🛡️ 系统更新重要性

系统更新是您的朋友，不是敌人。如果有一个东西能在暴露风险中拯救您，那一定是系统更新。

- 系统更新可能会迟到，但永远不会缺席
- 如果您关闭了系统更新，请**不要**将机器暴露在公共网络中
- 必须安装杀毒软件

---

## 🆘 常见问题

### 连接失败？

1. 检查 Token 是否正确
2. 确认隧道是否已启用
3. 检查本地服务是否正在运行
4. 确认防火墙未阻止 frpc

### 隧道离线？

1. 在控制台检查隧道状态
2. 尝试「强制下线」后重新连接
3. 检查节点是否正常（访问节点列表页）

### 需要帮助？

- 查看 [API 文档](/api/user) 了解更多接口
- 访问 [节点列表](https://console.hayfrp.com/nodes) 查看节点状态
- 访问 [控制台](https://console.hayfrp.com/dashboard) 管理您的隧道
