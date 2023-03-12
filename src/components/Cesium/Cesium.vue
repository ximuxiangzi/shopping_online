<template>
  <div id="cesiumContainer">
    <button @click="addModel">创建模型</button>
  </div>
</template>
<script>
export default {
  name: "Cesium",
  data() {
    return {
      viewer: null,
    };
  },
  methods: {
  
    FisrtCesium(){
      Cesium.Ion.defaultAccessToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJqdGkiOiIzYmRiODYyZS03NjkxLTQ1YzItYjk1Ny1jM2RkYWVkYjNkYmEiLCJpZCI6ODQyNjksImlhdCI6MTY0NjIwMjU1Nn0.kPtYftnfxmvsKlmuWEoqTJVhNoyoVgxtBaE4Ruv57bo';
      Cesium.Camera.DEFAULT_VIEW_RECTANGLE = Cesium.Rectangle.fromDegrees(
              90,
              -20,
              110,
              90
          ); //西南东北，默认显示中国
      this.viewer = new Cesium.Viewer('cesiumContainer',{
              animation: false, //是否显示动画控件{去除时间轴}
              timeline: false, //是否显示时间线控件{去除时间刻度}
               terrainProvider: new Cesium.CesiumTerrainProvider({
                  url: Cesium.IonResource.fromAssetId(1),
              }),//显示3d地形数据
              infoBox: false, //是否显示点击要素之后显示的信息{解决Blocked script execution in 'about:blank' because the document's frame is sandboxed and the 'allow-scripts' permission is not set.的报错问题}
          //     homeButton: false, //是否显示home键
          //     geocoder: false, // 查询
          //     baseLayerPicker: false, //是否显示图层选择控件

          //     fullscreenButton: false, //是否全屏显示
          //     sceneMode: Cesium.SceneMode.SCENE3D, //初始场景模式为二维
          //     scene3DOnly: false, //如果设置为true，则所有几何图形以3D模式绘制以节约GPU资源
          //     infoBox: false, //是否显示点击要素之后显示的信息
          //     sceneModePicker: false, //是否显示投影方式控件  三维/二维
          //     navigationHelpButton: false, //是否显示帮助信息控件
          // //   imageryProvider: new Cesium.UrlTemplateImageryProvider({
          // //         //   url: "http://map.geoq.cn/ArcGIS/rest/services/ChinaOnlineCommunity/MapServer/tile/{z}/{y}/{x}",
          // //         url: "http://webrd02.is.autonavi.com/appmaptile?lang=zh_cn&size=1&scale=1&style=8&x={x}&y={y}&z={z}",
          // //         // tilingScheme: new AmapMercatorTilingScheme(),//高德纠偏
          // //     }),
          // //     terrainProvider: new Cesium.CesiumTerrainProvider({
          // //         url: "http://data.marsgis.cn/terrain",
          // //     }),
          //      skyAtmosphere: false,
          //     // orderIndependentTranslucency: false,
          //     contextOptions: {
          //         webgl: {
          //             alpha: true,
          //         },
          //     },
      })
    },

    //创建模型
    addModel(){
    //  let model =  this.viewer.entities.add({
    //    position: Cesium.Cartesian3.fromDegrees(114,38,1000),
    //       model:{
    //          show:true,//是否显示
    //          uri:"./model/danyuan.glb",//模型路径
    //          scale:1,//设置模型缩放比例
    //          minimumPixelSize:1000,//模型最小显示多小
    //          maximumScale:2000,//模型最大显示多大
    //       }
    //   })

     let model =  this.viewer.scene.primitives.add(
      new Cesium.Cesium3DTileset({
          url: Cesium.IonResource.fromAssetId(354307),
      })
    
     )
      this.viewer.flyTo(model)
    }
  },
  mounted() {
    this.FisrtCesium();
  },
};
</script>
<style scoped>
#cesiumContainer {
  width: 100%;
  height: 100%;
}
.cesium-widget-credits {
    display: none!important;
    visibility: hidden!important;
}
</style>
