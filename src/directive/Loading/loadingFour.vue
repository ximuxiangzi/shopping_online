<template>
<div class="loading-wrap ">
    <div class="loadEffect">
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
      for (let i = 0; i < 8; i++) {
        this.dot.push(i);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@n:8;//小球数量
@s:0.13s;//延迟秒数
@ballSize: 20px; //小球尺寸
@containerSize: 100px; //容器尺寸
@pdeg:360deg / @n; //每一次旋转的角度
@ani-duration: 1.04s; //
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
       .loadEffect{
            width: @containerSize;
            height: @containerSize;
            position: relative;
            top: 50%;
            left: 50%;
            transform: translate(-50%,-50%);
        }
        .loadEffect span{
            display: inline-block;
            width: @ballSize;
            height: @ballSize;
            border-radius: 50%;
            background: lightgreen;
            position: absolute;
            -webkit-animation: load @ani-duration ease infinite;
        }
        @-webkit-keyframes load{
            0%{
                -webkit-transform: scale(1.2);
                opacity: 1;
            }
            100%{
                -webkit-transform: scale(.3);
                opacity: 0.5;
            }
        }
        .loadEffect span:nth-child(1){
            left: 0;
            top: 50%;
            margin-top:-10px;
        }
        .loadEffect span:nth-child(2){
            left: 14px;
            top: 14px;
        }
        .loadEffect span:nth-child(3){
            left: 50%;
            top: 0;
            margin-left: -10px;
        }
        .loadEffect span:nth-child(4){
            top: 14px;
            right:14px;
        }
        .loadEffect span:nth-child(5){
            right: 0;
            top: 50%;
            margin-top:-10px;
        }
        .loadEffect span:nth-child(6){
            right: 14px;
            bottom:14px;
        }
        .loadEffect span:nth-child(7){
            bottom: 0;
            left: 50%;
            margin-left: -10px;
        }
        .loadEffect span:nth-child(8){
            bottom: 14px;
            left: 14px;
            
        }

//循环函数
.loop(@i) when(@i <= @n) {
  .loadEffect span:nth-child(@{i}) {
    animation-delay:@s*@i;
    -webkit-animation-delay:@s*@i;
  }
  .loop(@i+1);
}
.loop(1);
</style>
