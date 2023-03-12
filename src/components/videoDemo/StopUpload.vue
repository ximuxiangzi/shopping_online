<template>
  <div class="appUpload">
     <el-upload drag action
      :auto-upload="false" 
      :show-file-list="false" 
      :on-change="changeFile"
      :before-upload='beforeload'>
      <i class="el-icon-upload"></i>
      <div class="el-upload__text">
        将文件拖到此处，或
        <em>点击上传</em>
      </div>
    </el-upload>

    <!-- PROGRESS -->
    <div class="progress">
      <el-progress :percentage="totalText"></el-progress>
      <el-link type="primary" v-if="totalText>0 && totalText<100" @click="handleBtn">{{btn===true?'暂停上传':'继续上传'}}</el-link>
    </div>
    <!-- VIDEO -->
    <div class="uploadImg" v-if="video">
      <video :src="video" controls />
    </div>
  </div>
</template>

<script>
/*
 * 默认上传
 *   格式：multipart/form-data
 *   数据格式：form-data
 *      file 文件流信息
 *      filename 文件名字
 *   上传成功后获取服务器返回信息，通知on-success回调函数执行
 * 内部封装了ajax
 */
import { computeSlice,beforeUpload} from '@/utils/fileutils'
// let SparkMD5 = require('spark-md5')
import { checkChunk,chunkFileUpload,mergeChunk,checkFileMd5 } from "@/api/filevideo";
import { getToken } from '@/utils/auth'

export default {
  name: "App",
  data() {
    return {
      img: null,
      totalText:0,
      total:0,
      video:null,
      getToken:getToken(),
      processUrl:process.env.VUE_APP_BASE_HOST,
      nSize:0,
      requestList:[],
      btn:true,
      fileMd5:"",
      uploadFile:null,
    };
  },
  methods: {
    handleSuccess(result) {
      if (result.code == 0) {
        this.img = result.path;
      }
    },
    beforeload(file) {
      beforeUpload(file)
    },
    //点击上传
    async changeFile(file) {
      this.uploadFile = file;
        let  size = 1024 * 1024 * 1;//设置切片大小
        let fileInfo =await computeSlice(file,size);//处理切片内容 获取切片fileInfo对象
        this.nSize = fileInfo.files.length;
        this.fileMd5 = fileInfo.fileMd5
        if( await this.getcheckFileMd5(fileInfo.info.suffix)){
           return;
        }
            for(let i = 0; i < fileInfo.files.length; i++) {
                let status=await this.FileMd5(i,fileInfo.fileMd5)
            if(status && this.btn){
              await this.sendRequest(i,fileInfo.fileMd5,fileInfo.files[i])
            }
            }
        if(this.total  == this.nSize){
            this.getComplete(fileInfo.fileMd5);
        }
    },
    async getcheckFileMd5(suffix){
      let data={
        checkFileMd5:this.fileMd5,
        suffix:suffix
      }
      var  status;
      await checkFileMd5(data).then((res) => {
                    if (res.data) {
                       this.$message({
                          message: '该视频已上传',
                        });
                    }
                    status= res.data;
                });
                return status;
    },
    //判断是否上传接口
     async FileMd5(num,value){
      let status;
        await checkChunk({fileIndex:num,fileMd5:value}).then((res) => {
             if(res.data == false){
                status= true;
             }else{
              this.total++;
               status=  false;
             }
            });
            return status;
      },
     //上传接口
      async  sendRequest(num,value,item) {
        let chunkFile = new FormData();
                chunkFile.append("chunkFile", item);
                await  chunkFileUpload(num,value,chunkFile).then((res) => {
                    if (res.code == 200) {
                        this.total ++;
                        this.totalText = Math.floor(this.total / this.nSize *100)
                    }
                });
    },
    //合并上传接口
    getComplete(fileMd5){
          let  params= {
              chunkTotal:this.nSize,
              fileMd5: fileMd5,
            }
            mergeChunk(params).then((res) => {
                    if (res.code == 200) {
                        this.$message({
                          message: '上传成功',
                          type: 'success'
                        });
                        this.total = 0;
                        this.totalText = 100;
                    }
                });
    },


    handleBtn() {
        if (this.btn) {
            // 断点续传
            this.btn = false;
            return;
        }else{
          
        this.btn = true;
        this.total = 0;
        this.totalText= 0;
        this.changeFile(this.uploadFile);
        }
    }

  },
};
</script>
