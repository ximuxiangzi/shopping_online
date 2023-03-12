import request from '@/utils/request';
let oauth = '/oauth';

// 登录方法
export function Login(data) {
  return request({
    url:oauth + '/login',
    method: 'post',
    data: data
  })
}

// 退出方法
export function loginOut() {
  return request({
    url: oauth+ '/loginOut',
    method: 'get'
  })
}
// /oauth/switchRole/{roleId}
// 切换账号方法
export function switchRole(roleId) {
  return request({
    url: oauth+ '/switchRole/'+roleId,
    method: 'get'
  })
}

