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
  <div v-if="role==roles[0]">
  
    <div class="vx-row mb-5">
      <div class="vx-col w-full lg:w-1/3 lg:mt-0 mt-base">
          <vx-card title="">
              <div slot="no-body">
                  <vue-apex-charts type="donut" height="290" :options="sessionsByDeviceDonut.chartOptions" :series="sessionsByDeviceDonut.series" />
              </div>

              <ul class="mt-6">
                  <li v-for="deviceData in sessionsByDeviceDonut.analyticsData" :key="deviceData.device" class="flex mb-3">
                      <feather-icon :icon="deviceData.icon" :svgClasses="[`h-5 w-5 stroke-current text-${deviceData.color}`]"></feather-icon>
                      <span class="ml-2 inline-block font-semibold">{{ deviceData.device }}</span>
                      <span class="mx-2">-</span>
                      <div class="ml-auto flex -mr-1">
                      <span class="mr-1">{{ Number(deviceData.comparedResultPercentage) }}</span>
                      </div>
                  </li>
              </ul>
          </vx-card>
      </div>
      <!-- RADIAL CHART -->
      <div class="vx-col w-full md:w-1/3 lg:mt-0 mb-base">
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

    <div class="vx-row">
      <div class="vx-col w-full md:w-3/3 mb-base">
        <AdminDashboardTable/>
      </div>
      
    </div>

  </div>
  
  <div v-if="role==roles[1]">
    <div class="vx-row">
      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="CpuIcon"
            icon-right
            :statistic="allBookingsByAgencyDetail.totalPrice| priceFormat"
            statisticTitle="Total Reservation Price (tax included)" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="ServerIcon"
            icon-right
            :statistic="allBookingsByAgencyDetail.agencyCost  || 0 | priceFormat"
            statisticTitle="Total Agency Cost (tax included)"
            color="success" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line
            className="danger"
            hideChart
            class="mb-base"
            icon="ActivityIcon"
            icon-right
            :statistic="allBookingsByAgencyDetail.balance || 0 | priceFormat"
            statisticTitle="Total Balance"
            color="danger" />
      </div>

      <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
          <statistics-card-line
            hideChart
            class="mb-base"
            icon="AlertOctagonIcon"
            icon-right
            :statistic="allBookingsByAgencyDetail.profit  || 0 | priceFormat"
            statisticTitle="Total Profit"
            color="warning" />
      </div>
    </div>

     <AgencyDashboardTable/>

  </div>

</div>
</template>

<script>
import AdminDashboardTable from './components/AdminDashboardTable'
import AgencyDashboardTable from './components/AgencyDashboardTable'
import VueApexCharts from 'vue-apexcharts'
import StatisticsCardLine from '../../src/components/statistics-cards/StatisticsCardLine'
export default {
  data () {
    return {
      todayPendingPayment:10,
      todaySold:10,
      role:null,
      roles:['manager','agency'],
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
             { device: 'Pending Payment', icon: 'MonitorIcon', color: 'danger', comparedResultPercentage: 0 },
             { device: 'Sold', icon: 'SmartphoneIcon', color: 'success', comparedResultPercentage: 0 },
         ],
        comparedResult: [2, -3, 8],
        series:[0,0],
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
          colors: ['#A93226', '#145A32'],
          fill: {
            type: 'gradient',
            gradient: {
              gradientToColors: ['#FF0000', '#B0FF47']
            }
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
    },
    allBookingsByAgencyDetail(){
      return this.$store.state.booking.AllBookingsByAgencyDetail
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
        this.sessionsByDeviceDonut.analyticsData[0].comparedResultPercentage=this.getBookingsToday.todayPendingPayment
        this.sessionsByDeviceDonut.analyticsData[1].comparedResultPercentage=this.getBookingsToday.todaySold
        console.log("getBookingsToday",this.sessionsByDeviceDonut.series);
    }
  },
  methods: {
    async allBookingbyAgencyDetail() {
      await this.$store.dispatch("getAllbookingsbyagencydetail");
    }
  },
  components:{
    StatisticsCardLine,
    AdminDashboardTable,
    AgencyDashboardTable,
    VueApexCharts
  },
  async created(){
    await this.$store.dispatch("getBookingsToday");
    this.role = JSON.parse(localStorage.getItem('agency')).role;
    this.allBookingbyAgencyDetail()
  }

}
</script>