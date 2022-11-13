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
  }
}
const state = {
  userInfo: '' || localStorage.getItem('userInfo')
}
// getters 只会依赖 state 中的成员去更新
const getters = {
    userInfo: (state) => state.userInfo
}
 
const store = new Vuex.Store({
  actions,
  mutations,
  state,
  getters
})
export default store