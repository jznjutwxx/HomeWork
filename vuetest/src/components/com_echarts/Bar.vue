<template>
    <div class='charts' id="comBar" ref="comBar" style="width:900px;height:500px;">
    </div>
</template>

<script>
var echarts = require("echarts");
import $ from "jquery";

export default {
  data: function() {
    return {
      options: {
        color: ["#50a6ff"],
        title: {
          text: ""
        },
        legend: {
          data: []
        },
        tooltip: {
          trigger: "axis",
          axisPointer: {
            type: "shadow"
          }
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "4%",
          containLabel: true
        },
        xAxis: [
          {
            type: "category",
            data: [],
            axisTick: {
              alignWidthLabel: true
            }
          }
        ],
        yAxis: [
          {
            type: "value"
          }
        ],
        series: []
      }
    };
  },
  props: {
    option: {
      type: Object,
      default: function() {
        return {
          color: [],
          title: {},
          legend: {},
          xAxis: {},
          yAxis: {},
          series: [],
          grid: []
        };
      }
    }
  },
  watch: {
    option: function(val, oldval) {
      this.updateCharts(val);
      this.charts.resize();
    }
  },
  mounted: function() {
    this.drawcharts();
  },
  methods: {
    drawcharts: function() {
      this.charts = echarts.init(this.$refs.comBar);
      this.charts.setOption(this.options);
      $(window).resize(
        function() {
          setTimeout(
            function() {
              this.charts.resize();
            }.bind(this),
            100
          );
        }.bind(this)
      );
    },
    updateCharts: function(option) {
      this.options.color = option.color;
      this.options.title = option.title;
      this.options.legend = option.legend;
      this.options.xAxis = option.xAxis;
      if (option.grid != undefined) {
        this.options.grid = option.grid;
      }
      this.options.yAxis = option.yAxis;
      this.options.series = option.series;
      this.charts.setOption(this.options);
    }
  }
};
</script>
<style scoped>
.charts {
  width: 100%;
  padding: 15px 0 0 0;
}
</style>


