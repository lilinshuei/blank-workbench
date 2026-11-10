---
name: blank-workbench
version: 1.0.0
author: "lilinshuei"
display_name: 一键生成空白工作台
display_name_en: One-click Blank Workbench Generator
description: 从零一键生成空白工作台：单文件 HTML 交互看板脚手架，含响应式外壳、明暗主题与 20+ 通用 UI 组件，零外部依赖、可离线打开。
description_zh: 从零「一键生成」空白工作台——单文件 HTML 交互看板脚手架，含响应式外壳（顶栏+侧栏导航+主内容区）、明暗主题切换、20+ 通用 UI 组件（卡片/统计/标签/表格/折叠/按钮/空状态），纯内联零外部依赖，开箱即用。当用户要新建通用交互看板、仪表盘、资料库、项目管理面板，或说「做一个空白工作台 / 工作台脚手架 / 生成工作台模板 / 建个仪表盘骨架」时使用。本 Skill 产出可挂任意模块的通用基座（区别于 novel-atlas 的小说领域方法论）。
description_en: Generate a blank workbench from scratch — a single-file HTML interactive dashboard scaffold with a responsive shell (top bar + sidebar nav + main content), light/dark theme toggle, and 20+ reusable UI components (cards, stats, tags, tables, collapsibles, buttons, empty states). Zero external dependencies, works offline. Use when the user wants a generic interactive board, dashboard, knowledge base, or project panel, or says "make a blank workbench / workbench scaffold / dashboard skeleton".
---

# 一键生成空白工作台 · 脚手架生成 Skill

## 0. 何时用
用户需要一份**从零开始的、通用的、单文件 HTML 交互看板骨架**：仪表盘、资料库、项目管理面板、学习看板、运营后台、某本书/某项目的专用工作台基座。特征：不预设具体业务，但要有完整外壳 + 通用组件，用户往里填模块即可。

区别于 `novel-atlas`（那是小说看书工作台的方法论 + 在 10MB 巨文件上增量增强）。本 Skill 是**通用基座生成器**，从空白开始。两者关系：本 Skill 是「地基」，novel-atlas 是在地基上盖的「小说专用楼」。

## 1. 产出物
`template.html` —— 一份直接可用、打开即看的空白工作台：
- 顶栏：彩色 logo 方块 + 标题 + 搜索框占位 + 明暗主题切换
- 侧栏（PC）/ 横向滚动 tab（手机）：模块导航
- 主内容区：第一个模块「概览」带**完整组件示范**（统计卡/卡片/标签/表格/折叠/按钮/空状态），其余模块为**空占位**，复制组件即可扩展
- 明暗主题（CSS 变量，`localStorage` 记忆）
- 响应式分界 **820px**
- 纯内联 CSS/JS，**零外部依赖、零网络请求**，可离线打开

`scaffold.cjs` —— 命令行生成器，按参数产出定制版：
```
node scaffold.cjs --title "我的项目看板" --nav "概览,任务,成员,报表" --accent "#10b981" --out "项目看板.html"
```
- `--title` 工作台标题（默认「我的工作台」）
- `--nav`   逗号分隔模块名；**第一项映射到「概览」示范区**，其余生成空占位
- `--accent` 主题色（默认 `#4f7cff`）
- `--out`   输出路径（默认 `空白工作台.html`）

## 2. 设计规范（苹果质感 · 白底）
- 背景浅灰 `#f5f6f8`，面板纯白浮起，圆角 14–16px，柔和双层投影
- accent 用于 logo、active 导航、主按钮、链接；提供 `accent-soft` 浅底
- 字体系统栈（PingFang/微软雅黑/系统 UI），字号克制、层级清晰
- 深色主题：底 `#0e0f12`、面板 `#1a1c20`、文字 `#f2f2f5`，accent 不变
- **所有颜色走 CSS 变量**，换肤/换色只改 `:root`

## 3. 通用组件清单（类名 → 用途）
| 类 | 用途 |
|---|---|
| `.topbar` `.brand` `.logo` | 顶栏 / 品牌 / 彩色方块 logo |
| `.search` | 搜索框占位（接你的检索逻辑） |
| `.theme-toggle` | 明暗切换按钮 |
| `.sidebar` `.nav-item` | 侧栏 / 导航项（`.active` 高亮） |
| `.content` `.view` | 内容区 / 模块视图（`.active` 显示） |
| `.page-head` | 模块标题 + 副标题 + 右侧操作区 |
| `.grid` `.card` `.card-h` `.card-b` | 栅格 / 卡片 / 卡片头 / 卡片体 |
| `.stat` `.stat-n` `.stat-l` `.stat-ic` | 统计卡 / 数字 / 标签 / 图标块 |
| `.tag` `.pill` | 标签 / 药丸标签 |
| `.btn` `.btn-primary` `.btn-ghost` | 按钮 / 主按钮 / 描边按钮 |
| `.table` `th/td` | 干净表格 |
| `details.collapse` | 原生折叠（零 JS 风险） |
| `.empty` `.empty-icon` | 空状态占位 |
| `.toolbar` | 视图内工具条 |

## 4. 工作流（模型执行步骤）
1. 读取本 Skill 的 `template.html`，理解结构与组件。
2. 按需定制：
   - 简单改名/换色 → 直接用 `scaffold.cjs` 生成。
   - 加业务模块 → 复制 `.view` section 改 `id`，在 `.sidebar` 加对应 `.nav-item`（`data-view` 对应 `id`）。
   - 加内容 → 复制 `.card`/`.stat`/`.table` 等组件，填数据。
3. 产出文件：用 `scaffold.cjs` 或手动 `Write` 落盘到用户指定路径。
4. 验证：用浏览器打开（或 headless 截图），确认：① 无 console 报错；② 主题切换生效；③ 导航切换各模块显隐正确；④ 手机宽度（≤820）下侧栏变横向 tab、无横向溢出。

## 5. 定制速查
- 改标题：`--title "X"` 或改 `<title>` 与 `.brand h1`。
- 增模块：nav 加 `<button class="nav-item" data-view="vid">名</button>`，main 加 `<section class="view" id="vid">…</section>`。
- 换主题色：改 `--accent`（或用 `--accent` 参数）。
- 接搜索：在 `.search input` 的 `input` 事件挂你的过滤逻辑。
- 加图表：在 `.card-b` 内放 `<svg>`/`<canvas>`，或引用 Chart.js（注意：默认零依赖，引外部库需联网）。

## 6. 资产文件
- `template.html` — 完整空白工作台骨架（打开即用）
- `scaffold.cjs` — 参数化生成器

## 7. 踩坑 / 注意
- **纯内联零依赖**是本 Skill 的底线：不要引入 CDN/外部字体/外部 JS，否则离线打不开、且违背「空白基座可移植」的初衷。图表等按需由用户自行引入并自知联网代价。
- 组件示范放在「概览」(v0)，保证用户打开即见"怎么填"；其余模块空占位，避免预设业务误导。
- 主题色与所有颜色走 CSS 变量，便于一键换肤。
- 折叠用原生 `<details>`，不为它写 JS，避免出错。
