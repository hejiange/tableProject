<template>
  <div class="page-container">
    <div style="width: 100%">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>表1 推广规模和新增效益计算表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="grid width1">阶段</div>
            <div style="display: flex">
              <div class="grid width2">年份</div>
              <div class="grid width2">离基准年年数</div>
              <div class="grid width2">复利或贴现系数(r=5%)</div>
              <div>
                <div>
                  <div class="grid width2">当年推广</div>
                  <div class="grid width2">规模</div>
                </div>
              </div>
              <div>
                <div>
                  <div class="grid">当年新增纯收益（万元）</div>
                  <div>
                    <div class="flex-row">
                      <div class="grid flex1 width2">当年值</div>
                      <div class="grid flex1 width2">复利或贴现值</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div class="grid">推广总费用（万元）</div>
                  <div>
                    <div class="flex-row">
                      <div class="grid flex1 width2">当年值</div>
                      <div class="grid flex1 width2">复利或贴现值</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div class="grid">当年新增直接纯收益（万元）</div>
                  <div>
                    <div class="flex-row">
                      <div class="grid flex1 width2">当年值</div>
                      <div class="grid flex1 width2">复利或贴现值</div>
                    </div>
                  </div>
                </div>
              </div>
              <div>
                <div>
                  <div class="grid">当年新增间接纯收益（万元）</div>
                  <div>
                    <div class="flex-row">
                      <div class="grid flex1 width2">当年值</div>
                      <div class="grid flex1 width2">复利或贴现值</div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="grid width1">已推广规模</div>
            <div>
              <div v-for="(yearItem, k) in past" :key="k" style="display: flex">
                <div class="grid width2">{{ yearItem.year }}</div>
                <div class="grid width2">
                  {{ yearItem.standardYears }}
                </div>
                <div class="grid width2">{{ yearItem.ratio }}</div>
                <div class="grid width2">{{ yearItem.promote }}</div>
                <div class="grid width2">
                  {{ yearItem.increaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.promoteAmount }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioPromoteAmount }}
                </div>
                <div class="grid width2">
                  {{ yearItem.directIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioDirectIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.indirectIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioIndirectIncreaseInput }}
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="grid width1">未来推广阶段</div>
            <div>
              <div
                v-for="(yearItem, k) in future"
                :key="k"
                style="display: flex"
              >
                <div class="grid width2">{{ yearItem.year }}</div>
                <div class="grid width2">
                  {{ yearItem.standardYears }}
                </div>
                <div class="grid width2">{{ yearItem.ratio }}</div>
                <div class="grid width2">{{ yearItem.promote }}</div>
                <div class="grid width2">
                  {{ yearItem.increaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.promoteAmount }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioPromoteAmount }}
                </div>
                <div class="grid width2">
                  {{ yearItem.directIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioDirectIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.indirectIncreaseInput }}
                </div>
                <div class="grid width2">
                  {{ yearItem.ratioIndirectIncreaseInput }}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
export default {
  data() {
    return {
      inputOutputValueId: "",
      past: [
        {
          year: "2021",
          standardYears: 0,
          ratio: 0.0,
          promote: 0.0,
          increaseInput: 0.0,
          ratioIncreaseInput: 0.0,
          promoteAmount: 0.0,
          ratioPromoteAmount: 0.0,
          directIncreaseInput: 0.0,
          ratioDirectIncreaseInput: 0.0,
          indirectIncreaseInput: 0.0,
          ratioIndirectIncreaseInput: 0.0,
        },
      ],
      future: [
        {
          year: "2022",
          standardYears: 0,
          ratio: 0.0,
          promote: 0.0,
          increaseInput: 0.0,
          ratioIncreaseInput: 0.0,
          promoteAmount: 0.0,
          ratioPromoteAmount: 0.0,
          directIncreaseInput: 0.0,
          ratioDirectIncreaseInput: 0.0,
          indirectIncreaseInput: 0.0,
          ratioIndirectIncreaseInput: 0.0,
        },
      ],
    };
  },
  methods: {
    getData() {
      let { inputOutputValueId } = this;
      let url = `/output/caculate/${inputOutputValueId}`;
      Api.get(url)
        .then((res) => {
          if (res.code == "200") {
            let { future = [], past = [] } = res.data.outTable1;
            this.past = past;
            this.future = future;
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
    },
  },
   activated(){
      let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.getData();
    }
  },
  mounted() {
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
     if (!this.inputOutputValueId) {
      this.$message.error({message:"没有主表ID",duration:0});
      return;
    }
    this.getData();
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
  // margin-top: 120px;
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
        width: 95px;
      }
      .width2 {
        width: 125px;
      }
      .width3 {
        width: 250px;
      }
      .grid {
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
        box-sizing: border-box;
        min-height: 30px;
      }
      .height-100 {
        height: 100%;
      }
    }
  }
}
</style>