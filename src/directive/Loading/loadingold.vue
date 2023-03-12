<template>
    <div v-show="visible" :style="'zoom:' + zoom" class="loading-wrap">
        <div class="loadingbox">
            <div class="loadingtitle">
                <p>Loading</p>
            </div>
            <div class="loading">
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
                <span></span>
            </div>
        </div>
        <div class="loading-box">
            <img src="../../assets/images/login/yu.png" />
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            visible: true,
            zoom: 1
        };
    },
};
</script>
<style lang="scss" scoped>
.loading-wrap {
    position: absolute;
    width: 100%;
    height: 100%;
    left: 0;
    right: 0;
    top: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 99999999;
}
.loading-box {
    position: relative;
    left: 50%;
    top: 50%;
    width: 100%;
    transform: translate(-50%, -50%);
    text-align: center;
    float: left;
    img {
        width: 56.658px;
        height: 50.9935px;
    }
}
h2 {
    color: #ccc;
    margin: 0;
    font: 0.8em verdana;
    text-transform: uppercase;
    letter-spacing: 0.1em;
}

/*
 * Loading Dots
 * Can we use pseudo elements here instead :after?
 */
.loading span {
    width: 30px;
    height: 30px;
    background: #cbc9c9;
    box-shadow: inset 2px 2px 2px 0px #afc1f3, inset -4px -4px 4px 0px #7891e5;
    backdrop-filter: blur(10px);
    display: inline-block;
    vertical-align: middle;
    width: 30px;
    height: 30px;
    border-radius: 50%;
    margin: 0px 8px 0px 8px;
    animation: loading 1s infinite alternate;
}

.loadingbox p {
    text-align: center;
    margin: 0 auto;
    display: inline-block;
    vertical-align: middle;
    width: 161px;
    font-size: 40px;
    font-family: SourceHanSansCN-Medium, SourceHanSansCN;
    font-weight: 500;
    color: #8a9ddf;
    letter-spacing: 1px;
}

.loadingbox {
    position: relative;
    left: 50%;
    top: 50%;
    -webkit-transform: translate(-50%, -50%);
    -ms-transform: translate(-50%, -50%);
    transform: translate(-50%, -50%);
    text-align: center;
    width: 100%;
    float: left;
}

.loadingtitle {
    width: 50%;
    float: left;
    text-align: right;
    position: relative;
    bottom: 15px;
    position: relative;
    right: 50px;
}

.loading {
    width: 50%;
    float: right;
    text-align: left;
    opacity: 0.7;
    position: relative;
    right: 50px;
}

/*
 * Dots Colors
 * Smarter targeting vs nth-of-type?
 */
.loading span:nth-of-type(2) {
    background: #ffffff;
    animation-delay: 0.2s;
}
.loading span:nth-of-type(3) {
    background: #ffffff;
    animation-delay: 0.4s;
}
.loading span:nth-of-type(4) {
    background: #ffffff;
    animation-delay: 0.6s;
}
.loading span:nth-of-type(5) {
    background: #ffffff;
    animation-delay: 0.8s;
}
.loading span:nth-of-type(6) {
    background: #ffffff;
    animation-delay: 1s;
}

/*
 * Animation keyframes
 * Use transition opacity instead of keyframes?
 */
@keyframes loading {
    0% {
        opacity: 0;
    }
    100% {
        opacity: 1;
    }
}
</style>
