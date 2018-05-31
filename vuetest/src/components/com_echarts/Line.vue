<template>
    <div class="charts" ref="comline">

    </div>
</template>
<script>
var echarts = require("echarts");
import $ from "jquery";
export default {
  data: function() {
    return {
      options: {
        color: [],
        title: {
          text: ""
        },
        tooltip: {
          trigger: "axis"
        },
        legend: {
          data: []
        },
        grid: {
          left: "3%",
          right: "4%",
          bottom: "3%",
          containLabel: true
        },
        toolbox: {
          feature: {
            //saveAsImage: {}
          }
        },
        xAxis: {
          type: "category",
          boundaryGap: false,
          data: []
        },
        yAxis: {
          type: "value"
        },
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
          grid: {}
        };
      }
    }
  },
  watch: {
    option: function(val, oldVal) {
      this.updateCharts(val);
      this.charts.resize();
    }
  },
  mounted: function() {
    this.drawcharts();
  },
  methods: {
    drawcharts: function() {
      this.charts = echarts.init(this.$refs.comline);
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
      this.options.yAxis = option.yAxis;
      if (option.grid != undefined) {
        this.options.grid = option.grid;
      }
      this.options.series = option.series;
      this.charts.setOption(this.options);
    }
  }
};
</script>
<style scoped>
.charts {
  width: 100%;
  padding: 15px 0px 0px 0px;
}
</style>

