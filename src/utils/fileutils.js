// let SparkMD5 = require('spark-md5')
import SparkMD5 from 'spark-md5'
//解析数据
export  function fileParse(file, type = "base64"){
    return new Promise(resolve => {
        let fileRead = new FileReader();
        if (type === "base64") {
            fileRead.readAsDataURL(file);
        } else if (type === "buffer") {
            fileRead.readAsArrayBuffer(file);
        }
        fileRead.onload = (ev) => {
            resolve(ev.target.result);
        };
    });
}

//计算切片方法 异步改成同步方法
export async function  computeSlice(file,chunkSize){
    if (!file) return;
    var fileInfo={
        fileMd5:'',
        files:[],
        info:{}
    };
    fileInfo.info.filename=file.name;
    file = file.raw;
     // 解析成buffer数据
    // 切片处理，把文件切成多个部分（固定数量/固定大小)
    // 每一个切片都有自己的部分数据和自己的名字
    let buffer ;
    await fileParse(file, "buffer").then((res)=>{
        buffer =res;
    });
    let  spark = new SparkMD5.ArrayBuffer();
        spark.append(buffer);//元素后面追加一个字符串
        fileInfo.fileMd5= spark.end();
        fileInfo.info.suffix = '.'+/\.([0-9a-zA-Z]+)$/i.exec(file.name)[1];

    let cur = 0;
    let  nSize =Math.ceil(file.size / chunkSize) 
        for(let i = 0; i < nSize; i++) {
            fileInfo.files.push(file.slice(cur, cur + chunkSize));
            cur += chunkSize;
        }
    return fileInfo;//输出一个切片后对象 fileInfo.files为切片后数组
}
//上传前校验
export  function beforeUpload(file) {
    // 格式校验
    let { type, size } = file;
     console.log(type)
    // if (!/(png|gif|jpeg|jpg)/i.test(type)) {
    //   this.$message("文件合适不正确~~");
    //   return false;
    // }
      if (type != "video/mp4") {
      this.$message("文件合适不正确~~");
      return false;
    }

    if (size > 200 * 1024 * 1024) {
      this.$message("文件过大,请上传小于200MB的文件~~");
      return false;
    }
    return true;
  }