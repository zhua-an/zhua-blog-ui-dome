import Layout from '@/page/index/layout'
export default [
  {
    path: '/404',
    // component: () =>
    //   import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
    component: resolve => require(['@/components/error-page/404'], resolve),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }

  },
  {
    path: '/403',
    // component: () =>
    //   import( /* webpackChunkName: "page" */ '@/components/error-page/403'),
    component: resolve => require(['@/components/error-page/403'], resolve),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/500',
    // component: () =>
    //   import( /* webpackChunkName: "page" */ '@/components/error-page/500'),
    component: resolve => require(['@/components/error-page/500'], resolve),
    name: '500',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '/myiframe',
    component: Layout,
    redirect: '/myiframe',
    children: [{
      path: ":routerPath",
      name: 'iframe',
      // component: () =>
      //   import( /* webpackChunkName: "page" */ '@/components/iframe/main'),
      component: resolve => require(['@/components/iframe/main'], resolve),
      props: true
    }]

  },
  {
    path: '/403',
    // component: () =>
    //   import( /* webpackChunkName: "page" */ '@/components/error-page/403'),
    component: resolve => require(['@/components/error-page/403'], resolve),
    name: '403',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  },
  {
    path: '*',
    // component: () =>
    //   import( /* webpackChunkName: "page" */ '@/components/error-page/404'),
    component: resolve => require(['@/components/error-page/404'], resolve),
    name: '404',
    meta: {
      keepAlive: true,
      isTab: false,
      isAuth: false
    }
  }]