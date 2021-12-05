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
    <div v-else style="width: 100%"  v-loading="submiting">
      <div class="main-table-wrap">
        <div class="table-title-wrap">
          <span>表3 科研费用表</span>
        </div>
        <div class="table-content">
          <div class="section">
            <div class="section-left row grid">科研机构类型</div>
            <div class="section-right row grid">
              <el-select v-model="ratio" placeholder="请选择">
                <el-option
                  v-for="item in ratioOptions"
                  :key="item.value"
                  :label="item.label"
                  :value="item.value"
                >
                </el-option>
              </el-select>
            </div>
          </div>
          <div class="section">
            <div class="section-left row grid">科研成果研制年限</div>
            <div class="section-right row grid">{{yearConut}}</div>
          </div>
          <div class="section">
            <div class="section-left row grid">年份</div>
            <div class="section-right row">
              <div class="flex-row">
                <div class="grid flex1 width1 row">推广规模</div>
                <div class="grid flex1 width1 row">产生效益的规模</div>
              </div>
            </div>
          </div>
          <div class="section" v-for="(item, k) in years" :key="k">
            <div class="section-left row grid">{{ item.year }}</div>
            <div class="section-right row">
              <div class="flex-row">
                <div class="grid flex1 width1 row">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="item.directCost"
                    placeholder="请输入"
                  ></el-input>
                </div>
                <div class="grid flex1 width1 row">
                  <el-input
                    onkeyup="this.value = this.value.replace(/[^\d.]/g,'');this.dispatchEvent(new Event('compositionend'))"
                    v-model="item.indirectCost"
                    placeholder="请输入"
                  ></el-input>
                </div>
              </div>
            </div>
          </div>
          <div class="section">
            <div class="section-left row grid">合计</div>
            <div class="section-right row">
              <div class="flex-row">
                <div class="grid flex1 width1 row">{{ directCostTotal }}</div>
                <div class="grid flex1 width1 row">{{ indirectCostTotal }}</div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px" v-if="!isView">
        <el-button type="primary" @click="addYears">年份+1</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import Api from "@/api";
import _ from "lodash";
const TPL = {
  directCost: "", //直接费用
  indirectCost: "", //间接费用
};
export default {
  data() {
    return {
      isView:false,
      submiting:false,
      inputOutputValueId:"",
      startYears: "",
      ratio: 1,
      ratioOptions: [
        {
          value: 1,
          label: "中央级科研机构",
        },
        {
          value: 2,
          label: "省级科研机构",
        },
        {
          value: 3,
          label: "地（市）级科研机构",
        },
        {
          value: 4,
          label: "县级科研机构",
        },
      ],
      addUpToYears: "",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      organizationType: "",
      years: [],
      directCostTotal: 0,
      indirectCostTotal: 0,
    };
  },
  watch: {
    startYears(v) {
      console.log(v);
      this.setDefaultYearsData(v);
    },
    years: {
      handler(v) {
        if (v) {
            console.log(111111)
             console.log(v)
          let map = _.reduce(v,function(sumMap,item){
              let { directCost, indirectCost } = item;
              let { directCostTotal, indirectCostTotal } = sumMap;
            return {
                directCostTotal:directCostTotal * 1 + directCost * 1,
                indirectCostTotal:indirectCostTotal * 1 + indirectCost * 1
            }
          },{
            directCostTotal:0,
            indirectCostTotal:0
          })
          this.directCostTotal = map.directCostTotal;
          this.indirectCostTotal = map.indirectCostTotal;
        }
      },
      deep: true,
      immediate: true,
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
   created(){
    let query = this.$route.query;
    this.inputOutputValueId = query.id;
    if(query.id){
      this.isView = true;
      this.getData();
    }
  },
  computed:{
    yearConut(){
      let { years } = this;
      if(years.length){
        return years[years.length - 1].year - years[0].year + 1
      }
      return ''
      
    }
  },
  methods: {
     getData(){
      let { inputOutputValueId } = this;
      let url = `/output/caculate/${inputOutputValueId}`;
      Api.get(url)
        .then((res) => {
          if (res.code == "200") {
            let info = res.data.inTable3 || {};
            this.organizationType = info.organizationType;
            this.years = info.years || [];
          }
          console.log(res, "res");
        })
        .catch((resp) => {});
    },
    setDefaultYearsData(year) {
      let _tpl = _.cloneDeep(TPL);
      this.addUpToYears = year;
      this.years.push({
        ..._tpl,
        year: year,
      });
    },
    addYears() {
      let { addUpToYears } = this;
      let _tpl = _.cloneDeep(TPL);
      let cYear = addUpToYears * 1 + 1;
      this.addUpToYears = cYear;
      this.years.push({
        ..._tpl,
        year: cYear,
      });
    },
    submit() {
      let { ratio, years, inputOutputValueId } = this;
      let url = "/research/save";
      if(!inputOutputValueId) {
        alert("请先填写主表");
        return;
      }
      this.submiting = true;
      let param = {
        inputOutputValueId,
        organizationType: ratio, //机构类型（1：中央级科研机构，2：省级科研机构，3：地（市）级科研机构，4：县级科研机构）
        years: years,
      };
      Api.post(url, param)
        .then((res) => {
          this.submiting - false;
          if (res.code == "200") {
              this.$router.push({name:'table4',query: {id:inputOutputValueId}})
          } else {
            // this.$message.error('保存失败，错误信息：' + res.msg);
          }
          console.log(res, "res");
        })
        .catch((resp) => {
          // this.$message.error('发生未知异常，保存失败');
          this.submiting = false;
        });
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