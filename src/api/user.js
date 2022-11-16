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

