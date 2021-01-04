<!-- =========================================================================================
  File Name: AddNewDataSidebar.vue
  Description: Add New Data - Sidebar component
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
  <vs-sidebar click-not-close position-right parent="body" default-index="1" color="primary" class="add-new-data-sidebar items-no-padding" spacer v-model="isSidebarActiveLocal">
    <div class="mt-6 flex items-center justify-between px-6">
        <h4>Passenger Update</h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">
      <div class="p-6">
        <div class="vx-row ml-1">
            <vs-input placeholder="Passport No" v-validate="'required'" name="passport" v-model="passport" class="mr-4 ml-2" />
            <vs-button @click="checkPasaport(passport)" :disabled="passport>0? false : true">CHECK</vs-button>
        </div>
        <div class="text-center mt-3">
          <p><span v-show="errors.has('passport')" class="text-left text-danger">{{ errors.first('passport') }}</span></p>
        </div>
        <div class="text-center">
            <p><span v-if="passangerNotFound" class="text-left text-danger">Passenger not found</span></p>
        </div>
      </div>
        <vs-divider class="my-6 mt-0 mb-0" />
      <div class="p-6">
        <div v-if="isPassengerPanel==1">                  
          <div class="ml-2">
              <h6>Firt Name:</h6>
              <p>{{foundPassenger.firstName}}</p>
          </div>

          <div class="mt-5 ml-2">
              <h6>Last Name:</h6>
              <p>{{foundPassenger.lastName}}</p>
          </div>

          <div class="mt-5 ml-2">
              <h6>Date of Birt:</h6>
              <p>{{foundPassenger.Dob}}</p>
          </div>

          <div class="mt-5 ml-2">
              <h6>Passport Expiry Date:</h6>
              <p>{{foundPassenger.passportExpiryDate}}</p>
          </div>
        </div>
      </div>
      <div class="p-6" v-if="isPassengerPanel==2">
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|min:3'" name="firstname" label-placeholder="First Name" v-model="passangerForm.firstName" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('firstname')">{{ errors.first('firstname') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|min:3'" name="lastname" label-placeholder="Last Name" v-model="passangerForm.lastName" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('lastname')">{{ errors.first('lastname') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|date_format:dd/MM/yyyy|date_between:01/01/1930,01/01/2020'" name="dateofbirt" label-placeholder="Date of Birt" v-model="passangerForm.Dob" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('dateofbirt')">{{ errors.first('dateofbirt') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|min:8'" label-placeholder="Pasaport No" name="pasaportno" v-model="passangerForm.passportNo" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('pasaportno')">{{ errors.first('pasaportno') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" name="internationalidno" v-validate="'required|min:8'" label-placeholder="International Id No" v-model="passangerForm.InternationalIdNo" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('internationalidno')">{{ errors.first('internationalidno') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" name="passportexpirydate" v-validate="'required|date_format:dd/MM/yyyy|date_between:01/01/2020,01/01/2090'" label-placeholder="Passport Expiry Date" v-model="passangerForm.passportExpiryDate" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('passportexpirydate')">{{ errors.first('passportexpirydate') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|decimal:5'" name="phonenumber" label-placeholder="Phone Number" v-model="passangerForm.phoneNumber" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('phonenumber')">{{ errors.first('phonenumber') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|email'" name="email" label-placeholder="Email" v-model="passangerForm.email" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('email')">{{ errors.first('email') }}</span>
          </div>
        </div>
        <div class="vx-row mb-2">
          <div class="vx-col w-full">
            <vs-input class="w-full" v-validate="'required|max:255'" name="address" label-placeholder="Address" v-model="passangerForm.address" data-vv-validate-on="blur" />
            <span class="text-danger text-sm" v-show="errors.has('address')">{{ errors.first('address') }}</span>
          </div>
        </div>
      </div>
    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button color="success" class="mr-6" @click.prevent="addNewPassenger" :disabled="!isFormValid" v-if="isPassengerPanel==2">Add New Passenger</vs-button>
      <vs-button color="success" class="mr-6" @click.prevent="addPassenger" v-if="isPassengerPanel==1">ADD TO CABIN</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'

export default {
  props: {
    isSidebarActive: {
      type: Boolean,
      required: true
    },
    data: {
      type: Object,
      default: () => {}
    }
  },
  data () {
    return {
      isPassengerPanel:0,
      passengers :[],
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      passangerForm:{
        firstName: null,
        lastName: null,
        Dob: null,
        passportNo: null,
        InternationalIdNo: null,
        passportExpiryDate: null,
        phoneNumber: null,
        email: null,
        address: null,
      },
      foundPassenger:{
        firstName: '-',
        lastName: '-',
        passportNo: '-',
        passportExpiryDate: '-',
        Dob: '-',
      },
      isLoading:false,
      passangerNotFound:false,
      passport:null,
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.$validator.reset()
      } else {
        this.portName = name
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
  computed: {
    isSidebarActiveLocal: {
      get () {
        return this.isSidebarActive
      },
      set (val) {
        if (!val) {
          this.$emit('closeSidebar')
        }
      },
    },
    booking (){
      return this.$store.state.booking.getBookingID
    },
    isFormValid () {
      return !this.errors.any() 
      && this.passangerForm.firstName 
      && this.passangerForm.lastName 
      && this.passangerForm.Dob 
      && this.passangerForm.passportNo
      && this.passangerForm.InternationalIdNo
      && this.passangerForm.passportExpiryDate 
      && this.passangerForm.phoneNumber 
      && this.passangerForm.email 
      && this.passangerForm.address
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
  },
  methods: {
    isAnyPassenger(){
        for (let index = 0; index < this.booking.Passengers.length; index++) {
          if(this.booking.Passengers[index].passportNo==this.$store.state.passenger.passanger.data.passportNo){
            return false
          }
        }
      return true
    },
    async addPassenger(){
      if(this.booking.cabin.capacity>this.booking.Passengers.length){
          if(this.isAnyPassenger()){
            this.booking.Passengers.push(this.$store.state.passenger.passanger.data)


            //Personel Eklendiğinde yeni fiyatı hesaplar ve günceller
            await this.$store.dispatch('calculatePriceBackEndSingle',this.booking)
            this.booking.totalPrice=this.$store.state.price.calculatedBackEndPriceSingle

            this.$store.commit('SET_BOOKING_ID', this.booking)
            await this.$store.dispatch('updateBooking',this.booking)

            console.log("---",this.booking);

          }else{
            this.$vs.notify({
              title:'Passenger exist',
              text:'Please enter new passport number',
              color:'warning'
            })
          }
      }else{
        this.$vs.notify({
          title:'Cabin is full',
          text:'Please delete passengers from the cabin',
          color:'danger'
        })
      }
    },

    async addNewPassenger () {
      let newThis=this
      this.$validator.validateAll().then(result => {
        if (result) {
          newThis.loadingBar(true)
          newThis.$validator.validateAll().then(async function(result){
            if (result) {
              await newThis.$store.dispatch('addPassenger', newThis.passangerForm)
              newThis.addPassenger()
              newThis.isPassengerPanel=0
              newThis.passangerForm={
                firstName: null,
                lastName: null,
                Dob: null,
                passportNo: null,
                InternationalIdNo: null,
                passportExpiryDate: null,
                phoneNumber: null,
                email: null,
                address: null,
              }
            }
          })
          newThis.passangerNotFound=false
          newThis.passport=null
          newThis.loadingBar(false)
          newThis.$emit('closeSidebar')
        }
      })
    },

    async checkPasaport(value){
      this.loadingBar(true)
      await this.$store.dispatch('getPassenger', value)
      if(this.$store.state.passenger.passanger.success==false){
        this.isPassengerPanel=2
        this.passangerNotFound=true
      }else{
        this.passangerNotFound=false
        this.isPassengerPanel=1
        const item=this.$store.state.passenger.passanger.data;
        this.foundPassenger={
          firstName: item.firstName,
          lastName: item.lastName,
          passportNo: item.passportNo,
          passportExpiryDate: item.passportExpiryDate,
          Dob: item.Dob,
        };
      }
      this.loadingBar(false)
    },

    loadingBar (value) {
      this.isLoading = value
    },
  },
  components: {
    VuePerfectScrollbar,
  }
}
</script>

<style lang="scss" scoped>
.add-new-data-sidebar {
  ::v-deep .vs-sidebar--background {
    z-index: 52010;
  }

  ::v-deep .vs-sidebar {
    z-index: 52010;
    width: 400px;
    max-width: 90vw;

    .img-upload {
      margin-top: 2rem;

      .con-img-upload {
        padding: 0;
      }

      .con-input-upload {
        width: 100%;
        margin: 0;
      }
    }
  }
}

.scroll-area--data-list-add-new {
    // height: calc(var(--vh, 1vh) * 100 - 4.3rem);
    height: calc(var(--vh, 1vh) * 100 - 16px - 45px - 82px);

    &:not(.ps) {
      overflow-y: auto;
    }
}
</style>
