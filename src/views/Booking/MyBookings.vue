<template>
<div class="vx-row">
  <div class="vx-col lg:w-5/5 w-full relative">
    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="bookings" @selected="handleSelected">
          <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

            <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
              <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ bookings.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : bookings.length }} of {{ queriedItems }}</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

              <vs-dropdown-menu>
                <vs-dropdown-item @click="itemsPerPage = 10">
                  <span>10</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 30">
                  <span>30</span>
                </vs-dropdown-item>
                <vs-dropdown-item @click="itemsPerPage = 50">
                  <span>50</span>
                </vs-dropdown-item>
              </vs-dropdown-menu>
            </vs-dropdown>
          </div>

          <template slot="thead">
            <vs-th sort-key="number">Rezervasyon No</vs-th>
            <vs-th sort-key="description">Cruise Name</vs-th>
            <vs-th sort-key="capacity">Cabin Number</vs-th>
            <vs-th sort-key="capacity">Passenger</vs-th>
            <vs-th sort-key="cabinCategory">Cruise Type</vs-th>
            <vs-th sort-key="bedType">Checkin Date</vs-th>
            <vs-th sort-key="df">Checkout Date</vs-th>
            <vs-th sort-key="df">Price</vs-th>
            <vs-th sort-key="df">Agency Cost</vs-th>
            <vs-th sort-key="df">Status</vs-th>
          </template>

          <template slot-scope="{ data }">
            <tbody>
              <vs-tr :data="bookings" :key="_id" v-for="(bookings, _id) in data">
                <vs-td>
                  <p class="product-name font-large truncate">
                    <vs-chip color="primary">
                        <span>{{ bookings.refNo }}</span> 
                    </vs-chip>
                  </p>
                </vs-td>

                <vs-td>
                  <p class="product-category">{{ bookings.cruise.name }}</p>
                </vs-td>
              
                <vs-td>
                <vs-chip color="success">
                  <span>{{ bookings.cabin.number }}</span>
                </vs-chip>
                </vs-td>
                <vs-td>
                  <p class="product-category">
                    {{ bookings.Passengers.length !== 0 ? bookings.Passengers[0].firstName + ' ' + bookings.Passengers[0].lastName : '-' }}
                  </p>
                </vs-td>

                <vs-td>
                  <p class="product-category">
                    {{ bookings.cruise.cruiseType.name }}
                  </p>
                </vs-td>

                <vs-td>
                  <p class="product-category">{{ bookings.cruise.checkInDate | formatShortDate}}</p>
                </vs-td>
                <vs-td>
                  <p class="product-category">{{ bookings.cruise.checkOutDate | formatShortDate }}</p>
                </vs-td>
                <vs-td>
                  <p class="product-category">{{ ""+bookings.totalPrice+"" | priceFormat }}</p>
                </vs-td>
                <vs-td>
                  <p class="product-category">{{ ""+bookings.agencyCost+"" | priceFormat }}</p>
                </vs-td>
                <vs-td>
                  <vs-chip :color="bookings.status!='pending payment' ? bookings.balance!=0 ? 'warning' : 'success' : 'danger' ">
                    <span>{{ bookings.status }}</span>
                  </vs-chip>
                </vs-td>
              </vs-tr>
            </tbody>
          </template>
        
    </vs-table>
  </div>
</div>
</template>
<script>
import router from '../../router'
export default {
  data() {
    return {
      selected: [],
      itemsPerPage: 10,
      bookings: [],
      isMounted: false,
    };
  },
  computed: {
    currentPage() {
      if (this.isMounted) {
        return this.$refs.table.currentx;
      }
      return 0;
    },
    queriedItems() {
      return this.$refs.table
        ? this.$refs.table.queriedResults.length
        : this.bookings.length;
    },
  },
  methods: {
    async allBooking() {
      await this.$store.dispatch("getAllbookingsbyagency");
      this.bookings = this.$store.state.booking.AllBookingsByAgency;
    },
    async allBookingbyAgencyDetail() {
      await this.$store.dispatch("getAllbookingsbyagencydetail");
      console.log(this.$store.state.booking.AllBookingsByAgencyDetail);
    },
    
    handleSelected(tr) {
      this.$vs.notify({
        title: `${tr.refNo}`,
        text: `Number: ${tr.cabin.number}`,
      });
      console.log(tr);
      for (let index = 0; index < this.bookings.length; index++) {
        if(this.bookings[index]._id==tr._id){
          router.push({name : 'mybookingsdetail', params: {id: tr._id,index:index} })
        }
      }
    },
  },
  mounted() {
    this.isMounted = true;
    this.allBooking();
    this.allBookingbyAgencyDetail();
  },
};
</script>