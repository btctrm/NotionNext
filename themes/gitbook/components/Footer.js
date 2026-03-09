import { siteConfig } from '@/lib/config'

const Footer = () => {
  return (
    <footer className='z-20 border p-2 rounded-lg bg:white dark:border-black dark:bg-hexo-black-gray justify-center text-center w-full text-sm relative'>
      {/*
      访问量 / 访客数统计，当前隐藏。
      以后如果要恢复，删掉这段注释即可。

      <span className='busuanzi_container_site_pv'>
        <i className='fas fa-eye' />
        <span className='px-1 busuanzi_value_site_pv'> </span>{' '}
      </span>
      <span className='pl-2 busuanzi_container_site_uv'>
        <i className='fas fa-users' />{' '}
        <span className='px-1 busuanzi_value_site_uv'> </span>{' '}
      </span>
      */}

      <div className='text-xs font-serif'>
        Powered By{' '}
        <a
          href='https://github.com/tangly1024/NotionNext'
          className='underline text-gray-500 dark:text-gray-300'>
          NotionNext {siteConfig('VERSION')}
        </a>
      </div>

      <h1 className='pt-1 hidden'>{siteConfig('TITLE')}</h1>
    </footer>
  )
}

export default Footer
