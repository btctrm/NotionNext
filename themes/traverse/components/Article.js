import SmartLink from '@/components/SmartLink'
import { siteConfig } from '@/lib/config'
import { cfg, countWords, isCrux, ymd } from '../lib'

/** 文章头：这是墙上的第几个岩点 */
export function ArticleHead({ post, loc, NOTION_CONFIG, siteInfo }) {
  const crux = isCrux(post, NOTION_CONFIG)
  const words = countWords(post)
  const wpm = cfg('TRAVERSE_WORDS_PER_MINUTE', NOTION_CONFIG) || 350
  const mins = words ? Math.max(1, Math.round(words / wpm)) : 0
  const author = siteConfig('AUTHOR', siteInfo?.author, NOTION_CONFIG)
  const meters = cfg('TRAVERSE_WALL_METERS', NOTION_CONFIG) || 42
  const pos = loc?.index ? (loc.index / Math.max(1, loc.total)) * meters : 0
  return (
    <section className='tv-head'>
      <div className='tv-k'>
        <span className='dot' />
        {loc?.index ? `岩点 ${String(loc.index).padStart(2, '0')} / ` : ''}
        {post?.category || '未分类'}
        {crux && <i> · CRUX</i>}
      </div>
      <h1>{post?.title}</h1>
      {post?.summary && <p className='dek'>{post.summary}</p>}
      <div className='meta'>
        {author && (
          <div>
            作者<b>{author}</b>
          </div>
        )}
        <div>
          日期<b>{ymd(post)}</b>
        </div>
        {words > 0 && (
          <div>
            长度
            <b>
              {words.toLocaleString()} 字 · {mins} MIN
            </b>
          </div>
        )}
        {loc?.index > 0 && (
          <div>
            线路位置
            <b>
              {String(loc.index).padStart(2, '0')} / {String(loc.total).padStart(2, '0')} · {pos.toFixed(1)} m
            </b>
          </div>
        )}
      </div>
    </section>
  )
}

/** 文章尾：TOP + 上下岩点 */
export function ArticleEnd({ prev, next, mins }) {
  return (
    <section className='tv-end'>
      <div className='send'>
        <b>TOP</b>
        <span>完攀{mins ? ` · 你在这个岩点上停了 ${mins} 分钟` : ''}</span>
      </div>
      {(prev || next) && (
        <nav className='nb'>
          {prev ? (
            <SmartLink href={prev.href} className='p'>
              <div className='k'>← 上一个岩点</div>
              <h4>{prev.title}</h4>
            </SmartLink>
          ) : (
            <span />
          )}
          {next ? (
            <SmartLink href={next.href} className='n'>
              <div className='k'>下一个岩点 →</div>
              <h4>{next.title}</h4>
            </SmartLink>
          ) : (
            <span />
          )}
        </nav>
      )}
    </section>
  )
}

/** 简单竖排列表（搜索 / 标签 / 归档 / 404 推荐用） */
export function PlainList({ posts, NOTION_CONFIG, title, empty = '这面墙上没有这样的岩点。' }) {
  return (
    <section className='tv-list'>
      {title && <div className='tv-k'>{title}</div>}
      {(!posts || posts.length === 0) && <p className='empty'>{empty}</p>}
      {posts?.map(p => (
        <SmartLink href={p.href} key={p.id} className={`row${isCrux(p, NOTION_CONFIG) ? ' crux' : ''}`}>
          <span className='dot' />
          <span className='t'>{p.title}</span>
          <span className='m'>
            {ymd(p)}
            {p.category ? ` · ${p.category}` : ''}
          </span>
        </SmartLink>
      ))}
    </section>
  )
}
