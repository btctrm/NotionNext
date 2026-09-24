/**
 * 主题「横移 · TRAVERSE」
 * 整个博客是一面抱石墙：每篇文章是一个岩点，每个分类是一条线路。
 * 桌面横向横移，触屏原生横滑；文章页是「停在一个岩点上读」。
 */
import NotionPage from '@/components/NotionPage'
import { siteConfig } from '@/lib/config'
import { isBrowser } from '@/lib/utils'
import dynamic from 'next/dynamic'
import { useRouter } from 'next/router'
import { useEffect } from 'react'
import { ArticleEnd, ArticleHead, PlainList } from './components/Article'
import Header from './components/Header'
import Topo from './components/Topo'
import Wall from './components/Wall'
import CONFIG from './config'
import { cfg, countWords, groupRoutes, locate } from './lib'
import { Style } from './style'

const Comment = dynamic(() => import('@/components/Comment'), { ssr: false })
const ArticleLock = dynamic(() => import('./components/ArticleLock'), { ssr: false })

/** 所有页面的外壳：夜色底、顶栏 */
const LayoutBase = props => {
  const { children } = props
  return (
    <div id='theme-traverse' className={`${siteConfig('FONT_STYLE')} tv-root`}>
      <Style />
      <Header {...props} />
      {children}
    </div>
  )
}

/** 首页 = 整面墙（用 allNavPages：全部已发布文章，不受分页影响） */
const LayoutIndex = props => {
  const { allNavPages, NOTION_CONFIG } = props
  const hero = {
    kicker: cfg('TRAVERSE_HERO_KICKER', NOTION_CONFIG),
    line1: cfg('TRAVERSE_HERO_LINE1', NOTION_CONFIG),
    line2en: cfg('TRAVERSE_HERO_LINE2_EN', NOTION_CONFIG),
    line2: cfg('TRAVERSE_HERO_LINE2', NOTION_CONFIG),
    text: cfg('TRAVERSE_HERO_TEXT', NOTION_CONFIG)
  }
  return <Wall posts={allNavPages} NOTION_CONFIG={NOTION_CONFIG} hero={hero} endMode='about' allNavPages={allNavPages} />
}

/** 分类页 = 只有这条线路的墙；标签页/搜索页 = 竖排列表 */
const LayoutPostList = props => {
  const { category, tag, keyword, posts, allNavPages, NOTION_CONFIG } = props
  if (category) {
    const routes = groupRoutes(allNavPages, NOTION_CONFIG)
    const i = routes.findIndex(r => r.name === category)
    const route = routes[i]
    const nxt = routes[(i + 1) % Math.max(1, routes.length)]
    const nextRoute = routes.length > 1 && nxt && nxt.name !== category ? { name: nxt.name, href: `/category/${encodeURIComponent(nxt.name)}` } : null
    const hero = {
      kicker: `线路 ${String.fromCharCode(65 + Math.max(0, i))} · ${category} · ${route?.posts?.length || 0} 个岩点`,
      line1: category,
      line2en: route?.en || '',
      line2: '',
      text: ''
    }
    return <Wall posts={route?.posts || posts} NOTION_CONFIG={NOTION_CONFIG} hero={hero} endMode='next' nextRoute={nextRoute} allNavPages={allNavPages} />
  }
  const title = tag ? `标签 · ${tag}` : keyword ? `搜索 · ${keyword}` : '文章'
  return (
    <main className='tv-page'>
      <PlainList posts={posts} NOTION_CONFIG={NOTION_CONFIG} title={title} />
    </main>
  )
}

/** 搜索页：走列表 */
const LayoutSearch = props => <LayoutPostList {...props} />

/** 归档页：按年份分组的竖排列表 */
const LayoutArchive = props => {
  const { archivePosts, NOTION_CONFIG } = props
  return (
    <main className='tv-page'>
      {Object.keys(archivePosts || {}).map(year => (
        <PlainList key={year} posts={archivePosts[year]} NOTION_CONFIG={NOTION_CONFIG} title={`归档 · ${year}`} />
      ))}
    </main>
  )
}

/** 文章页（Post）与单页（Page，如 about） */
const LayoutSlug = props => {
  const { post, lock, validPassword, prev, next, allNavPages, NOTION_CONFIG, siteInfo } = props
  const router = useRouter()
  const waiting404 = siteConfig('POST_WAITING_TIME_FOR_404') * 1000
  useEffect(() => {
    if (!post) {
      setTimeout(() => {
        if (isBrowser) {
          const article = document.querySelector('#article-wrapper #notion-article')
          if (!article) router.push('/404').then(() => console.warn('找不到页面', router.asPath))
        }
      }, waiting404)
    }
  }, [post])

  if (lock) {
    return (
      <main className='tv-page'>
        <ArticleLock validPassword={validPassword} />
      </main>
    )
  }
  if (!post) return null

  const isPost = post.type === 'Post'
  const loc = isPost ? locate(post, allNavPages, NOTION_CONFIG) : null
  const showTopo = isPost && cfg('TRAVERSE_ARTICLE_SHOW_TOPO', NOTION_CONFIG)
  const words = countWords(post)
  const mins = words ? Math.max(1, Math.round(words / (cfg('TRAVERSE_WORDS_PER_MINUTE', NOTION_CONFIG) || 350))) : 0

  return (
    <>
      <ReadingProgress />
      {isPost ? (
        <ArticleHead post={post} loc={loc} NOTION_CONFIG={NOTION_CONFIG} siteInfo={siteInfo} />
      ) : (
        <section className='tv-head'>
          <div className='tv-k'>
            <span className='dot' />
            {post.title}
          </div>
          <h1>{post.title}</h1>
        </section>
      )}
      <div className={`tv-body${showTopo ? ' with-topo' : ''}`}>
        {showTopo && <Topo loc={loc} toc={post.toc} />}
        <article className='tv-prose' id='article-wrapper'>
          <NotionPage post={post} />
        </article>
      </div>
      {isPost && <ArticleEnd prev={prev} next={next} mins={mins} />}
      <div className='tv-page'>
        <Comment frontMatter={post} />
      </div>
      <Footer {...props} />
    </>
  )
}

/** 顶部的橙色阅读进度 = 粉笔痕 */
function ReadingProgress() {
  useEffect(() => {
    const el = document.getElementById('tv-prog')
    const on = () => {
      const h = document.documentElement
      if (el) el.style.width = (h.scrollTop / Math.max(1, h.scrollHeight - h.clientHeight)) * 100 + '%'
    }
    on()
    window.addEventListener('scroll', on, { passive: true })
    return () => window.removeEventListener('scroll', on)
  }, [])
  return <div className='tv-prog' id='tv-prog' />
}

function Footer({ siteInfo, NOTION_CONFIG }) {
  const y = new Date().getFullYear()
  return (
    <footer className='tv-footer'>
      <span>
        © {y} {siteConfig('AUTHOR', siteInfo?.author, NOTION_CONFIG)}
      </span>
      <span>{cfg('TRAVERSE_TAGLINE', NOTION_CONFIG)}</span>
    </footer>
  )
}

/** 404 */
const Layout404 = props => {
  const { allNavPages, NOTION_CONFIG } = props
  return (
    <main className='tv-page tv-404'>
      <div className='tv-k'>404 · 这个岩点不在墙上</div>
      <h1>脱落了。</h1>
      <p>你找的页面不存在，或者已经被拆掉了。从最近的几个岩点重新起步：</p>
      <PlainList posts={(allNavPages || []).slice(0, 5)} NOTION_CONFIG={NOTION_CONFIG} />
    </main>
  )
}

/** 分类索引 = 三条线路 */
const LayoutCategoryIndex = props => {
  const { allNavPages, NOTION_CONFIG } = props
  const routes = groupRoutes(allNavPages, NOTION_CONFIG)
  return (
    <main className='tv-page'>
      <div className='tv-k'>线路 · ROUTES</div>
      <section className='tv-list'>
        {routes.map((r, i) => (
          <a href={`/category/${encodeURIComponent(r.name)}`} key={r.name} className='row'>
            <span className='dot' />
            <span className='t'>
              线路 {String.fromCharCode(65 + i)} · {r.name}
            </span>
            <span className='m'>{r.posts.length} 个岩点</span>
          </a>
        ))}
      </section>
    </main>
  )
}

/** 标签索引 */
const LayoutTagIndex = props => {
  const { tagOptions } = props
  return (
    <main className='tv-page'>
      <div className='tv-k'>标签 · TAGS</div>
      <div className='tv-chips'>
        {tagOptions?.map(t => (
          <a key={t.name} href={`/tag/${encodeURIComponent(t.name)}`}>
            {t.name}
            {t.count ? ` · ${t.count}` : ''}
          </a>
        ))}
      </div>
    </main>
  )
}

export { CONFIG as THEME_CONFIG, Layout404, LayoutArchive, LayoutBase, LayoutCategoryIndex, LayoutIndex, LayoutPostList, LayoutSearch, LayoutSlug, LayoutTagIndex }
