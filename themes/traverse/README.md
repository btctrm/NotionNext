# 主题「横移 · TRAVERSE」— NotionNext 安装说明

整个博客是一面抱石墙：每篇文章是一个岩点，每个分类是一条线路。桌面用滚轮横移，手机用手指横滑（自动按竖屏重排）。文章页是「停在一个岩点上读」。

已在 NotionNext 4.10.x 主线上、用你的「TRM 博客」数据库实机验证过。

## 安装（三步）

1. 把整个 `traverse` 文件夹放进项目的 `themes/` 目录，得到 `themes/traverse/`。NotionNext 会自动识别新主题，不需要注册。
2. 把主题切过来。**注意：你的 Notion「配置中心」页里写着 `THEME: gitbook`，它的优先级最高，会覆盖代码和环境变量。** 所以要么把那一行改成 `traverse`，要么把那一行删掉、再在 `blog.config.js` 里把 `THEME` 改成 `'traverse'`（或在 Vercel 环境变量里设 `NEXT_PUBLIC_THEME=traverse`）。
3. 推送，Vercel 自动部署。上线前可以先用 `你的域名/?theme=traverse` 预览，不影响现有站点。

## 日常怎么用（和现在完全一样）

- 在 Notion 里新建一页、写、把 `status` 改成 `Published` → 墙上自动多一个岩点，位置是代码算的。
- `category` 决定它在哪条线路上；线路在墙上的顺序在 `config.js` 的 `TRAVERSE_ROUTE_ORDER` 里，改一行即可。新建一个分类会自动成为一条新线路。
- `summary` 写了就会成为文章页标题下的导语（dek），没写就不显示。
- 给文章打上 `推荐` 标签 → 墙上带橙圈、标 CRUX。想换成别的标签，改 `TRAVERSE_CRUX_TAG`。
- 正文里：标题一 / 标题二 自动编号成 MOVE 01、02…；引用块 = 橙线引言；**callout 块 = 虚线 CRUX 框**（「下次去岩馆先做这一件事」）。都是 Notion 原生块，不需要特殊写法。
- 墙尾（TOP）就是「关于」：路线卡上的坐标、队伍、V9 等在 `config.js` 的 `TRAVERSE_CARD` 里改；「更多关于我」指向你 Notion 里的 about 单页。
- 顶栏右侧的外链（默认「交大攀岩 → sjtuclimbing.com」）在 `TRAVERSE_EXTRA_LINKS` 里改。

所有 `TRAVERSE_*` 配置都可以写进 Notion「配置中心」页覆盖，不用改代码。

## 文件

```
themes/traverse/
├── index.js          各页面布局（首页/分类=墙，文章，搜索/标签/归档=列表，404）
├── config.js         主题配置（线路顺序、CRUX 标签、路线卡文案……）
├── style.js          全部样式，含 Notion 正文的夜色粉笔风格
├── lib.js            线路分组、定位、日期格式
└── components/
    ├── Wall.js       墙：桌面横移 / 触屏横滑，岩点坐标计算
    ├── WallEnd.js    墙尾：路线卡（首页）/ 下一条线路（分类页）
    ├── Header.js     顶栏
    ├── Topo.js       文章页左侧小 topo + MOVE 目录
    ├── Article.js    文章头（岩点编号、导语、元信息）、文章尾（TOP、上下岩点）、列表
    └── ArticleLock.js 加密文章（沿用 NotionNext 标准）
```

## 已知边界

- 字体走 Google Fonts（Syne / DM Mono / 思源黑体）。国内访问慢的话，把 `style.js` 顶部的 `@import` 删掉，改用 NotionNext 的 `FONT_URL` 配置自托管，或者直接不加载——系统字体也能看。
- 评论区（Twikoo / Giscus 等）按 NotionNext 原有配置工作，只是底色跟着夜色走。
- 深色是这个主题唯一的模式；NotionNext 的浅/深切换按钮对它无效。
