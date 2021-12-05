<template>
  <div class="page-container">
    <div style="width: 100%"  v-loading="submiting">
      <div style="display:inline-flex">
        <div class="main-table-wrap">
          <div class="table-title-wrap">
            <span>表4 社会生态价值数据表</span>
          </div>
          <div class="table-content">
            <div class="section">
              <div class="row grid width1">序号</div>
              <div class="row grid width2">考察指标</div>
              <div class="row grid width3">单位</div>
              <div class="row grid width4">指标值</div>
              <div class="row grid width5">指标释义</div>
            </div>
            <div class="section">
              <div class="row grid width1">1</div>
              <div class="row grid width2">新增就业人数</div>
              <div class="row grid width3">人</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.increasePerson"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">带动当地新增就业人数</div>
            </div>
            <div class="section">
              <div class="row grid width1">2</div>
              <div class="row grid width2">地区平均年工资水平</div>
              <div class="row grid width3">元</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.avgSalary"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">农村地区的平均工资水平</div>
            </div>
            <div class="section">
              <div class="row grid width1">3</div>
              <div class="row grid width2">作物经济产量</div>
              <div class="row grid width3">kg</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.cropsOutput"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">作物收获的主产品的干物质总量</div>
            </div>
            <div class="section">
              <div class="row grid width1">4</div>
              <div class="row grid width2">作物经济系数</div>
              <div class="row grid width3">/</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.cropsEconomyRatio"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">作物经济产量与作物产量的百分比</div>
            </div>
            <div class="section">
              <div class="row grid width1">5</div>
              <div class="row grid width2">作物含水率</div>
              <div class="row grid width3">%</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.cropsWaterRatio"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">作物水分质量与作物质量百分比</div>
            </div>
            <div class="section">
              <div class="row grid width1">6</div>
              <div class="row grid width2">推广地区年降雨量</div>
              <div class="row grid width3">mm</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.rainfall"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">平均年降水量</div>
            </div>
            <div class="section">
              <div class="row grid width1">7</div>
              <div class="row grid width2">作物蓄水系数</div>
              <div class="row grid width3">/</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.sluiceRatio"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">作物储水能力</div>
            </div>
            <div class="section">
              <div class="row grid width1">8</div>
              <div class="row grid width2">生态系统类型</div>
              <div class="row grid width3">/</div>
              <div class="row grid width4">
                <el-select v-model="target.ecosystemType" placeholder="请选择">
                  <el-option
                    v-for="item in ecosystemTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="row grid width5">
                四川陆地生态系统单位面积景观人文功能价值单价
              </div>
            </div>
            <div class="section">
              <div class="row grid width1">9</div>
              <div class="row grid width2">二氧化碳交易价格</div>
              <div class="row grid width3">元/吨</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.carbonDioxidePrice"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">以碳交易市场价格为参考价</div>
            </div>
            <div class="section">
              <div class="row grid width1">10</div>
              <div class="row grid width2">农产品供给价值</div>
              <div class="row grid width3">元</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.produceValue"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">
                农产品保障、损失减少或供给增加总价值
              </div>
            </div>
            <div class="section">
              <div class="row grid width1">11</div>
              <div class="row grid width2">减施节能减排价值</div>
              <div class="row grid width3">元</div>
              <div class="row grid width4">
                <el-input
                  onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                  v-model="target.savingValue"
                  placeholder="请输入"
                ></el-input>
              </div>
              <div class="row grid width5">
                依据农业科技成果推广后的减施化肥量、减施农药量、节约能源值、减少温室气体及臭气排放等减施节能减排具体指标进行合价计算。也可进行客观描述。
              </div>
            </div>
          </div>
        </div>
        <div class="explain-wrap">
          <div class="explain-item">
            <img src="../assets/table4_explain1.png" alt="">
          </div>
          <div class="explain-item">
            <img src="../assets/table4_explain2.png" alt="">
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-if="!isView">
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
export default {
  data() {
    return {
      isView:false,
      submiting:false,
      inputOutputValueId: "", //主表ID
      ecosystemTypeOptions: [
        {
          label: "森林",
          value: 1,
        },
        {
          label: "草地",
          value: 2,
        },
        {
          label: "农田",
          value: 3,
        },
        {
          label: "湿地",
          value: 4,
        },
        {
          label: "水体",
          value: 5,
        },
        {
          label: "荒漠",
          value: 6,
        },
      ],
      target: {
        increasePerson: "", //新增就业人数
        avgSalary: "", // 地区平均年工资水平
        cropsOutput: "", //作物经济产量
        cropsEconomyRatio: "", //作物经济系数
        cropsWaterRatio: "", //作物含水率
        rainfall: "", //推广地区降雨量
        sluiceRatio: "", //作物蓄水系数
        ecosystemType: 1,
        carbonDioxidePrice: "", //二氧化碳交易价格
        produceValue: "", //农产品供给价值
        savingValue: "", //减施节能减排价值
      },
    };
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
            let info = res.data.inTable4 || {};
            this.target = info;
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
    },
    submit() {
      let { target } = this;
      let { inputOutputValueId } = this;
      let url = "/socialEcology/save";
      if(!inputOutputValueId) {
        alert("请先填写主表");
        return;
      }
      this.submiting = true;
      let param = {
        inputOutputValueId,
        ...target,
      };
      Api.post(url, param)
        .then((res) => {
          this.submiting = false;
          if (res.code == "200") {
            this.$router.push({name:'table-out',query: {id:inputOutputValueId}})
          } else {
            // this.$message.error('保存失败，错误信息：' + res.msg);
          }
          console.log(res, "res");
        })
        .catch((resp) => {
          // this.$message.error('发生未知异常，保存失败');
          this.submiting = false;
        });
    },
  },
  created(){
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.isView = true;
      this.getData();
    }
  },
  mounted(){
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
  }
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
      //   .section-left {
      //     width: 250px;
      //     display: flex;
      //   }
      //   .section-right {
      //     flex: 1;
      //     display: flex;
      //   }
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
        width: 180px;
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
.explain-wrap{
  margin-top: 120px;
  margin-left: 40px;
}
</style>