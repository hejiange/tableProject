<template>
  <div v-if="canRender" style="padding:0 30px;height:100%;" class="wrap">
    <el-tabs v-model="activeName" @tab-click="handleClick">
      <el-tab-pane label="输入表1" name="in-first">
        <Table1 />
      </el-tab-pane>
      <el-tab-pane label="输入表2" name="in-second">
        <Table2 />
      </el-tab-pane>
      <el-tab-pane label="输入表3" name="in-third">
        <Table3 />
      </el-tab-pane>
      <el-tab-pane label="输入表4" name="in-fourth">
        <Table4 />
      </el-tab-pane>
      <el-tab-pane label="输出表1" name="first">
        <Table5 />
      </el-tab-pane>
      <el-tab-pane label="输出表2" name="second">
        <Table6 />
      </el-tab-pane>
      <el-tab-pane label="输出表3" name="third">
        <Table7 />
      </el-tab-pane>
      <el-tab-pane label="输出表4" name="fourth">
        <Table8 />
      </el-tab-pane>
      <el-tab-pane label="输出表5" name="five">
        <Table9 />
      </el-tab-pane>
    </el-tabs>
  </div>
  <div v-else style="height:100%;display:flex;align-items:center;justify-content:center;">
      <router-link to="/table1">去填写主表</router-link>
  </div>
</template>
<script>
import Table1 from "./table1.vue";
import Table2 from "./table2.vue";
import Table3 from "./table3.vue";
import Table4 from "./table4.vue";

import Table5 from "./table5.vue";
import Table6 from "./table6.vue";
import Table7 from "./table7.vue";
import Table8 from "./table8.vue";
import Table9 from "./table9.vue";
export default {
  data() {
    return {
      activeName: "in-first",
      inputOutputValueId: "",
      canRender: false,
    };
  },
  components: {
    Table1,
    Table2,
    Table3,
    Table4,
    Table5,
    Table6,
    Table7,
    Table8,
    Table9,
  },
  methods: {
    handleClick(tab, event) {
      console.log(tab, event);
    },
  },
  mounted() {
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if (!this.inputOutputValueId) {
      this.$message.error({message:"没有主表ID",duration:0});
      return;
    }
    this.canRender = true;
  },
};
</script>
<style lang="less">
.wrap{
  .el-tabs{
    height: 100%;
  }
  .el-tabs__content{
    height: 100%;
  }
}
  
</style>