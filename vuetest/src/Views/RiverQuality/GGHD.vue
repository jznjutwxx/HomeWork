<template>
    <div id="app">
        <comquery @emit-event="getEmitEvent" ref="comeQuery"></comquery>
        <bar :option="barOption" :style="[styles]"></bar>
        <div id="demoTable">
            <el-table v-bind:data="tableData"
                  v-bind:height="height"
                  v-loading="loading"
                  border
                  stripe
                  style="width: 100%">
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
                    <el-table-column  prop="d_name"
                                    label="断面名称"
                                    header-align="center"
                                    align="left">
                    </el-table-column>
                    <el-table-column prop="s_source"
                                    header-align="center"
                                    align="left"
                                    label="来源">
                    </el-table-column>
                    <el-table-column prop="l_num"
                                    header-align="center"
                                    align="left"
                                    label="劣五类超标项目（超标倍数）">
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
            <el-table-column header-align="center"
                             align="left"
                             v-bind:label="tabLabel">
                <template slot-scope="scope">
                    <span style="color:green" v-if="scope.row.s_status=== '好转'">{{scope.row.s_status}}</span>
                    <span style="color:red" v-else-if="scope.row.s_status=== '恶化'">{{scope.row.s_status}}</span>
                    <span v-else>{{scope.row.s_status}}</span>
                </template>
            </el-table-column>
            </el-table>
        </div>
    </div>
</template>
<script>
import comquery from "./com_riverquery";
import bar from "../../components/com_echarts/Bar";
import $ from "jquery";
export default {
  data() {
    return {
      styles: {
        width: "97%",
        height: "450px"
      },
      params: {
        town: "",
        grade: "",
        choose: "",
        month: "",
        year: ""
      },
      barOption: {},
      tableData: [],
      height: "0px",
      loading: false,
      tabLabel: "与去年对比"
    };
  },
  components: {
    bar: bar,
    comquery: comquery
  },
  mounted() {
    this.init();
    this.getEmitEvent();
  },
  methods: {
    init: function() {
      setTimeout(
        function() {
          this.setSize();
        }.bind(this),
        200
      );
      this.resize();
    },
    getEmitEvent: function() {
      this.setBarData();
      this.setTableData();
    },
    setBarData: function() {
      this.barOption = {
        title: {
          left: "center",
          text: "骨干河道水质情况",
          textStyle: {
            color: "#666666",
            fontWeight: "normal",
            fontSize: 16
          }
        },
        color: ["#50a6ff", "#ed7d31"],  
        //tooltip: {
        //    trigger: 'axis',
        //    show: true,
        //    formatter: '{b0}: {c0}%<br /><br />{b1}: {c1}%'
        //},
        legend: {
          orient: "vertical",
          x: "right",
          y: "center"
        },
        xAxis: {
          type: "category",
          data: ["III类", "Ⅳ类", "Ⅴ类", "劣Ⅴ类"],
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
          type: "value",
          max: 100.0,
          axisLine: {
            show: false
          },
          axisTick: {
            show: false
          },
          axisLabel: {
            formatter: "{value} %",
            textStyle: {
              color: "#999"
            }
          }
        },
        series: [
          {
            name: "2017",
            type: "bar",
            data: [20, 50, 80, 0],
            label: {
              normal: {
                show: true,
                position: "top",
                formatter: "{c}%"
              }
            }
          },
          {
            name: "2018",
            type: "bar",
            data: [30, 60, 100, 10],
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
    setTableData: function() {
      this.loading = true;
      setTimeout(() => {
        this.loading = false;
        this.tableData = [
          {
            h_name: "巨潮港",
            d_name: "大叶公路巨潮港桥",
            s_source: "黄浦江",
            l_num: "氨氮(0.24)",
            s_type: "Ⅱ",
            s_status: "持平"
          },
          {
            h_name: "南沙港",
            d_name: "大叶公路巨潮港桥",
            s_source: "黄浦江",
            l_num: "氨氮(0.24)",
            s_type: "Ⅲ",
            s_status: "好转"
          },
          {
            h_name: "贝港",
            d_name: "大叶公路巨潮港桥",
            s_source: "黄浦江",
            l_num: "氨氮(0.24)",
            s_type: "Ⅳ",
            s_status: "好转"
          },
          {
            h_name: "中港",
            d_name: "大叶公路巨潮港桥",
            s_source: "黄浦江",
            l_num: "氨氮(0.24)",
            s_type: "Ⅴ",
            s_status: "恶化"
          },
          {
            h_name: "金汇港",
            d_name: "大叶公路巨潮港桥",
            s_source: "黄浦江",
            l_num: "氨氮(0.24)",
            s_type: "劣Ⅴ",
            s_status: "恶化"
          },
          {
            h_name: "南门港",
            d_name: "大叶公路巨潮港桥",
            s_source: "黄浦江",
            l_num: "氨氮(0.24)",
            s_type: "劣Ⅴ",
            s_status: "持平"
          }
        ];
      }, 100);
    },
    setSize: function() {
      var docH = document.documentElement.clientHeight;
      var queryH = this.$refs.comeQuery.$el.clientHeight;
      var contentH = docH - queryH;
      this.styles.height = contentH / 2 + "px";
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
#demoTable th {
  background-color: #f5f5f5;
}
#demoTable .typeImg {
  width: 13px;
  height: 15px;
}
</style>


