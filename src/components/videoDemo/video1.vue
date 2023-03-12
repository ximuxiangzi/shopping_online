<template>
    <div>
      <video
        controls
        :src="url"
        alt=""
      ></video>
    </div>
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
        }
    },
}
</script>