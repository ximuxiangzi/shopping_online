import request from '@/utils/request';
let sys = '/sys';

// 权限信息/sys/permission
export function permissionList(data) {
  return request({
    url:sys + '/permission',
    method: 'get',
    params: data
  })
}
// 添加
export function permissionAdd(data) {
  return request({
    url:sys + '/permission',
    method: 'post',
    data: data
  })
}
// 修改
export function permissionEdit(data) {
  return request({
    url:sys + '/permission',
    method: 'put',
    data: data
  })
}
// 删除
export function permissionDel(ids) {
  return request({
      url: sys + '/permission/' + ids,
      method: 'delete'
  })
}
// 详情
export function permissionView(ids) {
  return request({
      url: sys + '/permission/' + ids,
      method: 'get'
  })
}

