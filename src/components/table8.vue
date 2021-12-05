<template>
  <div class="page-container">
    <div style="width: 100%">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>表3 科技成果已获效益表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="row grid width1">类别</div>
            <div style="display: flex">
              <div class="row grid width2">名称</div>
              <div class="row grid width2">数值</div>
            </div>
          </div>
          <div class="section">
            <div class="row grid width1">计算参数</div>
            <div style="display: flex">
              <div>
                <div class="row grid width2">经济效益计算年限（年）</div>
                <div class="row grid width2">年利率</div>
                <div class="row grid width2">缩减指数</div>
                <div class="row grid width2">间接科研费用系数</div>
                <div class="row grid width2">科研单位经济效益分计系数</div>
              </div>
              <div>
                <div class="row grid width2">{{info.yearCount}}</div>
                <div class="row grid width2">5%</div>
                <div class="row grid width2">{{info.ratio}}</div>
                <div class="row grid width2">{{info.indirectRatio}}</div>
                <div class="row grid width2">{{info.achievementRatio}}</div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="row grid width1">部分基础数据</div>
            <div style="display: flex">
              <div>
                <div class="row grid width2">已推广年限</div>
                <div class="row grid width2">已推广规模（万亩）</div>
                <div class="row grid width2">可能推广规模（万亩）</div>
                <div class="row grid width2">研制年限（年）</div>
                <div class="row grid width2">直接科研经费（万元）</div>
              </div>
              <div>
                <div class="row grid width2">{{info.pastPromoteYearCount}}</div>
                <div class="row grid width2">{{info.pastPromote}}</div>
                <div class="row grid width2">{{info.futurePromote}}</div>
                <div class="row grid width2">{{info.researchYearCount}}</div>
                <div class="row grid width2">{{info.researchCost}}</div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="row grid width1">经济效益指标</div>
            <div style="display: flex">
              <div>
                <div class="row grid width2">直接经济效益（万元）</div>
                <div class="row grid width2">间接经济效益（万元）</div>
                <div class="row grid width2">预期经济效益（万元）</div>
                <div class="row grid width2">科研投资年均收益（万元）</div>
              </div>
              <div>
                <div class="row grid width2">{{info.directEconomyCost}}</div>
                <div class="row grid width2">{{info.indirectEconomyCost}}</div>
                <div class="row grid width2">{{info.futureEconomyCost}}</div>
                <div class="row grid width2">{{info.avgEconomyCost}}</div>
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
      inputOutputValueId:"",
      info: {
        yearCount: 0,
        // nianlilv:"5%",
        ratio: 0.0,
        indirectRatio: 0.0,
        achievementRatio: 0.0,
        pastPromoteYearCount: 0,
        pastPromote: 0.0,
        futurePromote: 0.0,
        researchYearCount: 0,
        researchCost: 0.0,
        directEconomyCost: 0.0,
        indirectEconomyCost: 0.0,
        futureEconomyCost: 0.0,
        avgEconomyCost: 0.0,
      },
    };
  },
  methods:{
    getData(){
      let { inputOutputValueId } = this;
      let url = `/output/caculate/${inputOutputValueId}`;
      Api.get(url)
        .then((res) => {
          if (res.code == "200") {
            let info = res.data.outTable4 || {};
            this.info = info;
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
    }
  },
  activated(){
      let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.getData();
    }
  },
  mounted(){
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
     if (!this.inputOutputValueId) {
      this.$message.error({message:"没有主表ID",duration:0});
      return;
    }
    this.getData();
  }
};
</script>
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
        min-height: 30px;
        padding: 5px 10px;
      }
      .width1 {
        width: 130px;
      }
      .width2 {
        width: 260px;
      }
      .width3 {
        width: 60px;
      }
      .width4 {
        width: 85px;
        padding: 0 !important;
      }
      .width5 {
        width: 365px;
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
.explain-wrap {
  margin-top: 120px;
  margin-left: 40px;
}
</style>