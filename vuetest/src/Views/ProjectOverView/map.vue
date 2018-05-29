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
                                        format="yyyy年"
                                        :editable="false"
                                        :clearable="false"
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
                                        format="yyyy年"
                                        :editable="false"
                                        :clearable="false"
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
      dateBeginParam: "2015", //年度时间选项
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
      vectorLine: null, //测量长度所需要的线图层
      vectorArea: null, //测量面积所需要的面积图层
      vectorUnit: null, //显示测量的长度
      vectorLayerTmp: null, //临时点显示的图层
      vectorX: null, //删除
      closeSelect: null,
      lineMeasure: null, //测量长度
      areaMeasure: null, //测量面积
      markers: [],
      editableTabsValue2: "1",
      editableTabs2: [],
      tableData: [],
      total: 0, //总条目数
      currentPage: 1, //默认从第一页开始
      pagesize: 4, //每页的数据条数
      GGCount: 5, //骨干河道筛选后数量
      ZXXCount: 6, //中小型河道筛选后数量
      XXNTCount: 8, //小型农田水利筛选后数量
      NCSHCount: 4, //农村生活污水筛选后数量
      QTSLCount: 5, //其他水利工程筛选后数量
      stype: "1", //点击的Tabs标签
      mapDbData: [],
      mapSpaceData: [],
      mapSpaceId: [],
      pointDataArr: [], //组合完属性后的标注点信息集合
      markers: []
    };
  },
  mounted: function() {
    this.initMap();
    this.getDataEvent();
    this.afreshBelowContent();
    $(window).resize(
      function() {
        this.afreshBelowContent();
        this.contentheight = document.body.clientHeight;
      }.bind(this)
    );
  },
  watch: {
    contentheight: function(val) {
      this.contentheight = val;
    }
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
      this.gcctSelect = new SuperMap.Control.SelectFeature(this.vectorLayer, {
        onSelect: this.onGcctFeatureSelect,
        repeat: true
      });
    },
    onGcctFeatureSelect: function(e) {
      //console.log(e);
    },
    addLayers: function() {
      this.map.addLayers(this.layers);
      this.map.addControl(this.gcctSelect);
      this.map.setCenter(new SuperMap.LonLat(121.56, 30.9), 0);
    },
    mapIsZoomend: function() {
      var zom = this.map.getZoom();
      if (zom >= 3) {
        this.markerLayer.clearMarkers(); //去掉所有的点
        this.getFeaturesBySQL(1); //根据条件筛选地图空间数据(0取数据，否则渲染图层)
        this.gcctSelect.activate(); //打开vectorLayer图层上的草图选择事件
      } else {
        this.vectorLayer.removeAllFeatures(); //去掉草图
        this.gcctSelect.deactivate(); //注销vectorLayer图层上的草图选择事件
        this.getFeaturesBySQL(0); //根据条件筛选地图空间数据(0取数据，否则渲染图层)
      }
    },
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
      if (val) {
        this.getDataEvent();
      } else {
        this.filterTitleVal = "0";
        this.editableTabs2 = [];
      }
    },
    //具体街镇改变时的事件
    handleCheckTownsChange: function(val) {
      var checkedCount = val.length;
      this.checkAll = checkedCount === this.towns.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.towns.length;
      if (checkedCount > 0) {
        this.getDataEvent();
      } else {
        this.filterTitleVal = "0";
        this.editableTabs2 = [];
      }
    },
    //工程分类全选的事件
    handleCheckProAllChange: function(val) {
      this.checkPros = val ? this.pros : [];
      this.isProIndeterminate = false;
      if (val) {
        this.stype = "5";
        this.getDataEvent();
      } else {
        this.filterTitleVal = "0";
        this.editableTabs2 = [];
      }
    },
    //具体的工程分类的改变事件
    handleCheckProChange: function(val) {
      var checkedCount = val.length;
      this.checkProAll = checkedCount === this.pros.length;
      this.isProIndeterminate =
        checkedCount > 0 && checkedCount < this.pros.length;
      if (checkedCount > 0) {
        this.stype = val[val.length - 1];
        this.getDataEvent();
      } else {
        this.filterTitleVal = "0";
        this.editableTabs2 = [];
      }
    },
    dateChange: function() {
      this.getDataEvent();
    },
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
      // console.log(tab,event);
    },
    currentChange: function(currentPage) {
      this.currentPage = currentPage;
      this.refreshTableData();
    },
    sizeChange: function(pagesize) {
      this.pagesize = pagesize;
      this.refreshTableData();
    },
    refreshTableData: function() {
      this.tableData = [
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 0,
          s_id: "a78d23f0-ab28-4f6a-9161-ae9bdabdeb1d",
          s_name: "qq",
          s_project_no: "qq",
          s_town: "四团镇"
        },
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 525002,
          s_id: "a0b6ea97-cb71-487a-9869-f031f4e6f6bf",
          s_name: "0525002",
          s_project_no: "0525002",
          s_town: "四团镇"
        },
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 0,
          s_id: "f1f55c81-3e70-4f52-8872-5347e2f6ba10",
          s_name: "0525001",
          s_project_no: "0525001",
          s_town: "四团镇",
          s_unit_design: "老盛昌有限公司"
        },
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 0,
          s_id: "a62c33ea-aa89-49fe-a17f-0dbb62d3eb89",
          s_legal_person: "小红",
          s_name: "q0527001",
          s_project_no: "q0527001",
          s_town: "四团镇",
          s_unit_design: "壹仟客大食堂"
        }
      ];
    },
    afreshBelowContent: function() {
      if (window.screen.height <= 900) {
        $(".proTable").css("height", "170px");
        $(".el-table--fit").css("height", "108px");
        $(".el-table__body-wrapper").css("height", "70px");
        $(".el-table__body-wrapper").css("overflow-y", "auto");
        $(".hideDown").css("bottom", "170px");
      } else {
        $(".proTable").css("height", "290px");
        $(".el-table--border").css("height", "202px");
        $(".el-table__body-wrapper").css({
          height: "170px",
          "overflow-y": "hidden"
        });
        $(".hideDown").css("bottom", "265px");
      }
    },
    initTab: function() {
      this.editableTabs2 = [];
      var name = "";
      for (var i = 0; i < this.checkPros.length; i++) {
        var val;
        switch (this.checkPros[i]) {
          case "1":
            val = this.GGCount;
            this.total = this.GGCount;
            name = "骨干河道";
            break;
          case "2":
            val = this.ZXXCount;
            this.total = this.ZXXCount;
            name = "中小河道";
            break;
          case "3":
            val = this.XXNTCount;
            this.total = this.XXNTCount;
            name = "小型农田水利";
            break;
          case "4":
            val = this.NCSHCount;
            this.total = this.NCSHCount;
            name = "农村生活污水";
            break;
          case "5":
            val = this.QTSLCount;
            this.total = this.QTSLCount;
            name = "其他水利工程";
            break;
        }
        this.addTab(name, val, this.checkPros[i]);
      }
      this.refreshTableData();
    },
    addTab: function(name, val, px) {
      this.editableTabs2.push({
        title: name + "（" + val + "）",
        name: px + "",
        value: name,
        content: val
      });
      this.editableTabsValue2 = px + "";
      this.stype = px;
    },
    getDataEvent: function() {
      this.getTableData();
    },
    getTableData: function() {
      //模拟数据
      this.tableData = [
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 0,
          s_id: "a78d23f0-ab28-4f6a-9161-ae9bdabdeb1d",
          s_name: "qq",
          s_project_no: "qq",
          s_town: "四团镇"
        },
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 525002,
          s_id: "a0b6ea97-cb71-487a-9869-f031f4e6f6bf",
          s_name: "0525002",
          s_project_no: "0525002",
          s_town: "四团镇"
        },
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 0,
          s_id: "f1f55c81-3e70-4f52-8872-5347e2f6ba10",
          s_name: "0525001",
          s_project_no: "0525001",
          s_town: "四团镇",
          s_unit_design: "老盛昌有限公司"
        },
        {
          gc_type: "其他水利工程",
          n_draft: 0,
          n_pace_status: "工前准备",
          n_total_invest: 0,
          s_id: "a62c33ea-aa89-49fe-a17f-0dbb62d3eb89",
          s_legal_person: "小红",
          s_name: "q0527001",
          s_project_no: "q0527001",
          s_town: "四团镇",
          s_unit_design: "壹仟客大食堂"
        }
      ];
      this.filterTitleVal = 45;
      this.GGCount = 16;
      this.ZXXCount = 13;
      this.XXNTCount = 7;
      this.NCSHCount = 3;
      this.QTSLCount = 6;
      this.initTab(); //根据条件增加或减少Tab标签页
      this.getMapDBData(); //获取数据库数据（地图使用）
    },
    getMapDBData: function() {
      //模拟数据
      this.mapDbData = [
        {
          s_id: "3bc8753c-13ea-4a50-a0ca-f283910298e1",
          s_name: "gongc1",
          s_project_no: "1232",
          n_pace_status: "工前准备",
          s_town: "金汇镇"
        },

        {
          s_id: "0a0b20ae-fdc2-4d56-8219-ce20d041bd11",
          s_name: "0527002",
          s_project_no: "0527002",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "5f654227-a9cc-44f4-a003-99fb76d3424c",
          s_name: "t",
          s_project_no: "t",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "fb68ea70-85b2-461c-9293-4dad6f7c2840",
          s_name: "ll",
          s_project_no: "2",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "bf7e990c-61d2-405f-a29a-6f60c710cbb0",
          s_name: "0527001",
          s_project_no: "0527001",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "895f7819-c4c4-44ad-a75b-c3a68f5dab5b",
          s_name: "g0528001",
          s_project_no: "g0528001",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "6ae13901-e654-4780-a187-60bc197357a0",
          s_name: "k",
          s_project_no: "5",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "17168462-4325-4291-9185-cffe8203664a",
          s_name: "9",
          s_project_no: "9",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "052dd2b1-9c27-496e-ac2d-f80e3b12dcaf",
          s_name: "e",
          s_project_no: "110000223",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "a44ab905-38f5-4407-9b95-dcf8d54681d7",
          s_name: "77",
          s_project_no: "110000222",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "2df140c4-38bf-4fd5-855f-100e5c11b63c",
          s_name: "0527003",
          s_project_no: "0527003",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "a7f28b4a-eac7-4d7a-ac0f-3e5acff822ae",
          s_name: "wxx",
          s_project_no: "110000224",
          n_pace_status: "完工验收",
          s_town: "四团镇"
        },

        {
          s_id: "a822eec8-c845-4ca4-a852-33450dbdef7a",
          s_name: "工程3",
          s_project_no: "110000223",
          n_pace_status: "决算审批",
          s_town: "金汇镇"
        },

        {
          s_id: "5d048380-77b9-49ed-a6b2-562883eeb656",
          s_name: "工程4",
          s_project_no: "110000224",
          n_pace_status: "决算审批",
          s_town: "奉城镇"
        },

        {
          s_id: "63905d98-e404-4762-93c5-1313fb652fd3",
          s_name: "工程1",
          s_project_no: "110000221",
          n_pace_status: "工程完结",
          s_town: "金汇镇"
        },

        {
          s_id: "614f55f3-1c14-46fd-82af-901e2b9c21ef",
          s_name: "工程2",
          s_project_no: "110000222",
          n_pace_status: "工程完结",
          s_town: "奉城镇"
        },

        {
          s_id: "b62b43bd-086e-4d30-b666-b9089e0a4175",
          s_name: "工程名称",
          s_project_no: "项目编号",
          n_pace_status: "工前准备",
          s_town: "庄行镇"
        },

        {
          s_id: "2eea46f9-c1a2-4ae2-b146-8e0281b30a8b",
          s_name: "工程名称",
          s_project_no: "项目编号",
          n_pace_status: "工前准备",
          s_town: "奉城镇"
        },

        {
          s_id: "c1ea9e65-e7f9-48ab-9f55-17a7c70d789a",
          s_name: "0521002",
          s_project_no: "0521002",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "863439aa-3043-43fa-8b0b-7ee6d54f3b9a",
          s_name: "0525000",
          s_project_no: "0525000",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "35e3e69b-e6f7-4815-814c-d6cf0855beba",
          s_name: "工程名称",
          s_project_no: "项目编号",
          n_pace_status: "工前准备",
          s_town: "奉城镇"
        },

        {
          s_id: "84b6141c-789c-4038-adbe-fa956d5f5069",
          s_name: "0521004",
          s_project_no: "0521004",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "98678888-e1b1-4d68-bcd9-e5e27b630262",
          s_name: "0521003",
          s_project_no: "0521003",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "eca02c3e-2c87-47e4-8038-8709fd97ce43",
          s_name: "0521005",
          s_project_no: "0521005",
          n_pace_status: "开工",
          s_town: "四团镇"
        },

        {
          s_id: "cd6b56ea-7996-4f38-92f5-b707e05d14d8",
          s_name: "0521006",
          s_project_no: "0521006",
          n_pace_status: "完工",
          s_town: "四团镇"
        },

        {
          s_id: "9db18df8-fadc-4f43-911e-67ab322f2cdc",
          s_name: "0521006",
          s_project_no: "0521006",
          n_pace_status: "完工验收",
          s_town: "四团镇"
        },
        {
          s_id: "6fe3ce6c-eac1-41ce-ac47-3defb9e37b6a",
          s_name: "0521007",
          s_project_no: "0521007",
          n_pace_status: "决算审批",
          s_town: "四团镇"
        },

        {
          s_id: "74f06ac4-20a9-44d4-a4de-1fefaed95780",
          s_name: "0521007",
          s_project_no: "0521007",
          n_pace_status: "竣工验收",
          s_town: "四团镇"
        },

        {
          s_id: "eebab33d-ae9a-4a8b-a576-900287920dd3",
          s_name: "0521008",
          s_project_no: "0521008",
          n_pace_status: "工程完结",
          s_town: "四团镇"
        },

        {
          s_id: "0aff5980-e640-4287-9231-2f09a3bb0c6d",
          s_name: "农田4",
          s_project_no: "123332",
          n_pace_status: "工前准备",
          s_town: "奉城镇"
        },

        {
          s_id: "947fdbc1-e265-4e8f-abab-029b439ae2c5",
          s_name: "x0527001",
          s_project_no: "x0527001",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "3f60da0b-e040-48d1-8f1f-4f76a355fe39",
          s_name: "农田3",
          s_project_no: "9884454545",
          n_pace_status: "工前准备",
          s_town: "金汇镇"
        },

        {
          s_id: "7131bba2-42af-4057-9e94-9e86234cb692",
          s_name: "工程6",
          s_project_no: "45411121",
          n_pace_status: "工前准备",
          s_town: "柘林镇"
        },

        {
          s_id: "91628a07-3fce-46e6-8495-9c79299c9bd7",
          s_name: "农田2",
          s_project_no: "456789",
          n_pace_status: "开工",
          s_town: "四团镇"
        },

        {
          s_id: "18c32b09-77cd-44a4-97ab-138682d53e08",
          s_name: "农田5",
          s_project_no: "233333333",
          n_pace_status: "开工",
          s_town: "四团镇"
        },

        {
          s_id: "74c52874-82d6-4f22-a9dc-f566d32e19f9",
          s_name: "农田工程1",
          s_project_no: "12345",
          n_pace_status: "完工",
          s_town: "四团镇"
        },

        {
          s_id: "f7a845a7-0514-4ae4-84e7-6090b8d8e68f",
          s_name: "n0527001",
          s_project_no: "n0527001",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "638ba08f-ec98-462a-9044-545ff4d55183",
          s_name: "hh",
          s_project_no: "hh",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "88031ebf-7b91-4f27-b2d0-69159c837e8f",
          s_name: "工程名称",
          s_project_no: "项目编号",
          n_pace_status: "开工",
          s_town: "柘林镇"
        },

        {
          s_id: "a78d23f0-ab28-4f6a-9161-ae9bdabdeb1d",
          s_name: "qq",
          s_project_no: "qq",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "a0b6ea97-cb71-487a-9869-f031f4e6f6bf",
          s_name: "0525002",
          s_project_no: "0525002",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "f1f55c81-3e70-4f52-8872-5347e2f6ba10",
          s_name: "0525001",
          s_project_no: "0525001",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "a62c33ea-aa89-49fe-a17f-0dbb62d3eb89",
          s_name: "q0527001",
          s_project_no: "q0527001",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "e8d16cf3-b344-4933-ba2c-d82dc7a9694a",
          s_name: "q0527002",
          s_project_no: "q0527002",
          n_pace_status: "工前准备",
          s_town: "四团镇"
        },

        {
          s_id: "3da12d3f-9390-4201-ba43-b2f39809132c",
          s_name: "ww",
          s_project_no: "ww",
          s_town: "四团镇"
        }
      ];

      var zom = this.map.getZoom();
      if (zom >= 3) {
        this.getFeaturesBySQL(1);
        this.gcctSelect.activate();
      } else {
        this.getFeaturesBySQL(0);
        this.gcctSelect.deactivate();
      }
    },
    //根据条件筛选地图空间数据
    getFeaturesBySQL: function(paraNum) {
      var pros = this.checkPros,
        towns = this.checkTowns.join("','"),
        sYear = this.dateBeginParam,
        eYear = this.dateEndParam;
      var yearArr = [],
        statusArr = [];
      for (var i = sYear; i <= eYear; i++) {
        yearArr.push(i + "年度");
      }
      for (var i = 0; i < pros.length; i++) {
        switch (pros[i]) {
          case "1":
            statusArr.push("骨干河道");
            break;
          case "2":
            statusArr.push("中小河道");
            break;
          case "3":
            statusArr.push("小型农田水利");
            break;
          case "4":
            statusArr.push("农村生活污水");
            break;
          case "5":
            statusArr.push("其他水利工程");
            break;
        }
      }
      var years = yearArr.join("','");
      var status = statusArr.join("','");
      var querySQL =
        " S_TOWN in ('" +
        towns +
        "') and N_YEAR in ('" +
        years +
        "') and N_TYPE in ('" +
        status +
        "')";
      var getFeatureParam, getFeatureBySQLService, getFeatureBySQLParams;
      getFeatureParam = new SuperMap.REST.FilterParameter({
        attributeFilter: querySQL
      });
      getFeatureBySQLParams = new SuperMap.REST.GetFeaturesBySQLParameters({
        queryParameter: getFeatureParam,
        datasetNames: [
          "gcct0514:gcct_pt",
          "gcct0514:gcct_ln",
          "gcct0514:gcct_pl"
        ],
        fromIndex: 0,
        toIndex: 500
      });
      //0取数据，1渲染图层
      if (paraNum == 0) {
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(
          this.gcctRestDataUrl,
          {
            eventListeners: {
              processCompleted: this.processCompleted,
              processFailed: this.processFailed
            }
          }
        );
      } else {
        getFeatureBySQLService = new SuperMap.REST.GetFeaturesBySQLService(
          this.gcctRestDataUrl,
          {
            eventListeners: {
              processCompleted: this.processCompleted2,
              processFailed: this.processFailed
            }
          }
        );
      }
      getFeatureBySQLService.processAsync(getFeatureBySQLParams);
    },
    //加载数据
    processCompleted: function(e) {
      var obj = e.result.features;
      for (var i = 0; i < obj.length; i++) {
        let gcobj = {};
        gcobj.id = obj[i].data.S_PROJECT_NO;
        gcobj.year = obj[i].data.N_YEAR;
        gcobj.type = obj[i].data.N_TYPE;
        gcobj.xmfr = obj[i].data.S_LEGAL_PERSON;
        gcobj.ssz = obj[i].data.S_TOWN;
        gcobj.gcdz = obj[i].data.S_ADDRESS;
        gcobj.sjdw = obj[i].data.S_UNIT_DESIGN;
        gcobj.sgdw = obj[i].data.S_UNIT_BUILD;
        gcobj.jldw = obj[i].data.S_UNIT_SUPERVISE;
        gcobj.gszje = obj[i].data.N_RECKON_TOTAL_AMT;
        if (obj[i].geometry.id.indexOf("Point") != -1) {
          gcobj.x = obj[i].geometry.x;
          gcobj.y = obj[i].geometry.y;
        } else {
          gcobj.x = obj[i].geometry.getCentroid().x;
          gcobj.y = obj[i].geometry.getCentroid().y;
        }
        if ($.inArray(obj[i].data.S_PROJECT_NO, this.mapSpaceId) == -1) {
          this.mapSpaceData.push(gcobj);
          this.mapSpaceId.push(obj[i].data.S_PROJECT_NO);
        }
      }
      this.getPointDataArr();
    },
    //渲染图层
    processCompleted2: function(e) {
      var obj = e.result.features;
      for (var i = 0; i < obj.length; i++) {
        this.vectorLayer.addFeatures(obj[i]);
      }
      this.vectorDataList = obj;
    },
    processFailed: function(e) {
      console.log(e.error.errorMsg);
    },
    //组合数据库数据和地图空间数据
    getPointDataArr: function() {
      var spData = this.mapSpaceData;
      var dbData = this.mapDbData;
      let i = 0,
        j = 0;
      for (; i < spData.length; i++) {
        var po = {},
          k = 0;
        breakout: for (; j < dbData.length; j++) {
          k = 0;
          if (spData[i].id == dbData[j].s_project_no) {
            po = spData[i];
            po.status = dbData[j].n_pace_status;
            po.name = dbData[j].s_name;
            po.sid = dbData[j].s_id;
            k = 1;
            break breakout;
          }
        }
        this.pointDataArr.push(po);
      }
      this.addMarkers();
    },
    //添加地图上的标注点
    addMarkers: function() {
      this.markerLayer.clearMarkers();
      var podata = this.pointDataArr;

      let i = 0;
      var markers = [];
      for (; i < podata.length; i++) {
        var size = new SuperMap.Size(28, 33);
        var offset = new SuperMap.Pixel(-(size.w / 2), -size.h);
        var picUrl = "";
        switch (podata[i].status) {
          case "工前准备":
            picUrl = "/static/Images/gczl/btn_gongqianzb.png";
            break;
          case "开工":
            picUrl = "/static/Images/gczl/btn_kaigong.png";
            break;
          case "完工":
            picUrl = "/static/Images/gczl/btn_wangong.png";
            break;
          case "完工验收":
            picUrl = "/static/Images/gczl/btn_wangongys.png";
            break;
          case "决算审批":
            picUrl = "/static/Images/gczl/btn_juesuansp.png";
            break;
          case "竣工验收":
            picUrl = "/static/Images/gczl/btn_jungongys.png";
            break;
          case "工程完结":
            picUrl = "/static/Images/gczl/btn_gongchengwg.png";
            break;
        }
        var icon = new SuperMap.Icon(picUrl, size, offset);
        var marker = new SuperMap.Marker(
          new SuperMap.LonLat(podata[i].x, podata[i].y),
          icon
        );
        marker.sid = podata[i].sid;
        marker.id = podata[i].id;
        marker.name = podata[i].name;
        marker.year = podata[i].year;
        marker.type = podata[i].type;
        marker.status = podata[i].status;
        marker.xmfr = podata[i].xmfr;
        marker.ssz = podata[i].ssz;
        marker.gcdz = podata[i].gcdz;
        marker.sjdw = podata[i].sjdw;
        marker.sgdw = podata[i].sgdw;
        marker.jldw = podata[i].jldw;
        marker.gszje = podata[i].gszje;
        this.markerLayer.addMarker(marker);
        markers.push(marker);
      }

      this.markers = markers;
      for (var j = 0; j < markers.length; j++) {
        //给所有的marker注册单击事件
        markers[j].events.on({ click: this.showInfoWin });
      }
    },
    //地图弹窗信息
    showInfoWin: function(e) {
      this.closeInfoWin();
      var that = e.object;
      var contentHTML = "<div  id='ptPop'>"; //地图上点的弹框
      contentHTML +=
        "<div id='ptPopTitle'><span style='margin-left:20px;'></span>";
      contentHTML += "<div>";
      contentHTML +=
        "<div id='bgColor'><div style='width: 5px;height: 13px;background-color: white; position: absolute;left: 10px;top: 11px;'></div><span style='margin-left:20px;'>" +
        that.name +
        "</span></div>";
      contentHTML += "<table cellspacing='0' border='1' cellpadding='0'>";
      contentHTML +=
        "<tr><td class='firtlist'>项目编号</td><td class='secondlist'>" +
        that.id +
        "</td><td class='threelist'>年度</td><td class='secondlist'>" +
        that.year +
        "</td></tr>";
      contentHTML +=
        "<tr><td class='firtlist'>工程分类</td><td class='secondlist'>" +
        that.type +
        "</td><td class='threelist'>工程状态</td><td class='secondlist'>" +
        that.status +
        "</td></tr>";
      contentHTML +=
        "<tr><td class='firtlist'>项目法人</td><td class='secondlist'>" +
        that.xmfr +
        "</td><td class='threelist'>所属镇</td><td class='secondlist'>" +
        that.ssz +
        "</td></tr>";
      contentHTML +=
        "<tr><td class='firtlist'>工程地址</td><td class='secondlist' colspan='3'>" +
        that.gcdz +
        "</td></tr>";
      contentHTML +=
        "<tr><td class='firtlist'>设计单位</td><td class='secondlist'>" +
        that.sjdw +
        "</td><td class='threelist'>设计单位</td><td class='secondlist'>" +
        that.sgdw +
        "</td></tr>";
      contentHTML +=
        "<tr><td class='firtlist'>监理单位</td><td class='secondlist'>" +
        that.jldw +
        "</td><td class='threelist'>估算总投资</td><td class='secondlist'>" +
        that.gszje +
        "</td></tr>";
      contentHTML += "</table></div>";
      contentHTML +=
        "<div style='width:100%;text-align:center;margin-top:5px;'><input type='button' value='' id='showGcDetail'></div></div></div>";
      //初始化FramedCloud类
      var framedCloud = new SuperMap.Popup.FramedCloud(
        "ptInfo", //id
        e.object.lonlat,
        null,
        contentHTML,
        e.object.icon,
        true,
        null,
        true
      );
      this.infowin = framedCloud;
      this.map.addPopup(framedCloud);
      var thisobj = this;
      $("#showGcDetail").click(function() {
        thisobj.openGCDetail(that.type, that.sid);
      });
    },
    //查看工程详情
    openGCDetail: function(type, sid) {
      if (type == "骨干河道" || type == "中小河道") {
        this.$message({
          message: type,
          type: "success"
        });
      } else if (type == "其它水利工程") {
        this.$message({
          message: type,
          type: "success"
        });
      } else if (type == "小型农田水利") {
        this.$message({
          message: type,
          type: "success"
        });
      } else if (type == "农村生活污水") {
        this.$message({
          message: type,
          type: "success"
        });
      } else {
        console.log(type);
      }
    },
    closeInfoWin: function() {
      if (this.infowin) {
        try {
          this.infowin.hide();
          this.infowin.destory();
        } catch (e) {}
      }
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
  bottom: -11px;
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
#ptInfo,
#ptInfo_contentDiv,
#ptInfo_GroupDiv {
  width: 410px !important;
}

#ptInfo_contentDiv {
  padding-right: 0px;
  padding-bottom: 0;
}

#ptInfo_GroupDiv {
  height: 266px;
}
#ptPop {
  width: 380px;
  font-family: "Microsoft YaHei";
  line-height: 18px;
  opacity: 0.8;
}
#ptPopTitle {
  height: 34px;
  width: 406px;
  line-height: 34px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
  margin: -3px 1px 1px -4px;
  color: #ffffff;
}
#bgColor {
  position: absolute;
  top: 0;
  left: 0;
  background-color: #2288f1;
  width: 410px;
  height: 34px;
  border-radius: 5px 5px 0 0;
}
#ptPop table {
  line-height: 26px;
  color: rgb(0, 0, 0);
  font-size: 12px;
  font-weight: normal;
  border-color: #dcdcdc;
  width: 372px;
  margin: 14px 0 0 18px;
  height: 160px;
}
#ptPop table .firtlist {
  background-color: #f5f5f5;
  width: 68px;
  color: #333333;
  font-size: 12px;
  font-weight: bold;
  text-align: right;
  padding-right: 8px;
}

#ptPop table .secondlist {
  font-size: 14px;
  font-weight: normal;
  color: #333333;
  padding-left: 8px;
}

#ptPop table .threelist {
  background-color: #f5f5f5;
  width: 74px;
  color: #333333;
  font-size: 12px;
  font-weight: bold;
  text-align: right;
  padding-right: 8px;
}
#ptInfo_close {
  background: url("/static/Images/zhjc/btn_close_normal.png") no-repeat;
  right: 0px !important;
  top: 9px !important;
}

#ptInfo_close:hover {
  background: url("/static/Images/zhjc/btn_close_active.png") no-repeat;
  top: 5px !important;
  right: 4px !important;
}
#showGcDetail {
  width: 100px;
  height: 32px;
  background: url("/static/Images/gczl/btn_gongcxq_normal.png");
  margin: 5px 10px 0 20px;
  border: none;
}
#showGcDetail:hover {
  background: url("/static/Images/gczl/btn_gongcxq_active.png");
}
</style>


