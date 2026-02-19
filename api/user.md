# 用户账号 API

> API 地址: `https://api.hayfrp.com`
>
> **注意**: 调用 API 时需要添加请求头 `waf: off` 绕过雷池防火墙

## 基础信息

- **接口地址**: `/user`
- **请求方式**: `POST`
- **Content-Type**: `application/json;charset=UTF-8`

## API 列表

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

## 1. 登录 API

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

## 2. 验证 Token API

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

## 3. 发送注册验证码

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

## 4. 注册 API

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

## 5. 获取用户信息

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

## 6. 签到 API

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

## 7. 重置 Token

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

## 8. 发送重置密码验证码

**type**: `findpassem`

```json
{
    "type": "findpassem",
    "user": "用户名或邮箱"
}
```

## 9. 重置密码

**type**: `findpassct`

```json
{
    "type": "findpassct",
    "token": "邮箱收到的临时Token",
    "newpass": "新密码"
}
```

## 状态码说明

| 状态码 | 含义 |
|--------|------|
| 200 | 成功 |
| 403 | 权限错误/密码错误/Token无效 |
| 404 | 参数缺失/用户不存在 |
| 500 | 服务器异常 |
