<template>
  <div id="app">
   <input type="file" name="选择文件" id="uploadFile">
			<input type="button" value="上传" id="start" @click="upload(0)">
			<input type="button" value="继续" id="continue" @click="continueUpload()">
			<input type="text" id="show">

  </div>
</template>

<script>
 // //确定分片大小
		var size = (1024 * 1024) * 10;  
export default {
  name: "App",
  data() {
    return {
    };
  },
  methods:{
    	upload(index) { 
        console.log(index)
			localStorage.setItem("index", 0)
			var file = document.getElementById("uploadFile").files[0]; //获取文件
			let arr = file.name.split('.'); //获取文件的名字和拓展名
			let fname = arr[0]
			let ext = arr[1]
			var star = index * size; //切片的起点
			if (star > file.size) {
				document.getElementById("show").value = '100%';
				return
			}
			//slice（起点，终点），Blob中的函数
			var bool = file.slice(star, (star + size) > file.size ? file.size : (star + size)); 
			var boolname = fname + "." + ext
			var boolfile = new File([bool], boolname) 
			var form = new FormData()
			form.append("index", index)
			form.append("size", size)
			form.append("name", file.name)
			form.append("file", boolfile)
			form.append("request_id", localStorage.getItem("request_id") || '')
			form.append("file", boolfile);
			// 为了演示方便，此处使用的是原生请求，可以根据需求自行修改
			var xmt = new XMLHttpRequest();
			// 此处是后端接口
			xmt.open("post", "http://172.16.13.89:8080/demo/upload", true) //发送请求
			xmt.send(form)
			xmt.onreadystatechange = function() {
				if (this.readyState == 4 && this.status == 200) {
					let result = JSON.parse(this.responseText)
					if (result.success) {
						// 记录后端回传的 文件标识ID，并回传给后端，便于后端进行文件追加
						localStorage.setItem("request_id", result.request_id)
						index += 1
						this.upload(index);
						// 存储在本地，记录此次传递的是第几片
						localStorage.setItem("index", index)
						// 计算上传百分比
						document.getElementById("show").value = ((star / file.size) * 100).toFixed(4) + '%'; //显示上传的进度
					} else {
						localStorage.setItem("index", index)
					}
				}else{
					console.log(this.readyState)
				}
			};
		},
      	// 点击继续上传时，触发这个函数，从上次终端的片数继续进行传递
     continueUpload() {
			this.upload(localStorage.getItem("index") || 0)
		}
  
  }
  
};
</script>
