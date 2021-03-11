export default [{
      path: '/demo',
      name: 'demo',
      component: () =>
          import('@/views/demo'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    }, {
      path: '/authredirect',
      name: 'authredirect',
      component: () =>
          import('@/views/authredirect/index'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    }, {
      path: '/revoke',
      name: 'revoke',
      component: () =>
          import('@/views/authredirect/revoke'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    }, {
    path: '/',
    name: '主页',
    redirect: '/home',
    component: () =>
        import('@/views/blog/index'),
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    },
    children: [{
      path: "home",
      name: 'home',
      component: () =>
        import('@/views/blog/home'),
      meta: {
        keepAlive: true,
        isTab: false,
        isAuth: false
      }
    },{
      path: '/hirofumi',
      name: 'hirofumi',
      component: () =>
          import('@/views/blog/hirofumi'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/bellesLettres',
      name: 'bellesLettres',
      component: () =>
          import('@/views/blog/bellesLettres'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/detail/:id',
      name: 'detail',
      component: () =>
          import('@/views/blog/detail'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/resDetail/:id',
      name: 'resDetail',
      component: () =>
          import('@/views/blog/resDetail'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/heartFeelings',
      name: 'heartFeelings',
      component: () =>
          import('@/views/blog/heartFeelings'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/resource',
      name: 'resource',
      component: () =>
          import('@/views/blog/resource'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/message',
      name: 'message',
      component: () =>
          import('@/views/blog/message'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/friendsLink',
      name: 'friendsLink',
      component: () =>
          import('@/views/blog/friendsLink'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/update',
      name: 'update',
      component: () =>
          import('@/views/blog/update'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/about',
      name: 'about',
      component: () =>
          import('@/views/blog/about'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    },{
      path: '/author',
      name: 'author',
      component: () =>
          import('@/views/blog/author'),
      meta: {
          keepAlive: true,
          isTab: false,
          isAuth: false
      }
    }]
  }]