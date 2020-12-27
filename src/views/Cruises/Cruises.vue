<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-thumb-view" class="data-list-container">
    <div class="demo-alignment">
       <vs-popup fullscreen title="fullscreen" :active.sync="popupActive">
        <prices/>
      </vs-popup>
  </div>

    <port-form :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <vs-table ref="table"   v-model="selected" pagination :max-items="itemsPerPage" search :data="cruises">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">

        <div class="flex flex-wrap-reverse items-center">

          <!-- ACTION - DROPDOWN -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mr-4 mb-4">

            <div class="p-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer flex items-center justify-center text-lg font-medium w-32">
              <span class="mr-2">Actions</span>
              <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
            </div>

            <vs-dropdown-menu>

              <vs-dropdown-item>
                <span class="flex items-center">
                  <feather-icon icon="TrashIcon" svgClasses="h-4 w-4" class="mr-2" />
                  <span>Delete</span>
                </span>
              </vs-dropdown-item>
            </vs-dropdown-menu>
          </vs-dropdown>

          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>


        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ cruises.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : cruises.length }} of {{ queriedItems }}</span>
            <feather-icon icon="ChevronDownIcon" svgClasses="h-4 w-4" />
          </div>
          <!-- <vs-button class="btn-drop" type="line" color="primary" icon-pack="feather" icon="icon-chevron-down"></vs-button> -->
          <vs-dropdown-menu>

            <vs-dropdown-item @click="itemsPerPage=4">
              <span>4</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=10">
              <span>10</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=15">
              <span>15</span>
            </vs-dropdown-item>
            <vs-dropdown-item @click="itemsPerPage=20">
              <span>20</span>
            </vs-dropdown-item>
          </vs-dropdown-menu>
        </vs-dropdown>
      </div>

      <!-- <template slot="thead">
        <vs-th>Image</vs-th>
        <vs-th sort-key="name">Name</vs-th>
        <vs-th sort-key="category">Flag</vs-th>        
        <vs-th>Action</vs-th>
      </template> -->

      <template>
        <tbody>
          <div class="vx-row" >
            <div :data="item" :key="index" v-for="(item, index) in cruises" class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base" >
                <vx-card>
                    <img src="../../assets/images/uploads/gemini-out1.jpg" alt="content-img" class="responsive rounded-lg">
                    <div class="my-6">
                        <h4 class="mb-2">{{item.name}} ({{item.vessel.name}})</h4>
                        <p class="text-grey">{{item.description}}</p>
                        <p>{{item.checkInDate | formatShortDate }} - {{item.checkOutDate | formatShortDate}}</p>
                    </div>
                    <vs-divider></vs-divider>
                    <div class="flex justify-between flex-wrap">
                        <span>
                            <p class="text-xl">{{item.cruiseType.name}}</p>
                            <p class="text-grey">{{item.season.name}}</p>
                        </span>
                        
                        
                    </div>
                     <div class="flex justify-between flex-wrap">
                       <span>
                        <vs-button class="mt-4 shadow-lg" type="gradient" color="#7367F0" gradient-color-secondary="#CE9FFC" @click="openPricePopup(item)">Price List</vs-button>
                       </span>
                       <span>
                        <vs-button class="mt-4 shadow-lg" type="gradient" color="warning" gradient-color-secondary="#CE9FFC" @click.stop="roseCabin(item)" >Rose Cabin</vs-button>
                       </span>
                       <span>
                        <vs-button class="mt-4 mr-2 shadow-lg" type="gradient" color="#7367F0" gradient-color-secondary="#CE9FFC" @click.stop="editData(item)" >Edit</vs-button>
                       </span>
                     </div>
                </vx-card>
            </div>
            <!-- <div class="vx-col w-full sm:w-1/2 lg:w-1/3 mb-base">
                <vx-card>
                    <img src="../../assets/images/uploads/gemini-out1.jpg" alt="content-img" class="responsive rounded-lg">
                    <div class="my-6">
                        <h4 class="mb-2">2. Voyage (Gemini)</h4>
                        <p class="text-grey">Mykonos, Rhodes, Santorini, Athens (description)</p>
                        <p>01.04.2021 - 05.04.2021</p>
                    </div>
                    <vs-divider></vs-divider>
                    <div class="flex justify-between flex-wrap">
                        <span>
                            <p class="text-xl">3 Days Cruises</p>
                            <p class="text-grey">Normal Season</p>
                        </span>
                        
                          <vs-button class="mt-4 mr-2 shadow-lg" type="gradient" color="#7367F0" gradient-color-secondary="#CE9FFC">Edit</vs-button>
                        
                    </div>
                </vx-card>
            </div> -->
          </div>
        </tbody>
      </template>

    </vs-table>
  
  </div>
</template>

<script>

import PortForm  from './CruiseForm'
import router from '../../router'
import prices from '../Cruises/Prices/Prices'
//import moduleDataList from '@/store/data-list/moduleDataList.js'

export default {
  components: {
    PortForm,
    prices
  },
  data () {
    return {
      popupActive: false,
      selected: [],
      //vessels: [],
      itemsPerPage: 20,
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    // vessels () {
    //   //return this.$store.state.dataList.products
    //   return this.$store.getters.getVessels
    // },
    queriedItems () {
      return []
    // return this.$refs.table ? this.$refs.table.queriedResults.length : this.products.length
    },
    cruises () {
      return this.$store.state.cruise.cruises
    }
  },
  methods: {
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    roseCabin(data){
      console.log(data);
      router.push({name : 'rosecabin', params: {id: data._id} })
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    },
    async openPricePopup (item) {
      const filter = {
        'selectedVessel' : item.vessel,
        'selectedCruiseType' : item.cruiseType,
        'selectedSeason' : item.season,
        'selectedMarket' : null
      }
      await this.$store.commit('SET_VALUES', filter)
      this.popupActive = true
    }
  },
  created () {
    this.$store.dispatch('getCruises')
  },
  updated () {
   
  },
  mounted () {
    this.isMounted = true
  },
  watch :  {         
  }
}
</script>

<style lang="scss">
#data-list-thumb-view {
  .vs-con-table {

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap-reverse;
      margin-left: 1.5rem;
      margin-right: 1.5rem;
      > span {
        display: flex;
        flex-grow: 1;
      }

      .vs-table--search{
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          &+i {
            left: 1rem;
          }

          &:focus+i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;


      tr{
          box-shadow: 0 4px 20px 0 rgba(0,0,0,.05);
          td{
            padding: 10px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
            }
            &.img-container {
              // width: 1rem;
              // background: #fff;

              span {
                display: flex;
                justify-content: flex-start;
              }

              .product-img {
                height: 110px;
              }
            }
          }
          td.td-check{
            padding: 20px !important;
          }
      }
    }

    .vs-table--thead{
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text{
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check{
        padding: 0 15px !important;
      }
      tr{
        background: none;
        box-shadow: none;
      }
    }

    .vs-table--pagination {
      justify-content: center;
    }
  }
}
</style>
