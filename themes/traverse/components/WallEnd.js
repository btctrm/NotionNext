import SmartLink from '@/components/SmartLink'
import { cfg } from '../lib'

/**
 * 墙尾。首页：TOP + 路线卡（关于并在这里，长文点进 /about）。分类页：下一条线路。
 */
export default function WallEnd({ mode, nextRoute, NOTION_CONFIG, total, routes }) {
  if (mode === 'next') {
    return (
      <>
        <div className='tv-k'>TOP · 这条线路完攀</div>
        <h2>
          {nextRoute ? (
            <>
              下一条线路：<b>{nextRoute.name}</b>
            </>
          ) : (
            <>回到整面墙</>
          )}
        </h2>
        <div className='f'>
          <SmartLink href={nextRoute?.href || '/'} className='tape'>
            {nextRoute ? `切换到「${nextRoute.name}」 →` : '回首页 →'}
          </SmartLink>
        </div>
      </>
    )
  }
  const card = cfg('TRAVERSE_CARD', NOTION_CONFIG) || []
  const creed = cfg('TRAVERSE_CREED', NOTION_CONFIG)
  const aboutSlug = cfg('TRAVERSE_ABOUT_SLUG', NOTION_CONFIG)
  return (
    <>
      <div className='tv-k'>TOP · 完攀 · 这面墙的主人</div>
      <h2>{creed}</h2>
      <div className='tv-card'>
        <div className='in'>
          <div className='t'>
            <span>ROUTE CARD · 路线卡</span>
            <span>No.001</span>
          </div>
          {card.map(f => (
            <div className='f' key={f.k}>
              <div className='k'>{f.k}</div>
              <div className='v'>{f.big ? <b>{f.v}</b> : f.v}</div>
            </div>
          ))}
          <div className='f'>
            <div className='k'>这面墙 / THIS WALL</div>
            <div className='v'>
              {total} 个岩点 · {routes} 条线路
            </div>
          </div>
        </div>
      </div>
      <div className='f'>
        <SmartLink href={`/${aboutSlug}`} className='tape'>
          更多关于我 →
        </SmartLink>
        <span className='sep'> · </span>
        <span>{cfg('TRAVERSE_TAGLINE', NOTION_CONFIG)}</span>
      </div>
    </>
  )
}
