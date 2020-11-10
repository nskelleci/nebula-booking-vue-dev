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
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} PRICE </h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

    <div class="p-6">
        <h5>Cabin Category</h5>
        <v-select v-model="cabinCategory" label="name" :options="cabinCategories" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        <!-- NAME -->
        <vs-input-number label="Price" v-model="endUserPrice" :step="0.5" class="mt-5 w-full" name="price" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('price')">{{ errors.first('price') }}</span>
        <!-- Upload -->
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
      endUserPrice: 0,
      vessel : null,
      cruiseType : null,
      market : null,
      season : null,
      cabinCategory:null,
    

      settings: { // perfectscrollbar settings
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
        const { _id, endUserPrice, vessel, cruiseType, cabinCategory, market, season} = JSON.parse(JSON.stringify(this.data))
        this.dataId = _id
        this.vessel = vessel
        this.cruiseType = cruiseType
        this.cabinCategory = cabinCategory
        this.market = market
        this.season = season
        this.endUserPrice = endUserPrice
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
      return !this.errors.any() && this.cabinCategory && this.endUserPrice
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },
    cabinCategories () {
      return this.$store.state.cabinCategory.cabinCategories
    },
    initFilter () {
      return   this.$store.state.price.priceFilter

    }
  },
  methods: {
    initValues () {
      if (this.data._id) return

      this.dataId = null
      this.cabinCategory = null
      this.endUserPrice = null

      this.vessel = this.initFilter.selectedVessel
      this.cruiseType = this.initFilter.selectedCruiseType
      this.market = this.initFilter.selectedMarket
      this.season = this.initFilter.selectedSeason
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            _id: this.dataId,
            vessel: this.vessel,
            cruiseType : this.cruiseType,
            market : this.market,
            season : this.season,
            cabinCategory : this.cabinCategory,
            endUserPrice : this.endUserPrice
          }

          if (this.dataId !== null && this.dataId.length >= 0) {
            this.$store.dispatch('updatePrice', obj).catch(err => { console.error(err) })
            //VesselService.updateVessel(obj)
          } else {
            delete obj._id
            this.$store.dispatch('addPrice', obj).catch(err => { console.error(err) })
          }
          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    }
  },
  created () {
  },
  mounted () {

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
