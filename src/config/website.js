/**
 * 全局配置文件
 */
const title = 'Zhua个人博客'
export default {
  title: title,
  logo: 'Zhua',
  key: '*',   //配置主键,目前用于存储
  link: 'https://www.zhua91.com',
  favicon: 'https://www.zhua91.com/favicon.ico',
  introduction: '斯人若彩虹，遇上方知有',
  whiteList: ['/login', '/404', '/401', '/lock'], // 配置无权限可以访问的页面
  whiteTagList: ['/login', '/404', '/401', '/lock' ], // 配置不添加tags页面 （'/advanced-router/mutative-detail/*'——*为通配符）
  homePage: '/home',
  aboutPage: '/about',
  authorPage: '/author',
  copyright: '鲁ICP备19058591号',
  tokenTime: 6000,
  blogger: {
    name: 'Zhua',
    address: '山东省青岛市',
    qq: '342961677',
    email: 'zhua_an@163.com',
    github: 'https://github.com/zhua-an'
  },
  //http的status默认放行不才用统一处理的,
  statusWhiteList: [400],
  //配置菜单的属性
  menu: {
      props: {
          label: 'label',
          path: 'path',
          icon: 'icon',
          children: 'children'
      }
  },
  sideBar: [{name:'关于本站',path:'/about'},{name:'关于博主',path:'/author'},{name:'友情链接',path:'/friendsLink'},{name:'网站留言',path:'/message'},{name:'资源分享',path:'/resource'}]
}
