<template>
  <div class="page-container">
    <div v-if="!startYears" class="change-years-wrap">
      <span>请先选择开始年份：</span>
      <el-date-picker
        v-model="startYears"
        type="year"
        value-format="yyyy"
        :picker-options="pickerOptions"
        placeholder="选择年份"
      >
      </el-date-picker>
    </div>
    <div v-else style="width: 100%">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>推广规模和推广费用表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="section-left row grid">经济收益计算年限：</div>
            <div class="section-right row grid"></div>
          </div>
          <div class="section">
            <div class="section-left">
              <div class="grid flex1">阶段</div>
              <div class="grid flex1">年份</div>
            </div>
            <div class="section-right">
              <div>
                <div class="grid row">推广规模（亩）</div>
                <div class="flex-row">
                  <div class="grid flex1 width1 row">推广规模</div>
                  <div class="grid flex1 width1 row">产生效益的规模</div>
                </div>
              </div>
              <div class="grid width2">单位规模推广费用（元/亩）</div>
              <div class="grid width1">推广费用（元）</div>
            </div>
          </div>
          <div class="section">
            <div class="section-left">
              <div class="flex1">
                  <div class="grid height-100">已推广阶段</div>
              </div>
              <div class="flex1">
                  <div v-for="(yearItem,k) in promote" :key="k" class="flex1">
                      <div class="grid row">{{yearItem.year}}</div>
                  </div>
                  <div class="flex1">
                      <div class="grid row">小计</div>
                  </div>
              </div>
            </div>
            <div class="section-right flex-cloumn">
                <div v-for="(yearItem,k) in promote" :key="k" class="flex-row">
                    <div class="grid row width1">{{yearItem.promote}}</div>
                    <div class="grid row width1">{{yearItem.benefit}}</div>
                    <div class="grid row width2">{{yearItem.unitCost}}</div>
                    <div class="grid row width1">{{yearItem.cost}}</div>
                </div>
                <div class="flex-row">
                    <div class="grid row width1">0</div>
                    <div class="grid row width1">0</div>
                    <div class="grid row width2">0</div>
                    <div class="grid row width1">0</div>
                </div>
            </div>
          </div>
          <div class="section">
            <div class="section-left">
              <div class="flex1">
                  <div class="grid height-100">未来推广阶段</div>
              </div>
              <div class="flex1">
                  <div v-for="(yearItem,k) in futurePromote" :key="k" class="flex1">
                      <div class="grid row">{{yearItem.year}}</div>
                  </div>
                  <div class="flex1">
                      <div class="grid row">小计</div>
                  </div>
              </div>
            </div>
            <div class="section-right flex-cloumn">
                <div v-for="(yearItem,k) in futurePromote" :key="k" class="flex-row">
                    <div class="grid row width1">{{yearItem.promote}}</div>
                    <div class="grid row width1">{{yearItem.benefit}}</div>
                    <div class="grid row width2">{{yearItem.unitCost}}</div>
                    <div class="grid row width1">{{yearItem.cost}}</div>
                </div>
                <div class="flex-row">
                    <div class="grid row width1">0</div>
                    <div class="grid row width1">0</div>
                    <div class="grid row width2">0</div>
                    <div class="grid row width1">0</div>
                </div>
            </div>
          </div>
          <div class="section">
              <div class="section-left">
                  <div class="grid flex1 row"></div>
                  <div class="grid row flex1">合计</div>
              </div>
              <div class="section-right">
                  <div class="flex-row">
                    <div class="grid row width1">0</div>
                    <div class="grid row width1">0</div>
                    <div class="grid row width2">0</div>
                    <div class="grid row width1">0</div>
                </div>
              </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
const TPL = {
  year: "",
  promote: 0, //推广规模
  benefit: 0, //效益规模
  unitCost: 0, //单位费用
  cost: 0, //推广费用
};
export default {
  data() {
    return {
      startYears: "2020",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      inputOutputValueId: 0, //表1返回的id
      yearCount: 0, //经济计算收益年限
      promote: [
        //已推广阶段
        {
          year: "2020",
          promote: 0, //推广规模
          benefit: 0, //效益规模
          unitCost: 0, //单位费用
          cost: 0, //推广费用
        },
        {
          year: "2021",
          promote: 0, //推广规模
          benefit: 0, //效益规模
          unitCost: 0, //单位费用
          cost: 0, //推广费用
        },
      ],
      futurePromote: [
        //未来推广阶段
        {
          year: "2022",
          promote: 0,
          benefit: 0,
          unitCost: 0,
          cost: 0,
        },
      ],
    };
  },
  watch: {
    startYears(v) {
      console.log(v);
      this.addUpToYears = v;
      this.setDefaultYearsData(v);
    },
  },
  methods: {
    setDefaultYearsData() {
      //   let { groups } = this;
      //   _.each(groups, (groupItem) => {
      //     let _tpl = _.cloneDeep(TPL);
      //     groupItem.years = [
      //       {
      //         ..._tpl,
      //         year: year,
      //       },
      //     ];
      //   });
      //   this.groups = groups;
    },
  },
};
</script>
<style lang="less">
.main-table-wrap {
  .el-select {
    width: 100%;
  }
  .el-input {
    .el-input__icon {
      height: 32px;
      line-height: 32px;
    }
    .el-input__inner {
      border: none !important;
      height: 32px;
      line-height: 32px;
      text-align: center;
      font-size: 14px;
      &::placeholder {
        text-align: center;
      }
    }
  }
}
</style>
<style lang="less" scoped>
.page-container {
  display: flex;
  height: 100%;
  overflow: auto;
  justify-content: center;
  .change-years-wrap {
    display: flex;
    align-items: center;
    margin-top: -200px;
  }
}
.main-table-wrap {
  display: inline-flex;
  flex-direction: column;
  border-top: 1px solid #ccc;
  border-left: 1px solid #ccc;
  margin-top: 120px;
  align-self: flex-start;
  .table-title-wrap {
    display: flex;
    width: 100%;
    height: 44px;
    align-items: center;
    justify-content: center;
    font-size: 16px;
    color: #333;
    font-size: 16px;
    font-weight: 600;
    border-right: 1px solid #ccc;
    border-bottom: 1px solid #ccc;
  }
  .table-content {
    .section {
      display: flex;
      .section-left {
        width: 250px;
        display: flex;
       
      }
      .section-right {
        flex: 1;
        display: flex;
       
      }
      .flex-row {
        display: flex;
        flex-direction: row;
      }
      .flex-cloumn{
          flex-direction: column;
      }
      .flex1 {
        flex: 1;
      }
      .row {
        height: 30px;
      }
      .width1 {
        width: 200px;
      }
      .width2 {
        width: 250px;
      }
      .grid {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
      }
      .height-100{
          height: 100%;
      }
    }
  }
}
</style>