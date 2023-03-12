import request from '@/utils/request';
let sys = '/sys';


// // 检查文件是否已经上传/sys/minio/checkFileMd5
export  function checkFileMd5(data) {
  return request({
    url:sys + '/minio/checkFileMd5',
    method: 'get',
    params: data
  })
}

// 检查文件是否已经上传/sys/minio/checkChunk
export  function checkChunk(data) {
  return request({
    url:sys + '/minio/checkChunk',
    method: 'get',
    params: data
  })
}

// 分块文件上传/sys/minio/chunkFileUpload 数据请求类型multipart/form-data
export function chunkFileUpload(chunkIndex,fileMd5,fromData) {
    return request({
      url:sys +'/minio/chunkFileUpload'+'?chunkIndex='+chunkIndex+'&fileMd5='+fileMd5,
      method: 'post',
      data: fromData,
      headers: { 
        "Content-Type": "multipart/form-data"
       },
    })
  }

// 分块文件合并/sys/minio/mergeChunk
export function mergeChunk(data) {
    return request({
      url:sys + '/minio/mergeChunk',
      method: 'get',
      params: data
    })
  }
  



