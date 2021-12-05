<template>
  <div class="page-container">
    <div style="width: 100%">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>表3 科技成果已获效益表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="row grid width2">项目</div>
            <div class="row grid width2">单位</div>
            <div class="row grid width2">数量</div>
          </div>
          <div class="section">
            <div class="row grid width2">已推广规模</div>
            <div class="row grid width2">亩/只/羽/公斤</div>
            <div class="row grid width2">{{ info.pastPromote }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">可能推广规模</div>
            <div class="row grid width2">亩/只/羽/公斤</div>
            <div class="row grid width2">{{ info.futurePromote }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">已推广规模占可能推广规模的比例</div>
            <div class="row grid width2">%</div>
            <div class="row grid width2">{{ info.promotePercent }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">科研费用复利值</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.ratioTotalCost }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">已推广期间应分摊的科研费用</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.shareCost }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">已投入的推广费用</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.promoteCost }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">已投入的推广费用复利值</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.ratioPromoteCost }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">预测期间应分摊的科研费用</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.futureShareCost }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">缩减系数</div>
            <div class="row grid width2"></div>
            <div class="row grid width2">{{ info.ratio }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">科技成果直接纯收益复利值</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.ratioDirect }}</div>
          </div>
          <div class="section">
            <div class="row grid width2">科技成果间接纯效益复利值</div>
            <div class="row grid width2">万元</div>
            <div class="row grid width2">{{ info.ratioIndirect }}</div>
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
        pastPromote: 0.0,
        futurePromote: 0.0,
        promotePercent: 0.0,
        ratioTotalCost: 0.0,
        shareCost: 0.0,
        promoteCost: 0.0,
        ratioPromoteCost: 0.0,
        futureShareCost: 0.0,
        ratio: 0.0,
        ratioDirect: 0.0,
        ratioIndirect: 0.0,
      },
    };
  },
  activated(){
      let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.getData();
    }
  },
  methods: {
    getData() {
      let { inputOutputValueId } = this;
      let url = `/output/caculate/${inputOutputValueId}`;
      Api.get(url)
        .then((res) => {
          if (res.code == "200") {
            let info = res.data.outTable3 || {};
            this.info = info;
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
    },
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
        width: 70px;
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