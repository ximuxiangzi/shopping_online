import Vue from 'vue'
import Vuex from 'vuex'
 
Vue.use(Vuex)
const actions = {}
const mutations = {
    my_userInfo: (state, user_name) => {
        let userInfo =  JSON.stringify(user_name)
        state.userInfo = userInfo
        // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
        localStorage.setItem('userInfo', userInfo)
    },
    setPermission(state, permission) {
      console.log(permission)
      let permissionBot =  JSON.stringify(permission)
      state.permissions = permissionBot
      localStorage.setItem('permissionBot', permissionBot)
    }
}
const state = {
  userInfo: '' || localStorage.getItem('userInfo'),
  permissions: [] || localStorage.getItem('permissionBot'),
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    userInfo: (state) => state.userInfo,
    permissions: state => state.permissions,
}
 
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store