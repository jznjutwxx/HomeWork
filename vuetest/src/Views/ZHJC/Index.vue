<template>
    <div id="app">
        <zhjcleft @get-data="getLeftData"></zhjcleft>
        <div id="jcdLegend" style="position: absolute;z-index: 1500;right:50px;bottom:406px;" v-show="jcdLegendShow">
            <div id="ylLegend" v-show="ylLegendShow" style="background:url('/static/Images/zhjc/legend/img_ylLegend.png') no-repeat;width: 299px;height: 182px;">
            <!--自动监测点雨量图例-->
            </div>
            <div id="zdjcdLegend" v-show="zdjcdLegendShow" style="background:url('/static/Images/zhjc/legend/img_zdjcdLegend.png');width: 141px;height: 118px;">
            <!--其他自动监测点图例-->
            </div>
            <div id="rgLegend" v-show="rgLegendShow" style="background:url('/static/Images/zhjc/legend/img_rgLegend.png');width: 224px;height: 110px">
                <!--人工取样点图例-->
            </div>
        </div>
        <!--地图控制-->
        <div style="position:absolute;bottom:350px;right:15px;z-index:1500;">
            <div @click="initMapExtent" title="初始地图范围" style="width:34px;height:34px; background:url('/static/Images/zhjc/legend/btn_initMapExtent.png') no-repeat;cursor:pointer;"></div>
            <div @click="jcdLegendShow=!jcdLegendShow" title="图例" style="width:34px;height:34px; background:url('/static/Images/zhjc/legend/btn_showLegend.png') no-repeat;cursor:pointer;"></div>
            <div @click="mapZoomToBig" title="放大" style="width:34px;height:34px;background:url('/static/Images/zhjc/legend/btn_zoomToBig.png') no-repeat;cursor:pointer;"></div>
            <div @click="mapZoomToSmall" title="缩小" style="width:34px;height:34px;margin-top:-2px; background:url('/static/Images/zhjc/legend/btn_ZoomToSamll.png') no-repeat"></div>
        </div>
        <div id="mapContainer">
            <div id="zdjcdPop">
                <el-dialog :title="mapJcdPopTitle" :visible.sync="zdjcdDialogVisible" :before-close="handleClose">
                    <div class="titlebg"></div>
                    <el-tabs v-model="activeName" @tab-click="handleClick">
                        <el-tab-pane label="雨量趋势图" name="ylBar">
                            <combar :option="barOption" class="ysCharts" ref="ylbar"></combar>
                            <el-table v-bind:data="zdjcdTableData" border style="width: 211px" height='417'>
                                <el-table-column prop="time" label="时间" width="110">
                                </el-table-column>
                                <el-table-column prop="value" label="雨量" width="100">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="水位趋势图" name="swLine">
                            <comline v-bind:option="swLineOption" class="ysCharts" ref="swline"></comline>
                            <el-table v-bind:data="zdjcdTableData" border style="width: 211px" height='417'>
                                <el-table-column prop="time" label="时间" width="110">
                                </el-table-column>
                                <el-table-column prop="value" label="水位" width="100">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                        <el-tab-pane label="流量趋势图" name="llLine">
                            <comline v-bind:option="llLineOption" class="ysCharts" ref="llline"></comline>
                            <el-table v-bind:data="zdjcdTableData" border style="width: 211px" height='417'>
                                <el-table-column prop="time" label="时间" width="110">
                                </el-table-column>
                                <el-table-column prop="value" label="流量" width="100">
                                </el-table-column>
                            </el-table>
                        </el-tab-pane>
                    </el-tabs>
                    <!--按天查询区域-->
                <div id="tiemSelect">
                    <el-button icon="el-icon-arrow-left" v-on:click="preDay">上一天</el-button>
                    <el-date-picker v-model="zdjcdTime" type="date" placeholder="选择日期" value-format="yyyy-MM-dd" v-on:change="dayChange">
                    </el-date-picker>
                    <el-button v-on:click="nextDay">下一天<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    <el-button type="primary" icon="el-icon-upload2">导出</el-button>
                </div>
                <div id="noticeMsg">
                    <img src="/static/Images/swsy/ico_notice.png" />
                    <span v-text="noticeMsg"></span>
                </div>
                </el-dialog>
            </div>
            <!--人工取样点水质趋势弹窗-->
        <div id="szqsPop">
            <el-dialog v-bind:title="mapJcdPopTitle" v-bind:visible.sync="szqsDialogVisible" v-bind:before-close="handleClose" ref="szqsPop">
                <div class="titlebg"></div>
                <comline v-bind:option="szqsLineOption" id="szqsCharts" ref="szqsLine">
                </comline>
                <div id="szqsNoticeMsg">
                    <img src="/static/Images/swsy/ico_notice.png" />
                    <span v-text="noticeMsg">

                    </span>
                </div>
                <table id="szqsTable" border="1" cellpadding="0" cellspacing="0"></table>
                <div id="yearSelect">
                    <el-button icon="el-icon-arrow-left" >上一年</el-button>
                    <el-date-picker v-model="yearVlue" type="year" placeholder="选择年份"  value-format="yyyy" >
                    </el-date-picker>
                    <el-button >下一年<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                    <el-button type="primary" icon="el-icon-upload2">导出</el-button>
                </div>
            </el-dialog>
        </div>
        </div>




    </div>
</template>
<script>
import $ from "jquery";
import zhjcleft from "./com_zhjcleft";
import combar from "../../components/com_echarts/Bar";
import comline from "../../components/com_echarts/Line";
export default {
  data: function() {
    return {
      map: null,
      layers: [],
      baselayer: null,
      riverlayer: null, //河流图层
      vectorLayer: null,
      fsfxVectorLayer: null, //风速风向图层
      jcdMarkersLayer: null, //监测点图层
      fxbaselayerurl:
        "http://222.66.154.70:8090/iserver/services/map-ugcv5-FengXianJiChuDiTu/rest/maps/FengXianJiChuDiTu",
      riverLayerUrl:
        "http://222.66.154.70:8090/iserver/services/map-ugcv5-fxst200005032/rest/maps/fxst2000_0503",
      leftData: [],
      leftJclx: "",
      belowTitle: "",
      jcdLegendShow: false,
      ylLegendShow: true,
      zdjcdLegendShow: false,
      rgLegendShow: false,
      mapJcdPopTitle: "南沙港北闸",
      zdjcdDialogVisible: false, //控制弹窗的显示
      szqsDialogVisible: false,
      activeName: "ylBar",
      barOption: null,
      szqsLineOption: null,
      zdjcdTableData: [], //图形右侧表格数据
      swLineOption: null, //水位图
      llLineOption: null, //流量图
      zdjcdTime: "2018-05-31",
      noticeMsg: "01-04 4时水位最高为2.6m(超警戒)，当日累计流量173m³", //雨水提示信息
      yearVlue: "2018"
    };
  },
  components: {
    zhjcleft: zhjcleft,
    combar: combar,
    comline: comline
  },
  watch: {},
  mounted: function() {
    this.afreshBelowContent();
    this.initMap();
    $(window).resize(
      function() {
        this.afreshBelowContent();
      }.bind(this)
    );
  },
  methods: {
    initMap: function() {
      this.map = new SuperMap.Map("mapContainer", {
        allOverlays: true,
        controls: [
          new SuperMap.Control.Navigation({
            //添加导航控件到map
            dragPanOptions: {
              enableKinetic: true //拖拽动画
            }
          })
        ]
      });
      this.baselayer = new SuperMap.Layer.TiledDynamicRESTLayer(
        "2016年奉贤基础底图",
        this.fxbaselayerurl,
        null,
        { maxResolution: "auto", isBaseLayer: true }
      );
      this.riverlayer = new SuperMap.Layer.TiledDynamicRESTLayer(
        "奉贤河流",
        this.riverLayerUrl,
        null,
        { maxResolution: "auto", isBaseLayer: true }
      );
      this.vectorLayer = new SuperMap.Layer.Vector("查询高亮图层");
      this.fsfxVectorLayer = new SuperMap.Layer.Vector("风速风向图层");
      this.jcdMarkersLayer = new SuperMap.Layer.Markers("监测点图层");
      this.layers = [
        this.riverlayer,
        this.vectorLayer,
        this.fsfxVectorLayer,
        this.jcdMarkersLayer
      ];
      this.riverlayer.events.on({ layerInitialized: this.addLayers });
    },
    addLayers: function() {
      this.map.addLayers(this.layers);
      this.map.setCenter(new SuperMap.LonLat(121.56, 30.9));
      //   if (window.screen.width <= 1024 && window.screen.height <= 1366) {
      //     this.map.zoomTo(0);
      //     $("#belowContent").css("height", "200px");
      //     $(".el-table").css("font-size", "12px");
      //     //this.pagesize = 2;
      //   } else if (1024 < window.screen.width && window.screen.width <= 1280) {
      //     this.map.zoomTo(1);
      //   } else if (1280 < window.screen.width && window.screen.width <= 1366) {
      //     this.map.zoomTo(1);
      //   } else if (1366 < window.screen.width && window.screen.width <= 1600) {
      //     this.map.zoomTo(1);
      //   } else {
      //     this.map.zoomTo(2);
      //   }
    },
    afreshBelowContent: function() {
      if (window.screen.height <= 900) {
        $("#belowContent").css("height", "200px");
        $(".el-table__body-wrapper").css("height", "89px");
        $(".el-table__body-wrapper").css("overflow-y", "auto");
        $("#hideBelowContent").css("bottom", "200px");
      } else {
        $("#belowContent").css("height", "303px");
        $(".el-table__body-wrapper").css("height", "192px");
        $(".el-table__body-wrapper").css("overflow-y", "auto");
        $("#hideBelowContent").css("bottom", "303px");
      }
    },
    getLeftData: function(leftData, bleowTableTitle, jclx) {},
    initMapExtent: function() {
      this.map.zoomTo(0);
      this.map.setCenter(new SuperMap.LonLat(121.56, 30.9));
    },
    mapZoomToBig: function() {
      this.map.zoomTo(this.map.getZoom() + 1);
    },
    mapZoomToSmall: function() {
      this.map.zoomTo(this.map.getZoom() - 1);
    },
    handleClose: function(done) {
      done();
    },
    handleClick: function() {},
    preDay: function() {},
    nextDay: function() {},
    dayChange: function() {}
  }
};
</script>
<style scoped>
html,
body {
  height: 100%;
  width: 100%;
  overflow: hidden;
  margin: 0;
  padding: 0;
}
#app {
  height: 868px;
  position: relative;
}
#mapContainer {
  width: 100%;
  height: 100%;
  overflow: hidden;
  border: #b9b9b9 1px solid;
}
#zdjcdPop .el-tabs__content {
  margin-top: 55px;
}
#zdjcdPop .ysCharts {
  width: 660px;
  height: 410px;
  float: left;
}
.el-dialog {
  height: 600px;
  width: 920px;
  /*background-size: 1073px 484px;*/
  position: relative;
}
#rgqydVideo .el-dialog__header {
  height: 20px;
}
.el-dialog__header {
  background-color: #2288f1;
  padding: 10px 20px;
}
.el-dialog__title {
  color: white;
}
.el-dialog__body {
  padding: 8px 20px;
}
.titlebg {
  background-color: white;
  width: 5px;
  height: 18px;
  position: absolute;
  top: 13px;
  left: 9px;
}
#tiemSelect {
  position: absolute;
  top: 46px;
  left: 200px;
}
#szqsCharts {
  width: 660px;
  height: 230px;
  padding: 40px 0px 0px 0px !important;
}
#szqsTable {
  width: 100%;
  height: 230px;
  margin-top: 10px;
  position: relative;
  text-align: center;
  border-top: 1px #333333 solid;
  border-right: 0;
  border-bottom: 0;
  border-left: 1px #333333 solid;
}
#szqsTable td {
  border-top: 0;
  border-right: 1px #333333 solid;
  border-bottom: 1px #333333 solid;
  border-left: 0;
}
#yearSelect {
  position: absolute;
  top: 50px;
  left: 180px;
}
</style>