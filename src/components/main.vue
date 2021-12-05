<template>
  <div class="container">
    <div class="left-area">
      <div class="mesage-wrap">
        <div class="mesage-content">欢迎使用xxx系统</div>
      </div>
      <el-menu default-active="2" class="menu-wrap" @select="select">
        <el-submenu index="1" v-if="hasUserPer">
          <template slot="title">
            <i class="el-icon-user-solid"></i>
            <span>用户管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="user-list">用户列表</el-menu-item>
            <el-menu-item index="add-user">添加用户</el-menu-item>
          </el-menu-item-group>
        </el-submenu>
        <el-submenu index="2" v-if="hasTableSave || hasTableManage">
          <template slot="title">
            <i class="el-icon-document"></i>
            <span>数据管理</span>
          </template>
          <el-menu-item-group>
            <el-menu-item index="addData" v-if="hasTableSave"
              >添加数据</el-menu-item
            >
            <el-menu-item index="data-list" v-if="hasTableManage"
              >数据列表</el-menu-item
            >
          </el-menu-item-group>
        </el-submenu>
      </el-menu>
    </div>
    <div class="right-area">
      <keep-alive>
        <router-view></router-view>
      </keep-alive>
    </div>
  </div>
</template>
<script>
import Api from "../api";
import _ from "lodash";
export default {
  data() {
    return {
      permissionList: [],
      curCom: "",
    };
  },
  components: {},
  computed: {
    hasUserPer() {
      let { permissionList } = this;
      return _.includes(permissionList, "USER_PER");
    },
    hasTableSave() {
      let { permissionList } = this;
      return _.includes(permissionList, "TABLE_SAVE");
    },
    hasTableManage() {
      let { permissionList } = this;
      return _.includes(permissionList, "TABLE_MANAGE");
    },
  },
  methods: {
    getRule() {
      let url = "/user/auth";
      let permissionList = [];
      Api.get(url).then((res) => {
        if (res.code == "200") {
          let { data = [] } = res;
          _.each(data, (item) => {
            let { permission } = item;
            permissionList.push(permission);
          });
          this.permissionList = permissionList;
        } else {
          // this.$message.error({
          //   message: res.msg,
          // });
        }
      });
    },
    select(index) {
      switch (index) {
        case "addData":
          this.$router.push("table1");
          break;
        case "user-list":
          this.$router.push("user-list");
          break;
        case "add-user":
          this.$router.push("add-user");
          break;
        case "data-list":
          this.$router.push("data-list");
          break;
      }
    },
  },
  created() {
    this.getRule();
  },
};
</script>
<style lang="less" scoped>
.container {
  height: 100%;
  display: flex;
  .left-area {
    height: 100%;
    width: 200px;
    flex-shrink: 0;
    .mesage-wrap {
      height: 100px;
      display: flex;
      align-items: center;
      justify-content: center;
      border-right: solid 1px #e6e6e6;
      border-bottom: solid 1px #e6e6e6;
      .mesage-content {
        font-size: 16px;
      }
    }
    .menu-wrap {
      height: calc(100% - 100px);
    }
  }
  .right-area {
    flex: 1;
    width: 0;
    overflow: auto;
    position: relative;
  }
}
</style>