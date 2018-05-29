<template>
    <div id="Basetable">
      <!-- 高度暂时写死 -->
        <el-table :data="tableData" size="small" border  stripe :height="400"> 
          <el-table-column v-for="(item,key) in tableKey" 
                          :key="key"
                          :type="item.type?item.type:''"
                          :width="item.width?item.width:''"
                          :prop="item.value"
                          :label="item.name">
          </el-table-column>
        </el-table>
    </div>
</template>

<script>
export default {
  data: function() {
    return {
      maxHeight: 0,
      tableData: [],
      tableKey: []
    };
  },
  props: {
    height: 0,
    tabledatas: {
      type: Object,
      default: function() {
        return {
          tableData: [],
          tableKey: []
        };
      }
    }
  },
  watch: {
    tabledatas: function(val, oldVal) {
      this.setData(val);
    },
    height: function(val, oldVal) {
      this.maxHeight = val;
    }
  },
  mounted: function() {

  },
  methods: {
    setData: function(data) {
      this.tableData = data.tableData;
      this.tableKey = data.tableKey;
    }
  }
};
</script>

<style scoped>
</style>


