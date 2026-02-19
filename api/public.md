# 公共 API

> 无需登录即可访问的 API

## 基础信息

- **请求方式**: `GET`

## API 列表

| 接口 | 路径 | 功能 |
|------|------|------|
| 节点探针 | `/node` | 获取节点详细信息 |
| 节点列表 | `/nodes` | 获取在线节点列表 |
| 公告 | `/notice` | 获取系统公告 |
| 统计信息 | `/info` | 获取服务统计信息 |
| 下载列表 | `/downlist` | 获取客户端下载列表 |
| 版本信息 | `/version` | 获取版本信息 |

## 1. 节点探针信息

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

## 2. 节点列表

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

## 3. 服务统计

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

## 4. 下载列表

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

## 5. 版本信息

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
