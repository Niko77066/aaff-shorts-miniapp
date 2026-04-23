# Arklink 方舟AI 小程序 — 上架 Checklist

## 状态：代码侧 100% 就绪，等后台配置

### 一、必须在微信公众平台后台操作（Niko 做）

登录 https://mp.weixin.qq.com → 选中 Arklink 方舟AI (AppID: wx6b5b93832e5e382a)

#### 1. 服务器域名（开发 → 开发管理 → 开发设置 → 服务器域名）

**request 合法域名**：
```
https://aafflist.tos-cn-beijing.volces.com
```

**downloadFile 合法域名**：
```
https://aafflist.tos-cn-beijing.volces.com
```

> 说明：这个域名是火山引擎 TOS（对象存储），放榜单 JSON、视频、封面、字体。

#### 2. 小程序类目（设置 → 基本设置 → 服务类目）

推荐一个二选一：
- **文娱 → 视频**（最贴合，需要《信息网络传播视听节目许可证》或备案截图）
- **工具 → 信息查询**（门槛低，不需要视听许可）

按你说的「已备案」来选即可。

#### 3. 生成式 AI 服务（如类目涉及）
- 是否需要算法备案号：展示 AI 生成内容通常要。
- 备案号去 `https://beian.cac.gov.cn` 查/报备。
- 填在后台：设置 → 法律与声明 → 算法备案信息。

#### 4. 版本信息（设置 → 基本设置）
- 小程序名称：**Arklink 方舟AI**
- 简介：建议 "精选全球 AI 短片作品，每周更新榜单" 这类一句话。
- Logo：512x512 PNG。

---

### 二、代码现状（ColdWater 已完成）

- ✅ 24 视频 + 24 封面 + rankings.json + lucide.woff2 已上 TOS
- ✅ 本地 `videos/` 1GB 已删；工程总共 6.2M，打包后 < 250KB
- ✅ `pages/index` 异步加载 TOS 数据 + 10 分钟缓存 + offline fallback
- ✅ `pages/detail` 真实 `<video>` 播放器（不再是 mock）
- ✅ `pages/profile` 合规登录（open-type=chooseAvatar + type=nickname input）
- ✅ lucide 字体改到 TOS 域名（原 unpkg 会被审核拒）
- ✅ 品牌改为 Arklink 方舟AI
- ✅ CORS 配好（TOS bucket 允许 * 跨域）
- ✅ Bucket Policy 公开读

---

### 三、提审前本地验证流程

1. 打开微信开发者工具
2. 导入项目 `/Users/jacques/Desktop/Code/aaff-shorts-miniapp`
3. 看 Console 无红色 error
4. 首页能看到封面图（说明 `request 域名` 配对了，或在开发者工具里可先勾选"不校验合法域名"）
5. 点进详情 → 点「立即播放」 → 视频能放
6. 切到"我的" → 点头像 → 走完头像/昵称流程

> 开发者工具里：详情 → 本地设置 → 勾选「不校验合法域名、web-view、TLS 版本、HTTPS 证书」，
> 这样本地能跑，**但提审前必须在后台加白名单，否则真机打不开**。

---

### 四、提审时微信会重点看

- [ ] 所有页面能正常跳转
- [ ] 无明显 404 / loading 不结束
- [ ] 隐私协议、用户协议页（`关于 Arklink` 里可以加）
- [ ] 登录不用老 `wx.getUserProfile`（已改合规）
- [ ] 涉及 AI 生成内容要有明显标识（"AI 生成"tag 已在 detail 页）

---

### 五、知识点备忘

- TOS bucket：`aafflist`（cn-beijing）
- 凭证在服务器 `aishorts-new` 容器环境变量 `TOS_ACCESS_KEY`/`TOS_SECRET_KEY`
- 上传脚本：`/tmp/upload-videos-local.py`（从本地 Mac 直传，服务器上行被限速）
- 数据结构：`rankings.json` 的 key 即榜单名（`AAFF精选年榜`/`月榜`/`动画榜`/`怪就怪AI榜`），改名要同步改 TOS 上的 JSON
