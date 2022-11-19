import request from '@/utils/request';
let sys = '/sys';

// 用户信息/sys/user
export function userList(data) {
  return request({
    url:sys + '/user',
    method: 'get',
    params: data
  })
}

// 添加
export function userAdd(data) {
  return request({
    url:sys + '/user',
    method: 'post',
    data: data
  })
}
// 修改
export function userEdit(data) {
  return request({
    url:sys + '/user',
    method: 'put',
    data: data
  })
}
// 踢人下线
export function userDel(ids) {
  return request({
      url: sys + '/user/offline/' + ids,
      method: 'delete'
  })
}
// 删除
export function delUser(ids) {
  return request({
      url: sys + '/user/' + ids,
      method: 'delete'
  })
}
// 详情
export function userView(ids) {
  return request({
      url: sys + '/user/' + ids,
      method: 'get'
  })
}

