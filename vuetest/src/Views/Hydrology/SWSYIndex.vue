<template>
    <div id="app">
        <el-row :gutter="15" class="row_bg">
            <el-col v-bind:xs="6" v-bind:sm="7" v-bind:md="7" v-bind:lg="7" v-bind:xl="6" class="sidescss">
                 <div class="titlediv hdgkdiv" v-on:click="showHDnum">河道概况</div>
                 <comleft ref="swsyleft" v-on:getszdbl-event="showSZDBL" v-bind:lefttown='lefttown'></comleft>
            </el-col>
        </el-row>
    </div>
</template>
<script>
import comleft from "./comleft";
export default {
  data() {
    return {
      lefttown: "奉贤区"
    };
  },
  components: {
    comleft: comleft
  },
  mounted() {},
  methods: {
    showHDnum() {},
    showSZDBL() {
      alert(1);
    }
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
  background: url(/Images/swsy/img_bg_cezhanbig.png) no-repeat;
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


