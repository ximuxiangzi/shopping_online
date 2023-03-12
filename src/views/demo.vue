<template>
  <div class="hello" v-loading="loading">
    <!-- <Concent></Concent>
    <Animation></Animation>
    <Animation2></Animation2>
    <Animation3></Animation3>
    <Agent></Agent> -->
    <!-- <Search></Search> -->
    <!-- <Category></Category> -->

    <!-- 这里可以写个固定的地址测试一下视频组件能否播放  注意：不能是本地视频。比如是服务器上的视频才可以播放。 -->
    <!-- <VideoPlayer :url="url"></VideoPlayer>  -->
    <!-- <StopUpload></StopUpload> -->
    <!-- <Count></Count>
    <hr />
    <Person></Person> -->
    <button @click="add">按钮</button>

    <!-- <Loading1></Loading1> -->
    
  </div>
</template>
<script>
import Animation from "@/components/animation/test.vue";
import Animation2 from "@/components/animation/test2.vue";
import Animation3 from "@/components/animation/test3.vue";
import Agent from "@/components/agent/agent.vue";
import Search from "@/components/search/index.vue";
import Category from "@/components/category/index.vue";
import VideoPlayer from "@/components/videoDemo/video1.vue";
import StopUpload from "@/components/videoDemo/StopUpload.vue";
import Concent from "@/components/concent/concent.vue";
import Count from "@/components/count/vuexIndex.vue";
import Person from "@/components/count/person.vue";

export default {
  name: "demo",
  data() {
    return {
      url: "https://media.vued.vanthink.cn/sparkle_your_name_am360p.mp4",
      loading:false,
    };
  },
  created(){
    //  console.log(this)
   },

  components: {
    Concent,
    Animation,
    Animation2,
    Animation3,
    Agent,
    Search,
    Category,
    VideoPlayer,
    StopUpload,
    Count,
    Person,
  },
  methods:{
    add(){
      this.loading = true;
      setTimeout(()=>this.loading = false, 1000 )
    }
  }
  // // 通过路由规则 进入该组件被调用
  // beforeRouteEnter(to, from, next) {
  //   //进入之前
  //   console.log("进入该组件被调用", to, from);
  //   next();
  // },
  // // 通过路由规则 离开该组件被调用
  // beforeRouteLeave(to, from, next) {
  //   // ...离开时
  //   console.log("离开该组件被调用", to, from);
  //   next();
  // },
 
};
</script>




