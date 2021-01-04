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
                            <prices-view :item="item" :cruise="selectedCruise" class="mb-base">
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
                                  <vs-chip color="warning" v-if="isROSCheck(cabin._id)">
                                      <span>{{ cabin.number }} / {{cabin.rosPrice}} / <b>ROS</b></span> 
                                  </vs-chip>
                                  <vs-chip color="primary" v-else>
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
                            <span :class="{'text-warning': item.isRose,'text-grey': !item.isRose}"><b>{{ item.number }}</b> ({{ item.capacity }})</span>
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
                     <div class="flex justify-between mb-2">
                          <span class="text-grey">Total Cabin</span>
                          <span>{{selected.length}}</span>
                      </div>
                      <vs-divider />
                      <div class="flex justify-between mb-2" v-for="data in getCalculateFrontEndPrice.cabinList" :key="data.cabinNumber">
                          <span class="text-grey"><b>{{data.cabinNumber}}</b> ({{data.totalPassengers}})</span>
                          <span>{{data.cabinPrice!=0? data.cabinPrice : "0" | priceFormat}}</span>
                      </div>
                    
                    <vs-divider />
                   <div class="flex justify-between font-semibold mb-3">
                        <span>Total Price(€)</span>
                        <span v-if="getCalculateFrontEndPrice.totalCabinPrice!=0">{{Number(getCalculateFrontEndPrice.totalCabinPrice) | priceFormat}}</span>
                        <span v-else>{{ "0" | priceFormat}}</span>
                    </div>
                      <vs-button v-if="isComplateCheck" class="w-full" @click="complate()">COMPLETE</vs-button>
                  </vx-card>
                </div>
              </div>
            </tab-content>

            <!-- tab 5 content -->
            <tab-content title="Booking" icon="feather icon-bar-chart" class="mb-5">
              <div class="vx-row">

                  <div class="vx-col w-full md:w-1/5">
                      <vx-card>
                          <h4>Cabin List</h4>
                          <ul class="faq-topics mt-4">
                              <li v-for="item in bookingDetails" :key="item._id" class="p-2 font-medium flex items-center" @click="selectedCabin=item">
                                  <div class="h-3 w-3 rounded-full mr-2 bg-red"></div><span class="cursor-pointer">{{ item.cabin.number }}</span>
                              </li>
                          </ul>
                          <ul>
                            <li>
                              <vs-divider class="my-6" />
                              <div class="text-center">
                                  <p><span class="mr-8">SELECTED CABIN: <span class="font-semibold text-warning">{{selectedCabin==null ? ' - ' : selectedCabin.cabin.number}}</span></span></p>
                              </div>
                              </li>
                              <li>
                                  <div class="flex items-left">
                                      <vs-input
                                          v-validate="'required'"
                                          name="passport"
                                          v-model="passport"
                                          class="mr-3 ml-2 mt-4" />
                                      <vs-button class="mt-4" @click="checkPasaport(passport)" :disabled="passport>0? false : true">CHECK</vs-button>
                                  </div>
                                  <div class="text-center mt-3">
                                    <p><span v-show="errors.has('passport')" class="text-left text-danger">{{ errors.first('passport') }}</span></p>
                                  </div>
                                  <div class="text-center">
                                      <p><span v-if="passangerNotFound" class="text-left text-danger">Passenger not found</span></p>
                                  </div>
                                  <vs-divider class="my-6" />
                              <form>
                                  <div v-if="isPassengerPanel==1">                  
                                  <div class="mt-5 ml-2">
                                      <h6>First Name:</h6>
                                      <p>{{foundPassenger.firstName}}</p>
                                  </div>

                                  <div class="mt-5 ml-2">
                                      <h6>Last Name:</h6>
                                      <p>{{foundPassenger.lastName}}</p>
                                  </div>

                                  <div class="mt-5 ml-2">
                                      <h6>Date of Birth:</h6>
                                      <p>{{foundPassenger.Dob | formatShortDate}}</p>
                                  </div>

                                  <div class="mt-5 ml-2">
                                      <h6>Passport Expiry Date:</h6>
                                      <p>{{foundPassenger.passportExpiryDate | formatShortDate}}</p>
                                  </div>
                          
                                <vs-button class="w-full mt-4" color="success" @click="addPassenger()">ADD TO CABIN</vs-button>
                                <vs-divider class="my-6" />
                                  </div>
                                  <div v-if="isPassengerPanel==2">
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
                                      <vs-button class="w-full mt-4" type="filled" color="success" @click.prevent="addNewPassenger" :disabled="!isFormValid">Add New Passenger</vs-button>
                                      <vs-divider class="my-6" />
                                  </div>
                              </form>
                            </li>
                          </ul>
                      </vx-card>
                  </div>

                  <div class="vx-col w-full md:w-4/5 relative">
                    <vx-card title="Passenger and Contact Details">
                        <p>Please Enter Passenger Information</p>
                        <vs-collapse type="margin" accordion>
                          <vs-collapse-item v-for="(item,bookingindex) in bookingDetails" :key="bookingindex">
                              <div slot="header"><vs-avatar icon-pack="feather" icon="icon-log-in" style="vertical-align: middle;" />#{{item.cabin.number}} / {{""+getTotalPricePassengers(item.cabin.number).price+"" | priceFormat}} / {{getTotalPricePassengers(item.cabin.number).passengersCount}}</div>
                              <div class="vx-row">
                                <div class="vx-col sm:w-4/5 w-full mb-2">
                                  <vs-table :data="item.Passengers">
                                    <template slot="thead">
                                      <vs-th>Firt Name</vs-th>
                                      <vs-th>Last Name</vs-th>
                                      <vs-th>Date of Birt</vs-th>
                                      <vs-th>Passport No</vs-th>
                                      <vs-th>Passport Expiry Date</vs-th>
                                      <vs-th>Delete</vs-th>
                                    </template>
                                    <template slot-scope="{data}">
                                      <vs-tr :data="tr" :key="passengerindex" v-for="(tr, passengerindex) in data">
                                        <vs-td :data="tr.firstName">
                                          {{ tr.firstName }}
                                        </vs-td>
                                        <vs-td :data="tr.lastName">
                                          {{ tr.lastName }}
                                        </vs-td>
                                        <vs-td :data="tr.Dob">
                                          {{ tr.Dob }}
                                        </vs-td>
                                        <vs-td :data="tr.passportNo">
                                          {{ tr.passportNo }}
                                        </vs-td>
                                        <vs-td :data="tr.passportExpiryDate">
                                          {{ tr.passportExpiryDate }}
                                        </vs-td>
                                        <vs-td>
                                          <feather-icon icon="TrashIcon" @click="deletePassengerBooking(bookingindex,passengerindex)" class="cursor-pointer" svgClasses="w-5 h-5"/>
                                        </vs-td>
                                      </vs-tr>
                                    </template>
                                  </vs-table>
                                </div>
                                <div class="vx-col sm:w-1/5 w-full mb-2">
                                    <vs-textarea label="Rezervation Note" v-model="notes[bookingindex]"/>
                                </div>
                              </div>
                          </vs-collapse-item>

                      </vs-collapse>
                      <vs-button color="success" class="mt-6 ml-auto flex" @click.prevent="complateBooking">COMPLETE BOOKING</vs-button>
                    </vx-card>
                  </div>
                 
              </div>
            </tab-content>

            <!-- tab 6 content -->
            <tab-content title="Complated" icon="feather icon-check" class="mb-5">
              <div class="vx-row">
                  <div class="vx-col w-full lg:w-4/4 mb-base">
                    <vx-card slot="no-body" class="text-center bg-primary-gradient greet-user">
                      <feather-icon icon="AwardIcon" class="p-6 mb-8 bg-primary inline-flex rounded-full text-white shadow" svgClasses="h-8 w-8"></feather-icon>
                      <h1 class="mb-6 text-white">Reservation Completed</h1>
                      <p class="xl:w-3/4 lg:w-4/5 md:w-2/3 w-4/5 mx-auto text-white">You have done more sales today. Check your new badge in your profile.</p>
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
      passangerNotFound:false,
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
      passport:null,
      selected: [],
      itemsPerPage: 10,
      isMounted: false,
      cruiseType:[],
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
      isComplate:false,
      selectedCabin:null,
      isPassengerPanel:0,
      notes:[],
      isRoseCabin:false
    }
  },
  watch:{
    isLoading (newData) {
      if (newData) {
        this.$vs.loading()
      } else {
        this.$vs.loading.close()
      }
    },
    selected(){
      this.calculateFrontEndPrice()
    }
  },
  
  computed: {
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

    bookingDetails (){
     return this.$store.state.booking.BookingDetails
    }, 
    cruisesList (){
     return this.$store.state.booking.CruisesbyCruiseTypes
    }, 

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

      //calculate front end price function
      if(total>0){
        this.calculateFrontEndPrice()
      }else{
        this.$store.state.price.calculatedFrontEndPrice.totalCabinPrice=0
      }

      return total
    },
    isSmallerScreen () {
      return this.$store.state.windowWidth < 768
    },
    getCalculateFrontEndPrice () {
      return this.$store.state.price.calculatedFrontEndPrice
    },

    getCalculateBackEndPrice () {
      return this.$store.state.price.calculatedBackEndPrice
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
    async calculateFrontEndPrice(){
      this.loadingBar(true);
      this.selectedCruise.market=JSON.parse(localStorage.getItem("agency")).market
      let calculatePrice={
        selectedCabin:this.selected,
        selectedCruise:this.selectedCruise
      }
      await this.$store.dispatch('calculatePriceFrontEnd',calculatePrice)
      this.loadingBar(false);
    },
    getTotalPricePassengers(cabinNumber){
      let price=0;
      let passengersCount=0;
      for (let index = 0; index < this.getCalculateBackEndPrice.length; index++) {
        const element = this.getCalculateBackEndPrice[index];
        if(element.cabinNumber==cabinNumber){
            console.log("---->>>",element);
            price = element.calculatePrice
            passengersCount = element.passengersCount
        }
      }

      let data={
        price,
        passengersCount
      }
      
      return data;
    },

    isROSCheck(id){
      return this.selectedCruise.rosCabins.find((element)=>{
          if(element.cabin._id==id){
            console.log("eşit");
            return true;
          }else{
            return false;
          }
      });
    },
    async complateBooking(){
      for (let index = 0; index < this.$store.state.booking.BookingDetails.length; index++) {
        this.$store.state.booking.BookingDetails[index].notes=this.notes[index]
        this.$store.state.booking.BookingDetails[index].totalPrice=this.getTotalPricePassengers(this.$store.state.booking.BookingDetails[index].cabin.number).price
        console.log(this.$store.state.booking.BookingDetails[index]);
        await this.$store.dispatch('updateBooking',this.$store.state.booking.BookingDetails[index])
      }
      
      this.$refs.checkoutWizard.nextTab()
    },

    deletePassengerBooking(bookingindex,passengerindex){
      let params={
        bookingindex:bookingindex,
        passengerindex:passengerindex
      }
      this.$vs.dialog({
        type: 'confirm',
        color: 'danger',
        title: 'Confirm Delete',
        text: `You are about to delete Pasaport No : "${this.$store.state.booking.BookingDetails[bookingindex].Passengers[passengerindex].passportNo}"`,
        accept: async ()=>{
          this.loadingBar(true)
          this.$store.commit('CLEAR_BOOKING_DETAILS_WITH_INDEX',params)
          await this.$store.dispatch('calculatePriceBackEnd',this.$store.state.booking.BookingDetails);
          this.$vs.notify({
            color: 'success',
            title: 'Passenger Deleted',
            text: 'The selected user was successfully deleted'
          })
            this.loadingBar(false)
        },
        acceptText: 'Delete'
      })
    },

    isAnyPassenger(){
      for (let index = 0; index < this.$store.state.booking.BookingDetails.length; index++) {
        for (let detail = 0; detail < this.$store.state.booking.BookingDetails[index].Passengers.length; detail++) {
          if(this.$store.state.booking.BookingDetails[index].Passengers[detail].passportNo==this.$store.state.passenger.passanger.data.passportNo){
            return false
          }
        }
      }
      return true
    },

    async addPassenger(){
      let newThis=this;
    if (typeof this.$store.state.passenger.passanger.data !== 'undefined'){
      if(this.isAnyPassenger()){
        if(this.selectedCabin!=null){
        for (let index = 0; index < this.$store.state.booking.BookingDetails.length; index++) {
            if(this.$store.state.booking.BookingDetails[index].cabin.number==this.selectedCabin.cabin.number){
              if(this.$store.state.booking.BookingDetails[index].cabin.capacity>this.$store.state.booking.BookingDetails[index].Passengers.length){
                  let params={
                      index:index,
                      passanger:this.$store.state.passenger.passanger.data
                    }

                    this.$store.commit('SET_BOOKING_DETAILS_PASSENGER',params)
          
                    
                    await this.$store.dispatch('calculatePriceBackEnd',this.$store.state.booking.BookingDetails);

                    this.$vs.notify({
                      title:'Successful',
                      text:'added passenger',
                      color:'success'
                    })

              }else{
                this.$vs.notify({
                  title:'Cabin is full',
                  text:'Please delete passengers from the cabin',
                  color:'danger'
                })
              }
            }
        }
      }else{
        this.$vs.notify({
            title:'Cabin Error',
            text:'Please choose cabin',
            color:'danger'
        })
      }
      }else{
      this.$vs.notify({
            title:'Passenger exist',
            text:'Please enter new passport number',
            color:'warning'
        })
      }
      
    }else{
       this.$vs.notify({
            title:'Passenger Error',
            text:'Please add passenger',
            color:'danger'
        })
    }
    },

    async addNewPassenger(){
      this.loadingBar(true)
      let newThis=this
      this.$validator.validateAll().then(async function(result){
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
      this.passangerNotFound=false
      this.passport=null
      this.loadingBar(false)
    },

    async checkPasaport(value){
      this.loadingBar(true)
      if(this.selectedCabin!=null){
      await this.$store.dispatch('getPassenger', value)
      if(this.$store.state.passenger.passanger.success==false){
        this.isPassengerPanel=2
        this.passangerNotFound=true
      }else{
        this.passangerNotFound=false
        this.isPassengerPanel=1
        console.log(this.$store.state.passenger.passanger.data);
        const item=this.$store.state.passenger.passanger.data;
        this.foundPassenger={
          firstName: item.firstName,
          lastName: item.lastName,
          passportNo: item.passportNo,
          passportExpiryDate: item.passportExpiryDate,
          Dob: item.Dob,
        };
      }
      }else{
        this.$vs.notify({
            title:'Cabin Error',
            text:'Please choose cabin',
            color:'danger'
        })
      }
      this.loadingBar(false)
    },

    async complate () {
      this.selectedCabin=null
      let newThis=this
      this.loadingBar(true)
      this.$store.commit('CLEAR_BOOKING_DETAILS')
      let itemsProcessed = 0;
      this.selected.forEach(async function(element){
        console.log("Booking Cabin",element);
         var dt = new Date();
         dt.setHours(dt.getHours()+24);

        let blockedCabin={
          cabin:element,
          cruise:newThis.selectedCruise,
          blockReason:'Payment Pending',
          blockedUntil:dt,
        }
        
        let booking={}
        booking.cabin=element
        booking.Passengers=[]
        booking.notes=""
        booking.cruise= newThis.selectedCruise
        booking.status="pending payment",
        booking.isRose=element.isRose,
        booking.rosePrice=element.rosePrice,
        booking.totalPrice=0,
        await newThis.$store.dispatch('addBooking',booking).then((response)=>{
          if(response){
            console.log("booking.vue icine gelen respose", response)
            if(response.success){
              newThis.$store.dispatch('addBlockedCabin',blockedCabin)
            }
          }
        })
        
           
         
        
        itemsProcessed++;
        if(itemsProcessed === newThis.selected.length) {
            newThis.createNotes();
            newThis.$refs.checkoutWizard.nextTab()
            newThis.loadingBar(false)
        }
      });
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
      this.filter.selectedCruiseType = value
      this.filter.selectedVessel = value.vessel
     // this.getCruise()
      this.stepNextTab()

      this.loadingBar(false)
    },

    // TAB 2
    getCruise () {
      //this.cruisesList = this.$store.state.booking.CruisesbyCruiseTypes
    },

    async getSelectedCruise (value) {
      //filter için Season objesini oluşturduk
      this.filter.selectedSeason = value.season
      this.selectedCruise = value
      await this.$store.dispatch('getBlockedCabinsByCruise',this.selectedCruise._id)
      this.getMarket()
    },

    // TAB 3
    async getMarket () {
      this.loadingBar(true)
      //filter için Market objesini oluşturduk
      this.filter.selectedMarket = {
        _id:JSON.parse(localStorage.getItem("agency")).market, //Agency Market ID
        name:''
      }

      await this.$store.dispatch('getFilteredPrices', this.filter)
      this.cabinCategory = this.$store.state.price.filteredPrices
      this.loadingBar(false)
      this.stepNextTab()

    },

    async selectedCabinCategory (value) {
      console.log(value);
      this.loadingBar(true)
      this.endUserPrice = value.endUserPrice
      const params = {
        cruise : this.selectedCruise._id,
        cabinCategory: value.cabinCategory._id
      }
      await this.$store.dispatch('getAvaliableCabinsbyCruiseCabinCategory', params)
      this.cabins = this.$store.state.cabin.avaliableCabinsbyCruiseCategory
      
      for (let index = 0; index < this.cabins.length; index++) {
        this.selectedCruise.rosCabins.find((element)=>{
          if(element.cabin._id==this.cabins[index]._id){
            console.log("eşit----->",element.cabin);
            this.cabins[index].isRose=true
            this.cabins[index].rosPrice=element.rosPrice
            console.log(this.cabins[index]);
          }
        });
      }
      
      
      
      this.loadingBar(false)
      this.stepNextTab()
      this.selected=[]
    },

    stepNextTab () {
      this.$refs.checkoutWizard.nextTab()
    },

    loadingBar (value) {
      this.isLoading = value
    },

    createNotes(){
      for (let index = 0; index < this.$store.state.booking.BookingDetails.length; index++) {
        this.notes.push("")
      }
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
