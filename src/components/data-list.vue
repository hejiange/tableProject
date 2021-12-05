<template>
  <div class="user-list">
      <div style="font-size:16px;color:#333;margin-top:10px">数据列表</div>
    <div class="table-wrap">
      <el-table :data="tableData" border style="width: 100%">
        <el-table-column prop="id" label="用户编号" width="180">
        </el-table-column>
        <el-table-column prop="name" label="创建人" width="180">
        </el-table-column>
        <el-table-column prop="projectName" label="项目名称"> </el-table-column>
        <el-table-column prop="userId" label="用户ID"> </el-table-column>
        <el-table-column prop="createTime" label="创建时间">
        </el-table-column>
        <el-table-column
      fixed="right"
      label="操作"
      width="100">
      <template slot-scope="scope">
        <el-button @click="handleClick(scope.row)" type="text" size="small">查看</el-button>
        <el-button type="text" size="small" @click="downLoad(scope.row)">下载</el-button>
      </template>
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
      let url = "/output/tableList";
      Api.post(url, {
          current:1,
          size:20
      }).then((res) => {
        if (res.code == "200") {
          let { records } = res.data;
          this.tableData = records;
        }
      });
    },
    downLoad(data){
        let { id, projectName } = data;
        const a = document.createElement("a");
            a.download = projectName + id + '.xlsx';
            a.href = `/output/export/${id}`;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
    },
    handleClick(data){
        let { id } = data;
        this.$router.push({
            name:"table-out",
            query:{
                id:id
            }
        })
    }
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