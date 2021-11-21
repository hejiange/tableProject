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
          <span>投入产出价值表</span>
        </div>
        <div class="table-content">
          <div class="table-des-area">
            <div class="table-row flex">
              <div class="label grid">项目名称</div>
              <div class="value grid">
                <el-input placeholder="请输入" v-model="name"></el-input>
              </div>
            </div>
            <div class="table-row flex">
              <div class="label grid">缩减系数</div>
              <div class="value grid">
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
            <div class="table-row flex">
              <div class="label grid">成果类型</div>
              <div class="value grid">
                <el-select v-model="achievementType" placeholder="请选择">
                  <el-option
                    v-for="item in achievementTypeOptions"
                    :key="item.value"
                    :label="item.label"
                    :value="item.value"
                  >
                  </el-option>
                </el-select>
              </div>
              <div class="grid" style="flex: 0.6">年份</div>
            </div>
            <div class="table-row flex">
              <div class="value grid">
                实验（加工）规模（亩、头、公斤、亩/小时和公斤/小时）
              </div>
            </div>
            <div class="flex">
              <div class="label r-b-border align-self-stretch">
                投入（万元）
              </div>
              <div class="value parent-cloumn-grid">
                <div class="table-row grid">直接成本</div>
                <div class="table-row grid">间接成本</div>
                <div class="table-row grid">其他成本</div>
                <div class="table-row grid">合计</div>
              </div>
            </div>
            <div class="flex">
              <div class="label r-b-border align-self-stretch">
                产出（万元）
              </div>
              <div class="value parent-cloumn-grid">
                <div class="table-row grid">直接产出</div>
                <div class="table-row grid">间接产出</div>
                <div class="table-row grid">其他产出</div>
                <div class="table-row grid">合计</div>
              </div>
            </div>
          </div>
          <div class="table-data-area">
            <div
              class="data-group"
              v-for="(group, index) in groups"
              :key="index"
            >
              <div class="data-group-title grid">{{ group.title }}</div>
              <div class="data-group-years-wrap flex">
                <div
                  class="data-group-year"
                  v-for="(yearItem, y) in group.years"
                  :key="y"
                >
                  <div class="data-group-grid">{{ yearItem.year }}</div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      v-model="yearItem.other"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.other }}</span>
                  </div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      v-model="yearItem.in.directCost"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.in.directCost }}</span>
                  </div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      v-model="yearItem.in.indirectCost"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.in.indirectCost }}</span>
                  </div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      v-model="yearItem.in.otherCost"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.in.otherCost }}</span>
                  </div>
                  <div class="data-group-grid bolder">
                    <span>{{ yearItem.in.all }}</span>
                  </div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      v-model="yearItem.out.directOutput"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.out.directOutput }}</span>
                  </div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      v-model="yearItem.out.indirectOutput"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.out.indirectOutput }}</span>
                  </div>
                  <div class="data-group-grid">
                    <el-input
                      v-if="group.type !== 'text'"
                      onkeyup="this.value = this.value.replace(/[^\d.]/g,'');"
                      v-model="yearItem.out.otherOutput"
                      placeholder="请输入"
                    ></el-input>
                    <span v-else>{{ yearItem.out.otherOutput }}</span>
                  </div>
                  <div class="data-group-grid bolder">
                    <span>{{ yearItem.out.all }}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="data-total-area">
            <div class="data-total-title grid">总计</div>
            <div class="data-group-grid bolder">
              <span>{{ total.other }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.in.directCost }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.in.indirectCost }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.in.otherCost }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.in.all }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.out.directOutput }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.out.indirectOutput }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.out.otherOutput }}</span>
            </div>
            <div class="data-group-grid bolder">
              <span>{{ total.out.all }}</span>
            </div>
          </div>
        </div>
      </div>
      <div style="margin-top: 10px">
        <el-button type="primary" @click="addYears" :disabled="addBtnDisable">年份+1</el-button>
        <el-button type="primary" @click="submit">提交</el-button>
      </div>
    </div>
  </div>
</template>
<script>
import _ from "lodash";
import Api from '@/api';
const TPL = {
  year: 2021, //Muban
  other: "",
  in: {
    directCost: "", //直接
    indirectCost: "", //间接
    otherCost: "",
    all: "",
  },
  out: {
    directOutput: "", //直接
    indirectOutput: "", //间接
    otherOutput: "",
    all: "",
  },
};
export default {
  data() {
    return {
      name: "xxx项目",
      addBtnDisable:false,
      startYears: "",
      addUpToYears: "",
      pickerOptions: {
        disabledDate: (time) => {
          return time.getTime() > Date.now() - 8.64e7;
        },
      },
      ratioOptions: [
        {
          value: 0.5,
          label: "0.5",
        },
        {
          value: 0.6,
          label: "0.6",
        },
        {
          value: 0.7,
          label: "0.7",
        },
        {
          value: 0.8,
          label: "0.8",
        },
        {
          value: 0.9,
          label: "0.9",
        },
      ],
      ratio: 0.5,
      achievementTypeOptions: [
        {
          value: "1",
          label: "创造发明类科技成果",
        },
        {
          value: "2",
          label: "改进提高类科技成果",
        },
      ],
      achievementType: "1",
      groups: {
        newFruit: {
          title: "新成果",
          years: [
            {
              year: 2021,
              other: "",
              in: {
                directCost: "", 
                indirectCost: "", 
                otherCost: "",
                all: "",
              },
              out: {
                directOutput: "", 
                indirectOutput: "", 
                otherOutput: "",
                all: "",
              },
            },
          ],
        },
        compare: {
          title: "对照成果",
          years: [
            {
              year: 2021,
              other: "",
              in: {
                directCost: "", 
                indirectCost: "", 
                otherCost: "",
                all: "",
              },
              out: {
                directOutput: "", 
                indirectOutput: "", 
                otherOutput: "",
                all: "",
              },
            },
          ],
        },
        change: {
          title: "变化值",
          type: "text",
          years: [
            {
              year: 2021,
              other: "",
              in: {
                directCost: "", 
                indirectCost: "", 
                otherCost: "",
                all: "",
              },
              out: {
                directOutput: "",
                indirectOutput: "", 
                otherOutput: "",
                all: "",
              },
            },
          ],
        },
      },
      total: {
        other: "",
        in: {
          directCost: "", //直接
          indirectCost: "", //间接
          otherCost: "",
          all: "",
        },
        out: {
          directOutput: "", //直接
          indirectOutput: "", //间接
          otherOutput: "",
          all: "",
        },
      },
    };
  },
  watch: {
    startYears(v) {
      console.log(v);
      this.addUpToYears = v;
      this.setDefaultYearsData(v);
    },
    groups: {
      handler(v) {
        console.log(v, "changeGroup");
        this.calculate(v);
      },
      deep: true,
      immediate: true,
    },
    addUpToYears(v){
      let curYear = new Date().getFullYear();
      if(Number(v) >= curYear){
        this.addBtnDisable = true;
      }else{
        this.addBtnDisable = false;
      }
    }
  },
  mounted() {},
  methods: {
    setDefaultYearsData(year) {
      let { groups } = this;
      _.each(groups, (groupItem) => {
        let _tpl = _.cloneDeep(TPL);
        groupItem.years = [
          {
            ..._tpl,
            year: year,
          },
        ];
      });
      this.groups = groups;
    },
    addYears() {
      let { addUpToYears, groups, addBtnDisable } = this;
      if(addBtnDisable) return;
      let cYear = addUpToYears * 1 + 1;
      this.addUpToYears = cYear;
      _.each(groups, (groupItem) => {
        let _tpl = _.cloneDeep(TPL);
        groupItem.years.push({
          ..._tpl,
          year: cYear,
        });
      });
      this.groups = groups;
    },
    calculate(groups) {
      let { total } = this;
      let { newFruit: news, compare, change } = groups;
      let { years } = change;
      _.each(years, (yearItem, index) => {
        let newsCurYear = news.years[index];
        let compareCurYear = compare.years[index];
        yearItem.other = newsCurYear.other * 1 - compareCurYear.other * 1;
        yearItem.in.directCost =
          newsCurYear.in.directCost * 1 - compareCurYear.in.directCost * 1;
        yearItem.in.indirectCost =
          newsCurYear.in.indirectCost * 1 - compareCurYear.in.indirectCost * 1;
        yearItem.in.otherCost =
          newsCurYear.in.otherCost * 1 - compareCurYear.in.otherCost * 1;
        //
        yearItem.out.directOutput =
          newsCurYear.out.directOutput * 1 -
          compareCurYear.out.directOutput * 1;
        yearItem.out.indirectOutput =
          newsCurYear.out.indirectOutput * 1 -
          compareCurYear.out.indirectOutput * 1;
        yearItem.out.otherOutput =
          newsCurYear.out.otherOutput * 1 - compareCurYear.out.otherOutput * 1;
      });

      let arr = [
        "other",
        "in.directCost",
        "in.indirectCost",
        "in.otherCost",
        "in.all",
        "out.directOutput",
        "out.indirectOutput",
        "out.otherOutput",
        "out.all"
      ];
      _.each(arr, (k) => {
        let m = k.split('.');
        if(m[1]){
          this.total[m[0]][m[1]] = _.reduce(
          news.years,
          function (sum, year) {
            return sum * 1 + year[m[0]][m[1]] * 1;
          },
          0
        );
        }else{
          this.total[m[0]] = _.reduce(
          news.years,
          function (sum, year) {
            return sum * 1 + year[m[0]] * 1;
          },
          0
        );
        }
      });
      setTimeout(() => {
        _.each(this.groups, (groupItem) => {
          let { years } = groupItem;
          _.each(years, (yearItem) => {
            let { other = 0, in: ins, out } = yearItem;
            let { directCost = 0, indirectCost = 0, otherCost = 0 } = ins;
            let { directOutput = 0, indirectOutput = 0, otherOutput = 0 } = out;
            let inAll =
              other * 1 + directCost * 1 + indirectCost * 1 + otherCost * 1;
            let outAll =
              directOutput * 1 + indirectOutput * 1 + otherOutput * 1;
            yearItem.in.all = inAll;
            yearItem.out.all = outAll;
          });
        });
      }, 30);
    },
    valideData(){
      let { name, groups } = this;
      let flag = true;
      let errorMessage = '';
      if(!name) {
        errorMessage = '请输入项目名称';
        flag = false;
      }
      _.each(groups,(groupItem)=>{
        let { years } = groupItem;
        _.each(years,(yearItem)=>{
          let { other, in: ins, out, year } = yearItem;
          let { directCost, indirectCost, otherCost } = ins;
          let { directOutput, indirectOutput, otherOutput } = out;
          if(other === '' || directCost === '' || indirectCost ==='' || otherCost === '' || directOutput === '' || indirectOutput === '' || otherOutput === ''){
            errorMessage = '表格不能有空';
            flag = false;
          }
        })
      })
      if(!flag){
        alert(errorMessage);
      }
      return flag;
    },
    submit(){
      let { groups, name, ratio, achievementType  } = this;
      let isOK = this.valideData();
      if(!isOK) return;
      let url = '/inputOutputValue/save';
      let param = {
        name,
        ratio,
        achievementType,
        groups
      }
      Api.post(url,param).then((res)=>{
        if(code.code == '200'){
          alert('保存成功');
        }else{
          alert('保存失败');
        }
        console.log(res,'res')
			}).catch((resp)=>{
        
			})
    }
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
    display: flex;
    .input {
      width: 100%;
      padding: 0;
      border: 0;
    }
    .grid {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
      height: 100%;
      display: flex;
      justify-content: center;
      align-items: center;
    }
    .align-self-stretch {
      align-self: stretch;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    .r-b-border {
      border-right: 1px solid #ccc;
      border-bottom: 1px solid #ccc;
    }
    .parent-cloumn-grid {
      display: flex;
      flex-direction: column;
    }
    .table-row {
      height: 34px;
      display: flex;
    }
    .table-des-area {
      width: 469px;
      .label {
        width: 140px;
      }
      .value {
        flex: 1;
      }
    }
    .table-data-area {
      display: flex;
      .data-group {
        .data-group-title {
          height: 68px;
        }
        .data-group-grid {
          width: 90px;
          height: 34px;
          border-right: 1px solid #ccc;
          border-bottom: 1px solid #ccc;
          display: flex;
          justify-content: center;
          align-items: center;
        }
      }
    }
    .data-total-area {
      display: block;
      .data-total-title {
        height: 102px;
      }
      .data-group-grid {
        width: 72px;
        height: 34px;
        border-right: 1px solid #ccc;
        border-bottom: 1px solid #ccc;
        display: flex;
        justify-content: center;
        align-items: center;
      }
    }
    .flex {
      display: flex;
      justify-content: center;
      align-items: center;
    }
  }
  .bolder{
    font-weight: 600;
    color:#333;
  }
}
</style>
