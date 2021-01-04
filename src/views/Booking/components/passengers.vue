<template>
  <div class="vx-row">
    <passenger-form :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <div class="vx-col lg:w-5/5 w-full relative">
      <vs-table ref="table" pagination :max-items="itemsPerPage" search :data="booking.Passengers">
            <div slot="header" class="flex flex-wrap-reverse items-center flex-grow">
              <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ booking.Passengers.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : booking.Passengers.length }} of {{ queriedItems }}</span>
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
            <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
            </div>
            </div>

           

            <template slot="thead">
              <vs-th sort-key="number">First Name</vs-th>
              <vs-th sort-key="description">Last Name</vs-th>
              <vs-th sort-key="capacity">Date of Birt</vs-th>
              <vs-th sort-key="cabinCategory">Phone Number</vs-th>
              <vs-th sort-key="bedType">Email</vs-th>
              <vs-th sort-key="df">Passport Expiry Date</vs-th>
              <vs-th sort-key="df">Passport No</vs-th>
              <vs-th sort-key="df">Status</vs-th>
              <vs-th sort-key="df">Action</vs-th>
            </template>

            <template slot-scope="{ data }">
              <tbody>
                <vs-tr :data="data" :key="index" v-for="(passenger, index) in data" >
                  <vs-td>
                    <p class="product-name font-large truncate">
                      <vs-chip color="primary">
                          <span>{{ passenger.firstName }}</span> 
                      </vs-chip>
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="product-category">{{ passenger.lastName }}</p>
                  </vs-td>
                <vs-td>
                    <p class="product-category">{{ passenger.Dob }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">
                      {{ passenger.phoneNumber }}
                    </p>
                  </vs-td>

                  <vs-td>
                    <p class="product-category">{{ passenger.email }}</p>
                  </vs-td>
                  <vs-td>
                    <p class="product-category">{{ passenger.passportExpiryDate }}</p>
                  </vs-td>
                  <vs-td>
                  <vs-chip color="success">
                    <span>{{ passenger.passportNo }}</span>
                  </vs-chip>
                  </vs-td>
                  <vs-td>
                  <vs-chip color="warning">
                    <span>{{ booking.status }}</span>
                  </vs-chip>
                  </vs-td>
                  
                  <vs-td class="whitespace-no-wrap">
                    <feather-icon icon="TrashIcon" svgClasses="w-6 h-6 hover:text-danger stroke-current" @click.stop="deletePassenger(index)" />
              </vs-td>
                </vs-tr>
              </tbody>
            </template>
            
      </vs-table>
    </div>
  </div>

</template>
<script>
const passengerForm= () => import('./PassengerForm.vue')
export default {
  data() {
    return {
      addNewDataSidebar: false,
      itemsPerPage: 10,
      isMounted: false,
      sidebarData: {},
      
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
        : this.booking.Passengers.length;
    },
    booking (){
      return this.$store.state.booking.getBookingID
    },
  },
  components: {
    passengerForm
  },
  methods: {
    async deletePassenger(index) {
      this.$store.commit('DELETE_PASSENGER_GETBOOKINGID',index)

      //Personel Silindiğinde yeni fiyatı hesaplar ve günceller
      await this.$store.dispatch('calculatePriceBackEndSingle',this.booking)
      this.booking.totalPrice=this.$store.state.price.calculatedBackEndPriceSingle
      await this.$store.dispatch('updateBooking',this.booking)
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
     toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
  },
  mounted(){
    this.isMounted = true; 
  }
};
</script>