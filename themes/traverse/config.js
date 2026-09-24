/**
 * 主题「横移 · TRAVERSE」配置
 * 整面墙就是博客：每篇文章是一个岩点，每个分类是一条线路。
 * 这里的值都可以被 Notion「配置中心」页或 .env 里的同名变量覆盖（NotionNext 标准机制）。
 */
const CONFIG = {
  // 线路顺序 = Notion 里 category 的名字，按你想要的墙面顺序排列。
  // 没写在这里的分类会自动排到最后；分类改名只需要同步改这里。
  TRAVERSE_ROUTE_ORDER: ['攀岩理论', '交大攀岩建设', '其他思考'],

  // 线路的英文副标题（墙上的大字底纹），可留空
  TRAVERSE_ROUTE_EN: {
    攀岩理论: 'THEORY',
    交大攀岩建设: 'THE TEAM',
    其他思考: 'WORLDVIEW'
  },

  // 打了这个标签的文章在墙上显示为 CRUX（橙圈）
  TRAVERSE_CRUX_TAG: '推荐',

  // 墙的「长度」——只是底部米数进度条的刻度，纯装饰
  TRAVERSE_WALL_METERS: 42,

  // 起点区的文案
  TRAVERSE_HERO_KICKER: '一面墙 · 向右滚动',
  TRAVERSE_HERO_LINE1: '整个博客是',
  TRAVERSE_HERO_LINE2_EN: 'one long',
  TRAVERSE_HERO_LINE2: '横移。',
  TRAVERSE_HERO_TEXT:
    '抱石墙上最难的从来不是往上，而是横向的那几步——重心一直在两只脚之间来回交，没有一步能偷懒。这里的每一篇文章是一个岩点，按线路的顺序排开。',
  TRAVERSE_TAGLINE: '让世界变得更美好',

  // 墙尾（关于）——路线卡上的几个字，改一次就行；长文读 Notion 里的 about 页
  TRAVERSE_ABOUT_SLUG: 'about',
  TRAVERSE_CREED: '我希望做一个有坚定看法、也敢承担争议的人。',
  TRAVERSE_CARD: [
    { k: '坐标 / BASED IN', v: '上海 · 31.2°N' },
    { k: '队伍 / TEAM', v: '交大野协攀岩队' },
    { k: '项目 / DISCIPLINE', v: '抱石 · 难度' },
    { k: '最高完攀 / PEAK', v: 'V9', big: true },
    { k: '开始写 / SINCE', v: '2021' }
  ],

  // 顶栏右侧的外链（可空）。默认把你 Notion 菜单里的「友情链接」放这里
  TRAVERSE_EXTRA_LINKS: [{ name: '交大攀岩', href: 'https://sjtuclimbing.com/' }],

  // 文章页
  TRAVERSE_ARTICLE_SHOW_TOPO: true, // 左侧小 topo + MOVE 目录
  TRAVERSE_WORDS_PER_MINUTE: 350 // 阅读时长估算（中文）
}
export default CONFIG
