#!/usr/bin/env node
/* 空白工作台脚手架生成器
   用法:
     node scaffold.cjs --title "我的项目看板" --nav "概览,任务,成员,报表" --accent "#10b981" --out "项目看板.html"
   占位符（由 template.html 提供）:
     __TITLE__         工作台标题 (<title> 与 .brand h1)
     __ACCENT__        主题色 (注入 :root --accent)
     __OVERVIEW_TITLE__ 概览模块标题 (默认取 --nav 第一项)
     __NAV_EXTRA__     其余模块导航按钮 (插在「概览」按钮之后)
     __EXTRA_VIEWS__   其余模块空占位 section (插在 v0 概览之后)
*/
const fs = require('fs');
const path = require('path');

const args = process.argv.slice(2);
const get = (n, d) => { const i = args.indexOf('--' + n); return i >= 0 && args[i + 1] ? args[i + 1] : d; };

const title = get('title', '我的工作台');
const accent = get('accent', '#4f7cff');
const out = get('out', '空白工作台.html');
const nav = (get('nav') || '概览,模块一,模块二,模块三')
  .split(',').map(s => s.trim()).filter(Boolean);

const overviewTitle = nav[0] || '概览';
const extra = nav.slice(1);

const navExtra = extra.map((n, i) =>
  `      <button class="nav-item" data-view="m${i + 1}">${n}</button>`).join('\n');

const extraViews = extra.map((n, i) =>
`    <section class="view" id="m${i + 1}">
      <div class="page-head"><h2>${n}</h2></div>
      <div class="empty">
        <div class="empty-icon">▦</div>
        <p>「${n}」模块占位</p>
        <span>在此放置你的内容：复制「概览」中的组件结构（.card / .stat / .table 等）即可</span>
      </div>
    </section>`).join('\n');

let tpl = fs.readFileSync(path.join(__dirname, 'template.html'), 'utf8');
tpl = tpl
  .replace(/__TITLE__/g, title)
  .replace(/__ACCENT__/g, accent)
  .replace('__OVERVIEW_TITLE__', overviewTitle)
  .replace('__NAV_EXTRA__', navExtra)
  .replace('__EXTRA_VIEWS__', extraViews);

fs.writeFileSync(out, tpl, 'utf8');
console.log('已生成空白工作台: ' + out + '  (' + nav.length + ' 个模块，首个「' + overviewTitle + '」含组件示范)');
