import SmartLink from '@/components/SmartLink'
import { useEffect, useRef } from 'react'
import { cfg, groupRoutes, isCrux, ym } from '../lib'
import WallEnd from './WallEnd'

/**
 * 整面墙。桌面：滚轮/触控板的纵向滚动映射成横向横移；触屏：原生手指横滑。
 * 岩点位置全部由代码计算，Notion 里发文章即自动上墙。
 *
 * @param {Array} posts        要上墙的文章（已过滤 Published）
 * @param {Object} NOTION_CONFIG
 * @param {Object} hero        { kicker, line1, line2en, line2, text, chips? }  起点区
 * @param {String} endMode     'about' = 墙尾放路线卡（首页）；'next' = 墙尾放「下一条线路」（分类页）
 * @param {Object} nextRoute   endMode==='next' 时的下一条线路 { name, href }
 */
export default function Wall({ posts, NOTION_CONFIG, hero, endMode = 'about', nextRoute, allNavPages }) {
  const routes = groupRoutes(posts, NOTION_CONFIG)
  const meters = cfg('TRAVERSE_WALL_METERS', NOTION_CONFIG)
  const viewRef = useRef(null)
  const wallRef = useRef(null)
  const backRef = useRef(null)
  const routeRef = useRef(null)
  const barRef = useRef(null)
  const mRef = useRef(null)

  // 扁平化岩点，附带线路信息；服务端先按桌面坐标给一个可用的初始位置
  const holds = []
  routes.forEach((r, ri) => r.posts.forEach((p, pi) => holds.push({ post: p, route: r, first: pi === 0, ri })))
  const desk = deskLayout(holds.length)

  useEffect(() => {
    const view = viewRef.current
    const wall = wallRef.current
    const back = backRef.current
    const route = routeRef.current
    if (!view || !wall) return
    const html = document.documentElement
    const holdEls = [...wall.querySelectorAll('.tv-hold')]
    const secEls = [...wall.querySelectorAll('.tv-sec')]
    const topEl = wall.querySelector('.tv-top')
    const touch = matchMedia('(hover:none) and (pointer:coarse)').matches || window.innerWidth <= 600
    const reduce = matchMedia('(prefers-reduced-motion:reduce)').matches
    let W = 0
    let stepNow = 340
    let cur = 0
    let target = 0
    let raf = 0

    html.classList.toggle('tv-touch', touch)
    html.classList.toggle('tv-desk', !touch)

    function place(pts, secAt, topX, width) {
      holdEls.forEach((el, i) => {
        el.style.left = pts[i][0] + 'px'
        el.style.top = pts[i][1] + 'px'
      })
      secEls.forEach((el, i) => {
        el.style.left = secAt[i] + 'px'
        // 底纹大字不能压到下一条线路：按这条线路的长度限制字号
        const count = +el.dataset.count || 1
        const chars = (el.textContent || '').replace(/\s/g, '').length || 1
        const avail = count * (touch ? stepNow : 340) - 100
        el.style.fontSize = Math.max(44, Math.min(touch ? 84 : 170, avail / (chars * 0.92))) + 'px'
      })
      if (topEl) topEl.style.left = topX + 'px'
      wall.style.width = width + 'px'
      if (route) {
        route.setAttribute('width', width)
        route.querySelector('path').setAttribute(
          'd',
          pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ') +
            (pts.length ? ` L ${topX - 30} ${Math.round(window.innerHeight * 0.5)}` : '')
        )
      }
      W = width
    }

    function layout() {
      const vw = window.innerWidth
      const vh = window.innerHeight
      const n = holdEls.length
      if (!touch) {
        // 桌面：起点区之后，每 340px 一个点，六层高低循环
        const x0 = Math.max(1000, Math.round(vw * 0.72))
        const step = 340
        const lv = [0.62, 0.44, 0.58, 0.42, 0.33, 0.48]
        const pts = []
        for (let i = 0; i < n; i++) pts.push([x0 + i * step, Math.round(vh * lv[i % lv.length])])
        const secAt = secIndexes().map(i => (pts[i] ? pts[i][0] + 120 : x0))
        const topX = (pts[n - 1]?.[0] || x0) + 420
        place(pts, secAt, topX, topX + Math.min(640, vw * 0.5) + 80)
      } else {
        // 触屏：同一条线路为竖长屏幕重排——点更密、三层高低、一屏两三个标题
        const x0 = Math.round(vw * 1.02)
        const step = Math.round(Math.max(130, Math.min(160, vw * 0.36)))
        stepNow = step
        const lv = [0.22, 0.47, 0.72]
        const pat = [1, 2, 1, 0, 1, 2, 1, 0]
        const pts = []
        for (let i = 0; i < n; i++) pts.push([x0 + i * step, Math.round(vh * lv[pat[i % pat.length]])])
        const secAt = secIndexes().map(i => (pts[i] ? pts[i][0] - 20 : x0))
        const topX = (pts[n - 1]?.[0] || x0) + step + 40
        place(pts, secAt, topX, topX + Math.min(520, vw * 0.82) + Math.round(vw * 0.08))
      }
      if (!touch) document.body.style.height = `calc(${W}px - 100vw + 100vh)`
      else document.body.style.height = ''
      calc()
    }

    function secIndexes() {
      const out = []
      holdEls.forEach((el, i) => {
        if (el.dataset.first === '1') out.push(i)
      })
      return out
    }

    function progress(p) {
      if (barRef.current) barRef.current.style.width = Math.min(100, p * 100) + '%'
      if (mRef.current) mRef.current.textContent = (Math.min(1, p) * meters).toFixed(1) + ' m'
    }

    function calc() {
      if (touch) {
        const x = view.scrollLeft
        const p = x / Math.max(1, W - window.innerWidth)
        progress(p)
        if (back) back.style.transform = `translate3d(${x * 0.45}px,0,0)`
        return
      }
      const max = html.scrollHeight - window.innerHeight
      target = (window.scrollY / Math.max(1, max)) * (W - window.innerWidth)
    }

    function tick() {
      if (!touch) {
        cur += reduce ? target - cur : (target - cur) * 0.1
        wall.style.transform = `translate3d(${-cur}px,0,0)`
        if (back) back.style.transform = `translate3d(${-cur * 0.55}px,0,0)`
        progress(cur / Math.max(1, W - window.innerWidth))
        wall.parentElement.classList.toggle('tv-moved', cur > 120)
      }
      raf = requestAnimationFrame(tick)
    }

    const onResize = () => layout()
    layout()
    tick()
    window.addEventListener('scroll', calc, { passive: true })
    view.addEventListener('scroll', calc, { passive: true })
    window.addEventListener('resize', onResize)
    if (document.fonts?.ready) document.fonts.ready.then(layout)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('scroll', calc)
      view.removeEventListener('scroll', calc)
      window.removeEventListener('resize', onResize)
      document.body.style.height = ''
      html.classList.remove('tv-touch', 'tv-desk')
    }
  }, [posts?.length])

  return (
    <div className='tv-view' ref={viewRef}>
      <div className='tv-layer tv-back' ref={backRef} />
      <div className='tv-layer tv-wall' ref={wallRef} style={{ width: desk.width }}>
        <svg className='tv-route' ref={routeRef} width={desk.width} aria-hidden='true'>
          <path d={desk.path} />
        </svg>

        <section className='tv-start'>
          <div className='tv-k'>{hero?.kicker}</div>
          <h1>
            <span className='cn'>{hero?.line1}</span>
            <br />
            <span className='th'>{hero?.line2en}</span> <span className='cn'>{hero?.line2}</span>
          </h1>
          {hero?.text && <p dangerouslySetInnerHTML={{ __html: hero.text }} />}
          {hero?.chips && <div className='tv-chips'>{hero.chips}</div>}
        </section>

        {holds.map((h, i) => {
          const [x, y] = desk.pts[i]
          const crux = isCrux(h.post, NOTION_CONFIG)
          return (
            <span key={h.post.href || i}>
              {h.first && (
                <div className='tv-sec' data-count={h.route.posts.length} style={{ left: x + 120 }}>
                  {h.route.name} <span className='en'>{h.route.en}</span>
                </div>
              )}
              <SmartLink
                href={h.post.href}
                className={`tv-hold${crux ? ' crux' : ''}`}
                data-first={h.first ? '1' : '0'}
                style={{ left: x, top: y }}>
                <span className='dot' />
                <span className='txt'>
                  <span className='k'>
                    {ym(h.post)} · {h.route.name}
                    {crux && <i> · CRUX</i>}
                  </span>
                  <span className='t'>{h.post.title}</span>
                </span>
              </SmartLink>
            </span>
          )
        })}

        <section className='tv-top' style={{ left: desk.topX }}>
          <WallEnd mode={endMode} nextRoute={nextRoute} NOTION_CONFIG={NOTION_CONFIG} total={holds.length} routes={routes.length} />
        </section>
      </div>

      <div className='tv-hint'>SCROLL TO TRAVERSE →</div>
      <div className='tv-progress'>
        <span>START</span>
        <div className='bar'>
          <i ref={barRef} />
        </div>
        <b ref={mRef}>0.0 m</b>
        <span>/ {meters} m · TOP</span>
      </div>
    </div>
  )
}

/** 服务端初始坐标（桌面口径），JS 起来后会按真实视口重排 */
function deskLayout(n) {
  const x0 = 1060
  const step = 340
  const ys = [560, 400, 520, 380, 300, 430]
  const pts = []
  for (let i = 0; i < n; i++) pts.push([x0 + i * step, ys[i % ys.length]])
  const topX = (pts[n - 1]?.[0] || x0) + 420
  const width = topX + 720
  const path = pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ') + (n ? ` L ${topX - 30} 450` : '')
  return { pts, topX, width, path }
}
