import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

const types = {
    SET_IS_AUTHENTICATED: 'SET_IS_AUTHENTICATED', //是否通过认证
    SET_USER: 'SET_USER', // 存储用户信息
    SET_HOMEDATA: 'SET_HOMEDATA', //存储首页数据
    SET_ASIDEDATA: 'SET_ASIDEDATA' //存储侧边栏数据
}

const state = {
    isAuthenticated: false, //是否认证
    user: {}, //存储用户信息
    homeData: [], //存储首页数据
    asideData: [], //存储侧边栏数据 
}

const getters = {
    isAuthenticated: state => state.isAuthenticated,
    user: state => state.user,
    homeData: state => state.homeData,
    asideData: state => state.asideData
}

const mutations = {
    [types.SET_IS_AUTHENTICATED](state, isAuthenticated) {
        if (isAuthenticated) {
            state.isAuthenticated = isAuthenticated
        } else {
            state.isAuthenticated = false
        }
    },
    
    [types.SET_USER](state, user) {
        if (user) {
            state.user = user
        } else {
            state.user = {}
        }
    },
    
    [types.SET_HOMEDATA](state, homeData) {
        if (homeData) {
            state.homeData = homeData
        } else {
            state.homeData = []
        }
    },
    
    [types.SET_ASIDEDATA](state, asideData) {
        if (asideData) {
            state.asideData = asideData
        } else {
            state.asideData = []
        }
    }
}

const actions = {
    setIsAuthenticated: ({ commit }, isAuthenticated)　=> {
        commit(types.SET_IS_AUTHENTICATED, isAuthenticated)
    },
    setUser: ({ commit }, user) => {
        commit(types.SET_USER, user)
    },
    setHomeData: ({ commit }, homeData) => {
        commit(types.SET_HOMEDATA, homeData)
    },
    setAsideData: ({ commit }, asideData) => {
        commit(types.SET_ASIDEDATA, asideData)
    },
    clearCurrentState: ({ commit }) => {
        commit(types.SET_IS_AUTHENTICATED, false)
        commit(types.SET_USER, null)
    }
}
export default new Vuex.Store({
    state,
    getters,
    mutations,
    actions
})