
<template>
    <div id="leftContent" :style="{height:leftheight+'px'}">
        <div id="topdiv" class="topdiv">
            <el-row class="row">
                <el-col :span="12" class="col">
                    <div class="text-gra">645252m³</div>
                </el-col>
                <el-col :span="12" class="col">
                    <span class="divcss">环比增长：</span>
                    <span class="divcss" style="font-family:Arial;">12.5%</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-bind:span="8" class="col">
                    <span class="divcss">自来水</span>
                </el-col>
                <el-col v-bind:span="8" class="col">
                    <span class="divcss">地表水</span>
                </el-col>
                <el-col v-bind:span="8" class="col">
                    <span class="divcss">农业用水</span>
                </el-col>
            </el-row>
            <el-row>
                <el-col v-bind:span="8" class="col">
                    <span class="text-gra" style="font-size:16px;">125252m³</span>
                </el-col>
                <el-col v-bind:span="8" class="col">
                    <span class="text-gra" style="font-size:16px;">64252m³</span>
                </el-col>
                <el-col v-bind:span="8" class="col">
                    <span class="text-gra" style="font-size:16px;">435252m³</span>
                </el-col>
            </el-row>
        </div>
        <div id="interval" class="center" style="margin-top:18px;">
            <div style="height:100%">
                <div style="height:50%">
                    <div class="title" style="width:70px;">用水统计</div>
                    <comline :option="lineOption" ref="line" class="chartcss"></comline>
                </div>
                <div style="height:50%;width:100%">
                    <div class="divcss ysqk">累计用水情况</div>
                    <div class="piediv">
                        <compie :option="GYpieOption" class="charts"></compie>
                        <span class="textcss">工业用水</span>
                    </div>
                    <div class="piediv">
                        <compie :option="SHpieOption" class="charts"></compie>
                        <span class="textcss">生活用水</span>
                    </div>
                    <div class="piediv">
                        <compie :option="NYpieOption" class="charts"></compie>
                        <span class="textcss">农业用水</span>
                    </div>
                </div>
            </div>
        </div>
        <div class="bardiv">
            <div class="title" style="width:195px;">水质汇总(2017年第三季度)</div>
            <div id="radarCharts" class="barcss"></div>
        </div>
    </div>
</template>
<script>
import bar from "../../components/com_echarts/Bar";
import line from "../../components/com_echarts/Line";
import pie from "../../components/com_echarts/Pie";
import $ from "jquery";
var echarts = require("echarts");

export default {
  data() {
    return {
      leftheight: document.documentElement.clientHeight - 32,
      marginHeight: 0,
      marginWidth: 0,
      marginCHeight: 0,
      param: {},
      lineLegendData: ["计划用水量", "实际用水量"],
      lineGridTop: "28%",
      lineyAxisName: "亿（m³）",
      radarRadius: 85,
      lineOption: null,
      GYpieOption: null,
      SHpieOption: null,
      NYpieOption: null
    };
  },
  components: {
    combar: bar,
    comline: line,
    compie: pie
  },
  watch: {
    leftheight: function(val) {
      this.leftheight = val;
    }
  },
  mounted() {
    const that = this;
    $("#interval").css(
      "margin-top",
      (document.documentElement.clientHeight * 0.05 - 6) / 2
    );
    $(window).resize(function() {
      that.leftheight = document.documentElement.clientHeight - 30;
      $("#interval").css(
        "margin-top",
        (document.documentElement.clientHeight * 0.05 - 6) / 2
      );
    });
    this.init();
  },
  methods: {
    init() {
      this.setData();
    },
    setData() {
      this.setLineData();
      this.setGYPieData();
      this.setSHPieData();
      this.setNYpieData();
      this.setRadarData();
    },
    setLineData() {
      this.lineOption = {
        color: ["#ebcf12", "#0dd9dc"],
        legend: {
          selectedMode: false,
          data: this.lineLegendData,
          // data: ['计划用水量', '实际用水量'],
          textStyle: {
            color: "#ffffff"
          },
          top: 10
        },
        grid: {
          top: this.lineGridTop,
          left: "4%",
          right: "10%"
        },
        xAxis: {
          type: "category",
          data: ["2月", "4月", "6月", "8月", "10月", "12月"],
          axisLabel: {
            interval: 0, //横轴信息全部显示
            rotate: 0, //-30度角倾斜显示
            color: "#fff"
          },
          legend: {
            textStyle: {
              color: "#ffffff"
            }
          },
          axisLine: {
            lineStyle: {
              color: "#3d4997"
            }
          },
          axisTick: { show: false }
        },
        yAxis: {
          type: "value",
          name: this.lineyAxisName,
          nameTextStyle: {
            padding: [0, 0, -5, 30]
          },
          splitLine: {
            show: true, //保留网格线
            lineStyle: {
              color: "#3d4997"
            }
          },
          axisLine: {
            show: false,
            lineStyle: {
              color: "#ffffff"
            }
          },
          axisTick: { show: false }
        },
        series: [
          {
            name: "计划用水量",
            type: "line",
            smooth: true,
            symbol: "rect",
            data: [5.1, 3.8, 9.7, 2.6, 3.5, 2]
            //label: {
            //    normal: {
            //        show: true,
            //        position: 'top'
            //    }
            //}
          },
          {
            name: "实际用水量",
            type: "line",
            smooth: true,
            symbol: "rect",
            data: [1, 3.4, 2, 1.2, 7, 2.1]
            //label: {
            //    normal: {
            //        show: true,
            //        position: 'top'
            //    }
            // }
          }
        ]
      };
    },
    setGYPieData() {
      this.GYpieOption = {
        color: ["#1486FD", "#849BE2"],
        title: {
          text: "54%",
          textStyle: {
            fontSize: 14,
            color: "#ffffff",
            fontWeight: "normal"
          },
          x: "center",
          y: "center"
        },
        grid: {
          top: "0"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["45%", "65%"],
            label: {
              normal: {
                show: false
              }
            },
            hoverAnimation: false,
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 54, name: "工业用水" }, { value: 46, name: "" }]
          }
        ]
      };
    },
    setSHPieData() {
      this.SHpieOption = {
        color: ["#BD64E5", "#849BE2"],
        title: {
          text: "26%",
          textStyle: {
            fontSize: 14,
            color: "#ffffff",
            fontWeight: "normal"
          },
          x: "center",
          y: "center"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["45%", "65%"],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "inner",
                formatter: "{d}%"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 26, name: "生活用水" }, { value: 74, name: "" }]
          }
        ]
      };
    },
    setNYpieData() {
      this.NYpieOption = {
        color: ["#04C9A8", "#849BE2"],
        tooltip: {
          trigger: "item",
          formatter: "{d}%"
        },
        title: {
          text: "24%",
          textStyle: {
            fontSize: 14,
            color: "#ffffff",
            fontWeight: "normal"
          },
          x: "center",
          y: "center"
        },
        series: [
          {
            name: "访问来源",
            type: "pie",
            radius: ["45%", "65%"],
            hoverAnimation: false,
            label: {
              normal: {
                show: false,
                position: "inner",
                formatter: "{d}%"
              }
            },
            labelLine: {
              normal: {
                show: false
              }
            },
            data: [{ value: 24, name: "农业用水" }, { value: 76, name: "" }]
          }
        ]
      };
    },
    setRadarData() {
      var radarChart = echarts.init(document.getElementById("radarCharts"));
      var radarOption = {
        color: "#50a6ff",
        tooltip: {
          trigger: "axis"
        },
        textStyle: {
          color: "white",
          fontWeight: "normal",
          fontSize: 14
        },
        polar: [
          {
            nameGap: 2, // 图中工艺等字距离图的距离
            center: ["50%", "50%"], // 图的位置
            indicator: [
              { text: "综合", max: 100 }, // max: '100%'
              { text: "管水网7项", max: 100 },
              { text: "出水厂非常规64项", max: 100 },
              { text: "出水厂常规42项", max: 100 },
              { text: "原水29项", max: 100 }
            ],
            radius: this.radarRadius,
            axisLine: {
              // 坐标轴线
              show: false // 默认显示，属性show控制显示与否
            },
            splitArea: {
              show: true,
              areaStyle: {
                color: ["#15748f"] // 图表背景网格的颜色
              }
            },
            splitLine: {
              show: true,
              lineStyle: {
                width: 1,
                color: "#0fbbc5" // 图表背景网格线的颜色
              }
            }
          }
        ],
        series: [
          {
            type: "radar",
            symbol: "none", // 去掉图表中各个图区域的边框线拐点
            itemStyle: {
              normal: {
                color: "rgba(0,0,0,0)", // 图表中各个图区域的边框线拐点颜色
                lineStyle: {
                  color: "#deff00" // 图表中各个图区域的边框线颜色
                },
                areaStyle: {
                  type: "default"
                }
              }
            },
            data: [
              {
                value: [95, 80, 55, 90, 93],
                name: "第三季度水质汇总"
              }
            ]
          }
        ]
      };
      radarChart.setOption(radarOption);
      $(window).resize(function(){
          setTimeout(() => {
              radarChart.resize();
          }, 100);
      });
    },
    resize: function() {
      $(window).resize(
        function() {
          this.setSize();
        }.bind(this)
      );
    },
    setSize: function() {
      var docH = document.documentElement.clientHeight;
      var contentH = docH - 50;
      this.height = contentH / 3;
      if (docH <= 768) {
        this.lineLegendData = [];
        this.lineGridTop = "12%";
        this.lineyAxisName = "";
        this.radarRadius = 40;
      } else if (docH >= 992) {
        this.radarRadius = 100;
      }
    }
  }
};
</script>
<style scoped>
#leftContent {
  width: 100%;
  overflow: hidden;
  position: relative;
  margin-left: 8px;
}
#leftContent .topdiv {
  height: 17%;
  width: 99%;
  border: 1px solid #2979e5;
}
.row {
  padding-top: 15px;
}
.col {
  height: 30px;
  line-height: 30px;
  text-align: center;
}
.divcss {
  color: #ffffff;
  font-size: 14px;
  font-family: "microsoft yahei";
}
.text-gra {
  float: left;
  font-size: 28px;
  font-weight: bold;
  font-family: Arial;
  color: #ffffff;
  line-height: 30px;
  padding-left: 20px !important;
  background: linear-gradient(#ffffff, #05d2ff);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
}
.center {
  height: 40%;
  width: 99%;
  position: relative;
  border: 1px solid #2979e5;
}
.bardiv {
  height: 38%;
  width: 99%;
  position: absolute;
  border: 1px solid #2979e5;
  bottom: 0;
}
.barcss {
  height: 97%;
  width: 95%;
}
.title {
  position: absolute;
  top: -10px;
  left: 35px;
  z-index: 1400;
  background-color: #051266;
  width: 120px;
  height: 30px;
  color: #22eff8;
  font-size: 16px;
  font-family: "microsoft yahei";
}
.chartcss {
  height: 85% !important;
  width: 100% !important;
  float: left;
}
.ysqk {
  width: 5%;
  float: left;
  padding-left: 12px;
  height: 100px;
  line-height: 1;
  margin-top: 5%;
}
.piediv {
  width: 30%;
  height: 100%;
  float: left;
  position: relative;
  margin-top: -28%;
  /*position: absolute;
        top: -15px;*/
}
#leftContent .textcss {
  text-align: center;
  width: 100%;
  float: left;
  position: absolute;
  bottom: 1%;
  left: 0;
  color: white;
}
</style>

