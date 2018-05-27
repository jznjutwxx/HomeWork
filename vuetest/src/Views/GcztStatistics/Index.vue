<template>
    <div id="app">
        <com-query @emit-event="getEmitEvent" ref="gcztstatisticsQuery"></com-query>
        <div >
            <com-bar :option="barOption" :style="styles"></com-bar>
            <div class="centerradio">
                <el-radio-group v-model="choose" size="small" @change="changeChecked" ref="radiogroup">
                  <el-radio label="0">骨干河道</el-radio>
                  <el-radio label="1">中小河道</el-radio>
                  <el-radio label="2">小型农田水利</el-radio>
                  <el-radio label="3">农村生活污水</el-radio>
                  <el-radio label="4">海塘提防泵闸</el-radio>
                </el-radio-group>
            </div>
        </div>        
        <com-basetable :tabledatas="tableData" :height="height"></com-basetable>
    </div>
</template>

<script>
import $ from "jquery";
import Bar from "../../components/com_echarts/Bar";
import Basetable from "../../components/com_table/Basetable";
import Query from "./query";
export default {
  data: function() {
    return {
      charTitle: "骨干河道状态统计图",
      styles: {
        height: "0px",
        width: "85%",
        float: "left"
      },
      choose: "0",
      barOption: null,
      height: 0,
      tableData: {
        tableKey: [],
        tableData: []
      }
    };
  },
  components: {
    "com-bar": Bar,
    "com-basetable": Basetable,
    "com-query": Query
  },
  mounted: function() {
    this.setSize();
    this.resize();
    this.setData();
  },
  watch: {
    charTitle: function(val) {
      var option = this.$children[1].charts.getOption();
      option.title[0].text = val;
      this.$children[1].charts.setOption(option);
    }
  },
  methods: {
    getEmitEvent: function(param) {
      this.$message({
        message: "查询成功！",
        type: "success"
      });
    },
    changeChecked: function(label) {
      this.charTitle =
        this.$refs.radiogroup.$children[parseInt(label)].$el.innerText +
        "状态统计图";
      this.$message({
        message: label,
        type: "info"
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
      var queryH = this.$refs.gcztstatisticsQuery.$el.clientHeight;
      var contentH = docH - queryH - 40;
      this.styles.height = contentH / 2 + "px";
      this.height = contentH / 2;
    },
    setData: function() {
      this.setBarData();
      this.setTableData();
    },
    setBarData: function() {
      this.$children[1].charts.showLoading();
      this.barOption = {
        title: {
          left: "center",
          text: this.charTitle,
          textStyle: {
            color: "#666666",
            fontWeight: "normal",
            fontSize: 16
          }
        },
        legend: {},
        tooltip: {},
        xAxis: {
          type: "category",
          data: [
            "工前准备",
            "开工",
            "完工",
            "完工验收",
            "决算审批",
            "竣工验收"
          ],
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          }
        },
        yAxis: {
          type: "value",
          axisTick: {
            show: false
          },
          axisLine: {
            show: false
          },
          axisLabel: {
            textStyle: {
              color: "#999"
            }
          }
        },
        series: [
          {
            name: "工程状态",
            type: "bar",
            data: [23, 44, 55, 19, 56, 23]
          }
        ]
      };
      this.$children[1].charts.hideLoading();
    },
    setTableData: function() {
      this.tableData = {
        tableKey: [
          {
            name: "序号",
            type: "index",
            width: "60"
          },
          {
            name: "统计类别",
            value: "gctype"
          },
          {
            name: "全部(个)",
            value: "allcount"
          },
          {
            name: "工前",
            value: "gqzb"
          },
          {
            name: "开工",
            value: "kg"
          },
          {
            name: "完工",
            value: "wg"
          },
          {
            name: "完工验收",
            value: "wgys"
          },
          {
            name: "决算审批",
            value: "jssp"
          },
          {
            name: "竣工验收",
            value: "jgys"
          }
        ],
        tableData: [
          {
            gctype:'ds',
            allcount:'23',
            gqzb:'ss',
            kg:'sd',
            wg:'wg',
            wgys:'wgys',
            jssp:'jssp',
            jgys:'jgys'
          },
          {
            gctype:'ds',
            allcount:'23',
            gqzb:'ss',
            kg:'sd',
            wg:'wg',
            wgys:'wgys',
            jssp:'jssp',
            jgys:'jgys'
          },
          {
            gctype:'ds',
            allcount:'23',
            gqzb:'ss',
            kg:'sd',
            wg:'wg',
            wgys:'wgys',
            jssp:'jssp',
            jgys:'jgys'
          },
          {
            gctype:'ds',
            allcount:'23',
            gqzb:'ss',
            kg:'sd',
            wg:'wg',
            wgys:'wgys',
            jssp:'jssp',
            jgys:'jgys'
          }
        ]
      };
    }
  }
};
</script>

<style scoped>
.center {
  width: 99%;
  position: relative;
}
.centerradio {
  width: 7%;
  height: 80%;
  float: left;
  padding-top: 100px;
  font-family: "Microsoft YaHei";
}
.el-radio + .el-radio {
  margin-left: 0px !important;
  padding-top: 16px;
}
</style>


