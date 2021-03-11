/**
 * 
 * 动态模拟菜单
 * 
 * label菜单的名字
 * path菜单的路径
 * icon菜单的图标（系统采用的阿里巴巴图表库）
 * compnent组件的地址
 * children子类菜单数组
 * group配置其他路由激活菜单高亮
 */

const top = [{
    label: "首页",
    icon: 'el-icon-menu',
    path: "/admin/wel/index",
    id: 0
  },
  {
    label: "设置",
    icon: 'el-icon-setting',
    path: '/admin/heart-feelings',
    id: 1
  },
  {
    label: "官网",
    icon: 'el-icon-document',
    path: "https://www.zhua91.com",
    id: 3
  }]

  const first = [{
    id: 111,
    label: "权限管理",
    path: '/admin/power',
    icon: 'icon-quanxianguanli',
    children: [{
      id: 1111,
      label: "用户管理",
      path: 'user',
      component: 'views/admin/user/index',
      icon: 'icon-yonghuguanli',
      children: [],
    },{
      id: 1112,
      label: "菜单管理",
      path: 'menu',
      component: 'views/admin/menu/index',
      icon: 'icon-iconfontcaidan',
      children: [],
    },{
      id: 1113,
      label: "角色管理",
      path: 'role',
      component: 'views/admin/role/index',
      icon: 'icon-jueseguanli',
      children: [],
    },{
      id: 1114,
      label: "读者管理",
      path: 'social',
      component: 'views/admin/social/index',
      icon: 'icon-shejiao',
      children: [],
    }],
  },{
    id: 112,
    label: "系统设置",
    path: '/admin/system',
    icon: 'icon-shezhi',
    children: [{
      id: 1121,
      label: "字典管理",
      path: 'dict',
      component: 'views/admin/dict/index',
      icon: 'icon-zidianpeizhi',
      children: [],
    },{
      id: 1122,
      label: "日志管理",
      path: 'log',
      component: 'views/admin/log/index',
      icon: 'icon-line-log',
      children: [],
    }]
  }]
  
const second = [{
      id: 223,
      label: "精彩语录",
      icon: 'icon-riji2',
      path: '/admin/heart-feelings',
      component: 'views/admin/heart-feelings/index',
      meta: {
      },
      children: []
    },{
      id: 224,
      label: "文章管理",
      icon: 'icon-meiwen',
      path: '/admin/article',
      component: 'views/admin/article/index',
      meta: {
      },
      children: []
    },{
      id: 225,
      label: "网友评论",
      icon: 'icon-liuyan1',
      path: '/admin/comments',
      component: 'views/admin/comments/index',
      meta: {
      },
      children: []
    },{
      id: 225,
      label: "友情链接",
      icon: 'icon-lianjie',
      path: '/admin/friends-link',
      component: 'views/admin/friends-link/index',
      meta: {
      },
      children: []
    },{
      id: 226,
      label: "版本维护",
      icon: 'icon-renewal',
      path: '/admin/version',
      component: 'views/admin/version/index',
      meta: {
      },
      children: []
    }]

export const getTopMenu = () => {
    return {
        data: top
    }
}

export const getMenu = (res = 0) => {
    let menu = [first, second]
    return {
      data: menu[res] || []
    }
}