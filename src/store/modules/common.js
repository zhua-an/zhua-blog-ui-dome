import { setStore, getStore, removeStore } from '@/util/store'
import website from '@/config/website'
const common = {

    state: {
        isCollapse: false,
        isFullScren: false,
        isShade: false,
        screen: -1,
        showDebug: getStore({ name: 'showDebug' }),
        showCollapse: getStore({ name: 'showCollapse' }),
        showSearch: getStore({ name: 'showSearch' }),
        showTheme: getStore({ name: 'showTheme' }),
        showColor: getStore({ name: 'showColor' }),
        showMenu: getStore({ name: 'showMenu' }),
        theme: getStore({ name: 'theme' }) || '#409EFF',
        themeName: getStore({ name: 'themeName' }) || '',
        website: website,
    },
    actions: {
        //获取字典公用类
        GetDic(params, dic) {
            return new Promise((resolve) => {
                if (dic instanceof Array) {
                    Promise.all(dic.map(ele => getDic(ele))).then(data => {
                        let result = {};
                        dic.forEach((ele, index) => {
                            result[ele] = data[index].data;
                        })
                        resolve(result)
                    })
                }
            })
        }
    },
    mutations: {
        SET_SHADE: (state, active) => {
            state.isShade = active;
        },
        SET_COLLAPSE: (state) => {
            state.isCollapse = !state.isCollapse;
        },
        SET_FULLSCREN: (state) => {
            state.isFullScren = !state.isFullScren;
        },
        SET_SHOWCOLLAPSE: (state, active) => {
            state.showCollapse = active;
            setStore({
                name: 'showCollapse',
                content: state.showCollapse
            })
        },
        SET_SHOWSEARCH: (state, active) => {
            state.showSearch = active;
            setStore({
                name: 'showSearch',
                content: state.showSearch
            })
        },
        SET_SHOWFULLSCREN: (state, active) => {
            state.showFullScren = active;
            setStore({
                name: 'showFullScren',
                content: state.showFullScren
            })
        },
        SET_SHOWDEBUG: (state, active) => {
            state.showDebug = active;
            setStore({
                name: 'showDebug',
                content: state.showDebug
            })
        },
        SET_SHOWTHEME: (state, active) => {
            state.showTheme = active;
            setStore({
                name: 'showTheme',
                content: state.showTheme
            })
        },
        SET_SHOWCOLOR: (state, active) => {
            state.showColor = active;
            setStore({
                name: 'showColor',
                content: state.showColor
            })
        },
        SET_SCREEN: (state, screen) => {
            state.screen = screen;
        },
        SET_THEME: (state, color) => {
            state.theme = color;
            setStore({
                name: 'theme',
                content: state.theme,
            })
        },
        SET_THEME_NAME: (state, themeName) => {
            state.themeName = themeName;
            setStore({
                name: 'themeName',
                content: state.themeName,
            })
        }
    }
}
export default common