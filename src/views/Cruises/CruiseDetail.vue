<template>
  <div v-if="isLoad" id="page-user-view">
    <div class="vx-row">
      <div class="vx-col lg:w-2/2 w-full">
        <vx-card class="mb-base">
          <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="FlagIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Cruise Detail</span>
        </div>
        <vs-divider />
        <!-- Avatar -->
        <div class="vx-row">
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
            <tr>
              <td class="font-semibold">CheckIn Date</td>
              <td>{{ cruiseDetail.checkInDate | formatShortDate }}</td>
            </tr>
            <tr>
              <td class="font-semibold">CheckOut Date</td>
              <td>{{ cruiseDetail.checkOutDate | formatShortDate }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Cruise Type</td>
              <td>{{ cruiseDetail.cruiseType.name || "" }}</td>
            </tr>
            </table>
          </div>

          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Cruise Name</td>
                <td>{{ cruiseDetail.name || ""}}</td>
              </tr>
                          <tr>
              <td class="font-semibold">Cruise Description</td>
              <td>{{ cruiseDetail.description }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Vessel Name</td>
              <td>{{ cruiseDetail.vessel.name || "" }}</td>
            </tr>
            </table>
          </div>

        </div>
      </vx-card>
      </div>
    </div>
    <div class="vx-row">
      <div class="vx-col w-full mr-2 ml-2">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="UserIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Booking</span>
        </div>
        <vs-divider />
        <BookingByCruiseTable :id="$route.params.id"/>
      </div>
    </div>
  </div>
</template>
<script>
import router from '../../router'
const BookingByCruiseTable = () => import('./components/BookingByCruiseTable')
export default {
  data() {
    return {
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      isLoad:true,
      cruiseDetail : {}

    };
  },
  components: {
    BookingByCruiseTable,
  },
  computed : {
    
       //this.$store.state.cruise.cruise!=null ? 
    
  },
  methods: {
    async getCruiseDetail() {
      await this.$store.dispatch("getCruiseDetail",this.$route.params.id);
      this.cruiseDetail = this.$store.state.cruise.cruise 
    },
  },
  mounted(){
    this.isMounted = true;
    
  },
  created(){
    this.getCruiseDetail();
  }
};
</script>

<style lang="scss">
#page-user-view {
  table {
    td {
      vertical-align: top;
      min-width: 140px;
      padding-bottom: .8rem;
      word-break: break-all;
    }

    &:not(.permissions-table) {
      td {
        @media screen and (max-width:370px) {
          display: block;
        }
      }
    }
  }
}
</style>
