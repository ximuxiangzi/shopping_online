<template>
  <div class="hello" >
    <div class="Flex">
      <div class="flex-1">
        <img
          src="../assets/images/peoplelogo.jpg"
          alt=""
          srcset=""
          class="login" />
      </div>
     <div class= " Flex flex-6 hellotextPng">
        <div
        class=" dynamicBox flex-1"
        v-for="(item, index) in dynamicList"
        :key="index"
      >
        <div class="flex-1 dynamicBoxLine">
          <a :href="item.url" class="navtext">
            <div>
              <div :class="addHighColor(item.another)"></div>
              {{ item.title }}
            </div></a>
          <div class="up-down">
            <div
              class="downOne"
              v-for="(item_, index_) in item.down"
              :key="index_"
              @click="gosecond(item_.url, item_.id)"
            >
              <div class="downOne-padding">{{ item_.name }}</div>
            </div>
          </div>
        </div>
      </div>
     </div>
     <div class="flex-1"></div>
    </div>
  </div>
</template>
<script>
module.exports = {
  name: "myhomepagetitle",
  data: function () {
    return {
      islink:false,
      dynamicList: [
        {
          title: "首页",
          another: "../index.html",
          url: "../index.html",
          down:[]
        },
        {
          title: "企业动态",
          another: "dynamic.html",
          url: "dynamic.html",
           down:[]
        },
        {
          title: "核心技术",
          another: "technology.html",
          url: "technology.html",
          down: [
            {
              name: "IOT物联网",
              url: "technology",
              id: "1",
            },
          ],
        },
        {
          title: "轨道交通",
          another: "sbzcsmzq.html",
          url: "sbzcsmzq.html",
          down: [
            {
              name: "设施设备资产生命周期管理",
              url: "sbzcsmzq",
            },
            {
              name: "机车整备综合管理",
              url: "jczbzhgl",
            },
          ],
        },
        {
          title: "能源电力",
          another: "sources.html",
          url: "sources.html",
          down: [
            {
              name: "能源大数据",
              url: "sources",
            },
            {
              name: "电力主设备知识库",
              url: "electric",
            },
          ],
        },
         {
          title: "工业制造",
          another: "manufacturing.html",
          url: "manufacturing.html",
          down: [
            {
              name: "MES制造执行系统",
              url: "manufacturing",
            },
            {
              name: "数字化电焊",
              url: "digitization",
            },
          ],
        },
        {
          title: "其他领域",
          another: "community.html",
          url: "community.html",
          down: [
            {
              name: "智慧社区",
              url: "community",
            },
            {
              name: "智慧工地",
              url: "wisdomConstructionSite",
            },
          ],
        },
        {
          title: "关于我们",
          another: "introduce.html",
          url: "introduce.html",
          down: [
            {
              name: "企业介绍",
              url: "introduce",
               id: "0"
            },
            {
              name: "合作伙伴",
              url: "introduce",
               id: "2"
            }
          ],
        },
      ],
      screenWidth: null,
      screenWidthShow:false,
    };
  },
  mounted() {
        //获取屏幕尺寸
        this.screenWidth = document.body.clientWidth
        window.onresize = () => {
            //屏幕尺寸变化
            return (() => {
                this.screenWidth = document.body.clientWidth
            })()
        }
    },
  methods: {
    addHighColor(xx) {
      let ss="/annlion/annlion/"+xx;
      if ( ss === window.location.pathname) return "textlinelight";
    },
    /**点击二级 */
      gosecond(itemurl, itemId) {
      const url = itemurl;
      let id = itemId;
      window.location.href = `${url}.html?id=${id}`;
      //    window.location.href=`http://127.0.0.1:5500/annlion/homePage.html`
      //    window.document.location.href("homePage.html")
    },
  },
};
</script>
<style lang="scss" scoped>
.dynamicBox {
    width: 70%;
    height: 100px;
    line-height: 100px;
    margin: 0 auto;
    font-size: 13px;
    text-align: center;
    overflow: hidden;
    .dynamicBoxLine {
        position: relative;
    }
        .up-down {
        position: absolute;
        top: 65%;
        left: 0;
        width: 100%;
        display: none;
        overflow: hidden;
        /* background-color: transparent; */
        /* 绑定动画名字并且设置持续时间 */
        animation-name: frames;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }
    .updowen {
        position: absolute;
        top: 65%;
        left: 0;
        width: 100%;
        display: none;
        overflow: hidden;
        /* 绑定动画名字并且设置持续时间 */
        animation-name: frames;
        animation-duration: 1s;
        animation-fill-mode: forwards;
    }

    .dynamicBoxLine:hover .up-down {
        display: block;
    }

    .nav1:hover .updowen {
        display: block;
    }
    .downOne{
        height: 29px;
        line-height: 29px;
        overflow-wrap: normal;
        overflow:hidden;
        font-size: 12px;
        text-overflow: ellipsis;
        background-color: #0f163233;
      color: #FFFFFF;
    }
    .downOne-padding{
        margin-left: 10px;
        margin-right: 10px;
        height: 29px;
        line-height: 29px;
    }
    .updowen>.downTwo>a{
        color: #fff !important;
    }
    .updowen .downTwo {
        height: 29px;
        line-height: 29px;
        overflow-wrap: normal;
        overflow:hidden;
        font-size: 12px;
        text-overflow: ellipsis;
    }

    .up-down  .downOne-padding:hover {
        border-bottom: 1px solid #fff;
    }
}
.login {
    width: 50px;
    height: 60px;
    margin-top: 15px;
    margin-left: 20px;
}
.navtext{
  color: #000;
}
a {
    text-decoration: none !important;
}
   @keyframes frames {
        from {
            height: 0px;
        }

        to {
            height: 240px;
        }
    }
</style>
