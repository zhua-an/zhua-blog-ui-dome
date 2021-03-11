import {setStore,getStore} from '@/util/store'
import webiste from '@/config/website'
// import {fetchBlogLinks, fetchBlogger} from '@/api/blog/blog'
import {fetchReaderInfo,fetchLikes,readerLogout} from '@/api/blog/blog'
const common = {
    state: {
        likes: getStore({ name: 'likes' }) || {},
        reader: getStore({ name: 'reader' }) || {},
        blogger: getStore({ name: 'blogger' }) || {},
        blogLinks: getStore({ name: 'blogLinks' }) || [],
        readerExpiresIn: getStore({
            name: 'readerExpiresIn'
            }) || '',
        readerAccessToken: getStore({
            name: 'readerAccessToken'
            }) || '',
        readerRefreshToken: getStore({
            name: 'readerRefreshToken'
            }) || ''
    },
    actions: {
        fetchReaderInfo ({ commit }, query) {
            return new Promise((resolve, reject) => {
                fetchReaderInfo(query.source, query).then((res) => {
                    const data = res.data.data;
                    commit('SET_READERIFNO', data.socialUser);
                    commit('SET_READER_ACCESS_TOKEN', data.accessToken)
                    commit('SET_READER_REFRESH_TOKEN', data.refreshToken)
                    commit('SET_READER_EXPIRES_IN', data.expireIn)
                    resolve(data);
                }).catch(err => {
                    reject(err);
                })
            })
        },
        fetchLikes({commit}) {
            fetchLikes().then((res) => {
                const data = res.data.data
                const list = {}
                for (let i = 0; i < data.length; i++) {
                    list[data[i].type+'-'+data[i].objectId] = true
                }
                commit('SET_LIKES', list || {})
            })
        },
        updateLikes({commit}, likes) {
            return new Promise((resolve, reject) => {
                commit('SET_LIKES', likes);
                resolve(likes);
            })
        },
        readerLogout({ commit }) {
            return new Promise((resolve, reject) => {
                readerLogout().then(() => {
                  commit('SET_READERIFNO', {})
                  commit('SET_READER_ACCESS_TOKEN', {})
                  commit('SET_READER_REFRESH_TOKEN', {})
                  commit('SET_READER_EXPIRES_IN', '')
                  commit('SET_LIKES', {})
                  resolve()
                }).catch(error => {
                  reject(error)
                })
            })
        },
        fetchBlogger({ commit }) {
            return new Promise((resolve, reject) => {
                const data = webiste.blogger
                commit('SET_BLOGGER', data);
                resolve(data);
            })
        },
        fetchBlogLinks({ commit }) {
            return new Promise((resolve, reject) => {
                const data = [{
                    id: 'home',
                    linkName: '首页',
                    icon: 'icon-shouye',
                    path: '/home',
                    children: []
                },{
                    id: 'hirofumi',
                    linkName: '博文',
                    icon: 'icon-book',
                    path: '/hirofumi'
                },{
                    id: 'bellesLettres',
                    linkName: '美文',
                    icon: 'icon-meiwen',
                    path: '/bellesLettres'
                },{
                    id: 'heartFeelings',
                    linkName: '心语',
                    icon: 'icon-riji2',
                    path: '/heartFeelings'
                },{
                    id: 'resource',
                    linkName: '资源',
                    icon: 'icon-fenxiang',
                    path: '/resource'
                },{
                    id: 'message',
                    linkName: '留言',
                    icon: 'icon-liuyan1',
                    path: '/message'
                },{
                    id: 'friendsLink',
                    linkName: '友链',
                    icon: 'icon-lianjie',
                    path: '/friendsLink'
                },{
                    id: 'about',
                    linkName: '关于',
                    icon: 'icon-guanyu',
                    path: '/about',
                    children: [{
                        id: 'about',
                        linkName: '关于本站',
                        path: '/about'
                    },{
                        id: 'author',
                        linkName: '关于博主',
                        path: '/author'
                    }]
                }];
                commit('SET_LINKS', data);
                resolve(data);
            })
        }
        // fetchBlogger({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         fetchBlogger().then(res => {
        //             const data = res.data.data;
        //             commit('SET_BLOGGER', data);
        //             resolve(data);
        //         }).catch(err => {
        //             reject(err);
        //         })
        //     })
        // },
        // fetchBlogLinks({ commit }) {
        //     return new Promise((resolve, reject) => {
        //         fetchBlogLinks().then(res => {
        //             const data = res.data.data;
        //             commit('SET_LINKS', data);
        //             resolve(data);
        //         }).catch(err => {
        //             reject(err);
        //         })
        //     })
        // }
    },
    mutations: {
        SET_LIKES: (state, data) => {
            state.likes = data
            setStore({
                name: 'likes',
                content: state.likes,
                type: 'session'
            })
        },
        SET_READER_ACCESS_TOKEN: (state, data) => {
            state.readerAccessToken = data
            setStore({
                name: 'readerAccessToken',
                content: state.readerAccessToken,
                type: 'session'
            })
        },
        SET_READER_EXPIRES_IN: (state, data) => {
            state.readerExpiresIn = data
            setStore({
                name: 'readerExpiresIn',
                content: state.readerExpiresIn,
                type: 'session'
            })
        },
        SET_READER_REFRESH_TOKEN: (state, data) => {
            state.readerRefreshToken = data
            setStore({
                name: 'readerRefreshToken',
                content: state.readerRefreshToken,
                type: 'session'
            })
        },
        SET_READERIFNO: (state, data) => {
            state.reader = data;
            setStore({ name: 'reader', content: state.reader, type: 'session' })
        },
        SET_BLOGGER: (state, data) => {
            state.blogger = data;
            setStore({ name: 'blogger', content: state.blogger, type: 'session' })
        },
        SET_LINKS: (state, data) => {
            state.blogLinks = data;
            setStore({ name: 'blogLinks', content: state.blogLinks, type: 'session' })
        }
    }
}
export default common