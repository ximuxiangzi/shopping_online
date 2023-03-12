//原始组件
export default{
    namespaced:true,//用于组件化vuex 直接读取本对象中的各项数据 开启命名空间
    //准备actions 用于响应组件中的动作
    actions: {
      jiaOdd(context, value) {
        if (context.state.sum % 2) {
          context.commit('JIA', value)
        }
      },
      jiaWait(context, value) {
        setTimeout(() => {
          context.commit('JIA', value)
        }, 500)
      },
    },
    //准备mutations 用于操作数据（state）
    mutations: {
      my_userInfo: (state, user_name) => {
        let userInfo = JSON.stringify(user_name)
        state.userInfo = userInfo
        // 把登录的用户的名保存到localStorage中，防止页面刷新，导致vuex重新启动，用户名就成为初始值（初始值为空）的情况
        localStorage.setItem('userInfo', userInfo)
      },
      setPermission(state, permission) {
        console.log(permission)
        let permissionBot = JSON.stringify(permission)
        state.permissions = permissionBot
        localStorage.setItem('permissionBot', permissionBot)
      },
      menuData(state, data) {
        console.log(data)
        let menuList = JSON.stringify(data)
        state.menuData = menuList
        localStorage.setItem('menuData', menuList)
      },
      JIA(state, value) {
        console.log('准备mutations', state, value)
        state.sum += value
      },
      JIAN(state, value) {
        console.log('准备mutations', state, value)
        state.sum -= value
      },
    },
    //准备state 用于存储数据
    state: {
      userInfo: '' || localStorage.getItem('userInfo'),
      permissions: '' || localStorage.getItem('permissionBot'),
      menuData: '' || localStorage.getItem('menuData'),
      sum: 0, //和
    },
    // getters 只会依赖 state 中的成员去更新   用于将state中的数据进行加工
    getters: {
      userInfo: (state) => state.userInfo,
      permissions: state => state.permissions,
      menuData: state => state.menuData,
      bigSum(state) {
        return state.sum * 10
      }
    },
  }