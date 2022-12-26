import { login, logout, getInfo } from '@/api/user'
import { getToken, setToken, removeToken } from '@/utils/auth'
import { resetRouter, asyncRoutes, constantRoutes, anyRoutes } from '@/router'

import router from '@/router' 

const getDefaultState = () => {
  return {
    token: getToken(),
    name: '',
    avatar: '',
    // 不同权限展示不同菜单，在路由中划分常量路由，异步路由和任意路由
    routes: [],
    // 角色
    roles: [],
    buttons: [],
    // 通过计算得出的哪些角色显示哪些异步路由
    asyncRoutesResult: [],
    // 通过计算，得出最终展示路由=常量路由+异步路由（根据角色计算的，全部异步路由中的一部分）+任意路由
    allRoutes: []
  }
}

const state = getDefaultState()

const mutations = {
  RESET_STATE: (state) => {
    Object.assign(state, getDefaultState())
  },
  SET_TOKEN: (state, token) => {
    state.token = token
  },
  SET_NAME: (state, name) => {
    state.name = name
  },
  SET_AVATAR: (state, avatar) => {
    state.avatar = avatar
  },
  // 存储用户信息
  SET_USERINFO: (state, userInfo) => {
    // 用户名
    state.name = userInfo.name
    // 用户头像
    state.avatar = userInfo.avatar
    // 菜单权限标记
    state.routes = userInfo.routes
    // 按钮权限标记
    state.buttons = userInfo.buttons
    // 角色
    state.roles = userInfo.roles
  },
  // 计算得出的异步路由
  SET_ASYNCROUTES: (state, asyncR) => {
    state.asyncRoutesResult = asyncR
    // 最终展示路由=常量路由+异步路由（根据角色计算的，全部异步路由中的一部分）+任意路由
    state.allRoutes = constantRoutes.concat(state.asyncRoutesResult, anyRoutes)
    // 给路由器添加该路由
    router.addRoutes(state.allRoutes)
  }
}

// 通过服务器发送回来的用户信息，计算出用户能使用的异步路由
function computeAsyncRoutes(routes, asyncRoutes) {
  return asyncRoutes.filter(item => {
    if (routes.indexOf(item.name) !== -1){
      // 继续递归判断，因为有可能还有二级、三级、四级路由
      if (item.children && item.children.length){
        computeAsyncRoutes(routes, item.children)
      }
      return true
    }
  })
}

const actions = {
  // user login
  async login({ commit }, userInfo) {
    const { username, password } = userInfo
    const result = await login({ username: username.trim(), password: password })
    if (result.code === 20000) {
      commit('SET_TOKEN', result.data.token)
      setToken(result.data.token)
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   login({ username: username.trim(), password: password }).then(response => {
    //     const { data } = response
    //     commit('SET_TOKEN', data.token)
    //     setToken(data.token)
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // get user info
  async getInfo({ commit, state }) {
    const result = await getInfo(state.token)
    if (result.code === 20000) {
      const { data } = result
      commit('SET_USERINFO', data)
      commit('SET_ASYNCROUTES', computeAsyncRoutes(data.routes, asyncRoutes))
      if (!data) {
        return Promise.reject('Verification failed, please Login again.')
      }

      const { name, avatar } = data

      commit('SET_NAME', name)
      commit('SET_AVATAR', avatar)
      return data
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   getInfo(state.token).then(response => {
    //     const { data } = response

    //     if (!data) {
    //       return reject('Verification failed, please Login again.')
    //     }

    //     const { name, avatar } = data

    //     commit('SET_NAME', name)
    //     commit('SET_AVATAR', avatar)
    //     resolve(data)
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // user logout
  async logout({ commit, state }) {
    const result = await logout(state.token)
    if (result.code === 20000) {
      removeToken() // must remove  token  first
      resetRouter()
      commit('RESET_STATE')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise((resolve, reject) => {
    //   logout(state.token).then(() => {
    //     removeToken() // must remove  token  first
    //     resetRouter()
    //     commit('RESET_STATE')
    //     resolve()
    //   }).catch(error => {
    //     reject(error)
    //   })
    // })
  },

  // remove token
  async resetToken({ commit }) {
    const result = await removeToken()
    if (result.code === 20000) {
      commit('RESET_STATE')
      return 'ok'
    } else {
      return Promise.reject(new Error('fail'))
    }
    // return new Promise(resolve => {
    //   removeToken() // must remove  token  first
    //   commit('RESET_STATE')
    //   resolve()
    // })
  }
}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}

