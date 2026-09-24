/* eslint-disable react/no-unknown-property */
/**
 * 主题「横移」的全部样式。只对 #theme-traverse 生效。
 * 不支持 tailwind 的 @apply；全部是原生 CSS。
 */
const Style = () => {
  return (
    <style jsx global>{`
      @import url('https://fonts.googleapis.com/css2?family=Syne:wght@400;700;800&family=Noto+Sans+SC:wght@300;400;500;700;900&family=DM+Mono:wght@300;500&display=swap');

      :root {
        --tv-night: #0f1b21;
        --tv-night-2: #142530;
        --tv-night-3: #0b1418;
        --tv-chalk: #eef0ea;
        --tv-chalk-2: #c9cdc4;
        --tv-dim: rgba(238, 240, 234, 0.55);
        --tv-line: rgba(238, 240, 234, 0.13);
        --tv-tape: #ffb454;
        --tv-tape-soft: rgba(255, 180, 84, 0.18);
        --tv-disp: 'Syne', 'Noto Sans SC', sans-serif;
        --tv-cn: 'Noto Sans SC', system-ui, sans-serif;
        --tv-mono: 'DM Mono', ui-monospace, monospace;
      }
      html, body { background: var(--tv-night) !important; }
      html.tv-desk body { overflow-x: hidden; }
      html.tv-touch body { height: 100vh; overflow: hidden; }
      #theme-traverse { background: var(--tv-night); color: var(--tv-chalk); font-family: var(--tv-cn); font-weight: 300; min-height: 100vh; }
      #theme-traverse a { color: inherit; text-decoration: none; }
      #theme-traverse .tv-k { font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.24em; color: var(--tv-tape); }
      #theme-traverse .tv-k i { font-style: normal; }

      /* ===== 顶栏 ===== */
      #theme-traverse .tv-header { position: fixed; left: 0; right: 0; top: 0; z-index: 40; display: flex; justify-content: space-between; align-items: center; gap: 20px; padding: 22px clamp(18px, 4vw, 48px) 34px; font-family: var(--tv-mono); font-size: 11.5px; letter-spacing: 0.1em; color: var(--tv-dim); background: linear-gradient(var(--tv-night) 55%, transparent); pointer-events: none; }
      #theme-traverse .tv-header > * { pointer-events: auto; }
      #theme-traverse .tv-header .logo { font-family: var(--tv-disp); font-weight: 800; font-size: 20px; letter-spacing: -0.02em; color: var(--tv-chalk); text-transform: uppercase; }
      #theme-traverse .tv-header nav { display: flex; gap: 24px; }
      #theme-traverse .tv-header nav a:hover, #theme-traverse .tv-header nav a.on { color: var(--tv-chalk); }
      #theme-traverse .tv-header .tag { white-space: nowrap; }

      /* ===== 墙 ===== */
      #theme-traverse .tv-view { position: fixed; inset: 0; overflow: hidden; }
      #theme-traverse .tv-layer { position: absolute; top: 0; left: 0; height: 100%; will-change: transform; }
      #theme-traverse .tv-back { width: 400vw; background-image: radial-gradient(circle at 30% 20%, rgba(238,240,234,.06) 0 2px, transparent 3px), radial-gradient(circle at 70% 60%, rgba(238,240,234,.05) 0 1.5px, transparent 2.5px), radial-gradient(circle at 15% 75%, rgba(238,240,234,.045) 0 2px, transparent 3px); background-size: 420px 420px, 300px 300px, 560px 560px; }
      #theme-traverse .tv-back::after { content: ''; position: absolute; inset: 0; background: repeating-linear-gradient(90deg, transparent 0 199px, var(--tv-line) 199px 200px); }
      #theme-traverse .tv-route { position: absolute; left: 0; top: 0; height: 100%; overflow: visible; }
      #theme-traverse .tv-route path { fill: none; stroke: var(--tv-tape); stroke-width: 1.4; stroke-dasharray: 4 7; opacity: 0.55; }

      #theme-traverse .tv-start { position: absolute; left: clamp(18px, 4vw, 48px); top: 50%; transform: translateY(-50%); width: min(760px, 80vw); }
      #theme-traverse .tv-start .tv-k { margin-bottom: 26px; }
      #theme-traverse .tv-start h1 { font-family: var(--tv-disp); font-weight: 800; font-size: clamp(46px, 7.4vw, 108px); line-height: 0.98; letter-spacing: -0.03em; margin: 0; }
      #theme-traverse .tv-start h1 .cn { font-family: var(--tv-cn); font-weight: 900; letter-spacing: -0.01em; }
      #theme-traverse .tv-start h1 .th { font-weight: 400; color: var(--tv-dim); }
      #theme-traverse .tv-start p { margin: 32px 0 0; max-width: 30em; font-size: 16px; line-height: 2; color: var(--tv-dim); }
      #theme-traverse .tv-start p b { color: var(--tv-chalk); font-weight: 500; }
      #theme-traverse .tv-chips { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 26px; }
      #theme-traverse .tv-chips a { font-family: var(--tv-mono); font-size: 10.5px; letter-spacing: 0.14em; padding: 8px 12px; border: 1px solid var(--tv-line); color: var(--tv-dim); border-radius: 999px; }
      #theme-traverse .tv-chips a:hover { border-color: var(--tv-tape); color: var(--tv-tape); }

      #theme-traverse .tv-hold { position: absolute; width: 300px; transform: translate(-14px, -14px); display: block; }
      #theme-traverse .tv-hold .dot { display: block; width: 28px; height: 28px; border-radius: 50%; border: 1.5px solid var(--tv-chalk); position: relative; transition: transform 0.5s cubic-bezier(0.2, 0.7, 0.2, 1), border-color 0.4s; }
      #theme-traverse .tv-hold .dot::after { content: ''; position: absolute; inset: 8px; border-radius: 50%; background: var(--tv-chalk); opacity: 0; transition: opacity 0.4s; }
      #theme-traverse .tv-hold .txt { display: block; margin-top: 14px; padding-left: 2px; }
      #theme-traverse .tv-hold .k { display: block; font-family: var(--tv-mono); font-size: 10.5px; letter-spacing: 0.18em; color: var(--tv-dim); }
      #theme-traverse .tv-hold .k i { font-style: normal; color: var(--tv-tape); }
      #theme-traverse .tv-hold .t { display: block; margin-top: 8px; font-size: 19px; line-height: 1.4; font-weight: 500; color: var(--tv-chalk); transition: color 0.3s; }
      #theme-traverse .tv-hold:hover .dot { transform: scale(1.25); border-color: var(--tv-tape); }
      #theme-traverse .tv-hold:hover .dot::after { opacity: 1; background: var(--tv-tape); }
      #theme-traverse .tv-hold:hover .t { color: var(--tv-tape); }
      #theme-traverse .tv-hold.crux .dot { border-color: var(--tv-tape); box-shadow: 0 0 0 8px var(--tv-tape-soft); }

      #theme-traverse .tv-sec { position: absolute; top: 7%; font-family: var(--tv-cn); font-weight: 900; font-size: clamp(90px, 14vw, 190px); letter-spacing: -0.04em; color: transparent; -webkit-text-stroke: 1px rgba(238, 240, 234, 0.16); line-height: 1; white-space: nowrap; pointer-events: none; }
      #theme-traverse .tv-sec .en { font-family: var(--tv-disp); font-weight: 800; margin-left: 0.15em; }

      #theme-traverse .tv-top { position: absolute; top: 50%; transform: translateY(-50%); width: min(600px, 80vw); }
      #theme-traverse .tv-top .tv-k { margin-bottom: 22px; }
      #theme-traverse .tv-top h2 { font-size: clamp(24px, 3vw, 38px); line-height: 1.45; font-weight: 300; margin: 0; }
      #theme-traverse .tv-top h2 b { font-weight: 900; }
      #theme-traverse .tv-top .f { margin-top: 30px; font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--tv-dim); line-height: 2.2; }
      #theme-traverse .tv-top .f .tape { color: var(--tv-tape); }
      #theme-traverse .tv-card { margin-top: 28px; border: 1px solid var(--tv-line); background: var(--tv-night-3); padding: 6px; }
      #theme-traverse .tv-card .in { border: 1px dashed rgba(255, 180, 84, 0.45); padding: 20px 22px; display: grid; grid-template-columns: 1fr 1fr; gap: 16px 20px; }
      #theme-traverse .tv-card .t { grid-column: 1 / -1; font-family: var(--tv-mono); font-size: 10.5px; letter-spacing: 0.24em; color: var(--tv-tape); display: flex; justify-content: space-between; }
      #theme-traverse .tv-card .f .k { font-family: var(--tv-mono); font-size: 10px; letter-spacing: 0.18em; color: var(--tv-dim); }
      #theme-traverse .tv-card .f .v { margin-top: 6px; font-size: 16px; font-weight: 500; color: var(--tv-chalk); }
      #theme-traverse .tv-card .f .v b { font-family: var(--tv-disp); font-weight: 800; color: var(--tv-tape); font-size: 28px; letter-spacing: -0.02em; line-height: 1; }

      #theme-traverse .tv-hint { position: fixed; right: clamp(18px, 4vw, 48px); bottom: 60px; z-index: 30; font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.2em; color: var(--tv-dim); animation: tv-nudge 2.2s ease-in-out infinite; transition: opacity 0.6s; }
      #theme-traverse .tv-view.tv-moved .tv-hint { opacity: 0; }
      @keyframes tv-nudge { 0%, 100% { transform: translateX(0); } 50% { transform: translateX(8px); } }
      #theme-traverse .tv-progress { position: fixed; left: clamp(18px, 4vw, 48px); right: clamp(18px, 4vw, 48px); bottom: 26px; z-index: 30; font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--tv-dim); display: flex; align-items: center; gap: 18px; }
      #theme-traverse .tv-progress .bar { flex: 1; height: 1px; background: var(--tv-line); position: relative; }
      #theme-traverse .tv-progress .bar i { position: absolute; left: 0; top: -1px; height: 3px; width: 0; background: var(--tv-tape); }
      #theme-traverse .tv-progress b { color: var(--tv-tape); font-weight: 500; font-variant-numeric: tabular-nums; }

      /* 触屏横移：原生手指横滑，为竖长屏幕重排（坐标由 JS 给） */
      html.tv-touch #theme-traverse .tv-view { overflow-x: auto; overflow-y: hidden; -webkit-overflow-scrolling: touch; overscroll-behavior-x: contain; }
      html.tv-touch #theme-traverse .tv-view::-webkit-scrollbar { display: none; }
      html.tv-touch #theme-traverse .tv-wall { transform: none !important; }
      html.tv-touch #theme-traverse .tv-start { width: min(560px, 84vw); top: 46%; }
      html.tv-touch #theme-traverse .tv-start h1 { font-size: clamp(38px, 10vw, 60px); }
      html.tv-touch #theme-traverse .tv-start p { font-size: 14.5px; line-height: 1.85; margin-top: 22px; }
      html.tv-touch #theme-traverse .tv-hold { width: 190px; }
      html.tv-touch #theme-traverse .tv-hold .dot { width: 22px; height: 22px; }
      html.tv-touch #theme-traverse .tv-hold .dot::after { inset: 6px; }
      html.tv-touch #theme-traverse .tv-hold .txt { margin-top: 10px; }
      html.tv-touch #theme-traverse .tv-hold .k { font-size: 9.5px; letter-spacing: 0.14em; }
      html.tv-touch #theme-traverse .tv-hold .t { font-size: 15.5px; margin-top: 6px; }
      html.tv-touch #theme-traverse .tv-sec { font-size: 84px; top: 6%; -webkit-text-stroke-color: rgba(238, 240, 234, 0.1); }
      html.tv-touch #theme-traverse .tv-top { width: min(520px, 82vw); }
      html.tv-touch #theme-traverse .tv-top h2 { font-size: clamp(20px, 5.6vw, 26px); }
      html.tv-touch #theme-traverse .tv-card .in { padding: 14px 16px; gap: 12px 14px; }
      html.tv-touch #theme-traverse .tv-progress { bottom: 18px; }
      html.tv-touch #theme-traverse .tv-progress span:first-child { display: none; }
      html.tv-touch #theme-traverse .tv-hint { display: none; }
      html.tv-touch #theme-traverse .tv-header nav { display: none; }
      html.tv-touch #theme-traverse .tv-header .logo { white-space: nowrap; font-size: 17px; }

      /* ===== 文章页 ===== */
      #theme-traverse .tv-prog { position: fixed; left: 0; top: 0; height: 2px; width: 0; background: var(--tv-tape); z-index: 41; }
      #theme-traverse .tv-head { max-width: 1180px; margin: 0 auto; padding: 130px clamp(18px, 4vw, 48px) 44px; }
      #theme-traverse .tv-head .tv-k { display: flex; align-items: center; gap: 12px; margin-bottom: 26px; }
      #theme-traverse .tv-head .tv-k .dot { width: 14px; height: 14px; border-radius: 50%; border: 1.5px solid var(--tv-tape); box-shadow: 0 0 0 6px var(--tv-tape-soft); position: relative; }
      #theme-traverse .tv-head .tv-k .dot::after { content: ''; position: absolute; inset: 4px; border-radius: 50%; background: var(--tv-tape); }
      #theme-traverse .tv-head h1 { font-family: var(--tv-cn); font-weight: 900; font-size: clamp(34px, 5.4vw, 72px); line-height: 1.12; letter-spacing: -0.02em; max-width: 16em; margin: 0; text-wrap: balance; }
      #theme-traverse .tv-head .dek { margin: 28px 0 0; max-width: 41em; font-size: clamp(16px, 1.5vw, 19px); line-height: 1.85; color: var(--tv-chalk-2); }
      #theme-traverse .tv-head .meta { margin-top: 34px; display: flex; flex-wrap: wrap; border-top: 1px solid var(--tv-line); border-bottom: 1px solid var(--tv-line); }
      #theme-traverse .tv-head .meta > div { padding: 14px 28px 14px 0; margin-right: 28px; font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.12em; color: var(--tv-dim); border-right: 1px solid var(--tv-line); }
      #theme-traverse .tv-head .meta > div:last-child { border-right: 0; }
      #theme-traverse .tv-head .meta b { color: var(--tv-chalk); font-weight: 500; display: block; margin-top: 4px; font-size: 12.5px; }

      #theme-traverse .tv-body { max-width: 1180px; margin: 0 auto; padding: 30px clamp(18px, 4vw, 48px) 0; display: grid; grid-template-columns: minmax(0, 1fr); gap: 64px; align-items: start; }
      #theme-traverse .tv-body.with-topo { grid-template-columns: 230px minmax(0, 1fr); }
      #theme-traverse .tv-topo { position: sticky; top: 96px; }
      #theme-traverse .tv-topo .t { font-family: var(--tv-mono); font-size: 10.5px; letter-spacing: 0.22em; color: var(--tv-dim); margin-bottom: 14px; }
      #theme-traverse .tv-topo svg { width: 100%; height: auto; display: block; }
      #theme-traverse .tv-topo .mv { list-style: none; margin: 18px 0 0; padding: 0; border-top: 1px solid var(--tv-line); }
      #theme-traverse .tv-topo .mv li a { display: grid; grid-template-columns: 34px 1fr; gap: 8px; padding: 10px 0; border-bottom: 1px solid var(--tv-line); font-size: 12.5px; line-height: 1.5; color: var(--tv-dim); transition: color 0.3s; }
      #theme-traverse .tv-topo .mv li a b { font-family: var(--tv-mono); font-weight: 500; font-size: 10.5px; letter-spacing: 0.12em; padding-top: 2px; }
      #theme-traverse .tv-topo .mv li a.on { color: var(--tv-chalk); }
      #theme-traverse .tv-topo .mv li a.on b { color: var(--tv-tape); }
      #theme-traverse .tv-topo .mv li a:hover { color: var(--tv-chalk); }

      /* Notion 正文 → 夜色粉笔 */
      #theme-traverse .tv-prose { max-width: 40em; padding-bottom: 40px; }
      #theme-traverse .tv-prose .notion { font-family: var(--tv-cn); font-weight: 300; font-size: 17px; line-height: 1.95; color: var(--tv-chalk-2); background: transparent; }
      #theme-traverse .tv-prose .notion-page { padding: 0 !important; width: 100% !important; max-width: 100% !important; }
      #theme-traverse .tv-prose .notion-text { padding: 0; margin: 0 0 1.5em; }
      #theme-traverse .tv-prose .notion b, #theme-traverse .tv-prose .notion strong { font-weight: 500; color: var(--tv-chalk); }
      #theme-traverse .tv-prose .notion-h1, #theme-traverse .tv-prose .notion-h2, #theme-traverse .tv-prose .notion-h3 { font-family: var(--tv-cn); font-weight: 900; color: var(--tv-chalk); letter-spacing: -0.01em; line-height: 1.3; scroll-margin-top: 110px; }
      #theme-traverse .tv-prose .notion-h1 { font-size: clamp(24px, 2.4vw, 30px); margin: 2.6em 0 0.9em; counter-increment: tv-move; }
      #theme-traverse .tv-prose .notion-h2 { font-size: clamp(22px, 2.2vw, 28px); margin: 2.6em 0 0.9em; counter-increment: tv-move; }
      #theme-traverse .tv-prose .notion-h1::before, #theme-traverse .tv-prose .notion-h2::before { content: 'MOVE ' counter(tv-move, decimal-leading-zero); display: block; font-family: var(--tv-mono); font-weight: 500; font-size: 10.5px; letter-spacing: 0.24em; color: var(--tv-tape); margin-bottom: 10px; }
      #theme-traverse .tv-prose .notion { counter-reset: tv-move; }
      #theme-traverse .tv-prose .notion-h3 { font-size: 19px; margin: 1.8em 0 0.6em; font-weight: 700; }
      #theme-traverse .tv-prose .notion-quote { margin: 2em 0; padding: 4px 0 4px 26px; border-left: 2px solid var(--tv-tape); font-size: 20px; line-height: 1.7; color: var(--tv-chalk); font-weight: 300; background: transparent; }
      #theme-traverse .tv-prose .notion-callout { margin: 2.4em 0; padding: 24px 26px; border: 1px dashed rgba(255, 180, 84, 0.55); border-radius: 0; position: relative; background: rgba(255, 180, 84, 0.05) !important; color: var(--tv-chalk); }
      #theme-traverse .tv-prose .notion-callout::before { content: 'CRUX · 可立即执行'; position: absolute; left: 22px; top: -9px; padding: 0 8px; background: var(--tv-night); font-family: var(--tv-mono); font-size: 10px; letter-spacing: 0.24em; color: var(--tv-tape); }
      #theme-traverse .tv-prose .notion-callout .notion-page-icon-inline { display: none; }
      #theme-traverse .tv-prose .notion-list { margin: 0 0 1.6em; padding-left: 1.4em; }
      #theme-traverse .tv-prose .notion-list li { margin: 0.4em 0; }
      #theme-traverse .tv-prose .notion-list-numbered { list-style: none; counter-reset: tv-n; padding: 0; }
      #theme-traverse .tv-prose .notion-list-numbered > li { position: relative; padding: 12px 0 12px 44px; border-top: 1px solid var(--tv-line); counter-increment: tv-n; margin: 0; }
      #theme-traverse .tv-prose .notion-list-numbered > li::before { content: counter(tv-n, decimal-leading-zero); position: absolute; left: 0; top: 14px; font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.1em; color: var(--tv-tape); }
      #theme-traverse .tv-prose .notion-list-numbered > li:last-child { border-bottom: 1px solid var(--tv-line); }
      #theme-traverse .tv-prose .notion-link { color: var(--tv-chalk); border-bottom: 1px solid rgba(255, 180, 84, 0.6); opacity: 1; }
      #theme-traverse .tv-prose .notion-link:hover { color: var(--tv-tape); }
      #theme-traverse .tv-prose .notion-hr { border-color: var(--tv-line); margin: 2.4em 0; }
      #theme-traverse .tv-prose .notion-asset-wrapper { margin: 2.4em 0; border: 1px solid var(--tv-line); background: var(--tv-night-3); }
      #theme-traverse .tv-prose .notion-asset-caption { padding: 12px 18px; border-top: 1px solid var(--tv-line); font-family: var(--tv-mono); font-size: 10.5px; letter-spacing: 0.14em; color: var(--tv-dim); text-align: left; }
      #theme-traverse .tv-prose .notion-code { background: var(--tv-night-3) !important; border: 1px solid var(--tv-line); border-radius: 0; font-family: var(--tv-mono); font-size: 13px; }
      #theme-traverse .tv-prose .notion-inline-code { background: rgba(238, 240, 234, 0.08); color: var(--tv-chalk); font-family: var(--tv-mono); font-size: 0.9em; border-radius: 2px; padding: 0.1em 0.35em; }
      #theme-traverse .tv-prose .notion-table, #theme-traverse .tv-prose .notion-simple-table { border-color: var(--tv-line); font-size: 15px; }
      #theme-traverse .tv-prose .notion-simple-table td, #theme-traverse .tv-prose .notion-simple-table th { border-color: var(--tv-line) !important; }
      #theme-traverse .tv-prose .notion-toggle { border-top: 1px solid var(--tv-line); }
      #theme-traverse .tv-prose .notion-bookmark { border-color: var(--tv-line); background: var(--tv-night-3); border-radius: 0; }
      #theme-traverse .tv-prose .notion-bookmark:hover { border-color: var(--tv-tape); }
      #theme-traverse .tv-prose .notion-collection, #theme-traverse .tv-prose .notion-collection-header { color: var(--tv-chalk-2); }
      #theme-traverse .tv-prose .notion-gray, #theme-traverse .tv-prose .notion-gray_co { color: var(--tv-dim); }
      #theme-traverse .tv-prose .notion-orange, #theme-traverse .tv-prose .notion-yellow, #theme-traverse .tv-prose .notion-red { color: var(--tv-tape); }
      #theme-traverse .tv-prose .notion-yellow_background, #theme-traverse .tv-prose .notion-orange_background, #theme-traverse .tv-prose .notion-red_background { background: var(--tv-tape-soft); color: var(--tv-chalk); }
      #theme-traverse .tv-prose .notion-page-cover, #theme-traverse .tv-prose .notion-title, #theme-traverse .tv-prose .notion-page-icon-hero { display: none; }
      #theme-traverse .tv-prose img { max-width: 100%; }

      /* 完攀 + 上下岩点 */
      #theme-traverse .tv-end { max-width: 1180px; margin: 40px auto 0; padding: 0 clamp(18px, 4vw, 48px); }
      #theme-traverse .tv-end .send { border-top: 1px solid var(--tv-line); padding: 44px 0 34px; display: flex; align-items: baseline; gap: 22px; flex-wrap: wrap; }
      #theme-traverse .tv-end .send b { font-family: var(--tv-disp); font-weight: 800; font-size: clamp(40px, 6vw, 80px); letter-spacing: -0.03em; color: var(--tv-tape); line-height: 1; }
      #theme-traverse .tv-end .send span { font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.2em; color: var(--tv-dim); }
      #theme-traverse .tv-end .nb { display: grid; grid-template-columns: 1fr 1fr; gap: 1px; background: var(--tv-line); border: 1px solid var(--tv-line); margin-bottom: 40px; }
      #theme-traverse .tv-end .nb > * { background: var(--tv-night); padding: 26px 28px; display: grid; gap: 10px; transition: background 0.3s; }
      #theme-traverse .tv-end .nb a:hover { background: var(--tv-night-2); }
      #theme-traverse .tv-end .nb .k { font-family: var(--tv-mono); font-size: 10.5px; letter-spacing: 0.2em; color: var(--tv-tape); }
      #theme-traverse .tv-end .nb h4 { font-size: 19px; font-weight: 500; line-height: 1.4; margin: 0; }
      #theme-traverse .tv-end .nb .n { text-align: right; }

      /* 列表页（搜索/标签/归档/404） */
      #theme-traverse .tv-page { max-width: 1180px; margin: 0 auto; padding: 130px clamp(18px, 4vw, 48px) 60px; min-height: 70vh; }
      #theme-traverse .tv-page h1 { font-family: var(--tv-cn); font-weight: 900; font-size: clamp(34px, 5vw, 64px); margin: 18px 0; }
      #theme-traverse .tv-page > p { color: var(--tv-dim); max-width: 34em; line-height: 1.9; }
      #theme-traverse .tv-list { margin-top: 26px; border-top: 1px solid var(--tv-line); margin-bottom: 50px; }
      #theme-traverse .tv-list .tv-k { padding: 26px 0 10px; }
      #theme-traverse .tv-list .row { display: grid; grid-template-columns: 34px 1fr auto; gap: 18px; align-items: center; padding: 20px 0; border-bottom: 1px solid var(--tv-line); transition: color 0.3s; }
      #theme-traverse .tv-list .row .dot { width: 16px; height: 16px; border-radius: 50%; border: 1.5px solid var(--tv-chalk); transition: all 0.35s; }
      #theme-traverse .tv-list .row.crux .dot { border-color: var(--tv-tape); box-shadow: 0 0 0 5px var(--tv-tape-soft); }
      #theme-traverse .tv-list .row .t { font-size: clamp(17px, 1.8vw, 22px); font-weight: 500; }
      #theme-traverse .tv-list .row .m { font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--tv-dim); white-space: nowrap; }
      #theme-traverse .tv-list .row:hover { color: var(--tv-tape); }
      #theme-traverse .tv-list .row:hover .dot { border-color: var(--tv-tape); background: var(--tv-tape); }
      #theme-traverse .tv-list .empty { color: var(--tv-dim); padding: 30px 0; }
      #theme-traverse .tv-footer { max-width: 1180px; margin: 0 auto; padding: 22px clamp(18px, 4vw, 48px) 44px; border-top: 1px solid var(--tv-line); display: flex; justify-content: space-between; font-family: var(--tv-mono); font-size: 11px; letter-spacing: 0.14em; color: var(--tv-dim); }

      /* 评论区容器（Twikoo / Giscus 等按各自样式，这里只给底色） */
      #theme-traverse #comment { color: var(--tv-chalk-2); }

      @media (max-width: 860px) {
        #theme-traverse .tv-header nav { display: none; }
        #theme-traverse .tv-head { padding-top: 104px; }
        #theme-traverse .tv-head .meta > div { padding: 10px 16px 10px 0; margin-right: 16px; }
        #theme-traverse .tv-body.with-topo { grid-template-columns: 1fr; gap: 28px; }
        #theme-traverse .tv-topo { position: static; }
        #theme-traverse .tv-topo svg { max-width: 230px; }
        #theme-traverse .tv-topo .mv { display: flex; overflow-x: auto; border: 0; gap: 6px; margin-top: 6px; scrollbar-width: none; }
        #theme-traverse .tv-topo .mv::-webkit-scrollbar { display: none; }
        #theme-traverse .tv-topo .mv li a { display: flex; gap: 8px; border: 1px solid var(--tv-line); padding: 8px 12px; white-space: nowrap; font-size: 12px; border-radius: 999px; }
        #theme-traverse .tv-topo .mv li a.on { border-color: var(--tv-tape); }
        #theme-traverse .tv-prose .notion { font-size: 16px; line-height: 1.9; }
        #theme-traverse .tv-prose .notion-quote { font-size: 18px; padding-left: 18px; }
        #theme-traverse .tv-end .nb { grid-template-columns: 1fr; }
        #theme-traverse .tv-end .nb .n { text-align: left; }
        #theme-traverse .tv-footer { flex-direction: column; gap: 8px; }
        #theme-traverse .tv-list .row { grid-template-columns: 26px 1fr; gap: 12px; }
        #theme-traverse .tv-list .row .m { grid-column: 2; }
      }
      @media (prefers-reduced-motion: reduce) {
        #theme-traverse .tv-hint { animation: none; }
      }
    `}</style>
  )
}
export { Style }
