<template>
    <div id="clean">
        <comquery @emit-event="getEmitEvent" ref="comQuery"></comquery>
        <div class="centerBar">
            <bar :option="barOption" :style="[barStyle]"></bar>
        </div>
        <div class="centerPie">
            <pie :option="pieOption" :style="[pieOption]"></pie>
            <div class="pieSpan">
                <span>
                    <img src="/static/Images/swsy/ico_notice.png" style="height:16px;" />
                </span>
                <span style="margin-right:50px;">水质好转断面&nbsp;&nbsp;6个</span>
                <span style="margin-right:50px;">水质持平断面&nbsp;&nbsp;8个</span>
                <span style="margin-right:50px;">水质恶化断面&nbsp;&nbsp;2个</span>
            </div>
        </div>
        <div id="cleanTable">
            <el-table v-bind:data="tableData"
                  v-bind:height="height"
                  v-loading="loading"
                  border
                  stripe
                  style="width: 100%"
                  class="tableCss">
                <el-table-column type="index"
                                label="序号"
                                header-align="center"
                                align="center"
                                width="60">
                </el-table-column>
                <el-table-column prop="h_name"
                                label="河道名称"
                                header-align="center"
                                align="left">
                </el-table-column>
                <el-table-column prop="d_name"
                                label="断面名称"
                                header-align="center"
                                align="left">
                </el-table-column>
                <el-table-column prop="s_source"
                                header-align="center"
                                align="left"
                                label="断面地址">
                </el-table-column>
                <el-table-column header-align="center"
                                align="left"
                                label="水质类别">
                    <template slot-scope="scope">
                        <span style="color:#20a335" v-if="scope.row.s_type=== 'Ⅱ'"><img src="/static/Images/swzxt/Ⅱ类.png" class="typeImg" />{{scope.row.s_type}}</span>
                        <span style="color:#f30303" v-else-if="scope.row.s_type=== 'Ⅲ'"><img src="/static/Images/swzxt/Ⅲ类.png" class="typeImg" />{{scope.row.s_type}}</span>
                        <span style="color:#f6c503" v-else-if="scope.row.s_type=== 'Ⅳ'"><img src="/static/Images/swzxt/Ⅳ类.png" class="typeImg" />{{scope.row.s_type}}</span>
                        <span style="color:#f42d8e" v-else-if="scope.row.s_type=== 'Ⅴ'"><img src="/static/Images/swzxt/Ⅴ类.png" class="typeImg" />{{scope.row.s_type}}</span>
                        <span style="color:#343434" v-else-if="scope.row.s_type=== '劣Ⅴ'"><img src="/static/Images/swzxt/劣Ⅴ类.png" class="typeImg" />{{scope.row.s_type}}</span>
                        <span v-else>-</span>
                    </template>
                </el-table-column>
                <el-table-column prop="s_date"
                                header-align="center"
                                align="center"
                                label="取样时间">
                </el-table-column>
                <el-table-column header-align="center"
                                align="left"
                                label="达标情况">
                    <template slot-scope="scope">
                        <span style="color:green" v-if="scope.row.s_status=== '达标'">{{scope.row.s_status}}</span>
                        <span style="color:red" v-else-if="scope.row.s_status=== '未达标'">{{scope.row.s_status}}</span>
                        <span v-else>{{scope.row.s_status}}</span>
                    </template>
                </el-table-column>
            </el-table>
        </div>

    </div>
</template>
<script>
import $ from "jquery";
var moment = require("moment");
import comquery from "./com_cleanwaterquery";
import bar from "../../components/com_echarts/Bar";
import pie from "../../components/com_echarts/Pie";
export default {
  data() {
    return {
      loading: false,
      params: {
        choose: "",
        month: "",
        year: ""
      },
      barStyle: {
        width: "100%",
        height: "0px"
      },
      pieStyle: {
        width: "100%",
        height: "0px"
      },
      barOption: null,
      pieOption: null,
      height: 0,
      tableData: []
    };
  },
  components: {
    comquery: comquery,
    bar: bar,
    pie: pie
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      setTimeout(
        function() {
          this.setSize();
          this.getEmitEvent({
            choose: "yb",
            month: moment().format("YYYY-MM"),
            year: moment().format("YYYY")
          });
        }.bind(this),
        200
      );
      this.resize();
    },
    getEmitEvent: function(param) {
      this.params = param;
      this.setBarData();
      this.setPieData();
      this.setTableData();
    },
    setBarData: function() {
      this.barOption = {
        tooltip: {
          trigger: "axis",
          show: true,
          formatter: "{b}<br />达标率: {c}%"
        },
        title: {
          left: "center",
          text: "清洁水行动水质达标率",
          textStyle: {
            color: "#051266",
            fontWeight: "normal",
            fontSize: 16,
            fontFamily: "微软雅黑"
          }
        },
        legend: {},
        xAxis: {
          type: "category",
          data: [
            "庄行镇",
            "南桥镇",
            "拓林镇",
            "金汇镇",
            "青村镇",
            "海湾镇",
            "奉城镇",
            "四团镇"
          ],
          axisLabel: {
            //rotate: 50
          },
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          name: "镇达标率",
          type: "value",
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          nameTextStyle: {
            color: "#333333",
            fontWeight: "normal",
            fontSize: 14,
            fontFamily: "宋体"
          },
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#333333",
              fontSize: 14
            }
          }
        },
        series: [
          {
            name: "",
            type: "bar",
            data: [90, 80, 50, 60, 20, 70, 34, 10],
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}%"
              }
            }
          }
        ]
      };
    },
    setPieData: function() {
      this.pieOption = {
        title: {
          text: "断面达标统计",
          x: "center",
          y: "2%",
          textStyle: {
            color: "#051266",
            fontWeight: "normal",
            fontSize: 16,
            fontFamily: "微软雅黑"
          }
        },
        color: ["#00b33c", "#f53333"],
        tooltip: {
          trigger: "item",
          formatter: "{a} <br/>{b}: {c}"
        },
        legend: {
          orient: "horizontal",
          x: "center",
          top: "10%",
          itemGap: 50,
          data: ["合格", "不合格"]
        },
        series: [
          {
            name: "国考市考",
            type: "pie",
            radius: ["35%", "60%"],
            center: ["25%", "50%"],
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 80, name: "合格" }, { value: 20, name: "不合格" }]
          },
          {
            name: "进出水",
            type: "pie",
            radius: ["35%", "60%"],
            center: ["75%", "50%"],
            label: {
              normal: {
                show: true,
                position: "inside",
                formatter: "{c}"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 50, name: "合格" }, { value: 50, name: "不合格" }]
          }
        ]
      };
    },
    setTableData: function() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.tableData = [
          {
            h_name: "巨潮港",
            d_name: "大叶公路巨潮港桥",
            s_source: "打野公路巨潮港桥路口",
            s_type: "Ⅱ",
            s_date: "2018-05-01",
            s_status: "达标"
          },
          {
            h_name: "南沙港",
            d_name: "大叶公路",
            s_source: "大叶公路120号",
            s_type: "Ⅲ",
            s_date: "2018-05-01",
            s_status: "达标"
          },
          {
            h_name: "贝港",
            d_name: "解放西路贝港桥",
            s_source: "解放西路贝港桥西",
            s_type: "Ⅳ",
            s_date: "2018-05-01",
            s_status: "未达标"
          },
          {
            h_name: "中港",
            d_name: "五四支路彭公塘中港桥",
            s_source: "五四支路彭公塘中港桥南",
            s_type: "Ⅴ",
            s_date: "2018-05-01",
            s_status: "未达标"
          },
          {
            h_name: "金汇港",
            d_name: "北闸",
            s_source: "金汇港北闸闸口",
            s_type: "劣Ⅴ",
            s_date: "2018-05-01",
            s_status: "未达标"
          },
          {
            h_name: "南门港",
            d_name: "爱护路南门港桥",
            s_source: "爱护路南门港桥西",
            s_type: "劣Ⅴ",
            s_date: "2018-05-01",
            s_status: "未达标"
          }
        ];
      }, 300);
    },
    setSize: function() {
      var docH = document.documentElement.clientHeight;
      var queryH = this.$refs.comQuery.$el.clientHeight;      
      var contentH = docH - queryH;
      this.barStyle.height = contentH / 2 + "px";
      this.pieStyle.height = contentH / 2 + "px";
      this.height = contentH / 2;
    },
    resize: function() {
      $(window).resize(
        function() {
          this.setSize();
        }.bind(this)
      );
    }
  }
};
</script>
<style scoped>
#clean .centerBar {
  border-right: 1px solid #dcdcdc;
  float: left;
  width: 50%;
}
#clean .centerPie {
  float: left;
  width: 49%;
}
#cleanTable th {
  background-color: #f5f5f5;
}
#clean .typeImg {
  width: 13px;
  height: 15px;
}
#clean .pieSpan {
  width: 100%;
  text-align: center;
  height: 50px;
  line-height: 50px;
  font-family: "Microsoft YaHei";
  font-size: 14px;
  color: #333333;
}
</style>


