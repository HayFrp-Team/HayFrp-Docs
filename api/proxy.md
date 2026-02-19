# 隧道管理 API

## 基础信息

- **接口地址**: `/proxy`
- **请求方式**: `POST`
- **Content-Type**: `application/json;charset=UTF-8`

## API 列表

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

## 1. 添加隧道

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

## 2. 编辑隧道

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

## 3. 删除隧道

**type**: `remove`

```json
{
    "type": "remove",
    "csrf": "Token值",
    "id": "隧道ID"
}
```

## 4. 列出隧道

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

## 5. 获取配置文件

**type**: `config`

```json
{
    "type": "config",
    "format": "ini/toml",
    "csrf": "Token值",
    "node": "节点ID或隧道ID"
}
```

## 6. 切换隧道状态

**type**: `toggle`

```json
{
    "type": "toggle",
    "csrf": "Token值",
    "id": "隧道ID",
    "toggle": "true/false"
}
```

## 7. 检查隧道状态

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

## 8. 强制下线

**type**: `forcedown`

```json
{
    "type": "forcedown",
    "csrf": "Token值",
    "id": "隧道ID"
}
```

## 隧道类型说明

| 类型 | 说明 |
|------|------|
| `tcp` | TCP 隧道 |
| `udp` | UDP 隧道 |
| `http` | HTTP 隧道 |
| `https` | HTTPS 隧道 |
| `xtcp` | P2P TCP 隧道 |
| `stcp` | P2P STCP 隧道 |
