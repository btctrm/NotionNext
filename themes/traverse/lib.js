import { siteConfig } from '@/lib/config'
import CONFIG from './config'

/** 读主题配置（允许 Notion 配置中心 / .env 覆盖） */
export const cfg = (key, notionConfig) => siteConfig(key, CONFIG[key], notionConfig)

/** 把文章按线路（分类）分组并按配置顺序排列；每条线路内按日期倒序（新的在起点近处） */
export function groupRoutes(posts, notionConfig) {
  const order = cfg('TRAVERSE_ROUTE_ORDER', notionConfig) || []
  const en = cfg('TRAVERSE_ROUTE_EN', notionConfig) || {}
  const map = new Map()
  for (const p of posts || []) {
    if (!p || !p.title) continue // 跳过无标题的空文章（NotionNext 示例数据）
    const c = p?.category || '未分类'
    if (!map.has(c)) map.set(c, [])
    map.get(c).push(p)
  }
  const names = [...order.filter(n => map.has(n)), ...[...map.keys()].filter(n => !order.includes(n))]
  return names.map(name => ({
    name,
    en: en[name] || '',
    posts: map.get(name).slice().sort((a, b) => new Date(b.publishDate || b.date?.start_date || 0) - new Date(a.publishDate || a.date?.start_date || 0))
  }))
}

/** 是否 CRUX（打了指定标签） */
export function isCrux(post, notionConfig) {
  const tag = cfg('TRAVERSE_CRUX_TAG', notionConfig)
  return !!tag && Array.isArray(post?.tags) && post.tags.includes(tag)
}

/** 日期 → 2026 · 04 */
export function ym(post) {
  const d = new Date(post?.publishDate || post?.date?.start_date || post?.publishDay || 0)
  if (isNaN(d)) return ''
  return `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')}`
}

/** 日期 → 2026 · 04 · 12 */
export function ymd(post) {
  const d = new Date(post?.publishDate || post?.date?.start_date || post?.publishDay || 0)
  if (isNaN(d)) return ''
  return `${d.getFullYear()} · ${String(d.getMonth() + 1).padStart(2, '0')} · ${String(d.getDate()).padStart(2, '0')}`
}

/** 客户端拿到的列表里没有 id，用 href 认人 */
export const same = (a, b) => !!a && !!b && ((a.id && b.id && a.id === b.id) || (a.href && b.href && a.href === b.href))

/** 在整面墙上找到某篇文章的位置：第几个岩点 / 共几个 / 所在线路 */
export function locate(post, allNavPages, notionConfig) {
  const routes = groupRoutes(allNavPages, notionConfig)
  let idx = 0
  let total = 0
  let found = null
  for (const r of routes) {
    for (const p of r.posts) {
      total++
      if (same(p, post)) found = { index: total, route: r, routeIndex: r.posts.indexOf(p) + 1, routeTotal: r.posts.length }
    }
  }
  idx = found?.index || 0
  return { ...(found || {}), index: idx, total, routes }
}

/** 从 Notion 块粗估字数（仅文本类块） */
export function countWords(post) {
  const block = post?.blockMap?.block
  if (!block) return 0
  let n = 0
  for (const id of Object.keys(block)) {
    const v = block[id]?.value
    const t = v?.properties?.title
    if (Array.isArray(t)) for (const seg of t) if (typeof seg?.[0] === 'string') n += seg[0].replace(/\s/g, '').length
  }
  return n
}
