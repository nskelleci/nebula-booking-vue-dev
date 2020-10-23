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
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} CABIN </h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

    <div class="p-6">

        <!-- NAME -->
        <vs-input label="Number" v-model="number" class="mt-5 w-full" name="cabin-number" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('cabin-number')">{{ errors.first('cabin-number') }}</span>

        <vs-input label="Description" v-model="description" class="mt-5 w-full" name="cabin-description" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('cabin-description')">{{ errors.first('cabin-description') }}</span>

        <vs-input-number label="Capacity : " v-model="capacity"  name="cabin-capacity" v-validate="'required'" />
        <span class="text-danger text-sm" v-show="errors.has('cabin-capacity')">{{ errors.first('cabin-capacity') }}</span>
        <h5>Cabin Category</h5>
        <v-select v-model="cabinCategory" label="name" :options="cabinCategories" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
        <h5>Bed Type</h5>
        <v-select v-model="bedType" label="name" :options="bedTypes" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>

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
      number: '',
      description : '',
      capacity : null,
      bedType : null,
      cabinCategory : null,
      vessel : null,
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
        const { _id, number, description, capacity, bedType, cabinCategory} = JSON.parse(JSON.stringify(this.data))
        this.dataId = _id
        this.number = number
        this.description = description
        this.capacity = capacity
        this.bedType = bedType
        this.cabinCategory = cabinCategory
        this.vessel = this.$route.params.id
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
      return !this.errors.any() && this.number && this.capacity && this.description && this.bedType && this.cabinCategory
    },
    scrollbarTag () { return this.$store.getters.scrollbarTag },

    cabinCategories () {
      return this.$store.state.cabinCategory.cabinCategories
    },
    bedTypes () {
      return this.$store.state.bedType.bedtypes
    }
  },
  methods: {
    initValues () {
      if (this.data._id) return
      this.dataId = null
      this.number = ''
      this.description = ''
      this.capacity = ''
      this.bedType = null
      this.cabinCategory = null
      this.vessel = null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            _id: this.dataId,
            number: this.number,
            description : this.description,
            capacity : this.capacity,
            bedType : this.bedType,
            cabinCategory : this.cabinCategory,
            vessel : this.$route.params.id
          }

          if (this.dataId !== null && this.dataId.length >= 0) {
            this.$store.dispatch('updateCabin', obj).catch(err => { console.error(err) })
            //VesselService.updateVessel(obj)
          } else {
            delete obj._id
            this.$store.dispatch('addCabin', obj).catch(err => { console.error(err) })
          }
          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    }
  },

  created () {
    this.$store.dispatch('getBedTypes', this.$route.params.id)
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
