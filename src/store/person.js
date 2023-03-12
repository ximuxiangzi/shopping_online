//人员组件
import { Message} from 'element-ui'
import axios from 'axios'
import { nanoid } from 'nanoid'
export default {
    namespaced:true,//用于组件化vuex 直接读取本对象中的各项数据 开启命名空间
    actions: {
      addPersonwang(context, value) {
        if (value.name.indexOf('王') === 0) {
           context.commit('APP_PERSON', value)
        }else{
          Message({
            message:'只能输入姓王的人哦',
            type: 'error'
          })
    
        }
      },
      //找个服务器发起请求
      addPersonServer(context){
       axios.get('https://api.uixsj.cn/hitokoto/get?type=social').then((res)=>{
        context.commit('APP_PERSON',{id:nanoid(),name:res.data})
       },(err=>{
        Message({
            message:err.message,
            type: 'error'
          })
       }))
      }
    },
    mutations: {
      APP_PERSON(state, value) {
        state.personList.unshift(value)
      },
    },
    state: {
      personList: [{
        id: 1,
        name: '张三'
      }]
    },
    getters: {
      firstPersonName(state){
        return state.personList[0].name
      }
    },
  }