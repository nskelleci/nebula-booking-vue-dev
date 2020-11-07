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
            
        </form-wizard>
    </div>
</template>

<script>
import { FormWizard, TabContent } from 'vue-form-wizard'
import 'vue-form-wizard/dist/vue-form-wizard.min.css'
const cruiseTypeView = () => import('./components/cruiseTypeView.vue')
const cruisesView = () => import('./components/cruisesView.vue')
const pricesView = () => import('./components/pricesView.vue')

export default {
  data () {
    return {
      // TAB 2
      fullName: '',
      mobileNum: '',
      pincode: '',
      houseNum: '',
      area: '',
      landmark: '',
      city: '',
      state: '',
      addressType: 1,
      addressTypeOptions: [
        { text: 'Home', value: 1 },
        { text: 'Office', value: 2 }
      ],
      // TAB 3
      paymentMethod: 'debit-card',
      cvv: '',
      cruiseType:[],
      cruisesList:[],
      cabinCategory:[],
      filter : {
        'selectedVessel' : null,
        'selectedCruiseType' : null,
        'selectedMarket' : null,
        'selectedSeason' : null
      },
      selectedCruise:null,
      isLoading:false,
    }
  },
  watch:{
    isLoading:function(newData){
        if(newData){
          this.$vs.loading();
        }else{
          this.$vs.loading.close();
        }
    }
  },
  methods: {

    // TAB 1
    async cruiseTypes() {
      this.loadingBar(true);
      await this.$store.dispatch('getCruiseTypes')
      this.cruiseType= this.$store.state.cruiseType.cruisetypes
      this.loadingBar(false);
    },

    async selectedCruiseType(value){
      this.loadingBar(true);
      await this.$store.dispatch('getCruisebyCruiseType',value._id);

      //filter için cruise tipi ve vessel id objelerini oluşturduk
      this.filter.selectedCruiseType={
        _id:value._id,
        name:""
      }
      this.filter.selectedVessel={
        _id:value.vessel._id,
        name:"",
        flag:""
      }
      this.getCruise();
      this.loadingBar(false);
    },

    // TAB 2
    getCruise () {
        this.cruisesList = this.$store.state.booking.bookings;
        console.log(this.cruisesList);
        this.stepNextTab();
    },

    getSelectedCruise(value){

       //filter için Season objesini oluşturduk
        this.filter.selectedSeason={
          _id:value.season._id,
          name:""
        },
        this.selectedCruise=value._id;
        this.getMarket();
    },

    // TAB 3
    async getMarket(){
    this.loadingBar(true);
    //filter için Market objesini oluşturduk
    this.filter.selectedMarket={
      _id:"5f948cbb1a3a980011ad3686", //Turkish Market ID
      name:""
    }

    await this.$store.dispatch('getFilteredPrices', this.filter)
    this.cabinCategory = this.$store.state.price.filteredPrices
    this.loadingBar(false);
    this.stepNextTab();

    },

    async selectedCabinCategory(value){
      const params = {
        cruise : this.selectedCruise,
        cabinCategory: value.cabinCategory._id
      }
      await this.$store.dispatch('getAvaliableCabinsbyCruiseCabinCategory',params)
      console.log(this.$store.state.cabin.avaliableCabinsbyCruiseCategory);
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

    stepNextTab(){
      this.$refs.checkoutWizard.nextTab();
    },
    loadingBar(value){
      this.isLoading=value
    }
  },
  components: {
    cruiseTypeView,
    cruisesView,
    pricesView,
    FormWizard,
    TabContent
  },
  created(){
    this.cruiseTypes();
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
