import Vue from 'vue'
import Vuex from 'vuex'
import common from './modules/common'
import blog from './modules/blog'
import getters from './getters'

Vue.use(Vuex)
const store = new Vuex.Store({
    modules: {
        common,
        blog
    },
    getters,
})

export default store