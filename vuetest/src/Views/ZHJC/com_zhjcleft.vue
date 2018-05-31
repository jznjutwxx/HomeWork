<template>
    <div id="com_zhjcleft">
        <div id="hideLeft" title="隐藏" @click="hideLeft">
            <img src="/static/Images/zhjc/hideleft.png" alt="隐藏">
        </div>
        <div id="showLeft" title="显示" @click="showLeft">
            <img src="/static/Images/zhjc/showleft.png" alt="显示">
        </div>
        <div id="leftcontent">
            <header class="title">
                <span>综合监测筛选</span>
                <span class="smallZt">(共</span><span class="smallZt figure">30</span><span class="smallZt">条数据)</span>
            </header>
            <div id="jzSelect">
                <img src="/static/Images/zhjc/ico_jiezhen.png"><span style="margin-left:7px;">街镇</span>
                <el-checkbox :indeterminate="isIndeterminate" v-model="checkAll" @change="handleCheckAllChange" :checked="true" style="margin-left:59px;">
                    全选
                </el-checkbox>
                <div style="margin:15px 0" class="fgdiv"></div>
                <el-checkbox-group v-model="checkedTwons" @change="handleCheckedTwonsChange">
                    <el-row>
                        <el-col :span="11">
                            <el-checkbox label="庄行镇"></el-checkbox>
                        </el-col>
                        <el-col :span="12">
                            <el-checkbox label="柘林镇"></el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="11">
                            <el-checkbox label="南桥镇"></el-checkbox>
                        </el-col>
                        <el-col v-bind:span="12">
                            <el-checkbox label="青村镇"></el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="11">
                            <el-checkbox label="金汇镇"></el-checkbox>
                        </el-col>
                        <el-col v-bind:span="12">
                            <el-checkbox label="奉城镇"></el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="11">
                            <el-checkbox label="四团镇"></el-checkbox>
                        </el-col>
                        <el-col v-bind:span="12">
                            <el-checkbox label="海湾镇"></el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row >
                        <el-col v-bind:span="10" style="margin-left:12px;">
                            <el-checkbox label="西渡街道"></el-checkbox>
                        </el-col>
                        <el-col v-bind:span="12" style="margin-left:5px;">
                            <el-checkbox label="奉浦街道"></el-checkbox>
                        </el-col>
                    </el-row>
                    <el-row>
                        <el-col v-bind:span="16" style="margin-left:-18px;">
                            <el-checkbox label="金海社区"></el-checkbox>
                        </el-col>
                        <el-col v-bind:span="8" style="margin-left:-5px;">
                            <el-checkbox label="海湾旅游区"></el-checkbox>
                        </el-col>
                    </el-row>                  
                </el-checkbox-group>
            </div>
            <div id="jcdSelect">
                <el-tabs v-model="jclx" type="card" @tab-click="handleClick">
                  <el-tab-pane label="自动监测点" name="zdjcd">
                      <div id="zdgcxm">
                          <div id="zdgcxmTitle">
                              <img src="/static/Images/zhjc/ico_自动观测项目.png" />
                                <span>自动观测项目</span>
                          </div>
                          <el-dropdown @command="handleCommand">
                              <div class="el-dropdown-link">
                                  <span ref="selectItem">雨量</span><i class="el-icon-arrow-down el-icon--right"></i>
                              </div>
                            <el-dropdown-menu slot="dropdown">
                                <el-dropdown-item command="雨量">雨量</el-dropdown-item>
                                    <el-dropdown-item command="水位">水位</el-dropdown-item>
                                    <el-dropdown-item command="流量">流量</el-dropdown-item>
                                    <el-dropdown-item command="风速风向">风速风向</el-dropdown-item>
                                    <el-dropdown-item command="水质监测">水质监测</el-dropdown-item>
                            </el-dropdown-menu>
                          </el-dropdown>
                      </div>
                      <div id="zdzt">
                          <div id=zdztTitle>
                              <img src="/static/Images/zhjc/ico_站点状态.png">
                              <span>站点状态</span>
                          </div>
                          <el-checkbox-group v-model="checkedZdzt" @change="zdztChange">
                            <el-checkbox label="正常"></el-checkbox>
                                <el-checkbox label="设备异常"></el-checkbox>
                          </el-checkbox-group>
                      </div>
                  </el-tab-pane>
                  <el-tab-pane label="人工取样点" name="rgqyd">
                      <div id="rgqyd">
                          <img src="/static/Images/zhjc/rgqyd/ico_szjcrw.png"/>
                            <span>水质检测任务</span>
                            <el-checkbox-group v-model="checkedSzjcrw" @change="szjcrwChange">
                              <el-row>
                                    <el-col v-bind:span="12">
                                        <el-checkbox label="重污染"></el-checkbox>
                                    </el-col>
                                    <el-col v-bind:span="12">
                                        <el-checkbox label="黑臭"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col v-bind:span="12">
                                        <el-checkbox label="水功能"></el-checkbox>
                                    </el-col>
                                    <el-col v-bind:span="12">
                                        <el-checkbox label="进出水"></el-checkbox>
                                    </el-col>
                                </el-row>
                                <el-row>
                                    <el-col v-bind:span="12">
                                        <el-checkbox label="清洁水"></el-checkbox>
                                    </el-col>
                                    <el-col v-bind:span="12">
                                        <el-checkbox label="劣五类"></el-checkbox>
                                    </el-col>
                                </el-row>
                            </el-checkbox-group>
                      </div>
                  </el-tab-pane>
                </el-tabs>
            </div>


        </div>
    </div>
</template>
<script>
import $ from "jquery";
export default {
  data: function() {
    return {
      isIndeterminate: false,
      checkAll: false,
      checkedTwons: [
        "庄行镇",
        "柘林镇",
        "南桥镇",
        "青村镇",
        "金汇镇",
        "奉城镇",
        "四团镇",
        "海湾镇",
        "西渡街道",
        "奉浦街道",
        "金海社区",
        "海湾旅游区"
      ],
      twons: [
        "庄行镇",
        "柘林镇",
        "南桥镇",
        "青村镇",
        "金汇镇",
        "奉城镇",
        "四团镇",
        "海湾镇",
        "西渡街道",
        "奉浦街道",
        "金海社区",
        "海湾旅游区"
      ],
      jclx: "zdjcd",
      checkedZdzt: ["正常", "设备异常"],
      checkedSzjcrw: ["重污染", "黑臭", "清洁水", "进出水", "水功能", "劣五类"],
      belowTableTitle: "", //下方表格的title
      finalMapData: [] //最后地图和表格中展示的数据
    };
  },
  watch: {},
  mounted: function() {
    this.afreshSize();
  },
  methods: {
    afreshSize: function() {
      if (window.screen.height < 900) {
        $("#leftcontent").css("height", "330px");
        $("#jzSelect .el-row").css("margin-bottom", "0px");
        $("#jzSelect > img").css("margin", "0px 0 0 -28px");
        $("#jzSelect .fgdiv ").css("margin", "0px");
        $("#jzSelect").css("height", "138px");
        $("#rgqyd .el-checkbox").css("margin", "3px 0");
        $("#zdgcxmTitle").css("margin-bottom", "3px");
        $("#zdztTitle").css("margin", "5px 0 10px");
        $("#zdzt .el-checkbox").css("margin-top", "-6px");
        $("#jcdSelect").css("height", "150px");
      } else {
        $("#leftcontent").css("height", "411px");
        $("#jzSelect .el-row").css("margin-bottom", "3px");
        $("#jzSelect > img").css("margin", "15px 0 0 -28px;");
        $("#jzSelect .fgdiv ").css("margin", "15px 0");
        $("#jzSelect").css("height", "190px");
        $("#rgqyd .el-checkbox").css("margin", "10px 0;");
        $("#zdgcxmTitle").css("margin-bottom", "10px");
        $("#zdztTitle").css("margin", " 20px 0 10px");
        $("#zdzt .el-checkbox").css("margin", "0 0 10px 0;");
        $("#jcdSelect").css("height", "247px");
      }
    },
    hideLeft: function() {
      $("#hideLeft").hide();
      $("#jcdSelect").hide();
      $("#leftcontent").animate({ width: "hide" }, "normal", function() {
        $("#showLeft").show();
      });
    },
    showLeft: function() {
      $("#showLeft").hide();
      $("#jcdSelect").show();
      $("#leftcontent").animate({ width: "show" }, "normal", function() {
        $("#hideLeft").show();
      });
    },
    //街镇全选框的事件
    handleCheckAllChange: function(val) {
      this.checkedTwons = val ? this.twons : []; //
      this.isIndeterminate = false; //当全选或者全不选时，不确定性为false
    },
    //具体街镇change事件
    handleCheckedTwonsChange: function(value) {
      var checkedCount = value.length;
      this.checkAll = checkedCount === this.twons.length;
      this.isIndeterminate =
        checkedCount > 0 && checkedCount < this.twons.length;
    },
    handleClick: function() {
        this.getJCdate();
    },
    handleCommand: function(command) {
      this.$refs.selectItem.innerHTML = command;
      this.getJCdate();
    },
    zdztChange: function(val) {
      this.getJCdate();
    },
    szjcrwChange: function() {
      this.getJCdate();
    },
    //获取监测数据
    getJCdate: function() {
      var vm = this;
      var strTwons = this.checkedTwons.join(",");
      /**------------------------------------------后台获取数据开始----------------------------------------------------*/
      if (this.jclx == "zdjcd") {
        vm.belowTableTitle = vm.$refs.selectItem.innerHTML;
        //自动监测点分2个接口去数据[{水质监测},{雨量、水位、流量、风速风向}]
        if (vm.belowTableTitle == "水质监测") {
          vm.finalMapData = []; //暂空数据！！！！！
          vm.dataToFather();
        } else {
          //雨量、水位、流量、风速风向
          vm.finalMapData = [
            {
              area: "南桥镇",
              cstcd: "63404520",
              gldw: "上海市奉贤区水文站",
              ll: "91.05",
              n_jd: 121.48704109,
              n_wd: 31.00413655,
              result: "91.05",
              stationname: "金汇港北闸内",
              status: "正常",
              sw: "2.77",
              time: "2018-07-28 10:55:00",
              yl: "440"
            },
            {
              area: "海湾镇",
              cstcd: "63404650",
              fsfx: "4.26(187)",
              gldw: "上海市奉贤区水文站",
              ll: "45.91",
              n_jd: 121.73165968,
              n_wd: 30.86079644,
              result: "45.91",
              stationname: "中港闸内",
              status: "正常",
              sw: "2.59",
              time: "2018-07-28 10:55:00",
              yl: "385.5"
            },
            {
              area: "海湾镇",
              cstcd: "17801",
              gldw: "上海市奉贤区水文站",
              ll: "1.74",
              n_jd: 121.65449274,
              n_wd: 30.85169511,
              result: "1.74",
              stationname: "南门港",
              status: "正常",
              sw: "2.6",
              time: "2018-07-28 10:55:00",
              yl: "379"
            },
            {
              area: "海湾镇",
              cstcd: "63404530",
              fsfx: "1.53(304)",
              gldw: "上海市奉贤区水文站",
              ll: "46.61",
              n_jd: 121.52474003,
              n_wd: 30.8288635,
              result: "46.61",
              stationname: "金汇港南闸内",
              status: "正常",
              sw: "2.64",
              time: "2018-07-28 10:55:00",
              yl: "362.5"
            },
            {
              area: "柘林镇",
              cstcd: "17802",
              gldw: "上海市奉贤区水文站",
              ll: "1.04",
              n_jd: 121.48078055,
              n_wd: 30.81669722,
              result: "1.04",
              stationname: "南竹港出海闸",
              status: "正常",
              sw: "2.64",
              time: "2018-07-28 10:55:00"
            },
            {
              area: "庄行镇",
              cstcd: "17803",
              gldw: "上海市奉贤区水文站",
              ll: "2.34",
              n_jd: 121.39164167,
              n_wd: 30.98064444,
              result: "2.34",
              stationname: "南沙港北闸",
              status: "正常",
              sw: "2.76",
              time: "2018-07-28 10:55:00"
            },
            {
              area: "庄行镇",
              cstcd: "17804",
              gldw: "上海市奉贤区水文站",
              ll: "5.13",
              n_jd: 121.35678333,
              n_wd: 30.97440555,
              result: "5.13",
              stationname: "千步泾",
              status: "设备异常",
              sw: "2.7",
              time: "2018-05-03 08:40:00"
            }
          ];
          vm.dataToFather();
        }
      } else if (vm.jclx == "rgqyd") {
        var rgqydjcrw = vm.checkedSzjcrw.join(",");
        vm.belowTableTitle = "人工取样点";
        vm.finalMapData = []; //暂空数据！！！！！
        vm.dataToFather();
      }
      /***---------------------------------------------后台获取数据结束------------------------------------------*/
    },
    dataToFather: function() {
      this.$emit(
        "get-data",
        this.finalMapData,
        this.belowTableTitle,
        this.jclx
      );
    }
  }
};
</script>
<style scoped>
#hideLeft {
  position: absolute;
  z-index: 1255;
  left: 248px;
  top: 47px;
  width: 22px;
  height: 32px;
  text-align: center;
}
#showLeft {
  position: absolute;
  z-index: 1255;
  left: 0px;
  top: 47px;
  width: 22px;
  text-align: center;
  height: 32px;
  display: none;
}
#leftcontent {
  width: 240px;
  height: 411px;
  border-right: #cccccc 1px solid;
  border-bottom: #cccccc 1px solid;
  position: absolute;
  z-index: 1301;
  color: #333333;
  background-color: white;
}
#leftcontent .title {
  width: 100%;
  height: 32px;
  line-height: 32px;
  text-align: center;
  font-family: "Microsoft YaHei";
  background-color: #ececec;
}
#leftcontent .smallZt {
  font-size: 13px;
}
#leftcontent .smallZt .figure {
  font-family: Arial;
}
#jzSelect {
  height: 190px;
  border: 1px solid #cccccc;
  border-right: 0;
  text-align: center;
}
#jzSelect > img {
  height: 12px;
  margin: 15px 0 0 -28px;
}
#jzSelect .el-row {
  margin-bottom: 3px;
}
#jcdSelect {
  height: 247px;
}
#jcdSelect .el-tabs--card > .el-tabs__header .el-tabs__nav {
  border: none;
}

#jcdSelect .el-tabs--card > .el-tabs__header .el-tabs__item {
  width: 120px;
  height: 30px;
  line-height: 30px;
}

#jcdSelect .el-tabs__nav-wrap.is-scrollable {
  padding: 0 !important;
}

#jcdSelect .el-tabs__nav-prev {
  display: none;
}

#jcdSelect .el-tabs__nav-next {
  display: none;
}
/**tab栏选中时的样式*/
#jcdSelect .el-tabs__item.is-active {
  color: white;
  background-color: #2288f1;
  border: none;
}
#zdgcxm,
#zdzt {
  margin-left: 15px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
}
#zdgcxmTitle {
  margin-bottom: 10px;
}

#zdgcxmTitle img {
  margin-bottom: -1px;
  height: 13px;
}
#zdztTitle {
  margin: 20px 0 10px;
}
#zdgcxm .el-dropdown-link {
  border: 1px solid #ececec;
  width: 190px;
  height: 25px;
  border-radius: 4px;
  line-height: 25px;
}

#zdgcxm .el-dropdown-link > span {
  margin-left: 10px;
}
#zdgcxm .el-icon--right {
  float: right;
  margin: 5px 4px 0 0px;
}
.el-dropdown-menu {
  width: 190px !important;
  height: 150px;
  margin-top: 5px;
  top: 287px;
}

.el-dropdown-menu__item {
  line-height: 30px !important;
}
#rgqyd {
  margin-left: 15px;
  font-size: 14px;
  font-family: "Microsoft YaHei";
}

#rgqyd .el-checkbox {
  margin: 10px 0;
}
</style>


