import { uuidToId } from 'notion-utils'
import { useEffect, useState } from 'react'

/**
 * 文章页左侧的小 topo：这条线路的所有岩点 + 你在这里，下面是本文的 MOVE 目录（随滚动高亮）
 */
export default function Topo({ loc, toc }) {
  const [cur, setCur] = useState(null)
  const n = loc?.route?.posts?.length || 0
  const idx = (loc?.routeIndex || 1) - 1
  const W = 230
  const pts = []
  const ys = [82, 56, 74, 48, 30, 52, 40]
  for (let i = 0; i < n; i++) pts.push([12 + (n > 1 ? (i * (W - 24)) / (n - 1) : (W - 24) / 2), ys[i % ys.length]])
  const heads = (toc || []).filter(t => (t.indentLevel || 0) === 0).map(t => ({ ...t, dom: uuidToId(t.id) }))

  useEffect(() => {
    if (!heads.length) return
    const els = heads.map(h => document.getElementById(h.dom)).filter(Boolean)
    const on = () => {
      let c = els[0]
      els.forEach(el => {
        if (el.getBoundingClientRect().top < 200) c = el
      })
      setCur(c?.id || null)
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [toc])

  return (
    <aside className='tv-topo'>
      <div className='t'>这条线路 · {loc?.route?.name || 'THIS ROUTE'}</div>
      {n > 0 && (
        <svg viewBox={`0 0 ${W} 120`} fill='none' aria-hidden='true'>
          <path d={pts.map((p, i) => (i ? 'L' : 'M') + p[0] + ' ' + p[1]).join(' ')} stroke='#ffb454' strokeWidth='1.2' strokeDasharray='3 5' opacity='.6' />
          <g stroke='#eef0ea' strokeWidth='1.2' opacity='.5'>
            {pts.map((p, i) => i !== idx && <circle key={i} cx={p[0]} cy={p[1]} r='5' />)}
          </g>
          {pts[idx] && (
            <>
              <circle cx={pts[idx][0]} cy={pts[idx][1]} r='7' stroke='#ffb454' strokeWidth='1.5' />
              <circle cx={pts[idx][0]} cy={pts[idx][1]} r='3' fill='#ffb454' />
              <circle cx={pts[idx][0]} cy={pts[idx][1]} r='13' stroke='#ffb454' strokeWidth='1' opacity='.25' />
              <text x={Math.min(W - 34, Math.max(34, pts[idx][0]))} y={pts[idx][1] - 14} fill='#ffb454' fontFamily='DM Mono,monospace' fontSize='7' letterSpacing='1.5' textAnchor='middle'>
                你在这里
              </text>
            </>
          )}
          <text x='12' y='104' fill='#eef0ea' fontFamily='DM Mono,monospace' fontSize='7' letterSpacing='1.5' opacity='.5'>
            START
          </text>
          <text x={W - 12} y='104' fill='#eef0ea' fontFamily='DM Mono,monospace' fontSize='7' letterSpacing='1.5' opacity='.5' textAnchor='end'>
            TOP
          </text>
        </svg>
      )}
      {heads.length > 0 && (
        <ul className='mv'>
          {heads.map((h, i) => (
            <li key={h.id}>
              <a href={`#${h.dom}`} className={cur === h.dom ? 'on' : ''}>
                <b>M·{String(i + 1).padStart(2, '0')}</b>
                {h.text}
              </a>
            </li>
          ))}
        </ul>
      )}
    </aside>
  )
}
