<template>
    <div class="htmlContent" :style="{height:contentheight+'px'}">
        <div class="hideLeft" title="隐藏" @click="hideLeft">
            <img src="/static/Images/gczl/btn_left.png" alt="隐藏">
        </div>
        <div class="showLeft" title="显示" @click="showLeft">
            <img src="/static/Images/gczl/btn_right.png" alt="显示">
        </div>
        <div class="proFilter font-yahei">
            <div class="filter_title">
                <b>工程总览筛选（共<span class="font-ariel">{{filterTitleVal}}</span>条数据）</b>
            </div>
            <!-- 街镇的选择块 -->
            <div class="filter_town font-size-14">
                <el-row class="filter_town_title">
                  <el-col :span="8">
                      <img src="/static/Images/gczl/ico_jiezhen.png">&nbsp;&nbsp;街镇
                  </el-col>
                  <el-col :span="7" :offset="9">
                      <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" :checked="true">全选</el-checkbox>
                  </el-col>
                </el-row>
                <el-checkbox-group v-model="checkTowns" @change="handleCheckTownsChange">
                  <el-row class="town_row">
                    <el-col :span="11">
                        <el-checkbox label="庄行镇"></el-checkbox>
                    </el-col>
                    <el-col :span="9">
                        <el-checkbox label="柘林镇"></el-checkbox>
                    </el-col>
                  </el-row>
                  <el-row class="town_row">
                        <el-col :span="11" >
                            <el-checkbox label="南桥镇"></el-checkbox>
                            </el-col>
                        <el-col :span="9">
                            <el-checkbox label="青村镇"></el-checkbox>
                            </el-col>
                    </el-row>
                    <el-row class="town_row">
                        <el-col :span="11" >
                            <el-checkbox label="金汇镇"></el-checkbox>
                            </el-col>
                        <el-col :span="9" >
                            <el-checkbox label="奉城镇"></el-checkbox>
                            </el-col>
                    </el-row>
                    <el-row class="town_row">
                        <el-col :span="11" >
                            <el-checkbox label="四团镇"></el-checkbox>
                            </el-col>
                        <el-col :span="9" >
                            <el-checkbox label="海湾镇"></el-checkbox>
                            </el-col>
                    </el-row>
                </el-checkbox-group>
            </div>
            <!-- 工程的选择块 -->
            <div class="filter_town font-size-14">
                <!--indeterminate 属性用以表示 checkbox 的不确定状态，一般用于实现全选的效果-->
                <el-row class="filter_town_title">
                    <el-col v-bind:span="12">
                        <img src="/static/Images/gczl/ico_gongchngfl.png" />&nbsp;&nbsp;工程分类
                    </el-col>
                    <el-col v-bind:span="7" :offset="5">
                        <el-checkbox v-bind:indeterminate="isProIndeterminate" v-model="checkProAll" @change="handleCheckProAllChange" v-bind:checked="false">
                            全选
                        </el-checkbox>
                    </el-col>
                </el-row>
                <el-checkbox-group v-model="checkPros" @change="handleCheckProChange">
                    <el-row class="town_row">
                        <el-col :span="12" >
                            <el-checkbox label="1">骨干河道</el-checkbox>
                            </el-col>
                        <el-col :span="12" >
                            <el-checkbox label="2">中小河道</el-checkbox>
                            </el-col>
                    </el-row>
                    <el-row class="town_row">
                        <el-col :span="12" >
                            <el-checkbox label="3">小型农田水利</el-checkbox>
                            </el-col>
                        <el-col :span="12" >
                            <el-checkbox label="4">农村生活污水</el-checkbox>
                            </el-col>
                    </el-row>
                    <el-row class="town_row">
                        <el-col :span="12" >
                            <el-checkbox label="5">其他水利工程</el-checkbox>
                            </el-col>
                    </el-row>
                </el-checkbox-group>
            </div>
            <!-- 选择年度 -->
            <div class="filter_town font-size-14">
                <el-row class="filter_town_title">
                    <el-col v-bind:span="12">
                        <img src="/static/Images/gczl/ico_niandu.png" />&nbsp;&nbsp;年度
                    </el-col>
                </el-row>
                <el-row class="town_row">
                    <el-col :span="8">
                        <el-date-picker v-model="dateBeginParam"
                                        type="year"
                                        size="mini"
                                        value-format="yyyy"
                                        placeholder="选择年"
                                        style="width:80px;">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="3" style="text-align:center;padding-top:4px;">
                        <span>至</span>
                    </el-col>
                    <el-col :span="8">
                        <el-date-picker v-model="dateEndParam"
                                        type="year"
                                        size="mini"
                                        value-format="yyyy"
                                        placeholder="选择年"
                                        style="width:80px;">
                        </el-date-picker>
                    </el-col>
                    <el-col :span="5" style="text-align:center;">
                        <el-button type="primary" 
                                   icon="el-icon-check" 
                                   size="mini"
                                   v-on:click="dateChange"
                                   style="padding:7px 10px;"
                                   circle>
                        </el-button>
                    </el-col>
                </el-row>
            </div>
        </div>
        <!-- 地图上的四个图标按钮 -->
        <div class="map_Btn refresh_map" title="初始地图范围" @click="refreshMap"></div>
        <div class="map_Btn tuli_btn" icon="el-icon-menu" @click="onMouseOver"></div>
        <div class="map_Btn big_map" icon="el-icon-plus" @click="mapZoomBig"></div>
        <div class="map_Btn small_map" icon="el-icon-minus" @click="mapZoomSmall"></div>
        <div class="tuli_img">
            <img src="/static/Images/gczl/img_tuli.png"/>
        </div>
        <div id="showMap" style="height:100%;border:0">
        </div>
        <div class="hideDown" title="隐藏" @click="hideDown">
            <img src="/static/Images/gczl/btn_down.png" alt="隐藏" />
        </div>
        <div class="showUp" title="显示" @click="showUp">
            <img src="/static/Images/gczl/btn_up.png" alt="显示" />
        </div>
        <div class="proTable">
            <el-tabs v-model="editableTabsValue2" type="card" @tab-click="clickTabsPane">
              <el-tab-pane v-for="(item,index) in editableTabs2" 
                                :key="item.name"
                                :label="item.title"
                                :name="item.name"
                                :value="item.content">
                <el-table :data="tableData"
                           border
                           stripe
                           size="small"
                           :key="index"
                           style="width:100%">
                  <el-table-column type="index"
                                    label="序号"
                                    align="right"
                                    header-align="center">
                  </el-table-column>
                  <el-table-column label="工程名称"
                                    prop="s_name"
                                    align="left"
                                    header-align="center">
                  </el-table-column>
                  <el-table-column prop="s_project_no"
                                         label="工程编号"
                                         align="right"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column prop="n_pace_status"
                                         label="工程状态"
                                         align="left"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column prop="s_town"
                                         label="所属镇"
                                         align="left"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column prop="n_total_invest"
                                         label="投资总金额(万元)"
                                         align="right"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column prop="s_legal_person"
                                         label="项目法人"
                                         align="left"
                                         header-align="center">
                        </el-table-column>
                        <el-table-column prop="s_unit_design"
                                         label="设计单位"
                                         align="left"
                                         header-align="center">
                        </el-table-column>
                </el-table>
                <!-- 分页 -->
                <el-form :inline="true" label-position="left" size="mini">
                  <div style="text-align:left;">
                      <el-form-item>
                          <el-pagination :total="total" 
                                        :current-page="currentPage" 
                                        :page-size="pagesize" 
                                        @current-change="currentChange" 
                                        @size-change="sizeChange"
                                        layout="total, prev, pager, next, jumper">
                          </el-pagination>
                      </el-form-item>
                  </div>
                </el-form>
              </el-tab-pane>
            </el-tabs>
        </div>

    </div>

</template>
<script>
import $ from "jquery";
export default {
  data: function() {
    return {
      contentheight: document.documentElement.clientHeight,
      filterTitleVal: "28",
      isIndeterminate: false,
      isProIndeterminate: false,
      checkAll: false,
      checkProAll: false,
      //默认选中的街镇
      checkTowns: [
        "庄行镇",
        "柘林镇",
        "南桥镇",
        "青村镇",
        "金汇镇",
        "奉城镇",
        "四团镇",
        "海湾镇"
      ],
      checkPros: ["1"],
      towns: [
        "庄行镇",
        "柘林镇",
        "南桥镇",
        "青村镇",
        "金汇镇",
        "奉城镇",
        "四团镇",
        "海湾镇"
      ],
      pros: ["1", "2", "3", "4", "5"],
      //年度时间选项
      dateBeginParam: "2015",
      dateEndParam: "2018",
      map: null,
      layers: null,
      markerLayer: null,
      gcctSelect: null,
      infowin: null,
      fxbaselayerurl:
        "http://222.66.154.70:8090/iserver/services/map-ugcv5-FengXianJiChuDiTu/rest/maps/FengXianJiChuDiTu",
      gcctRestDataUrl:
        "http://222.66.154.70:8090/iserver/services/data-gcct0514/rest/data",
      vectorLayer: null, //点线面feature显示的图层
      vectorDataList: [], //点线面feature的数据集合
      markers: [],
      editableTabsValue2: "1",
      editableTabs2: [],
      tableData: [],
      total:0,//总条目数
      currentPage: 1,//默认从第一页开始
      pagesize: 4,//每页的数据条数
    };
  },
  mounted: function() {
    this.initMap();
  },
  methods: {
    initMap: function() {
      this.map = new SuperMap.Map("showMap", {
        controls: [
          new SuperMap.Control.Navigation({
            dragPanOptions: {
              enableKinetic: true
            }
          })
        ],
        allOverlays: true
      });
      var baselayer = new SuperMap.Layer.TiledDynamicRESTLayer(
        "2016年奉贤基础底图",
        this.fxbaselayerurl,
        null,
        { maxResolution: "auto" }
      );
      //标注点图层
      this.markerLayer = new SuperMap.Layer.Markers("工程点");
      this.vectorLayer = new SuperMap.Layer.Vector("工程草图");
      this.layers = [baselayer, this.markerLayer, this.vectorLayer];
      baselayer.events.on({ layerInitialized: this.addLayers });
      this.map.events.on({ zoomend: this.mapIsZoomend });
    },
    addLayers: function() {
      this.map.addLayers(this.layers);
      this.map.setCenter(new SuperMap.LonLat(121.56, 30.9), 0);
    },
    mapIsZoomend: function() {},
    hideLeft: function() {
      $(".hideLeft").hide();
      $(".proFilter").animate({ width: "hide" }, "normal", function() {
        $(".showLeft").show();
      });
    },
    showLeft: function() {
      $(".showLeft").hide();
      $(".proFilter").animate({ width: "show" }, "normal", function() {
        $(".hideLeft").show();
      });
    },
    //街镇全选框事件
    handleCheckAllChange: function(val) {
      this.checkTowns = val ? this.towns : []; //把数组赋值为逻辑真或逻辑假，赋值语句
      this.isIndeterminate = false;
      //!!!!!!!
    },
    //具体街镇改变时的事件
    handleCheckTownsChange: function(val) {
      var checkedCount = val.length;
      this.checkAll = checkedCount === this.towns.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.towns.length;
      //!!!!!!!!!!!!!!!!!!
    },
    //工程分类全选的事件
    handleCheckProAllChange: function(val) {
      this.checkPros = val ? this.pros : [];
      this.isProIndeterminate = false;
      //!!!!!!!!!!!!!
    },
    //具体的工程分类的改变事件
    handleCheckProChange: function(val) {
      var checkedCount = val.length;
      this.checkProAll = checkedCount === this.pros.length;
      this.isProIndeterminate =
        checkedCount > 0 && checkedCount < this.pros.length;
      //!!!!!!!!!!!!!!!!!!!!!!!!!
    },
    dateChange: function() {},
    refreshMap: function() {
      this.map.setCenter(new SuperMap.LonLat(121.56, 30.9), 0);
    },
    onMouseOver: function() {
      $(".tuli_img").toggle();
    },
    mapZoomBig: function() {
      this.map.zoomTo(this.map.getZoom() + 1);
    },
    mapZoomSmall: function() {
      this.map.zoomTo(this.map.getZoom() - 1);
    },
    hideDown: function() {
      $(".hideDown").hide();
      $(".proTable").animate({ height: "hide" }, "normal", function() {
        $(".showUp").show();
      });
    },
    showUp: function() {
      $(".showUp").hide();
      $(".proTable").animate({ height: "show" }, "normal", function() {
        $(".hideDown").show();
      });
    },
    clickTabsPane: function(tab, event) {

    },
    currentChange:function(currentPage){
        this.currentPage=currentPage;
        this.refreshTableData();
    },
    sizeChange:function(pagesize){
        this.pagesize=pagesize;
        this.refreshTableData();
    },
    refreshTableData:function(){

    }
  }
};
</script>
<style scoped>
.htmlContent {
  width: 100%;
}
.hideLeft {
  position: absolute;
  z-index: 1355;
  left: 258px;
  top: 12px;
  width: 22px;
  height: 32px;
  text-align: center;
}
.showLeft {
  position: absolute;
  z-index: 1355;
  left: 0px;
  top: 12px;
  width: 22px;
  height: 32px;
  text-align: center;
  display: none;
}
.proFilter {
  position: absolute;
  z-index: 1255;
  top: 0px;
  left: 0px;
  width: 240px;
  height: 320px;
}
.font-yahei {
  font-family: "Microsoft YaHei";
}
.font-ariel {
  font-family: Arial;
}
.filter_title {
  font-size: 14px;
  padding: 8px 0 8px 16px;
  background-color: #ececec;
  color: #333333;
  width: 100%;
  border: 1px solid #dcdcdc;
}
.filter_town {
  background-color: #ffffff;
  padding-left: 16px;
  width: 100%;
  border: 1px solid #dcdcdc;
  border-top: 0;
}
.font-size-14 {
  font-size: 14px;
}
.filter_town_title {
  padding-top: 6px;
  padding-bottom: 0px;
  margin-bottom: 10px;
}
.town_row {
  margin-bottom: 6px;
}
/* 地图上的四个悬浮的图标按钮 */
.map_Btn {
  position: absolute;
  right: 15px;
  width: 34px;
  height: 34px;
  cursor: pointer;
  z-index: 1253;
}
.refresh_map {
  top: 140px;
  background: url("/static/Images/zhjc/legend/btn_initMapExtent.png") no-repeat;
}
.tuli_btn {
  top: 174px;
  background: url("/static/Images/zhjc/legend/btn_showLegend.png") no-repeat;
}
.big_map {
  top: 209px;
  background: url("/static/Images/zhjc/legend/btn_zoomToBig.png") no-repeat;
}
.small_map {
  top: 241px;
  background: url("/static/Images/zhjc/legend/btn_ZoomToSamll.png") no-repeat;
}
.tuli_img {
  position: absolute;
  right: 55px;
  top: 130px;
  z-index: 1555;
  width: 252px;
  height: 165px;
  display: none;
}
.hideDown {
  position: absolute;
  z-index: 1355;
  left: 49%;
  width: 32px;
  height: 32px;
  text-align: center;
}
.showUp {
  position: absolute;
  z-index: 1355;
  left: 49%;
  bottom: 4px;
  width: 32px;
  text-align: center;
  height: 22px;
  display: none;
}
.proTable {
  z-index: 1254;
  position: absolute;
  bottom: 0px;
  left: 0px;
  width: 100%;
  height: 270px;
  background-color: #ffffff;
  overflow: hidden;
}
</style>


