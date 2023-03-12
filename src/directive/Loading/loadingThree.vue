<template>
<div class="loading-wrap">
  <div class="loading">
    <span v-for="(item, index) in dot" :key="index"></span>
  </div>
</div>
</template>

<script>
export default {
   data() {
    return {
      dot: [],
    };
  },
  created() {
    this.dotFun();
  },
  methods: {
    dotFun() {
      this.dot = [];
      for (let i = 0; i < 6; i++) {
        this.dot.push(i);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@n:6;//小球数量
@s:0.13s;//延迟秒数
.loading-wrap {
  position: absolute;
  width: 100%;
  height: 100%;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.3);
  z-index: 99999999;
}
        .loading{
            width: 150px;
            height: 15px;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .loading span{
            display: inline-block;
            width: 15px;
            height: 100%;
            margin-right: 5px;
            border-radius: 50%;
            background: lightgreen;
            -webkit-animation: load 1.04s ease infinite;
        }
        .loading span:last-child{
            margin-right: 0px;
        }
        @-webkit-keyframes load{
            0%{
                opacity: 1;
                -webkit-transform: scale(1.3);
            }
            100%{
                opacity: 0.2;
                -webkit-transform: scale(.3);
            }
        }

//循环函数
.loop(@i) when(@i <= @n) {
  .loading span:nth-child(@{i}) {
    animation-delay:@s*@i
  }
  .loop(@i+1);
}
.loop(1);
</style>
