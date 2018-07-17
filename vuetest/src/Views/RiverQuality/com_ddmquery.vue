<template>
    <div id="appquery">
        <el-form v-bind:inline="true" size="small">
            <el-form-item label="所属镇：">

            </el-form-item>
        </el-form>
    </div>
</template>
<script>
var moment = require("moment");
export default {
  data() {
    return {
      townValue: "",
      townOption: [],
      taskValue: "",
      taskOption: [],
      siteValue: "",
      siteOption: []
    };
  },
  components: {},
  mounted() {
    this.init();
  },
  methods: {
    init() {},
    getTask() {
      this.taskOption = [
        { s_sk_key: "0", s_sz_value: "清洁水" },
        { s_sk_key: "1", s_sz_value: "进水" },
        { s_sk_key: "2", s_sz_value: "水功能" },
        { s_sk_key: "3", s_sz_value: "来水" },
        { s_sk_key: "4", s_sz_value: "劣5类" },
        { s_sk_key: "5", s_sz_value: "其他" },
        { s_sk_key: "6", s_sz_value: "重污染" },
        { s_sk_key: "7", s_sz_value: "黑臭" }
      ];
    },
    getTown() {
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
        },
        {
          s_cd_key: 0,
          s_cd_key2: "金汇镇",
          s_cd_value: "金汇镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "海湾镇",
          s_cd_value: "海湾镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "奉城镇",
          s_cd_value: "奉城镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "奉浦街道",
          s_cd_value: "奉浦街道"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "柘林镇",
          s_cd_value: "柘林镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "青村镇",
          s_cd_value: "青村镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "庄行镇",
          s_cd_value: "庄行镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "金海社区",
          s_cd_value: "金海社区"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "南桥镇",
          s_cd_value: "南桥镇"
        },
        {
          s_cd_key: 0,
          s_cd_key2: "海湾旅游区",
          s_cd_value: "海湾旅游区"
        }
      ];
      this.townValue = this.townOption[0].s_cd_value;
    }
  }
};
</script>
<style scoped>
</style>


