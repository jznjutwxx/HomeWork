<template>
    <div class="query">
        <el-form :inline="true" size="small">
          <el-form-item label="年度:">
              <el-date-picker v-model="sYear"
                                style="width:120px" 
                                type="year" 
                                placeholder="选择年份"
                                :picker-options="pickerOptionsS">
               </el-date-picker>
          </el-form-item>
          <el-form-item label="至">
              <el-date-picker v-model="eYear"
                                style="width:120px"
                                type="year" 
                                placeholder="选择年份"
                                :picker-options="pickerOptionsE">
                </el-date-picker>
          </el-form-item>
          <el-form-item>
              <el-button type="primary" icon="el-icon-search" @click="emitEvent">查询</el-button>
          </el-form-item>
        </el-form>
    </div>
</template>
<script>
export default {
  data: function() {
    return {
      sYear: "2015",
      eYear: "2018",
      param:{
          startYear:'',
          endYear:''
      },
      pickerOptionsS: {
        disabledDate: function(time) {
          if (this.eYear != "") {
            return (
              time.getTime() > Date.now() ||
              time.getTime() > new Date(this.eYear)
            );
          } else {
            return time.getTime() > Date.now();
          }
        }.bind(this)
      },
      pickerOptionsE: {
        disabledDate: function(time) {
          return time.getTime() < new Date(this.sYear);
        }.bind(this)
      }
    };
  },
  mounted: function() {},
  methods: {
      emitEvent:function(){
          this.param.startYear=this.sYear;
          this.param.endYear=this.eYear;
          this.$emit('emit-event',this.param);
      }
  }
};
</script>
<style scoped>
.query {
  font-size: 14px;
  padding: 10px 20px 0px 20px;
  border-bottom: 1px sold #dcdcdc;
}
</style>


