<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="vx-row">
    <price-form :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />

    <!-- Overview -->
    <div class="vx-col w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
        <vx-card>
          <ul>
            <h6>Select a Vessel</h6>
            <li
              v-for="vessel in vessels"
              :key="vessel._id"
              class="flex items-center cursor-pointer py-1"
            >
              <vs-radio v-model="selectedVessel" vs-name="vessel" :vs-value="vessel" >
                {{vessel.name}}
              </vs-radio>
            </li>
          </ul>
        </vx-card>
        <vs-divider></vs-divider>
         <vx-card>
          <ul>
            <h6>Select a Cruise Type</h6>
            <li
              v-for="cruiseType in cruiseTypes"
              :key="cruiseType._id"
              class="flex items-center cursor-pointer py-1"
            >
              <vs-radio v-model="selectedCruiseType" vs-name="cruiseType" :vs-value="cruiseType" >
                {{cruiseType.name}}
              </vs-radio>
            </li>
          </ul>
        </vx-card>
        <vs-divider></vs-divider>
        <vx-card>
          <ul>
            <h6>Select a market</h6>
            <li
              v-for="market in markets"
              :key="market._id"
              class="flex items-center cursor-pointer py-1"
            >
              <vs-radio v-model="selectedMarket" vs-name="market" :vs-value="market" >
               {{market.name}} 
              </vs-radio>
            </li>
          </ul>          
        </vx-card>
        <vs-divider></vs-divider>
        <vx-card>
          <ul>
            <h6>Select Season</h6>
            <li
              v-for="season in seasons"
              :key="season._id"
              class="flex items-center cursor-pointer py-1"
            >
              <vs-radio v-model="selectedSeason" vs-name="season" :vs-value="season" >
               {{season.name}} 
              </vs-radio>
            </li>
          </ul>          
        </vx-card>
    </div>
    <div class="vx-col w-full  md:w-3/4 lg:w-3/4 xl:w-3/4 mb-base">

      <!-- RIGHT COL -->
        <vx-card>
          <div id="data-list-thumb-view" class="data-list-container">

    <vs-table ref="table" search :data="prices">
      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <div class="flex flex-wrap-reverse items-center">
          <!-- ADD NEW -->
          <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex items-center justify-between text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData" >
              <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
              <span class="ml-2 text-base text-primary">Add New</span>
          </div>
        </div>
      </div>
      <template slot="thead">
        <vs-th>Vessel</vs-th>
        <vs-th>Cruise Type</vs-th>
        <vs-th>Cabin Category</vs-th>
        <vs-th>Season</vs-th>        
        <vs-th>Market</vs-th>
        <vs-th>Price</vs-th>        
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="item" :key="_id" v-for="(item,_id) in data" >

            <vs-td>
              <p class="product-name font-medium truncate">{{ item.vessel.name }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.cruiseType.name }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.cabinCategory.name }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.season.name }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.market.name }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.endUserPrice }}</p>
            </vs-td>

            <vs-td class="whitespace-no-wrap">
              <!-- <feather-icon icon="InfoIcon" svgClasses="w-7 h-7 hover:text-primary stroke-current" @click="portDetail(port)" /> -->
              <feather-icon icon="EditIcon" svgClasses="w-7 h-7 hover:text-primary stroke-current" class="ml-4" @click.stop="editData(port)" />
              <feather-icon icon="TrashIcon" svgClasses="w-7 h-7 hover:text-danger stroke-current" class="ml-4" @click.stop="deleteData(port._id)" />
            </vs-td>
          </vs-tr>
        </tbody>
      </template>

    </vs-table>
  </div>
        </vx-card>
    </div>
  </div>
</template>

<script>
import PriceForm  from './PriceForm'
export default {
  components: {
    PriceForm
  },
  data () {
    return {
      filter : {
        'selectedVessel' : null,
        'selectedCruiseType' : null,
        'selectedMarket' : null,
        'selectedSeason' : null
      },
      selectedVessel: {},
      selectedCruiseType : {},
      selectedMarket :{},
      selectedSeason : {},
      addNewDataSidebar: false,
      sidebarData: {}
      // Filter Sidebar
      // clickNotClose: true,
      
    }
  },
  computed: {
    windowWidth () {
      return this.$store.state.windowWidth
    },
    vessels () {
      return this.$store.state.vessel.vessels
    },
    markets () {
      return this.$store.state.market.markets
    },

    seasons () {
      return this.$store.state.cruiseSeason.cruiseseasons
    },

    cruiseTypes () {
      return this.$store.state.cruiseType.cruiseTypesByVessel
    },
    prices () {
      return this.$store.state.price.filteredPrices
    },
    FirstCruiseType () {
      return  this.$store.getters.getFirstCruiseType
    },
    firstVessel () {
      return  this.$store.getters.getFirstVessel
    },

    firstMarket () {  
      return this.$store.getters.getFirstMarket
    },

    firstSeason () {
      return this.$store.getters.getFirstSeason
    }
    
  },
  watch: {
    windowWidth () {
      // this.setSidebarWidth()
    },
    firstMarket () {
      this.selectedMarket = this.firstMarket
     
    },
    firstVessel () {
      this.selectedVessel = this.firstVessel
      
    },
    FirstCruiseType () {
      this.selectedCruiseType = this.FirstCruiseType
    },

    selectedVessel () {
      this.$store.dispatch('getCruiseTypesByVessel', this.selectedVessel._id)
      this.$store.dispatch('getCabinCategories', this.selectedVessel._id)
      this.filter.selectedVessel = this.selectedVessel
      this.updateFilter(this.filter)
      // this.selectedCruiseType = this.FirstCruiseType
    },
    selectedCruiseType () {
      this.filter.selectedCruiseType = this.selectedCruiseType
      this.updateFilter(this.filter)
    },
    selectedMarket () {
      this.filter.selectedMarket = this.selectedMarket
      this.updateFilter(this.filter)
    },
    selectedSeason () {
      this.filter.selectedSeason = this.selectedSeason
      this.updateFilter(this.filter)
    },

    firstSeason () {
      this.selectedSeason = this.firstSeason
    },

    filter : {
      deep:true,
      async handler (filter) {
        console.log(filter);
        this.$store.commit('SET_VALUES', filter) 
        await this.$store.dispatch('getFilteredPrices', filter)
      }
    }
  },
  methods: {
    setSelected (value) {
      console.log(value)
    },
    async updateFilter (filter) {
      await this.$store.commit('SET_VALUES', filter)
    },
    addNewData () {
      this.sidebarData = {}
      this.toggleDataSidebar(true)
    },
    editData (data) {
      // this.sidebarData = JSON.parse(JSON.stringify(this.blankData))
      this.sidebarData = data
      this.toggleDataSidebar(true)
    },
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }

  },
  created () {
    // this.setSidebarWidth()
    this.$store.dispatch('getVessels')
    this.$store.dispatch('getMarkets')
    this.$store.dispatch('getCruiseSeasons')

  },
  mounted () {
    // this.isMounted = true
  },
  beforeDestroy () {
    const filter = {
      'selectedVessel' : null,
      'selectedCruiseType' : null,
      'selectedMarket' : null,
      'selectedSeason' : null
    }
    this.$store.commit('SET_VALUES', filter)
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

      .vs-table--search {
        padding-top: 0;

        .vs-table--search-input {
          padding: 0.9rem 2.5rem;
          font-size: 1rem;

          & + i {
            left: 1rem;
          }

          &:focus + i {
            left: 1rem;
          }
        }
      }
    }

    .vs-table {
      border-collapse: separate;
      border-spacing: 0 1.3rem;
      padding: 0 1rem;

      tr {
        box-shadow: 0 4px 20px 0 rgba(0, 0, 0, 0.05);
        td {
          padding: 10px;
          &:first-child {
            border-top-left-radius: 0.5rem;
            border-bottom-left-radius: 0.5rem;
          }
          &:last-child {
            border-top-right-radius: 0.5rem;
            border-bottom-right-radius: 0.5rem;
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
        td.td-check {
          padding: 20px !important;
        }
      }
    }

    .vs-table--thead {
      th {
        padding-top: 0;
        padding-bottom: 0;

        .vs-table-text {
          text-transform: uppercase;
          font-weight: 600;
        }
      }
      th.td-check {
        padding: 0 15px !important;
      }
      tr {
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
