<template>
    <div id="compie" class="charts" ref="compie">

    </div>
</template>
<script>
import $ from "jquery";
var echarts = require("echarts");
export default {
  data() {
    return {
      options: {
        tooltip: {},
        color: [],
        title: {
          text: "",
          subtext: "",
          x: "center"
        },
        legend: {
          orient: "vertical",
          left: "left",
          data: []
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
          tooltip: {},
          color: [],
          title: {},
          legend: {},
          series: []
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
  mounted() {
    this.drawcharts();
  },
  methods: {
    drawcharts: function() {
      this.charts = echarts.init(this.$refs.compie);
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
      this.options.tooltip = option.tooltip;
      this.options.color = option.color;
      this.options.title = option.title;
      this.options.legend = option.legend;
      this.options.series = option.series;
      this.charts.setOption(this.options);
    }
  }
};
</script>
<style scoped>
.charts {
  width: 100%;
}
</style>


