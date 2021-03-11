import request from '@/router/axios';

//获取字典项
export function getDic (type) {
    return request({
        url: '/blog/dict/type/' + type,
        method: 'get'
    })
}
//获取第三方登录链接
export const fetchAuthUrl = (oauthType) => request({
    url: 'oauth/loginUrl/' + oauthType,
    method: 'get'
})
//获取菜单
export const fetchBlogLinks = () => request({
    url: '/blog/fetchBlogLinks',
    method: 'get'
})
//获取博主信息
export const fetchBlogger = () => request({
    url: '/blog/fetchBlogger',
    method: 'get'
})
//获取热门文章
export const fetchHotArticle = (query) => request({
    url: '/blog/article/fetchHotArticle',
    method: 'get',
    params: query
})
//获取文章信息
export function fetchArticleInfo (id) {
    return request({
        url: '/blog/article/' + id,
        method: 'get'
    })
}
//获取说说 
export const fetchDailyStory = (query) => request({
    url: '/blog/dailySay/page',
    method: 'get',
    params: query
})
//获取网站统计
export const fetchBlogStatistics = () => request({
    url: '/blog/statistics/fetchBlogStatistics',
    method: 'get'
})
//获取网站统计
export const fetchArticleStatistics = () => request({
    url: '/blog/statistics/fetchArticleStatistics',
    method: 'get'
})
//获取留言
export const fetchMessage = (query) => request({
    url: '/blog/comment/page',
    method: 'get',
    params: query
})
//获取最近登录用户
export const fetchVisitor = (query) => request({
    url: '/social/socialUser/getVisitor',
    method: 'get',
    params: query
})
//新增网站访问次数
export const addVisit = () => request({
    url: '/blog/website/addVisit',
    method: 'post'
})
//获取文章列表
export const fetchArticleData = (query) => request({
    url: '/blog/article/fetchData',
    method: 'get',
    params: query
})
//获取前后相邻文章列表
export const fetchAdjoinArticle = (id, type) => request({
    url: '/blog/article/fetchAdjoinArticle/' + id + '/' + type,
    method: 'get'
})
//获取说说
export const fetchSayPage = (query) => request({
    url: '/blog/dailySay/fetchSayPage',
    method: 'get',
    params: query
})
//获取友情链接
export const fetchFriendsLink = () => request({
    url: '/blog/friendsLink/fetchData',
    method: 'get'
})
///获取版本更新
export const fetchVersions = (query) => request({
    url: '/blog/version/page',
    method: 'get',
    params: query
})
//获取评论
export const fetchComments = (query) => request({
    url: '/blog/comment/fetchComments',
    method: 'get',
    params: query
})
//评论
export const blogComment = (data) => request({
    url: '/blog/comment',
    method: 'put',
    params: data
})
//获取读者信息
export const fetchReaderInfo = (oauthType ,query) => request({
    url: '/oauth/' + oauthType + '/callback',
    method: 'get',
    params: query
})
//获取点赞
export const fetchLikes = () => request({
    url: '/blog/like',
    method: 'get'
})
//点赞
export const blogLike = (data) => request({
    url: '/blog/like',
    method: 'post',
    params: data
})
//登出
export const readerLogout = () => request({
    url: '/oauth/social',
    method: 'delete',
})
//获取资源
export const fetchPage = (query) => request({
    url: '/blog/resource/page',
    method: 'get',
    params: query
})
//预览下载资源
export const handlerResClick = (data) => request({
    url: '/blog/resource/handlerResClick',
    method: 'post',
    params: data
})
//获取资源信息
export const getResourceInfo = (id) => request({
    url: '/blog/resource/' + id,
    method: 'get'
})
