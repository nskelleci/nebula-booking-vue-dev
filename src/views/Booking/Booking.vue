<!-- =========================================================================================
  File Name: ECommerceCheckout.vue
  Description: eCommerce Checkout page
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div id="ecommerce-checkout-demo">
        <form-wizard ref="checkoutWizard" color="rgba(var(--vs-primary), 1)" :title="null" :subtitle="null" :hide-buttons="true">
            <!-- tab 1 content -->
            <tab-content title="Cruise Type" icon="feather icon-loader" class="mb-5">
                <div class="vx-row" v-if="cruiseType.length">
                   <div class="vx-col lg:w-3/3 w-full relative">
                        <div class="items-list-view" v-for="(item,index) in cruiseType" :key="index">
                            <cruise-type-view :item="item" class="mb-base">
                               <template slot="action-buttons">
                                   <div @click="selectedCruiseType(item)" class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer">
                                        <span class="text-sm font-semibold ml-2">SELECT</span>
                                    </div>
                                </template>
                            </cruise-type-view>
                        </div>
                    </div>
                </div>

                <vx-card title="Cruise Type not Found" v-else>
                    <p>Please check all information</p>
                </vx-card>
            </tab-content>

            <!-- tab 2 content -->
            <tab-content title="Cruises" icon="feather icon-grid" class="mb-5">
                <div class="vx-row" v-if="cruisesList.length">
                   <div class="vx-col lg:w-3/3 w-full relative">
                        <div class="items-list-view" v-for="(item,index) in cruisesList" :key="index">
                            <cruises-view :item="item" class="mb-base">
                               <template slot="action-buttons">
                                   <div @click="getSelectedCruise(item)" class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer">
                                        <span class="text-sm font-semibold ml-2">SELECT</span>
                                    </div>
                                </template>
                            </cruises-view>
                        </div>
                    </div>
                </div>

                <vx-card title="Cruise not Found" v-else>
                    <p>Please check all information</p>
                </vx-card>
            </tab-content>

            <!-- tab 3 content -->
            <tab-content title="Cabin Category" icon="feather icon-bar-chart" class="mb-5">
                <div class="vx-row" v-if="cabinCategory.length">
                   <div class="vx-col lg:w-3/3 w-full relative">
                        <div class="items-list-view" v-for="(item,index) in cabinCategory" :key="index">
                            <prices-view :item="item" class="mb-base">
                               <template slot="action-buttons">
                                   <div @click="selectedCabinCategory(item)" class="item-view-secondary-action-btn bg-primary p-3 rounded-lg flex flex-grow items-center justify-center text-white cursor-pointer">
                                        <span class="text-sm font-semibold ml-2">SELECT</span>
                                    </div>
                                </template>
                            </prices-view>
                        </div>
                    </div>
                </div>

                 <vx-card title="Cabin Category not Found" v-else>
                    <p>Please check all information</p>
                </vx-card>
            </tab-content>


            <!-- tab 4 content -->
            <tab-content title="Cabin" icon="feather icon-bar-chart" class="mb-5">
              <div class="vx-row">
                <div class="vx-col lg:w-3/5 w-full relative">
                  <vs-table ref="table" multiple v-model="selected" pagination :max-items="itemsPerPage" search :data="cabins" @selected="handleSelected">
                        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
                          <!-- ITEMS PER PAGE -->
                          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
                            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
                              <span class="mr-2">
                                {{ currentPage * itemsPerPage - (itemsPerPage - 1) }} -
                                {{
                                  cabins.length - currentPage * itemsPerPage > 0
                                    ? currentPage * itemsPerPage
                                    : cabins.length
                                }}
                                of {{ queriedItems }}
                                </span>
                              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
                            </div>
                            <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
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
                          <vs-th sort-key="number">Number</vs-th>
                          <vs-th sort-key="description">Description</vs-th>
                          <vs-th sort-key="capacity">Capacity</vs-th>
                          <vs-th sort-key="cabinCategory">Cabin Category</vs-th>
                          <vs-th sort-key="bedType">Bed Type</vs-th>
                        </template>

                        <template slot-scope="{ data }">
                          <tbody>
                            <vs-tr :data="cabin" :key="_id" v-for="(cabin, _id) in data">
                              <vs-td>
                                <p class="product-name font-large truncate">
                                  <vs-chip color="primary">
                                      <span>{{ cabin.number }}</span> 
                                  </vs-chip>
                                </p>
                              </vs-td>

                              <vs-td>
                                <p class="product-category">{{ cabin.description | title }}</p>
                              </vs-td>
                            
                              <vs-td>
                              <vs-chip color="success">
                                <span>{{cabin.capacity}}</span>
                              </vs-chip>
                              </vs-td>
                              

                              <vs-td>
                                <p class="product-category">
                                  {{ cabin.cabinCategory.name | title }}
                                </p>
                              </vs-td>

                              <vs-td>
                                <p class="product-category">{{ cabin.bedType.name | title }}</p>
                              </vs-td>
                            </vs-tr>
                          </tbody>
                        </template>
                      
                      </vs-table>
                </div>
                <div class="vx-col lg:w-2/5 w-full relative">
                  <vx-card>
                      <p class="font-semibold mb-3">Cabin Details</p>
                      <div class="flex justify-between" vs-align="center" vs-type="flex" vs-justify="center" v-for="(item,index) in selected" :key="index">
                            <span class="text-grey"><b>{{ item.number }}</b> ({{ item.capacity }})</span>
                            <span>{{item.bedType.name}}</span>
                            <vs-input-number label="Adult: " :min="0" :max=" parseInt(item.numberOfAdult)  + parseInt(item.numberOfChild)  < item.capacity ? item.capacity : 0 " v-model="item.numberOfAdult"  class="inline-flex" />
                            <vs-input-number label="Child: " :min="0" :max="parseInt(item.numberOfAdult) + parseInt(item.numberOfChild) < item.capacity ? item.capacity : 0" v-model ="item.numberOfChild"  class="inline-flex" />
                      </div>
                      <vs-divider />
                      <div class="flex justify-between mb-2">
                        <span class="text-grey">Total Passengers</span>
                        <span>{{totalPassenger}}</span>
                    </div>
                    <vs-divider />
                    <div class="flex justify-between font-semibold mb-3">
                          <span>Total Cabin</span>
                          <span>{{selected.length}}</span>
                      </div>
                      <vs-button v-if="isComplateCheck" class="w-full" @click="complate()">COMPLATE</vs-button>
                  </vx-card>
                </div>
              </div>
            </tab-content>

            <!-- tab 5 content -->
            <tab-content title="Booking" icon="feather icon-bar-chart" class="mb-5">
              <div class="vx-row">
                <div class="vx-col lg:w-5/5 w-full relative">
                  <vx-card title="Passenger and Contact Details">
                      <p>Please Enter Passenger Information</p>
                      <vs-collapse type="margin" accordion>
                        <vs-collapse-item v-for="(item,index) in passengerList" :key="index">
                          
                            <div slot="header"><vs-avatar icon-pack="feather" icon="icon-user" style="vertical-align: middle;" /> {{index+1}}. {{ item.isAdult ? 'Adult Passenger (ages 12+)' : 'Child Passenger (ages 0-12)' }} | Cabin Number <span class="text-warning font-medium">#{{item.cabinnumber}}</span></div>
                            <div class="vx-row">
                            <div class="vx-col sm:w-1/2 w-full mb-2">

                              <vs-input class="w-full" v-validate="'required'" data-vv-validate-on="blur" :name="'first_name_'+index" label-placeholder="First Name" v-model="item.firstname" />
                              <span class="text-danger text-sm" v-show="errors.has('first_name_'+index)">{{ errors.first('first_name_'+index) }}</span>

                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                              <vs-input class="w-full" v-validate="'required'" data-vv-validate-on="blur" :name="'lastname_'+index" label-placeholder="Last Name" v-model="item.lastname" />
                              <span class="text-danger text-sm" v-show="errors.has('lastname_'+index)">{{ errors.first('lastname_'+index) }}</span>
                            </div>
                          </div>
                          <div class="vx-row">
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                              <vs-input class="w-full"  v-validate="'required'" data-vv-validate-on="blur" :name="'idnumber_'+index" label-placeholder="ID Number" v-model="item.idnumber" />
                              <span class="text-danger text-sm" v-show="errors.has('idnumber_'+index)">{{ errors.first('idnumber_'+index) }}</span>
                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                              <vs-input class="w-full" v-validate="'required'" data-vv-validate-on="blur" :name="'passportnumber_'+index" label-placeholder="Passport Number" v-model="item.passportnumber" />
                              <span class="text-danger text-sm" v-show="errors.has('passportnumber_'+index)">{{ errors.first('passportnumber_'+index) }}</span>
                            </div>
                          </div>
                          <div class="vx-row">
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                              <vs-input class="w-full" v-validate="'date_format:dd/MM/yyyy|date_between:10/09/1900,20/09/2016'" data-vv-validate-on="blur" :name="'dateofbirth_'+index" label-placeholder="Birth Date" v-model="item.dateofbirth" />
                               <span class="text-danger text-sm" v-show="errors.has('dateofbirth_'+index)">{{ errors.first('dateofbirth_'+index) }}</span>
                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-6">
                              <vs-input class="w-full" v-validate="'required'" data-vv-validate-on="blur" :name="'phonenumber_'+index" label-placeholder="Phone Number" v-model="item.phonenumber" />
                              <span class="text-danger text-sm" v-show="errors.has('phonenumber_'+index)">{{ errors.first('phonenumber_'+index) }}</span>
                            </div>
                          </div>
                          <div class="vx-row">
                            <div class="vx-col sm:w-1/2 w-full mb-2">
                              <vs-input class="w-full" v-validate="'required'" data-vv-validate-on="blur" :name="'emergencynumber_'+index" label-placeholder="Emergency Number" v-model="item.emergencynumber" />
                              <span class="text-danger text-sm" v-show="errors.has('emergencynumber_'+index)">{{ errors.first('emergencynumber_'+index) }}</span>

                            </div>
                            <div class="vx-col sm:w-1/2 w-full mb-12">
                              <vs-input class="w-full" v-validate="'required'" data-vv-validate-on="blur" :name="'email_'+index" label-placeholder="Email Address" v-model="item.email" />
                              <span class="text-danger text-sm m" v-show="errors.has('email_'+index)">{{ errors.first('email_'+index) }}</span>
                            </div>
                          </div>
                        </vs-collapse-item>
                    </vs-collapse>
                    <div class="col-md-12 bg-light text-right">
                        <vs-button color="primary"  type="border" @click="bookingAllData()">Booking</vs-button>
                    </div>
                  </vx-card>
                </div>
              </div>
            </tab-content>
        </form-wizard>
        <div class="grid-layout-container alignment-block">
</div>
    </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
const cruiseTypeView = () => import('./components/cruiseTypeView.vue')
const cruisesView = () => import('./components/cruisesView.vue')
const pricesView = () => import('./components/pricesView.vue')
const bookingView = () => import('./components/bookingView.vue')
export default {
  data () {
    return {
      selectedCabinNumber:null,
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      cruiseType:[],
      cruisesList:[],
      cabinCategory:[],
      cabins:[],
      eventTemp:null,
      filter : {
        'selectedVessel' : null,
        'selectedCruiseType' : null,
        'selectedMarket' : null,
        'selectedSeason' : null
      },
      selectedCruise:null,
      isLoading:false,
      endUserPrice:null,
      passengerList:[],
      isComplate:false
    }
  },
  watch:{
    isLoading (newData) {
      if (newData) {
        this.$vs.loading()
      } else {
        this.$vs.loading.close()
      }
    }
  },
  computed: {
    adultCount (index) {
      return adult[index] = 0
    },
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.cabins.length
    },
    totalPassenger () {
      let total = 0
      for (let i = 0; i < this.selected.length; i++) {
        total += parseInt(this.selected[i].numberOfAdult) + parseInt(this.selected[i].numberOfChild)
      }
      console.log(this.selected)
      return total
    },
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    },

    isComplateCheck () {
      let isEnter = false
      for (let i = 0; i < this.selected.length; i++) {
        if ((parseInt(this.selected[i].numberOfChild) + parseInt(this.selected[i].numberOfAdult) === 0)) {
          return false
        }
        isEnter = true
      }
      return isEnter
    }
  },
  methods: {
    createPassangerArray () {
      this.passengerList = []
      for (let i = 0; i < this.selected.length; i++) {
        for (let j = 0; j < parseInt(this.selected[i].numberOfAdult); j++) {
          const passanger = {
            cabinnumber:this.selected[i].number,
            firstname:'',
            lastname:'',
            idnumber:'',
            passportnumber:'',
            dateofbirth:'',
            phonenumber:'',
            emergencynumber:'',
            email:'',
            isAdult:true
          }
          this.passengerList.push(passanger)
        }
        for (let j = 0; j < parseInt(this.selected[i].numberOfChild); j++) {
          const passanger = {
            cabinnumber:this.selected[i].number,
            firstname:'',
            lastname:'',
            idnumber:'',
            passportnumber:'',
            dateofbirth:'',
            phonenumber:'',
            emergencynumber:'',
            email:'',
            isAdult:false
          }
          this.passengerList.push(passanger)
        }
      }
    },

    bookingAllData () {
      console.log(this.passengerList)
    },

    complate () {
      this.$refs.checkoutWizard.nextTab()
      this.createPassangerArray()
      console.log(this.cabinPassenger)
    },

    handleSelected (tr) {
      this.$vs.notify({title: `${tr.description}`, text: `Number: ${tr.number}`})
    },

    // TAB 1
    async cruiseTypes () {
      this.loadingBar(true)
      await this.$store.dispatch('getCruiseTypes')
      this.cruiseType = this.$store.state.cruiseType.cruisetypes
      this.loadingBar(false)
    },

    async selectedCruiseType (value) {
      this.loadingBar(true)
      await this.$store.dispatch('getCruisebyCruiseType', value._id)

      //filter için cruise tipi ve vessel id objelerini oluşturduk
      this.filter.selectedCruiseType = {
        _id:value._id,
        name:''
      }
      this.filter.selectedVessel = {
        _id:value.vessel._id,
        name:'',
        flag:''
      }
      this.getCruise()
      this.loadingBar(false)
    },

    // TAB 2
    getCruise () {
      this.cruisesList = this.$store.state.booking.bookings
      console.log(this.cruisesList)
      this.stepNextTab()
    },

    getSelectedCruise (value) {

      //filter için Season objesini oluşturduk
      this.filter.selectedSeason = {
        _id:value.season._id,
        name:''
      },
      this.selectedCruise = value._id
      console.log(value)
      this.getMarket()
    },

    // TAB 3
    async getMarket () {
      this.loadingBar(true)
      //filter için Market objesini oluşturduk
      this.filter.selectedMarket = {
        _id:'5f948cbb1a3a980011ad3686', //Turkish Market ID
        name:''
      }

      await this.$store.dispatch('getFilteredPrices', this.filter)
      this.cabinCategory = this.$store.state.price.filteredPrices
      this.loadingBar(false)
      this.stepNextTab()

    },

    async selectedCabinCategory (value) {
      this.loadingBar(true)
      this.endUserPrice = value.endUserPrice
      const params = {
        cruise : this.selectedCruise,
        cabinCategory: value.cabinCategory._id
      }
      await this.$store.dispatch('getAvaliableCabinsbyCruiseCabinCategory', params)
      this.cabins = this.$store.state.cabin.avaliableCabinsbyCruiseCategory
      this.loadingBar(false)
      this.stepNextTab()
    },

    // TAB 3
    makePayment () {
      return new Promise(() => {
        this.$validator.validateAll('cvv-form').then(result => {
          if (result) {
            // if form have no errors
            this.$vs.notify({
              title: 'Success',
              text: 'Payment received successfully',
              color: 'success',
              iconPack: 'feather',
              icon: 'icon-check'
            })
          } else {
            this.$vs.notify({
              title: 'Error',
              text: 'Please enter valid details',
              color: 'warning',
              iconPack: 'feather',
              icon: 'icon-alert-circle'
            })
          }
        })
      })
    },

    stepNextTab () {
      this.$refs.checkoutWizard.nextTab()
    },
    loadingBar (value) {
      this.isLoading = value
    }
  },
  components: {
    cruiseTypeView,
    cruisesView,
    pricesView,
    FormWizard,
    TabContent,
    bookingView
  },
  created () {
    this.cruiseTypes()
  },
  mounted () {
    this.isMounted = true
  }
}
</script>

<style lang="scss" scoped>
#ecommerce-checkout-demo {
    .item-view-primary-action-btn {
        color: #2c2c2c !important;
        background-color: #f6f6f6;
    }

    .item-name {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
        -webkit-line-clamp: 2;
    }

    .vue-form-wizard {
        padding-bottom: 0;

        ::v-deep .wizard-header {
            padding: 0;
        }

        ::v-deep .wizard-tab-content {
            padding-right: 0;
            padding-left: 0;
            padding-bottom: 0;

            .wizard-tab-container{
              margin-bottom: 0 !important;
            }
        }
    }
}
</style>
