<template>
  <div class="page-container">
    <div style="width: 100%">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>表5 社会生态价值计算表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="row grid width1">类型</div>
            <div style="display: flex">
              <div class="row grid width2">明细</div>
              <div class="row grid width2">数值（万元）</div>
            </div>
          </div>
          <div class="section">
            <div class="row grid width1">社会效益</div>
            <div style="display: flex">
              <div>
                <div class="row grid width2">农产品供给价值</div>
                <div class="row grid width2">社会保障价值</div>
                <div class="row grid width2">景观人文价值</div>
              </div>
              <div>
                <div class="row grid width2">{{ info.produceValue }}</div>
                <div class="row grid width2">{{ info.societyValue }}</div>
                <div class="row grid width2">{{ info.landScapeValue }}</div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="row grid width1">生态效益</div>
            <div style="display: flex">
              <div>
                <div class="row grid width2">固碳制氧服务价值</div>
                <div class="row grid width2">减施节能减排价值</div>
                <div class="row grid width2">水土涵养功能价值</div>
              </div>
              <div>
                <div class="row grid width2">
                  {{ info.carbonValue }}
                </div>
                <div class="row grid width2">{{ info.energyValue }}</div>
                <div class="row grid width2">{{ info.waterValue }}</div>
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
        produceValue: 0.0,
        societyValue: 0.0,
        landScapeValue: 0.0,
        carbonValue: 0.0,
        energyValue: 0.0,
        waterValue: 0.0,
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
  methods:{
    getData(){
      let { inputOutputValueId } = this;
      let url = `/output/caculate/${inputOutputValueId}`;
      Api.get(url)
        .then((res) => {
          if (res.code == "200") {
            let info = res.data.outTable5 || {};
            this.info = info;
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
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