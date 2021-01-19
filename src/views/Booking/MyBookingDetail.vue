<template>
  <div v-if="isLoad">

    <div class="flex flex-wrap items-center justify-between">
        <vx-input-group class="mb-base mr-3">
          <vs-button color="warning" class="mr-3">{{booking.status}}</vs-button>
          <vs-button v-if="isShowConfirm=(booking.status!='Sold'? role=='agency'? false : true : false)"  color="success" class="mr-3" type="border"  @click.stop="openConfirm">Confirm Reservation</vs-button>
            <vs-button v-if="isShowNotification = role=='agency'? true : false " color="primary" type="border" @click="activePrompt = true">Send Notifaction</vs-button>
        </vx-input-group>
        <div class="flex items-center">
          <vs-button class="mb-base mr-3" v-if="booking.balance==0 ? false : role=='agency'? false : true" color="success" icon-pack="feather" icon="icon icon-file" @click="activeGetPayment = true">Settle Payment</vs-button>
          <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="printInvoice">Show Voucher</vs-button>
        </div>
    </div>

    <div class="vx-row">
            
            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="CpuIcon"
                  icon-right
                  :statistic="booking.totalPrice| priceFormat"
                  statisticTitle="Reservation Price (tax included)" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="ServerIcon"
                  icon-right
                  :statistic="booking.agencyCost  || 0 | priceFormat"
                  statisticTitle="Agency Cost (tax included)"
                  color="success" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                 className="danger"
                  hideChart
                  class="mb-base"
                  icon="ActivityIcon"
                  icon-right
                  :statistic="booking.balance || 0 | priceFormat"
                  statisticTitle="Balance"
                  color="danger" />
            </div>

            <div class="vx-col w-full sm:w-1/2 md:w-1/2 lg:w-1/4 xl:w-1/4">
                <statistics-card-line
                  hideChart
                  class="mb-base"
                  icon="AlertOctagonIcon"
                  icon-right
                  :statistic="booking.profit  || 0 | priceFormat"
                  statisticTitle="Profit"
                  color="warning" />
            </div>
        </div>

    <div class="vx-row">
      <div class="vx-col lg:w-1/3 w-full">
      <template slot="actions">
        <feather-icon icon="MoreVerticalIcon" svgClasses="w-6 h-6 text-grey"></feather-icon>
      </template>
        <vx-card v-if="isLoad" class="mb-base">
        <div class="post-header flex justify-between mb-4">
              <div class="flex items-center">
                <feather-icon svgClasses="w-6 h-6" icon="ColumnsIcon" class="mr-2" />
                  <span class="font-medium text-lg leading-none">Cabin Detail</span>
              </div>
              <div class="flex" @click="editCabin=true">
                  <feather-icon class="ml-4" icon="EditIcon"></feather-icon>
              </div>
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

      <div class="vx-col lg:w-1/3 w-full">
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

      <div class="vx-col lg:w-1/3 w-full">
        <vx-card v-if="isLoad" class="mb-base">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="FlagIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Payment History</span>
        </div>
        <vs-divider />
          <table>
            <tr v-for="(item,index) in booking.paidAmount" :key="index">
              <td class="font-semibold">Date : </td>
              <td>{{ new Date(item.date) | formatShortDate }}</td>
              <td class="font-semibold">Price : </td>
              <td>{{ item.price | priceFormat }}</td>
            </tr>
          </table>
        </vx-card>
      </div>

      <div class="vx-col lg:w-2/2 w-full">
        <vx-card v-if="isLoad" class="mb-base">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="AlignJustifyIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Reservation Note</span>
        </div>
        <vs-divider />
        <vs-textarea label="Reservation Note" v-model="booking.notes"/>
        <vs-button color="success" type="border" @click="updateRezervationNote">Update</vs-button>
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

    <vs-prompt
          color="success"
          cancel-text="Cancel"
          accept-text="Save"
          title="Settle Payment"
          @accept="getPayment"
           :is-valid="checkPayment"
          :active.sync="activeGetPayment">
          <div class="con-exemple-prompt">
            <span>Payment Amount(€)</span>
          <vs-input size="large" v-validate="{ rules: { regex:  /.[0-9]{0,}$/} }"  name="numeric" v-model="getPaymentValue" class="mt-5 w-full" />
          <span class="text-danger text-sm" v-show="errors.has('numeric')">{{ errors.first('numeric') }}</span>
          <span class="text-danger text-sm" v-show="!checkPayment">Amount can't be greater than balance</span>
          </div>
    </vs-prompt>
    
    <vs-prompt
          cancel-text="Cancel"
          accept-text="Send"
          title="Send Notifaction"
          @accept="sendNotifaction"
          :active.sync="activePrompt">
          <div class="con-exemple-prompt">
            <span>Description</span>
          <vs-input vs-placeholder="Description" class="mt-3 w-full" v-model="notifactionDesc" row="3" />
          </div>
    </vs-prompt>

    <vs-prompt
          cancel-text="Cancel"
          accept-text="Update Cabin"
          title="Update Cabin"
          @accept="changeCabin"
          :active.sync="editCabin">
          <div class="con-exemple-prompt">
            <span>Cabin Category</span>
            <v-select placeholder="Choose a Cabin Category" :options="optionsCabinCategory" :dir="$vs.rtl ? 'rtl' : 'ltr'" @input="selectedCabinCategory" class="mt-3 mb-3"/> 
          </div>
          <div class="con-exemple-prompt">
            <span>Cabin</span>
            <v-select placeholder="Choose a Cabin" :options="optionsCabin" :dir="$vs.rtl ? 'rtl' : 'ltr'" @input="selectedCabin" :disabled="optionsCabin.length>0 ? false : true" class="mt-3"/> 
          </div>
    </vs-prompt>

    <!-- <div id="print-page" style="visibility: hidden; height: 0">
      <voucher  id="print-container" style="visibility: hidden;"></voucher>
    </div> -->
  
  </div>
</template>
<script>
import vSelect from 'vue-select'
import router from '../../router'
import booking from '../../store/modules/booking';
const passengers = () => import('./components/passengers.vue')
import StatisticsCardLine from '@/components/statistics-cards/StatisticsCardLine.vue'
export default {
  data() {
    return {
      role:"",
      getPaymentValue:0,
      activeGetPayment:false,
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      isLoad:false,
      activePrompt:false,
      notifactionDesc:"",
      isShowNotification:false,
      isShowConfirm:false,
      editCabin:false,
      optionsCabinCategory: [],
      optionsCabin: [],
      selectedCabinCategoryID:null,
      selectedCabinID:null
    };
  },
  components: {
    StatisticsCardLine,
    passengers,
    'v-select': vSelect
  },
  watch:{
    async editCabin(){
      if(this.editCabin){
        this.optionsCabinCategory=[]
        //console.log(this.booking);
        await this.$store.dispatch('getCabinCategories', this.booking.cruise.vessel._id)
        this.$store.state.cabinCategory.cabinCategories.forEach(element => {
          this.optionsCabinCategory.push({label: element.name, value: element._id});
        });
        //console.log(this.$store.state.cabinCategory.cabinCategories);
      }
    }
  },
  computed : {
    booking (){
      return this.$store.state.booking.getBookingID
    },
    checkPayment(){
      console.log("checkPayment",Number(this.getPaymentValue) + Number(this.booking.balance));
      if(Number(this.getPaymentValue) + Number(this.booking.balance) <= 0){
        return true
      }else{
        return false
      }
    }
  },
  methods: {
    async getPayment(){
      this.$store.state.booking.getBookingID.paidAmount.push({date:Date.now(),price:this.getPaymentValue});
      await this.$store.dispatch('updateBooking',this.booking)
      this.getBooking();
    },
    printInvoice () {
      let voucher = this.$router.resolve({name: 'voucher',params: {id: this.$route.params.id}});
      window.open(voucher.href, '_blank','width=800,height=1000');
    },
    async updateRezervationNote(){
        await this.$store.dispatch('updateBooking',this.booking)
    },

    async getBooking() {
      this.$emit('searchQuery', `Deneme`)
      await this.$store.dispatch("getBookingbyId",this.$route.params.id);
      if(this.$store.state.booking.getBookingID==null){
        router.push({name : 'mybookings'})
      }
      this.isLoad=true
    },
     openConfirm() {
      if(booking.balance!=0){
        this.$vs.dialog({
          type: 'confirm',
          color: 'success',
          title: `Booking Confirm`,
          text: 'There is an open balance for this reservation. Do you want to confirm it anyway?',
          accept:async ()=>{
            this.$store.state.booking.getBookingID.status="Sold"
            await this.$store.dispatch('updateBooking',this.booking)
          }
        })
      }else{
        this.$vs.dialog({
          type: 'confirm',
          color: 'success',
          title: `Booking Confirm`,
          text: 'Please click accept to confirm reservation',
          accept: async ()=>{
            this.$store.state.booking.getBookingID.status="Sold"
            await this.$store.dispatch('updateBooking',this.booking)
          }
        })
      }
      
    },
    sendNotifaction(){
      console.log(this.notifactionDesc);
    },
    async selectedCabinCategory(value){
      this.isLoading(true)
      this.optionsCabin=[]
      this.selectedCabinID=null
      console.log(value);
      this.selectedCabinCategoryID=value.value;
      let params={
        cruise:this.booking.cruise._id,
        cabinCategory:value.value
      }
     await this.$store.dispatch('getAvaliableCabinsbyCruiseCabinCategory', params)
     this.$store.state.cabin.avaliableCabinsbyCruiseCategory.forEach(element => {
        this.optionsCabin.push({label: element.number, value: element._id});
      });



      this.isLoading(false)
    },
    async selectedCabin(value){
      this.selectedCabinID=value.value
      console.log(value);
    },
    async changeCabin(){
      if(this.selectedCabinCategoryID!=null && this.selectedCabinID!=null){

      this.isLoading(true)
    
      //Bloklu kabin objesini getiriyoruz
      let blockedCabinObject={
        cabin:this.booking.cabin._id,
        cruise:this.booking.cruise._id
      }

      await this.$store.dispatch('getBlockedCabin',blockedCabinObject)

      //Bloklu kabin objesini state üzerinden güncelliyoruz
      this.$store.state.blockedCabin.blockedCabin.cabin=this.selectedCabinID
      console.log(this.$store.state.blockedCabin.blockedCabin);

      //State deki kabin objesi apiye gönderiyoruz
      await this.$store.dispatch('updateBlockedCabin',this.$store.state.blockedCabin.blockedCabin)
      

      //Booking objesini güncelliyoruz
      this.booking.cabin.cabinCategory._id=this.selectedCabinCategoryID
      this.booking.cabin._id=this.selectedCabinID

      this.$store.commit('SET_BOOKING_ID', this.booking)
      await this.$store.dispatch('updateBooking',this.booking)
      await this.$store.dispatch("getBookingbyId",this.$route.params.id);

      
      this.isLoading(false)
      }else{
        this.$vs.notify({
          title:'Warning',
          text:'Please choose Cabin Category or Cabin',
          color:'warning'
        })
      }
    },
    checkRole(){
      this.role=JSON.parse(localStorage.getItem("agency")).role;
      if(JSON.parse(localStorage.getItem("agency")).role=="manager"){
        this.isShowNotification=false;
        this.isShowConfirm=true;
      }else{
        this.isShowNotification=true;
        this.isShowConfirm=false;
      }
    },
    isLoading (newData) {
      if (newData) {
        this.$vs.loading()
      } else {
        this.$vs.loading.close()
      }
    }
  },
  created(){
    if(this.$route.params.id==null){
      router.push({name : 'mybookings'})
    }
  },
  mounted(){
    this.isMounted = true;
    this.getBooking();
    this.checkRole();
    this.$emit('setAppClasses', 'print-page');
    console.log(this.booking);
  },
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


<style lang="scss">
@media print {
  .print-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        overflow: hidden !important;
      }
    }

    #print-container,
    #print-container * {
      visibility: visible;
    }
    #print-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

@page {
  size: auto;
}
</style>

