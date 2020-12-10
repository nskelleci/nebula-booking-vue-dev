<template>
  <div v-if="isLoad" id="page-user-view">
    <div class="vx-row">
      <div class="vx-col lg:w-1/2 w-full">
        <vx-card v-if="isLoad" class="mb-base">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="ColumnsIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Cabin Detail</span>
        </div>
         <vs-divider />
          <table>
            <tr>
              <td class="font-semibold">Bed Type</td>
              <td>{{ booking.cabin.bedType.name }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Cabin Category</td>
              <td>{{ booking.cabin.cabinCategory.name }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Capacity</td>
              <td>{{ booking.cabin.capacity }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Description</td>
              <td>{{ booking.cabin.description }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Number</td>
              <td>{{ booking.cabin.number }}</td>
            </tr>
          </table>
        </vx-card>
      </div>
      <div class="vx-col lg:w-1/2 w-full">
        <vx-card v-if="isLoad" class="mb-base">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="FlagIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Cruise Detail</span>
        </div>
        <vs-divider />
          <table>
            <tr>
              <td class="font-semibold">CheckIn Date</td>
              <td>{{ booking.cruise.checkInDate | formatShortDate }}</td>
            </tr>
            <tr>
              <td class="font-semibold">CheckOut Date</td>
              <td>{{ booking.cruise.checkOutDate | formatShortDate }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Cruise Name</td>
              <td>{{ booking.cruise.cruiseType.name }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Cruise Description</td>
              <td>{{ booking.cruise.description }}</td>
            </tr>
            <tr>
              <td class="font-semibold">Vessel Name</td>
              <td>{{ booking.cruise.vessel.name }}</td>
            </tr>
          </table>
        </vx-card>
      </div>
      <div class="vx-col lg:w-2/2 w-full">
        <vx-card v-if="isLoad" class="mb-base">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="AlignJustifyIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Rezervation Note</span>
        </div>
        <vs-divider />
        <vs-textarea label="Rezervation Note" v-model="booking.notes"/>
        </vx-card>
      </div>
    </div>

   <vx-card>
    <div class="vx-row">
      <div class="vx-col w-full">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="UserIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Passengers</span>
        </div>
        <vs-divider />
        <passengers/>
      </div>
    </div>
  </vx-card>
  </div>
</template>
<script>
import router from '../../router'
const passengers = () => import('./components/passengers.vue')
export default {
  data() {
    return {
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      isLoad:false,

    };
  },
  components: {
    passengers,
  },
  computed : {
    booking (){
      return this.$store.state.booking.getBookingID
    }
  },
  methods: {
    async getBooking() {
      this.$emit('searchQuery', `Deneme`)
      await this.$store.dispatch("getBookingbyId",this.$route.params.id);
      if(this.$store.state.booking.getBookingID==null){
        router.push({name : 'mybookings'})
      }
      this.isLoad=true
    },
  },
  created(){
    if(this.$route.params.id==null){
      router.push({name : 'mybookings'})
    }
  },
  mounted(){
    this.isMounted = true;
    this.getBooking()
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
