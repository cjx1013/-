import mockRequest from '@/utils/mockRequest'

const state = {
  list: {}
}

const mutations = {
  GETDATA(state, data) {
    state.list = data
  }
}

const actions = {
  async getData(context, params) {
    let result = await mockRequest.get('/home/list')
    // console.log(result)
    if (result.code === 200) {
      context.commit('GETDATA', result.data)
    }
  }
}

const getters = {

}

export default {
  namespaced: true,
  state,
  mutations,
  actions
}
