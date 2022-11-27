import request from '@/utils/request';
let sys = '/sys';

// 用户信息/sys/log
export function logList(data) {
  return request({
    url:sys + '/log',
    method: 'get',
    params: data
  })
}
// 删除  operatingId
export function logUser(ids) {
  return request({
      url: sys + '/log/' + ids,
      method: 'delete'
  })
}
// 详情  operatingId
export function logView(ids) {
  return request({
      url: sys + '/log/' + ids,
      method: 'get'
  })
}

