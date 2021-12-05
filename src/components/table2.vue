<template>
  <div class="page-container">
    <div v-if="!startYears && !isView" class="change-years-wrap">
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
    <div v-else style="width: 100%" v-loading="submiting">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>推广规模和推广费用表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="section-left row grid">经济收益计算年限：</div>
            <div class="section-right row grid">{{ yearCount }}</div>
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
                <div v-for="(yearItem, k) in promote" :key="k" class="flex1">
                  <div class="grid row">{{ yearItem.year }}</div>
                </div>
                <div class="flex1">
                  <div class="grid row">小计</div>
                </div>
              </div>
            </div>
            <div class="section-right flex-cloumn">
              <div v-for="(yearItem, k) in promote" :key="k" class="flex-row">
                <div class="grid row width1">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="yearItem.promote"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid row width1">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="yearItem.benefit"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid row width2">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="yearItem.unitCost"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid row width1">
                  {{ yearItem.cost }}
                </div>
              </div>
              <div class="flex-row">
                <div class="grid row width1">{{ promoteSubTotal.promote }}</div>
                <div class="grid row width1">{{ promoteSubTotal.benefit }}</div>
                <div class="grid row width2">
                  {{ promoteSubTotal.unitCost }}
                </div>
                <div class="grid row width1">{{ promoteSubTotal.cost }}</div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="section-left">
              <div class="flex1">
                <div class="grid height-100">未来推广阶段</div>
              </div>
              <div class="flex1">
                <div
                  v-for="(yearItem, k) in futurePromote"
                  :key="k"
                  class="flex1"
                >
                  <div class="grid row">{{ yearItem.year }}</div>
                </div>
                <div class="flex1">
                  <div class="grid row">小计</div>
                </div>
              </div>
            </div>
            <div class="section-right flex-cloumn">
              <div
                v-for="(yearItem, k) in futurePromote"
                :key="k"
                class="flex-row"
              >
                <div class="grid row width1">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="yearItem.promote"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid row width1">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="yearItem.benefit"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid row width2">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="yearItem.unitCost"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid row width1">
                  {{ yearItem.cost }}
                </div>
              </div>
              <div class="flex-row">
                <div class="grid row width1">
                  {{ futurePromoteSubTotal.promote }}
                </div>
                <div class="grid row width1">
                  {{ futurePromoteSubTotal.benefit }}
                </div>
                <div class="grid row width2">
                  {{ futurePromoteSubTotal.unitCost }}
                </div>
                <div class="grid row width1">
                  {{ futurePromoteSubTotal.cost }}
                </div>
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
                <div class="grid row width1">{{ allTotal.promote }}</div>
                <div class="grid row width1">{{ allTotal.benefit }}</div>
                <div class="grid row width2">{{ allTotal.unitCost }}</div>
                <div class="grid row width1">{{ allTotal.cost }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-if="!isView">
        <el-button type="primary" @click="addYears1" :disabled="addBtnDisable"
          >已推广年份+1</el-button
        >
        <el-button type="primary" @click="addYears2">未来年份+1</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
const TPL = {
  year: "",
  promote: "", //推广规模
  benefit: "", //效益规模
  unitCost: "", //单位费用
  cost: "", //推广费用
};
export default {
  data() {
    return {
      isView:false,
      submiting: false,
      startYears: "",
      addUpToYears: "",
      addUpToYears2: "",
      addBtnDisable: false,
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      inputOutputValueId: "", //表1返回的id
      // yearCount: 0, //经济计算收益年限
      promote: [
        //已推广阶段
      ],
      promoteSubTotal: {
        promote: "", //推广规模
        benefit: "", //效益规模
        unitCost: "", //单位费用
        cost: "", //推广费用
      },
      futurePromote: [
        //未来推广阶段
      ],
      futurePromoteSubTotal: {
        promote: "", //推广规模
        benefit: "", //效益规模
        unitCost: "", //单位费用
        cost: "", //推广费用
      },
    };
  },
  created(){
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.isView = true;
      this.getData();
    }
  },
  watch: {
    startYears(v) {
      console.log(v);
      this.addUpToYears = v;
      this.setDefaultYearsData(v);
    },
    addUpToYears(v) {
      let curYear = new Date().getFullYear();
      if (Number(v) >= curYear) {
        this.addBtnDisable = true;
      } else {
        this.addBtnDisable = false;
      }
    },
    promote: {
      handler(v) {
        this.calculate1(v);
      },
      deep: true,
      immediate: true,
    },
    futurePromote: {
      handler(v) {
        this.calculate2(v);
      },
      deep: true,
      immediate: true,
    },
    //todo 计算
  },
  computed: {
    yearCount() {
      let { futurePromote, promote } = this;
      if (futurePromote.length && promote.length) {
        return (
          futurePromote[futurePromote.length - 1].year - promote[0].year + 1
        );
      } else {
        return "";
      }
    },
    allTotal() {
      let { futurePromoteSubTotal, promoteSubTotal } = this;
      return {
        promote: futurePromoteSubTotal.promote + promoteSubTotal.promote, //推广规模
        benefit: futurePromoteSubTotal.benefit + promoteSubTotal.benefit, //效益规模
        unitCost: futurePromoteSubTotal.unitCost + promoteSubTotal.unitCost, //单位费用
        cost: futurePromoteSubTotal.cost + promoteSubTotal.cost //推广费用
      };
    },
  },
   activated(){
      let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.isView = true;
      this.getData();
    }
  },
  methods: {
    getData(){
      let { inputOutputValueId } = this;
      let url = `/output/caculate/${inputOutputValueId}`;
      Api.get(url)
        .then((res) => {
          if (res.code == "200") {
            let info = res.data.inTable2 || {};
            this.futurePromote = info.futurePromote;
            this.promote = info.promote;
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
    },
    calculate1(list) {
      let map = {
        promote: 0, //推广规模
        benefit: 0, //效益规模
        unitCost: 0, //单位费用
        cost: 0, //推广费用
      };
      _.each(list, (item) => {
        let { promote, benefit, unitCost, cost } = item;
        let _cost = promote * unitCost * 1;
        item.cost = _cost;
        map.promote += promote * 1;
        map.benefit += benefit * 1;
        map.unitCost += unitCost * 1;
        map.cost += _cost * 1;
      });
      this.promoteSubTotal = map;
    },
    calculate2(list) {
      let map = {
        promote: 0, //推广规模
        benefit: 0, //效益规模
        unitCost: 0, //单位费用
        cost: 0, //推广费用
      };
      _.each(list, (item) => {
        let { promote, benefit, unitCost, cost } = item;
        let _cost = promote * unitCost * 1;
        item.cost = _cost;
        map.promote += promote * 1;
        map.benefit += benefit * 1;
        map.unitCost += unitCost * 1;
        map.cost += _cost * 1;
      });
      this.futurePromoteSubTotal = map;
    },
    setDefaultYearsData(year) {
      let _tpl = _.cloneDeep(TPL);
      this.promote.push({
        ..._tpl,
        futureType: 1,
        year,
      });
      let addUpToYears2 = new Date().getFullYear() + 1;
      this.addUpToYears2 = addUpToYears2;
      this.futurePromote.push({
        ..._tpl,
        futureType: 2,
        year: addUpToYears2,
      });
    },
    addYears1() {
      let { addUpToYears, addBtnDisable } = this;
      if (addBtnDisable) return;
      let cYear = addUpToYears * 1 + 1;
      this.addUpToYears = cYear;
      let _tpl = _.cloneDeep(TPL);
      this.promote.push({
        ..._tpl,
        futureType: 1,
        year: cYear,
      });
    },
    addYears2() {
      let { addUpToYears2, groups } = this;
      let cYear = addUpToYears2 * 1 + 1;
      this.addUpToYears2 = cYear;
      let _tpl = _.cloneDeep(TPL);
      this.futurePromote.push({
        ..._tpl,
        futureType: 2,
        year: cYear,
      });
    },
    submit() {
      let { promote, futurePromote, inputOutputValueId, yearCount } = this;
      let url = "/promote/save";
      if (!inputOutputValueId) {
        this.$message.error("请先填写主表");
        return;
      }
      this.submiting = true;
      let param = {
        inputOutputValueId,
        promote,
        futurePromote,
        yearCount,
      };
      Api.post(url, param)
        .then((res) => {
          this.submiting = false;
          if (res.code == "200") {
            this.$router.push({
              name: "table3",
              query: { id: inputOutputValueId },
            });
          } else {
            // this.$message.error("保存失败，错误信息：" + res.msg);
          }
          console.log(res, "res");
        })
        .catch((resp) => {
          // this.$message.error('发生未知异常，保存失败');
          this.submiting = false;
        });
    },
  },
  mounted() {
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
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
      height: 29px;
      line-height: 29px;
    }
    .el-input__inner {
      border: none !important;
      height: 29px;
      line-height: 29px;
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
 position: absolute;
  top:0;
  bottom:0;
  left:0;
  right: 0;
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
      .flex-cloumn {
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
      .height-100 {
        height: 100%;
      }
    }
  }
}
</style>