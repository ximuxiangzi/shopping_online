<!-- 视频播放组件 -->
 
<template>
    <video
    ref="videoPlayer"
    class="video-js"
    >
    </video>
</template>
<script>
export default {
    name: 'VideoPlayer',
    props: {
        // 视频播放地址
        url: {
            type: String,
        }
    },
    data () {
        return {
            // 视频实例
            player: null,
        }
    },
    methods: {
        // 改变视频播放地址
        changeVideoSrc (src) {
            this.player.src([{
                src,
                type: 'video/mp4'
            }])
        },
    },
    created(){
         console.log('1111110',this.url)
    },
    mounted () {
        // 初始化视频
        // this.$video 就是 videojs, 文件入口内已经全局注册了
        this.player = this.$video(this.$refs.videoPlayer, {
            // language: 'zh-CN', // 中文
            // responsive: true,
            // autoplay: false,
            // preload: 'auto',
            // playbackRates: [1, 1.5, 2],
            sources: [{
                src: this.url,
                type: 'video/mp4'
            }]
        }, () => {

            this.player.log('ready', this)
            console.log('111111',this.url,this.player.sources)
        })
    },
    beforeDestory () {
        this.player && this.player.dispose();
    },
    
}
</script>