<template>
  <div id="echarts">
    <div class="cpu-monitor"></div>
  </div>
</template>

<style lang="scss" scoped>
 #echarts {
   .cpu-monitor {
     width: 800px;
     height: 400px;
   }
 }
</style>

<script>
  import {mapState} from "vuex";
  export default {
    create() {

    },
    mounted() {
      try {
        this.startDraw();
      } catch (err) {
        console.log(err);
      }
    },
    methods: {
      async startDraw() {
        const loaded = await this.$net.lazyLoad('/assets/libs/echarts/echarts.simple.min.js');
        const cpuMonitor = this.$el.querySelector('.cpu-monitor');
        var myChart = echarts.init(cpuMonitor);
//        myChart.setOption(this.options1);
        myChart.setOption(this.options2);
      },
      handleClick(action) {
        switch (action) {
          case 'nofity':
            const title = '错误';
            const message = 'message';
            this.$notify.error({
              title,
              message: message,
              duration: 0
            });
            break;
        }
      }
    },
    computed: {
      ...mapState({'echarts': 'echarts'}),
      aqiBeijing() {
        let result = null;
        if (this.echarts) {
          if (this.echarts.hasOwnProperty('aqiBeijing')) {
            result =  this.echarts['aqiBeijing'];
          }
        }
        return result;
      },
      options2() {
        return {
          title: {
            text: 'Beijing AQI'
          },
          tooltip: {
            trigger: 'axis'
          },
          xAxis: {
            data: this.aqiBeijing.map(function (item) {
              return item[0];
            })
          },
          yAxis: {
            splitLine: {
              show: false
            }
          },
          toolbox: {
            left: 'center',
            feature: {
              dataZoom: {
                yAxisIndex: 'none'
              },
              restore: {},
              saveAsImage: {}
            }
          },
          dataZoom: [{
            startValue: '2014-06-01'
          }, {
            type: 'inside'
          }],
          visualMap: {
            top: 10,
            right: 10,
            pieces: [{
              gt: 0,
              lte: 50,
              color: '#096'
            }, {
              gt: 50,
              lte: 100,
              color: '#ffde33'
            }, {
              gt: 100,
              lte: 150,
              color: '#ff9933'
            }, {
              gt: 150,
              lte: 200,
              color: '#cc0033'
            }, {
              gt: 200,
              lte: 300,
              color: '#660099'
            }, {
              gt: 300,
              color: '#7e0023'
            }],
            outOfRange: {
              color: '#999'
            }
          },
          series: {
            name: 'Beijing AQI',
            type: 'line',
            data: this.aqiBeijing.map(function (item) {
              return item[1];
            }),
            markLine: {
              silent: true,
              data: [{
                yAxis: 50
              }, {
                yAxis: 100
              }, {
                yAxis: 150
              }, {
                yAxis: 200
              }, {
                yAxis: 300
              }]
            }
          }
        }
      },
    },
    data() {
      return {
        options1: {
          title: {
            text: '折线图堆叠'
          },
          tooltip: {
            trigger: 'axis'
          },
          legend: {
            data:['邮件营销','联盟广告','视频广告','直接访问','搜索引擎']
          },
          grid: {
            left: '3%',
            right: '4%',
            bottom: '3%',
            containLabel: true
          },
          toolbox: {
            feature: {
              saveAsImage: {}
            }
          },
          xAxis: {
            type: 'category',
            boundaryGap: false,
            data: ['周一','周二','周三','周四','周五','周六','周日']
          },
          yAxis: {
            type: 'value'
          },
          series: [
            {
              name:'邮件营销',
              type:'line',
              stack: '总量',
              smooth: true,
              data:[120, 132, 101, 134, 90, 230, 210]
            },
            {
              name:'联盟广告',
              type:'line',
              stack: '总量',
              smooth: true,
              data:[220, 182, 191, 234, 290, 330, 310]
            },
            {
              name:'视频广告',
              type:'line',
              stack: '总量',
              data:[150, 232, 201, 154, 190, 330, 410]
            },
            {
              name:'直接访问',
              type:'line',
              stack: '总量',
              data:[320, 332, 301, 334, 390, 330, 320]
            },
            {
              name:'搜索引擎',
              type:'line',
              stack: '总量',
              smooth: true,
              data:[820, 932, 901, 934, 1290, 1330, 1320]
            }
          ]
        }
      }
    }
  }
</script>