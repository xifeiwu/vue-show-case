<template>
  <div id="v-charts_line">
    <div class="chart-container">
      <ve-line height="300px" :data="chartData" :data-zoom="dataZoom"></ve-line>
    </div>
    <div class="chart-container">
      <ve-line height="300px" :data="chartData2" :settings="chartSettings2" :events="chartEvents"></ve-line>
    </div>
    <div class="chart-container">
      <ve-line height="300px" :data="chartData3" :settings="chartSettings3"></ve-line>
    </div>
  </div>
</template>

<style lang="scss" scoped>
  #v-charts_line {
    /*display: flex;*/
    .chart-container {
      float: left;
      width: 50%;
      box-sizing: border-box;
      border-radius: 10px;
      padding: 16px 16px 0px 16px;
      .ve-line {
        top: 12px;
        box-shadow: 0 0 10px rgba(0, 0, 0, .2);
        canvas {
          top: 12px;
        }
      }
    }
  }
</style>
<script>
  import 'echarts/lib/component/dataZoom'
  import VeLine from 'v-charts/lib/line.common'
  export default {
    components: { VeLine },
    data() {
      return {
        dataZoom: [
          {
            type: 'slider',
            start: 0,
            end: 20
          }
        ],
        chartData: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        },
        chartSettings2: {
          metrics: ['下单率'],
          dimension: ['日期'],
          height: "300px"
        },
        chartEvents: {
          click: (evt) => {
            console.log(evt);
          }
        },
        chartData2: {
          columns: ['日期', '下单率', '访问用户', '下单用户'],
          rows: [
            { '日期': '1/1', '下单率': 0.32 },
            { '日期': '1/2', '下单率': 0.26 },
            { '日期': '1/3', '下单率': 0.76 },
            { '日期': '1/4', '下单率': 0.49 },
            { '日期': '1/5', '下单率': 0.323 },
            { '日期': '1/6', '下单率': 0.78 }
          ]
        },
        chartSettings3: {
          axisSite: { right: ['下单率'] },
          yAxisType: ['KMB', 'percent'],
          yAxisName: ['数值', '比率'],

        },
        chartData3: {
          columns: ['日期', '访问用户', '下单用户', '下单率'],
          rows: [
            { '日期': '1/1', '访问用户': 1393, '下单用户': 1093, '下单率': 0.32 },
            { '日期': '1/2', '访问用户': 3530, '下单用户': 3230, '下单率': 0.26 },
            { '日期': '1/3', '访问用户': 2923, '下单用户': 2623, '下单率': 0.76 },
            { '日期': '1/4', '访问用户': 1723, '下单用户': 1423, '下单率': 0.49 },
            { '日期': '1/5', '访问用户': 3792, '下单用户': 3492, '下单率': 0.323 },
            { '日期': '1/6', '访问用户': 4593, '下单用户': 4293, '下单率': 0.78 }
          ]
        }
      }
    },
    methods: {
    }
  }
</script>