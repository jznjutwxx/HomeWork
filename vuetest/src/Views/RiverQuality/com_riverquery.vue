<template>
    <div id="appquery">
        <el-form :inline="true" size="small">
            <el-form-item label="所属镇：">
                <el-select v-model="townValue" class="selCss">
                    <el-option v-for="item in townOption" v-bind:key="item.s_cd_value" v-bind:label="item.s_cd_value" v-bind:value="item.s_cd_value">
                        </el-option>
                </el-select>
            </el-form-item>
            <el-form-item label="河道等级：" style="margin-left:10px;">
                    <el-select v-model="gradeValue" class="selCss">
                        <el-option v-for="item in gradeOption" v-bind:key="item.key" v-bind:label="item.value" v-bind:value="item.key">
                        </el-option>
                    </el-select>
                </el-form-item>
                <el-form-item label="统计类别：" style="margin-left:10px;">
                    <el-radio-group v-model="querychoose" size="small">
                        <el-radio label="yb">月报</el-radio>
                        <el-radio label="nb">年报</el-radio>
                    </el-radio-group>
                </el-form-item>
                <el-form-item label="日期：" v-if="querychoose ==='yb'" style="margin-left:10px;">
                    <el-button icon="el-icon-arrow-left" v-on:click="preMonth">上一月</el-button>
                    <el-date-picker v-model="monthValue" style="width:120px;"
                                    type="month"
                                    value-format="yyyy-MM"
                                    placeholder="选择月"
                                    key="key-month">
                    </el-date-picker>
                    <el-button v-on:click="nextMonth">下一月<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-form-item>
                <el-form-item label="日期：" v-else-if="querychoose ==='nb'" style="margin-left:10px;">
                    <el-button icon="el-icon-arrow-left" v-on:click="preYear">上一年</el-button>
                    <el-date-picker v-model="yearValue" style="width:120px;"
                                    type="year"
                                    value-format="yyyy"
                                    placeholder="选择年"
                                    key="key-year">
                    </el-date-picker>
                    <el-button v-on:click="nextYear">下一年<i class="el-icon-arrow-right el-icon--right"></i></el-button>
                </el-form-item>
                <el-form-item style="margin-left:10px;">
                    <el-button type="primary" icon="el-icon-search" v-on:click="emitEvent">查询</el-button>
                    <el-button type="primary">导出</el-button>
                </el-form-item>
        </el-form>
    </div>
</template>
<script>
var moment = require("moment");
var now = moment();
export default {
  data() {
    return {
      param: {
        town: "",
        grade: "",
        choose: "",
        month: "",
        year: ""
      },
      townValue: "",
      townOption: [],
      gradeValue: "all",
      gradeOption: [
        { key: "all", value: "全部" },
        { key: "sqj", value: "市、区级" },
        { key: "zj", value: "镇级" }
      ],
      querychoose: "yb",
      monthValue: moment().format("YYYY-MM"),
      yearValue: moment().format("YYYY")
    };
  },
  mounted() {
    this.init();
  },
  methods: {
    init: function() {
      this.townOption = [
        {
          s_cd_key: 0,
          s_cd_key2: "四团镇",
          s_cd_value: "四团镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "西渡街道",
          s_cd_value: "西渡街道"
        }
      ];
    },
    preMonth: function() {
      this.monthValue = moment(this.monthValue, "YYYY-MM")
        .subtract(1, "M")
        .format("YYYY-MM");
    },
    nextMonth: function() {
      this.monthValue = moment(this.monthValue, "YYYY-MM")
        .add(1, "M")
        .format("YYYY-MM");
    },
    preYear: function() {
      this.yearValue = moment(this.yearValue, "YYYY")
        .subtract(1, "y")
        .format("YYYY");
    },
    nextYear: function() {
      this.yearValue = moment(this.yearValue, "YYYY")
        .add(1, "y")
        .format("YYYY");
    },
    emitEvent: function() {
      this.param.town = this.townValue;
      this.param.grade = this.gradeValue;
      this.param.choose = this.querychoose;
      this.param.month = this.monthValue;
      this.param.year = this.yearValue;
      this.$emit("emit-event", this.param);
    }
  }
};
</script>
<style scoped>
#appquery {
  font-size: 14px;
  padding: 10px 20px 0px 20px;
  border-bottom: 1px solid #dcdcdc;
}
#appquery .el-form-item {
  margin-bottom: 10px;
}
#appquery .selCss {
  width: 120px;
}

#appquery .txtInput {
  float: left;
  padding-right: 20px;
}

#appquery .btnSel {
  height: 32px;
  padding-left: 20px;
  padding-top: -3px;
}

#appquery .btnImport {
  width: 100px;
  height: 32px;
  padding-left: 20px;
  background-image: url(/Images/gcgl/btn_piliangdr_normal.png);
  border: 0px;
}

#appquery .btnImport:focus {
  background-image: url(/Images/gcgl/btn_piliangdr_normal.png);
}

#appquery .btnImport:hover {
  background-image: url(/Images/gcgl/btn_piliangdr_active.png);
}
</style>


