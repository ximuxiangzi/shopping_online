import request from '@/utils/request';
let sys = '/sys';


export function roletreeList(data) {
  return request({
    url:sys + '/role/treeList',
    method: 'get',
    params: data
  })
}
// 权限信息/sys/role
export function roleList(data) {
  return request({
    url:sys + '/role',
    method: 'get',
    params: data
  })
}
// 添加
export function roleAdd(data) {
  return request({
    url:sys + '/role',
    method: 'post',
    data: data
  })
}
// 修改
export function roleEdit(data) {
  return request({
    url:sys + '/role',
    method: 'put',
    data: data
  })
}
// 删除
export function roleDel(ids) {
  return request({
      url: sys + '/role/' + ids,
      method: 'delete'
  })
}
// 详情
export function roleView(ids) {
  return request({
      url: sys + '/role/' + ids,
      method: 'get'
  })
}

