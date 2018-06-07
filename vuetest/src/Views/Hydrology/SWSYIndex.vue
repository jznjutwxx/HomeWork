<template>
    <div id="app">
        <el-row :gutter="15" class="row_bg">
            <el-col v-bind:xs="6" v-bind:sm="7" v-bind:md="7" v-bind:lg="7" v-bind:xl="6" class="sidescss">
                 <div class="titlediv hdgkdiv" v-on:click="showHDnum">河道概况</div>
                 <comleft ref="swsyleft" v-on:getszdbl-event="showSZDBL" v-bind:lefttown='lefttown'></comleft>
            </el-col>
            <el-col v-bind:xs="12" v-bind:sm="10" v-bind:md="10" v-bind:lg="10" v-bind:xl="12" style="padding-left:3px;">
              <div class="bigBox">
                <div id="mapContainer" v-bind:style="{height:mapheight+'px'}">
                    <div style="position:absolute;top:30px;left:15px;z-index:2000;">
                        <div v-on:click="initMapExtent" style="width:24px;height:24px; background:url(/static/Images/swsy/btn_dingw.png) no-repeat;cursor:pointer;">

                        </div>
                        <div v-on:click="mapZoomToBig" style="width:24px;height:24px;margin-top:3px;background:url(/static/Images/swsy/btn_jia.png) no-repeat;cursor:pointer;">

                        </div>
                        <div v-on:click="mapZoomToSmall" style="width:24px;height:24px;margin-top:2px; background:url(/static/Images/swsy/btn_jian.png) no-repeat;cursor:pointer;">

                        </div>
                    </div>
                </div>
                 <div id="mapTitle">
                    {{mapTitle}}
                </div>
                <div id="szdbltl" v-show="controlSzdbltlShow">
                    <el-row v-bind:gutter="0" id="longLine">
                        <el-col v-bind:span="24"><div class=""></div></el-col>
                    </el-row>
                    <el-row v-bind:gutter="20">
                        <el-col v-bind:span="12"><div class="grid-content bg-green"></div></el-col>
                        <el-col v-bind:span="12">
                            <div class="text"> 95%以上</div>
                        </el-col>
                    </el-row>
                    <el-row v-bind:gutter="20">
                        <el-col v-bind:span="12"><div class="grid-content bg-blue"></div></el-col>
                        <el-col v-bind:span="12"><div class="text">80%-95%</div></el-col>
                    </el-row>
                    <el-row v-bind:gutter="20">
                        <el-col v-bind:span="12"><div class="grid-content bg-red"></div></el-col>
                        <el-col v-bind:span="12"><div class="text">80%以下</div></el-col>
                    </el-row>
                </div>
                <div id="cwyb" v-show="cwybDatas[0].s_tide_tiem_am">
                    <el-row style="margin-bottom:-5px;">
                        <el-col v-bind:span="24">
                            <span v-text="cwybTime"></span>-<span>潮位预报</span>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="24">
                            <div id="cwfg"></div>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="12">
                            {{cwybDatas[0].s_site_name}}
                        </el-col>
                        <el-col v-bind:span="12">
                            {{cwybDatas[1].s_site_name}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="6">潮时</el-col>
                        <el-col v-bind:span="6">潮高</el-col>
                        <el-col v-bind:span="6">潮时</el-col>
                        <el-col v-bind:span="6">潮高</el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="6">
                            {{cwybDatas[0].s_tide_tiem_am}}
                        </el-col>
                        <el-col v-bind:span="6">
                            {{cwybDatas[0].s_tide_high_am}}
                        </el-col>
                        <el-col v-bind:span="6">
                            {{cwybDatas[1].s_tide_tiem_am}}
                        </el-col>
                        <el-col v-bind:span="6">
                            {{cwybDatas[1].s_tide_high_am}}
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="6">
                            {{cwybDatas[0].s_tide_tiem_pm}}
                        </el-col>
                        <el-col v-bind:span="6">
                            {{cwybDatas[0].s_tide_high_pm}}
                        </el-col>
                        <el-col v-bind:span="6">
                            {{cwybDatas[1].s_tide_tiem_pm}}
                        </el-col>
                        <el-col v-bind:span="6">
                            {{cwybDatas[1].s_tide_tiem_pm}}
                        </el-col>
                    </el-row>
                </div>
                <div v-show="!(cwybDatas[0].s_tide_tiem_am)" id="notcwyb">
                    非汛期-无潮位预报
                </div>
                <el-dialog id="ysPop" v-bind:title="nowStationName" v-bind:visible.sync="dialogVisible" v-bind:before-close="handleClose">
                    <el-tabs v-model="activeName" v-on:tab-click="handleClick">
                        <el-tab-pane label="雨量趋势图" name="ylBar">
                            <combar v-bind:option="barOption" class="yslCharts" ref="ylbar" v-show="ylbarShow"></combar>
                        </el-tab-pane>
                        <el-tab-pane label="水位趋势图" name="swLine">
                            <comline v-bind:option="swLineOption" class="yslCharts" ref="swline" v-show="swlineShow"></comline>
                        </el-tab-pane>
                        <el-tab-pane label="流量趋势图" name="llLine">
                            <comline v-bind:option="llLineOption" class="yslCharts" ref="llline" v-show="lllineShow"></comline>
                        </el-tab-pane>
                    </el-tabs>
                    <img v-if="noYLdata" class="noticeMsg" src="/static/Images/swsy/img_暂无雨量数据.png" />
                    <img v-if="noSWdata" class="noticeMsg" src="/static/Images/swsy/img_暂无水位数据.png" />
                    <img v-if="noLLdata" class="noticeMsg" src="/static/Images/swsy/img_暂无流量数据.png" />
                    <div id="tiemSelect" v-show="tiemSelectShow">
                        <span class="demonstration">时间：</span>
                        <el-date-picker v-model="queryChartStartTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" size="small" style="width:190px;">
                        </el-date-picker>
                        <span class="demonstration">-</span>
                        <el-date-picker v-model="queryChartEndTime" type="datetime" value-format="yyyy-MM-dd HH:mm:ss" placeholder="选择日期时间" size="small" style="width:190px;">
                        </el-date-picker>
                        <el-button type="primary" icon="el-icon-search" size="small" v-on:click="queryDateRangeCharts">查询</el-button>
                    </div>
                    <!--图表重点内容提示区域-->
                    <div id="noticeMsg">
                        <img src="/static/Images/swsy/ico_notice.png" />
                        <span v-text="noticeMsg">

                        </span>
                    </div>
                </el-dialog>
              </div>
            </el-col>
            <el-col v-bind:xs="6" v-bind:sm="7" v-bind:md="7" v-bind:lg="7" v-bind:xl="6" class="sidescss">
              <div class="titlediv cztj" v-on:click="showZCnum">测站统计</div>
              <comright ref="swsyRight" v-bind:lefttown='lefttown'></comright>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import $ from "jquery";
var moment = require("moment");
import comleft from "./comleft";
import comright from "./comright";
import commap from "./commap";
import bar from "../../components/com_echarts/Bar";
import line from "../../components/com_echarts/Line";
export default {
  data() {
    return {
      mapheight: document.documentElement.clientHeight - 32.5,
      mapTitle: "河道概况",
      lefttown: "奉贤区",
      activeName: "ylBar", //设置默认激活哪一个tab页
      hdInfo: null,
      map: null,
      drawPoint: null,
      selectFeature: null,
      layers: [],
      baselayer: null,
      hdNumCoverLayer: null, //河道数量图层 和 水质达标率数值图层
      czNumCoverLayer: null, //各个镇的测站总数量图层
      representativeMarkersLayer: null, //一镇一站标记图层,测站代表图层
      jtczLayer: null, //具体测站图层
      czNameCoverLayer: null, //测站名字图层
      dxvectorLayer: null, //点选
      szdblVectorLayer: null, //水质达标率高亮图层
      controlSzdbltlShow: false, //控制水质达标率图例的显示
      isCZnumModel: false,
      fxbaselayerurl:
        "http://222.66.154.70:8090/iserver/services/map-ugcv5-FengXianJiChuDiTu4/rest/maps/FengXianJiChuDiTu",
      //数据库中读取的数据，
      AllCZDetailInfo: [], //具体测站的信息
      nowStationName: "",
      yslDatas: [], //雨、水、流数据.雨量 mm、水位 m、流量 m³
      queryChartStartTime: moment().format("YYYY-MM-DD HH:MM:SS"),
      queryChartEndTime: moment().format("YYYY-MM-DD hh:mm:ss"),
      swAllInfo: [
        {
          x: 121.37811,
          y: 30.93567,
          twon: "庄行镇",
          hdnum: 153,
          szdbl: 1,
          percent: "100%",
          cznum: 18,
          zctype: "雨量站"
        },
        {
          x: 121.45077,
          y: 30.95395,
          twon: "南桥镇",
          hdnum: 210,
          szdbl: 0.9,
          percent: "90%",
          cznum: 20,
          zctype: "水文站"
        },
        {
          x: 121.44545,
          y: 30.8561,
          twon: "柘林镇",
          hdnum: 89,
          szdbl: 0.8,
          percent: "80%",
          cznum: 5,
          zctype: "水质站"
        },
        {
          x: 121.55954,
          y: 30.98448,
          twon: "金汇镇",
          hdnum: 125,
          szdbl: 0.7,
          percent: "70%",
          cznum: 9,
          zctype: "水位站"
        },
        {
          x: 121.54104,
          y: 30.91457,
          twon: "青村镇",
          hdnum: 156,
          szdbl: 0.6,
          percent: "60%",
          cznum: 4,
          zctype: "雨量站"
        },
        {
          x: 121.58283,
          y: 30.85589,
          twon: "海湾镇",
          hdnum: 53,
          szdbl: 0.5,
          percent: "50%",
          cznum: 7,
          zctype: "雨量站"
        },
        {
          x: 121.65281,
          y: 30.94117,
          twon: "奉城镇",
          hdnum: 69,
          szdbl: 1,
          percent: "100%",
          cznum: 7,
          zctype: "雨量站"
        },
        {
          x: 121.72939,
          y: 30.94165,
          twon: "四团镇",
          hdnum: 169,
          szdbl: 1,
          percent: "100%",
          cznum: 7,
          zctype: "雨量站"
        }
      ],
      dialogVisible: false,
      barOption: null, //雨量柱状图的参数
      swLineOption: null, //水位图
      llLineOption: null, //流量图
      ylbarShow: true,
      swlineShow: true,
      lllineShow: true,
      noYLdata: false,
      noSWdata: false,
      noLLdata: false,
      tiemSelectShow: true,
      noticeMsg: "", //"5月30日4时雨量最高为33mm(超警戒)，当日累计流量1000mm", //雨水提示信息
      cwybTime: "6月7号", //地图潮位预报的title
      cwybDate: "",
      cwybDatas: [
        {
          s_site_name: "金汇港南闸（外）站",
          s_tide_tiem_am: "2:09",
          s_tide_high_am: "4.59",
          s_tide_tiem_pm: "13:55",
          s_tide_high_pm: "3.79",
          t_tide_time: "2018-06-02 00:00:00"
        },
        {
          s_site_name: "金汇港北闸（外）站 ",
          s_tide_tiem_am: "3:37",
          s_tide_high_am: "3.33",
          s_tide_tiem_pm: "16:07",
          s_tide_high_pm: "2.85",
          t_tide_time: "2018-06-02 00:00:00"
        }
      ]
    };
  },
  components: {
    comleft: comleft,
    comright: comright,
    commap: commap,
    combar: bar,
    comline: line
  },
  watch: {
    mapheight: function(val) {
      this.mapheight = val;
    }
  },
  mounted() {
    this.initMap();
  },
  methods: {
    initMap(){
      this.map = new SuperMap.Map("mapContainer", {
                    allOverlays: true, controls: [
                    new SuperMap.Control.ScaleLine({ isImperialUnits: false }),
                    new SuperMap.Control.Navigation({ //添加导航控件到map
                        dragPanOptions: {
                            enableKinetic: true //拖拽动画
                        }
                    })
                    ]
                });
                this.baselayer = new SuperMap.Layer.TiledDynamicRESTLayer("2016年奉贤基础底图", this.fxbaselayerurl, null, { maxResolution: "auto" });
                this.szdblVectorLayer = new SuperMap.Layer.Vector("水质达标率高亮图层");
                this.hdNumCoverLayer = new SuperMap.Layer.Vector("河道数量图层、水质达标率数值图层");
                this.czNumCoverLayer = new SuperMap.Layer.Vector("各个镇的测站总数量图层");
                this.representativeMarkersLayer = new SuperMap.Layer.Markers("一镇一站图层");
                this.jtczLayer = new SuperMap.Layer.Markers("具体测站图层");
                this.czNameCoverLayer = new SuperMap.Layer.Vector("具体测站名字");
                this.dxvectorLayer = new SuperMap.Layer.Vector("点选图层");
                this.layers = [this.baselayer, this.szdblVectorLayer, this.representativeMarkersLayer, this.czNumCoverLayer, this.dxvectorLayer, this.hdNumCoverLayer];
                //点查询
                this.drawPoint = new SuperMap.Control.DrawFeature(this.dxvectorLayer, SuperMap.Handler.Point);
                this.map.addControl(this.drawPoint);
                this.drawPoint.events.on({ "featureadded": this.drawPointCompleted });
                this.baselayer.events.on({ "layerInitialized": this.addLayers });
                this.map.events.on({ "zoomend": this.mapIsZoomend });
                this.jtczLayer.events.on({ "mouseover": this.deactivePoint });
                //一镇一站图层单击时
                this.representativeMarkersLayer.events.on({ "mouseover": this.activePoint });
                this.representativeMarkersLayer.events.on({ "mouseout": this.deactivePoint });

    },
    drawPointCompleted(){

    },
    mapIsZoomend(){

    },
    activePoint(){

    },
    deactivePoint(){

    },
    addLayers: function () {
                var that = this;
                that.map.addLayers(that.layers);
                if (window.screen.width <= 1024) {
                    this.map.zoomTo(0);
                    $("#cwyb").css("font-size", "12px");
                    $("#cwyb").css("width", "220px");
                    $("#cwyb").css("bottom", "16px");
                    $("#cwfg").css("width", "220px");
                }
                else if (1024 < window.screen.width && window.screen.width <= 1280) {
                    this.map.zoomTo(1);
                    $("#cwyb").css("font-size", "12px");
                    $("#cwyb").css("width", "220px");
                    $("#cwyb").css("bottom", "16px");
                    $("#cwfg").css("width", "220px");
                }
                else if (1280 < window.screen.width && window.screen.width <= 1366) {
                    this.map.zoomTo(1);
                }
                else if (1366 < window.screen.width && window.screen.width <= 1600) {
                    this.map.zoomTo(1);
                    $("#cwyb").css("font-size", "12px");
                    $("#cwyb").css("width", "220px");
                    $("#cwyb").css("bottom", "16px");
                    $("#cwfg").css("width", "220px");
                }
                else {
                    this.map.zoomTo(2);
                }
                that.map.setCenter(new SuperMap.LonLat(121.56, 30.9));
                /*----鼠标在地图上经过,触发点选-------*/
                that.map.events.on({ "mouseover": this.selectTown });
                this.showHDnum();
            },
            selectTown(){

            },
    showHDnum() {

    },
    showSZDBL() {
      alert(1);
    },
    showZCnum() {
      alert(2);
    },
    initMapExtent() {},
    mapZoomToBig() {
      this.map.zoomTo(this.map.getZoom() + 1);
    },
    mapZoomToSmall() {
      this.map.zoomTo(this.map.getZoom() - 1);
    },
    handleClose: function(done) {
      done();
    },
    handleClick() {},
    queryDateRangeCharts() {}
  }
};
</script>
<style scoped>
html,
body,
#app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
  overflow: hidden;
  background-color: #051266;
}

#app {
  min-width: 1000px;
  min-height: 700px;
}

.row_bg {
  margin: 15px 0 0 15px;
}

#app .charts {
  width: 99%;
  padding: 10px 0 0 0px !important;
}

#app .sidescss {
  position: relative;
}

/*2018年4月20号*/
#mapContainer {
  width: 100%;
  /*border: 1px solid #0146b2;*/
  overflow: hidden;
  min-width: 400px;
  /*min-height: 610px;*/
  background-color: #051266;
}

#mapTitle {
  position: absolute;
  top: -11px;
  left: 35px;
  z-index: 1250;
  background-color: #051266;
  width: 160px;
  height: 30px;
  color: #1ed6e4;
  font-family: "微软雅黑";
  text-align: center;
}

#szdbltl {
  position: absolute;
  left: 10px;
  z-index: 1500;
  width: 176px;
  height: 95px;
  bottom: 40px;
}

.bigBox {
  width: 100%;
  height: 100%;
  position: relative;
  border: 1px solid #0146b2;
}

.smMap {
  border: none !important;
}
/*.el-row {
        margin: 10px 0 0 300px;
    }*/
#szdbltl .el-row {
  margin: 12px 0 !important;
  height: 8px;
}

#szdbltl .el-col-12 {
  padding-left: 0 !important;
  margin-top: -12px !important;
}

#szdbltl #longLine {
  background-color: #2844a3;
  width: 176px;
  height: 4px;
  margin-bottom: 30px !important;
  margin-top: 0px !important;
}

#szdbltl .bg-green {
  background-color: rgba(40, 160, 112, 0.76);
}

#szdbltl .bg-blue {
  background-color: rgba(0, 86, 206, 0.76);
}

#szdbltl .bg-red {
  background-color: rgba(247, 68, 68, 0.76);
}

#szdbltl .grid-content {
  min-height: 8px;
  min-width: 100px;
  font-size: 2px;
  color: white;
}

#szdbltl .text {
  color: white;
  font-size: 12px;
  margin: -4px 0px 0 114px;
  height: 15px;
  width: 80px;
}
/**潮位预报*/
#cwyb {
  position: absolute;
  right: 1px;
  z-index: 1500;
  height: 150px;
  bottom: 18px;
  color: white;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  width: 260px;
}

#cwyb .el-row {
  margin-top: 10px;
}
/**潮位预报下面的潮位分割线*/
#cwfg {
  background-color: #2844a3;
  width: 260px; /**270px;*/
  height: 4px;
}

#notcwyb {
  position: absolute;
  right: 30px;
  z-index: 1500;
  bottom: 30px;
  color: white;
  font-size: 14px;
}

div.smMapViewport {
  color: white !important;
}
/**具体测站点的弹框样式*/
.el-dialog {
  height: 484px;
  width: 916px;
  background: url(/static/Images/swsy/img_bg_cezhanbig.png) no-repeat;
  background-size: 1073px 484px;
  position: relative;
}

.el-dialog__header {
  padding: 40px 57px 0px;
}

.el-dialog__title {
  line-height: 24px;
  font-size: 18px;
  font-family: 微软雅黑;
  color: white;
}

.el-dialog__body {
  width: 800px;
  height: 375px;
  margin: -30px auto 0 auto !important;
}

.el-dialog__headerbtn .el-dialog__close {
  margin: 18px 38px 0 0 !important;
}

.el-tabs__item {
  color: white;
}

#ylBar {
  width: 700px;
  height: 310px;
  margin: 5px auto 0 auto;
}

.yslCharts {
  width: 700px;
  height: 310px;
  margin: 5px auto 0 auto;
}

#tiemSelect {
  position: absolute;
  top: 112px;
  left: 142px;
}

#tiemSelect span {
  color: white;
}

#noticeMsg {
  position: absolute;
  left: 82px;
  bottom: 22px;
  color: white;
  font-size: 14px;
  font-family: 微软雅黑;
  display: none;
}

.noticeMsg {
  position: absolute;
  top: 265px;
  left: 400px;
  font-size: 18px;
  color: white;
  font-family: 微软雅黑;
}

.smControlScaleLineTop {
  border: 2px solid white;
  border-top: none;
  text-align: center;
  width: 100px !important;
}
.titlediv {
  position: absolute;
  top: -10px;
  left: 30px;
  z-index: 1246;
  background-color: #051266;
  width: 100px;
  height: 20px;
  color: #22eff8;
  font-size: 16px;
  font-family: "微软雅黑";
}
</style>


