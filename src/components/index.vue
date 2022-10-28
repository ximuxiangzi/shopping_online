<template>
    <div style="transform: scale(0.2, 0.2) translate(-50%, -50%)"  id="index"  ref="appRef">
        <div class="bg">
            <div class="host-body">
                <!-- 菜单头部 -->
                <!-- <navbar
                    v-if="showMenu == undefined || showMenu == true"
                    ref="navbarref"
                ></navbar> -->
                    头部
                <div class="box">
                    <!-- 内容载体 -->
                    <!-- <app-main /> -->
                    内容载体
                </div>
            </div>
        </div>
    </div>
</template>

<script>


export default {
    name:'Index',
    data() {
        return {
            showMenu: false,
        };
    },
    components: {
        // navbar: (resolve) => require(["../components/navbar.vue"], resolve), //头部
        // AppMain: (resolve) => require(["../components/AppMain.vue"], resolve), //载体
    },
};
</script>

<style  scoped>
* {
    margin: 0px;
    padding: 0px;
}

#index {
    color: #d3d6dd;
    width: 1920px;
    height: 1080px;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    transform-origin: left top;
    overflow: hidden;
    user-select: none;
}

    .box {
        display: flex;
        width: 100%;
        height: 1010px;
        bottom: 30px;
        z-index: 2;
        position: relative;
    }
</style>

