import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { useRouter } from 'next/router'
import { cfg, groupRoutes } from '../lib'

/**
 * 顶栏：logo · 三条线路 · 关于 · 外链 · 标语
 */
export default function Header({ allNavPages, NOTION_CONFIG, siteInfo }) {
  const router = useRouter()
  const routes = groupRoutes(allNavPages, NOTION_CONFIG).filter(r => r.name !== '未分类')
  const extra = cfg('TRAVERSE_EXTRA_LINKS', NOTION_CONFIG) || []
  const aboutSlug = cfg('TRAVERSE_ABOUT_SLUG', NOTION_CONFIG)
  const author = siteConfig('AUTHOR', siteInfo?.author, NOTION_CONFIG) || siteInfo?.title || 'TRM'
  const path = router.asPath || ''
  return (
    <header className='tv-header'>
      <SmartLink href='/' className='logo'>
        {author}
      </SmartLink>
      <nav>
        {routes.map(r => {
          const href = `/category/${encodeURIComponent(r.name)}`
          const on = path.startsWith(`/category/${encodeURIComponent(r.name)}`) || path.startsWith(`/category/${r.name}`)
          return (
            <SmartLink key={r.name} href={href} className={on ? 'on' : ''}>
              {r.name}
            </SmartLink>
          )
        })}
        <SmartLink href={`/${aboutSlug}`} className={path.startsWith(`/${aboutSlug}`) ? 'on' : ''}>
          关于
        </SmartLink>
        {extra.map(l => (
          <a key={l.href} href={l.href} target='_blank' rel='noreferrer'>
            {l.name} ↗
          </a>
        ))}
      </nav>
      <div className='tag'>{cfg('TRAVERSE_TAGLINE', NOTION_CONFIG)}</div>
    </header>
  )
}
