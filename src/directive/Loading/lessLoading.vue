<template>
  <div class="loading-wrap">
    <div class="loading">
      <div class="dot" v-for="(item, index) in dot" :key="index"></div>
      <div class="load-text">加载中...</div>
    </div>
  </div>
</template>

<script>
export default {
  name: "loadingDemo",
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
      for (let i = 0; i < 36; i++) {
        this.dot.push(i);
      }
    },
  },
};
</script>
<style lang="less" scoped>
@ballSize: 8px; //小球尺寸
@containerSize: 100px; //容器尺寸
@n: 36; //小球数量
@pdeg:360deg / @n; //每一次旋转的角度
@ani-duration: 2s; //

//循环函数
.loop(@i) when(@i <= @n) {
  .loading .dot:nth-child(@{i}) {
    transform: rotate(@pdeg * @i) translateY(-@containerSize / 2);
    //设置动画延迟
    &::before,
    &::after {
      animation-delay: -@ani-duration / @n * @i * 6; //动画延迟时间 动画时间除以小球数量 乘每轮延迟数量 = 小球的间隔时间乘第几个小球
    }
  }
  .loop(@i+1);
}
.loop(1);

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
.loading {
  width: @containerSize;
  height: @containerSize;
  position: relative;
  left: 50%;
  top: 50%;
  transform: translate(-50%,-50%);
  border-radius: 50%;
  perspective: 70px;
  transform-style: preserve-3d;
  // border: 1px solid #fff;

  .dot {
    position: absolute;
    left: 50%;
    right: 50%;
    width: @ballSize;
    height: @ballSize;
    margin-left: -@ballSize / 2;
    margin-top: (@containerSize - @ballSize) / 2;
    //  background: red;
    &::before,
    &::after {
      content: "";
      position: absolute;
      width: 100%;
      height: 100%;
      border-radius: 50%;
    }
    &::before {
      //  background: url("../../assets/images/login/yu.png") no-repeat;
      //  background-size: @ballSize @ballSize;
      background-color: #9172db;
      top: -100%;
      animation: moveBlack @ani-duration infinite;
      // animation-delay : 6s;
    }
    &::after {
      //  background: url("../../assets/images/login/yu.png") no-repeat;
      //  background-size: @ballSize @ballSize;
      background-color: #4fdadf;
      top: 100%;
      animation: moveWhite @ani-duration infinite;
    }
  }

  .load-text {
    color: #4f5ddf;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 12px;
    overflow: hidden;
  }
}
//黑球运动动画
@keyframes moveBlack {
  0% {
    animation-timing-function: ease-in; //规定动画的过渡曲线 由慢变快
  }
  25% {
    transform: translate3d(0, 100%, @ballSize);
    animation-timing-function: ease-out; //规定动画的过渡曲线 由快变慢
  }
  50% {
    transform: translate3d(0, 200%, 0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, 100%, -@ballSize);
    animation-timing-function: ease-out;
  }
}
//白球运动动画
@keyframes moveWhite {
  0% {
    animation-timing-function: ease-in; //规定动画的过渡曲线 由慢变快
  }
  25% {
    transform: translate3d(0, -100%, -@ballSize);
    animation-timing-function: ease-out; //规定动画的过渡曲线 由快变慢
  }
  50% {
    transform: translate3d(0, -200%, 0);
    animation-timing-function: ease-in;
  }
  75% {
    transform: translate3d(0, -100%, @ballSize);
    animation-timing-function: ease-out;
  }
}
</style>
