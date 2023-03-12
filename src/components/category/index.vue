<template>
  <div class="category">
    <CategoryList title="美食">
      <img
        slot="center"
        src="../../assets/images/peoplelogo.jpg"
        alt=""
        class="a_img"
      />
      <a slot="footer" href="https://www.baidu.com/?tn=65081411_1_oem_dg"
        >百度</a
      >
      <template scope="row">
        <ul  v-for="item in row.data" :key="item">
           <li>{{ item }}</li>
         </ul>
      </template>
    </CategoryList>
    <CategoryList title="游戏">
      <ul slot="center" v-for="item in games" :key="item">
        <li>{{ item }}</li>
      </ul>
      <div slot="footer" class="category">
        <a href="https://www.baidu.com/?tn=65081411_1_oem_dg">百度</a>
        <a href="https://www.baidu.com/?tn=65081411_1_oem_dg">百度</a>
      </div>
       <template scope="row">
        <ol  v-for="(item,index) in row.data" :key="index">
           <li>{{ item }}</li>
        </ol>
      </template>
    </CategoryList>
    <CategoryList title="电影">
      <video
        slot="center"
        controls
        src="../../assets/video/lin.mp4"
        alt=""
        class="a_img"
      ></video>
      <template v-slot:footer>
        <div  class="category">
          <a href="https://www.baidu.com/?tn=65081411_1_oem_dg">百度</a>
          <a href="https://www.baidu.com/?tn=65081411_1_oem_dg">百度</a>
          <a href="https://www.baidu.com/?tn=65081411_1_oem_dg">百度</a>
        </div>
        <h4>欢迎观影</h4>
      </template>
      <!-- 解构赋值 -->
      <template scope="{data}">
        <h3  v-for="item in data" :key="item">
           {{ item }}
        </h3>
      </template>
    </CategoryList>
  </div>
</template>

<script>
import CategoryList from "./list.vue";
export default {
  name: "category",
  data() {
    return {
      foods: ["食物1", "食物2", "食物3", "食物4"],
      games: ["游戏1", "游戏2", "游戏3", "游戏4"],
      films: ["电影1", "电影2", "电影3", "电影4"],
    };
  },
  components: {
    CategoryList,
  },
};
</script>

<style scoped>
.category {
  display: flex;
  justify-content: space-around;
}
.a_img {
  width: 100%;
  height: 160px;
}
</style>
