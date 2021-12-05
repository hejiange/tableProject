<template>
  <div class="user-list">
      <div style="font-size:16px;color:#333;margin-top:10px">用户列表</div>
    <div class="table-wrap">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="姓名" width="180">
        </el-table-column>
        <el-table-column prop="password" label="密码"> </el-table-column>
        <el-table-column prop="phone" label="手机号"> </el-table-column>
        <el-table-column prop="organization" label="单位"> </el-table-column>
        <el-table-column prop="lastLoginTime" label="登录时间">
        </el-table-column>
      </el-table>
    </div>
  </div>
</template>
<script>
import Api from "../api";
export default {
  data() {
    return {
      tableData: [],
    };
  },
  activated(){
      this.getData()
  },
  methods: {
    getData() {
      let url = "/user/list";
      Api.post(url, {}).then((res) => {
        if (res.code == "200") {
          let { records } = res.data;
          this.tableData = records;
        }
      });
    },
  },
  created() {
    this.getData();
  },
};
</script>
<style lang="less" scoped>
.user-list {
  height: 100%;
  width: 100%;
  display: flex;
  align-items: center;
  flex-direction: column;
}
.table-wrap {
    padding-top: 20px;
  width: 80%;
}
</style>