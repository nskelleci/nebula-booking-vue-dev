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
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} AGENCY </h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

    <div class="p-6">

        <vs-input label="Email" v-model="email" class="mt-5 w-full" name="email" v-validate="'required|email'" />
        <span class="text-danger text-sm" v-show="errors.has('agency-email')">{{ errors.first('agency-email') }}</span>

        <vs-input label="Password" v-model="password" v-if="Object.entries(this.data).length === 0 ? true : false" class="mt-5 w-full" name="agency-password" v-validate="'required|min:6'" />
        <span class="text-danger text-sm" v-if="Object.entries(this.data).length === 0 ? true : false">{{ errors.first('agency-password') }}</span>

        <vs-input label="Name" v-model="companyName" class="mt-5 w-full" name="agency-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('agency-name')">{{ errors.first('agency-name') }}</span>

        <vs-input label="Company Full Name" v-model="companyFullName" class="mt-5 w-full" name="company-full-name" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('company-full-name')">{{ errors.first('company-full-name') }}</span>

        <vs-input label="Tax Office" v-model="taxOffice" class="mt-5 w-full" name="tax-office" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('tax-office')">{{ errors.first('tax-office') }}</span>

        <vs-input label="Tax Number" v-model="taxNumber" class="mt-5 w-full" name="tax-number" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('tax-number')">{{ errors.first('tax-number') }}</span>

        <vs-input label="Address" v-model="address" class="mt-5 w-full" name="agency-address" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('agency-address')">{{ errors.first('agency-address') }}</span>

        <vs-input label="Authorized Person" v-model="authorizedPerson" class="mt-5 w-full" name="authorized-person" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('authorized-person')">{{ errors.first('authorized-person') }}</span>

        <vs-input label="Phone Number" v-model="phone" class="mt-5 w-full" name="agency-phone-number" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('agency-phone-number')">{{ errors.first('agency-phone-number') }}</span>

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for="" class="vs-input--label">Agency Type</label>
            <v-select label="name" :options="agencyTypes" :value="agencyType" @input="agencyTypeSelect" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        </div>

        <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Market</label>
            <v-select label="name" :options="markets" :value="market" @input="marketSelect" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        </div>

        <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Discount Type</label>
            <v-select :options="['Percentage','Flat Rate']" @input="discountType" :value="this.agencyDiscountType" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        </div>

    </div>

    </component>

    <div class="flex flex-wrap items-center p-6" slot="footer">
      <vs-button class="mr-6" @click="submitData" :disabled="!isFormValid">Submit</vs-button>
      <vs-button type="border" color="danger" @click="isSidebarActiveLocal = false">Cancel</vs-button>
    </div>
  </vs-sidebar>
</template>

<script>
import VuePerfectScrollbar from 'vue-perfect-scrollbar'
import vSelect from 'vue-select'
import { Validator } from 'vee-validate'
const dict = {
  custom: {
    email: {
      required: 'Email is required',
      email: 'Please enter valid email'
    }
  }
}
Validator.localize('en', dict)

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
  components: {
    VuePerfectScrollbar,
    'v-select': vSelect
  },
  data () {
    return {
      dataId: null,
      email: '',
      password: '',
      companyName: '',
      companyFullName:'',
      taxNumber:'',
      taxOffice:'',
      address: '',
      authorizedPerson: '',
      agencyType : null,
      market:'',
      phone: '',
      agencyDiscountType : null,
      settings: {
        maxScrollbarLength: 60,
        wheelSpeed: .60
      }
    }
  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { _id, companyName,companyFullName, taxNumber, taxOffice, email,  agencyType, address,market, authorizedPerson, phone, agencyDiscountType} = JSON.parse(JSON.stringify(this.data))
        this.dataId = _id
      
        this.companyName = companyName
        this.companyFullName=companyFullName
        this.taxOffice = taxOffice
        this.taxNumber = taxNumber
        this.email = email
        this.phone = phone
        //this.password = password
        this.address = address
        this.agencyType = agencyType.name
        this.authorizedPerson = authorizedPerson
        this.phone = phone
        this.agencyDiscountType = agencyDiscountType
        this.market=market
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
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
          // this.$validator.reset()
          // this.initValues()
        }
      }
    },
    isFormValid () {
      if (Object.entries(this.data).length === 0) {
        return !this.errors.any() && this.email &&  this.password && this.companyName && this.companyFullName &&this.taxNumber && this.taxOffice && this.address && this.authorizedPerson && this.agencyType && this.phone && this.agencyDiscountType && this.market
      } else {
        return !this.errors.any() && this.email && this.companyName && this.companyFullName &&this.taxNumber && this.taxOffice && this.address && this.authorizedPerson && this.agencyType && this.phone && this.agencyDiscountType && this.market
      }
     
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    agencyTypes () {
      return this.$store.state.agencyType.agencytypes
    },

    markets () {
      return this.$store.state.market.markets
    }

  },
  methods: {
    initValues () {
      if (this.data._id) return
      this.dataId = null
      this.email = ''
      this.password = ''
      this.companyName = ''
      this.companyFullName=''
      this.taxOffice = ''
      this.taxNumber = ''
      this.address = ''
      this.authorizedPerson = ''
      this.agencyType = null
      this.phone = ''
      this.market='',
      this.agencyDiscountType  = null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            _id: this.dataId,
            email: this.email,
            password: this.password,
            companyName: this.companyName,
            companyFullName:this.companyFullName,
            taxOffice: this.taxOffice,
            taxNumber: this.taxNumber,
            address: this.address,
            authorizedPerson: this.authorizedPerson,
            agencyType: this.agencyType._id,
            phone: this.phone,
            market: this.market._id,
            agencyDiscountType: this.agencyDiscountType
          }

          const objUpdate = {
            _id: this.dataId,
            email: this.email,
            companyName: this.companyName,
            companyFullName:this.companyFullName,
            taxOffice: this.taxOffice,
            taxNumber: this.taxNumber,
            address: this.address,
            authorizedPerson: this.authorizedPerson,
            agencyType: this.agencyType._id,
            phone: this.phone,
            market: this.market._id,
            agencyDiscountType: this.agencyDiscountType
          }

          if (this.dataId !== null && this.dataId.length >= 0) {
            this.$store.dispatch('updateAgency', objUpdate).catch(err => { console.error(err) })
            //VesselService.updateVessel(obj)
          } else {
            delete obj._id
            this.$store.dispatch('addAgency', obj).catch(err => { console.error(err) })
          }
          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    },

    agencyTypeSelect (value) {
      console.log(value)
      this.agencyType = value
    },

    marketSelect (value) {
      console.log(value)
      this.market = value
    },

    discountType (value) {
      this.agencyDiscountType = value
    }

  },
  created () {
    this.$store.dispatch('getAgencyTypes')
    this.$store.dispatch('getMarkets')
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
