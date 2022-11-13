import request from '@/utils/request';
let sys = '/sys';

// 权限信息
export function permissionList(data) {
  return request({
    url:sys + '/permission',
    method: 'get',
    params: data
  })
}

