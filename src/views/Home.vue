<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
<div>
  <div class="vx-row mb-5">
    <div class="vx-col w-full md:w-2/3">
        <vx-card title="Client Retention">
            <div class="flex">
                <span class="flex items-center"><div class="h-3 w-3 rounded-full mr-1 bg-primary"></div><span>New Clients</span></span>
                <span class="flex items-center ml-4"><div class="h-3 w-3 rounded-full mr-1 bg-danger"></div><span>Retained Clients</span></span>
            </div>
            <vue-apex-charts type="bar" height="370" :options="clientRetentionBar.chartOptions" :series="clientRetentionBar.series" />
        </vx-card>
    </div>
    <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
        <vx-card title="">
            <div slot="no-body">
                <vue-apex-charts class="mb-8" type="donut" height="325" :options="sessionsByDeviceDonut.chartOptions" :series="sessionsByDeviceDonut.series" />
            </div>

            <ul class="mt-6">
                <li v-for="deviceData in sessionsByDeviceDonut.analyticsData" :key="deviceData.device" class="flex mb-3">
                    <feather-icon :icon="deviceData.icon" :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"></feather-icon>
                    <span class="ml-2 inline-block font-semibold">{{ deviceData.device }}</span>
                    <span class="mx-2">-</span>
                    <span class="mr-4">{{ deviceData.sessionsPercentage }}%</span>
                    <div class="ml-auto flex -mr-1">
                    <span class="mr-1">{{ deviceData.comparedResultPercentage }}%</span>
                    <feather-icon :icon=" deviceData.comparedResultPercentage < 0 ? 'ArrowDownIcon' : 'ArrowUpIcon'" :svgClasses="[deviceData.comparedResultPercentage < 0 ? 'text-danger' : 'text-success'  ,'stroke-current h-4 w-4 mb-1 mr-1']"></feather-icon>
                    </div>
                </li>
            </ul>
        </vx-card>
    </div>
  </div>

  <div class="vx-row">
    <div class="vx-col w-full md:w-2/3 mb-base">
      <AdminDashboardTable/>
    </div>
    <!-- RADIAL CHART -->
    <div class="vx-col w-full md:w-1/3 mb-base">
        <vx-card :title="selectedCabinData.cruiseName">
            <template slot="actions">
                <feather-icon icon="HelpCircleIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
            </template>

            <!-- CHART -->
            <template slot="no-body">
                <div class="mt-10">
                    <vue-apex-charts type="radialBar" height="240" :options="goalOverview.chartOptions" :series="goalOverview.series" />
                </div>
            </template>

            <!-- DATA -->
            <div class="flex justify-between text-center mt-6" slot="no-body-bottom">
                <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0 border-l-0">
                    <p class="mt-4">Sold Cabin</p>
                    <p class="mb-4 text-3xl font-semibold">{{selectedCabinData.blockedCabin}}</p>
                </div>
                <div class="w-1/2 border border-solid d-theme-border-grey-light border-r-0 border-b-0">
                    <p class="mt-4">Available Cabin</p>
                    <p class="mb-4 text-3xl font-semibold">{{selectedCabinData.availableCabin}}</p>
                </div>
            </div>
        </vx-card>
    </div>
  </div>
</div>
</template>

<script>
import AdminDashboardTable from './components/AdminDashboardTable'
import VueApexCharts from 'vue-apexcharts'
export default {
  data () {
    return {
      // RADIAL BAR
      goalOverview: {
        series: [0],
        chartOptions: {
          plotOptions: {
            radialBar: {
              size: 110,
              startAngle: -150,
              endAngle: 150,
              hollow: {
                size: '77%'
              },
              track: {
                background: '#bfc5cc',
                strokeWidth: '50%'
              },
              dataLabels: {
                name: {
                  show: false
                },
                value: {
                  offsetY: 18,
                  color: '#99a2ac',
                  fontSize: '4rem'
                }
              }
            }
          },
          colors: ['#00db89'],
          fill: {
            type: 'gradient',
            gradient: {
              shade: 'dark',
              type: 'horizontal',
              shadeIntensity: 0.5,
              gradientToColors: ['#00b5b5'],
              inverseColors: true,
              opacityFrom: 1,
              opacityTo: 1,
              stops: [0, 100]
            }
          },
          stroke: {
            lineCap: 'round'
          },
          chart: {
            sparkline: {
              enabled: true
            },
            dropShadow: {
              enabled: true,
              blur: 3,
              left: 1,
              top: 1,
              opacity: 0.1
            }
          }
        }
      },

      sessionsByDeviceDonut: {
        analyticsData: [
             { device: 'Pending Payment', icon: 'MonitorIcon', color: 'primary', sessionsPercentgae: 58.6, comparedResultPercentage: 2 },
             { device: 'Sold', icon: 'SmartphoneIcon', color: 'warning', sessionsPercentgae: 34.9, comparedResultPercentage: 8 },
         ],
        comparedResult: [2, -3, 8],
        series:[1,1],
        chartOptions: {
          labels: ['Pending Payment', 'Sold'],
          dataLabels: {
            enabled: false
          },
          legend: { show: false },
          chart: {
            offsetY: 30,
            type: 'donut',
            toolbar: {
              show: false
            }
          },
          stroke: { width: 0 },
          colors: ['#7961F9', '#FF9F43'],
          fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: ['#9c8cfc', '#FFC085']
            }
          }
        }
      },

      clientRetentionBar: {
        series: [{
            name: 'New Clients',
            data: [175, 125, 225, 175, 160, 189, 206, 134, 159, 216, 148, 123]
        }, {
            name: 'Retained Clients',
            data: [-144, -155, -141, -167, -122, -143, -158, -107, -126, -131, -140, -137]
        }],
          chartOptions: {
            grid: {
              borderColor: '#ebebeb',
              padding: {
                left: 0,
                right: 0
              }
            },
            legend: {
              show: false
            },
            dataLabels: {
              enabled: false
            },
            chart: {
              stacked: true,
              type: 'bar',
              toolbar: { show: false }
            },
            colors: ['#7367F0', '#EA5455'],
            plotOptions: {
              bar: {
                columnWidth: '10%'
              }
            },
            xaxis: {
              labels: {
                style: {
                  cssClass: 'text-grey fill-current'
                }
              },
              axisTicks: {
                show: false
              },
              categories: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'],
              axisBorder: {
                show: false
              }
            },
            yaxis: {
              tickAmount: 5,
              labels: {
                style: {
                  cssClass: 'text-grey fill-current'
                }
              }
            },
            tooltip: {
              x: { show: false }
            }
          }
      },

      selectedCabinData:{
          soldCabin:0,
          availableCabin:0,
          cruiseName:null
      }
    }
  },
  computed: {
    selectedCruise () {
      return this.$store.state.dashboard.selectedCruise
    },
    getBookingsToday(){
      return this.$store.state.booking.getBookingsToday
    }
  },
  watch : {
    selectedCruise () {
       this.selectedCabinData.availableCabin=Number(this.$store.state.dashboard.selectedCruise.vesselCabinCount)-Number(this.$store.state.dashboard.selectedCruise.soldCabins.length)
       this.selectedCabinData.blockedCabin=this.$store.state.dashboard.selectedCruise.soldCabins.length
       this.selectedCabinData.cruiseName=this.$store.state.dashboard.selectedCruise.name

        let result= (Number(this.$store.state.dashboard.selectedCruise.soldCabins.length)*100)/Number(this.$store.state.dashboard.selectedCruise.vesselCabinCount)

        console.log(result);
      this.goalOverview.series=[]
       this.goalOverview.series.push(result.toFixed(2))
    },
    getBookingsToday(){
      this.sessionsByDeviceDonut.series=[]
        this.sessionsByDeviceDonut.series.push(this.getBookingsToday.todayPendingPayment)
        this.sessionsByDeviceDonut.series.push(this.getBookingsToday.todaySold)
        console.log(this.sessionsByDeviceDonut.series);
    }
  },
  methods: {

  },
  components:{
    AdminDashboardTable,
    VueApexCharts
  },
  async created(){
    await this.$store.dispatch("getBookingsToday");
  }

}
</script>