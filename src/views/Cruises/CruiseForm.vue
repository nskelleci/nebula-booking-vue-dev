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
        <h4>{{ Object.entries(this.data).length === 0 ? "ADD NEW" : "UPDATE" }} CRUISE </h4>
        <feather-icon icon="XIcon" @click.stop="isSidebarActiveLocal = false" class="cursor-pointer"></feather-icon>
    </div>
    <vs-divider class="mb-0"></vs-divider>

    <component :is="scrollbarTag" class="scroll-area--data-list-add-new" :settings="settings" :key="$vs.rtl">

    <div class="p-6">
        <vs-input label="Name" v-model="cruisename" class="mt-5 w-full" name="cruisename" v-validate="'required|min:3'" />
        <span class="text-danger text-sm" v-show="errors.has('cruisename')">{{ errors.first('cruisename') }}</span>

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for="" class="vs-input--label">Vessels</label>
            <v-select label="name" :options="vessels" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
        </div>
        <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Cruise Types</label>
            <v-select label="name" :options="cruisetypes" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
        </div>
        <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Season</label>
            <v-select label="name" :options="seasons" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
        </div>

        <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Start Date/Time</label><br>
              <flat-pickr class="w-full" :config="configdateTimePicker" v-model="startDate" placeholder="Date Time" v-validate="'required'" /><br>
        </div>

        <div class="mt-5 vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">End Date/Time</label><br>
              <flat-pickr class="w-full" :config="configdateTimePicker" v-model="endDate" placeholder="Date Time" v-validate="'required'" /><br>
        </div>

        <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for="" class="vs-input--label">Description</label>
            <vs-textarea counter="256" label="Description" :counter-danger.sync="this.counterDanger" v-model="textarea" />
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
import flatPickr from 'vue-flatpickr-component';
import 'flatpickr/dist/flatpickr.css';

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
    'v-select': vSelect,
    flatPickr
  },
  data () {
    return {
      dataId: null,
      cruisename: '',
      startDate: null,
        configdateTimePicker: {
          enableTime: true,
          dateFormat: 'd-m-Y H:i'
      },
      endDate: null,
        configdateTimePicker: {
          enableTime: true,
          dateFormat: 'd-m-Y H:i'
      },
      textarea: '',
      counterDanger: false,
     
      portName: '',
      country:null,
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
        const { _id, name, country} = JSON.parse(JSON.stringify(this.data))
        this.dataId = _id
        this.country = country
        this.portName = name
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
      return !this.errors.any() && this.portName && this.country
    },

    scrollbarTag () { 
      return this.$store.getters.scrollbarTag 
    },

    vessels () {
      return this.$store.state.vessel.vessels
    },

    cruisetypes () {
      return this.$store.state.cruiseType.cruisetypes
    },

    seasons () {
      return this.$store.state.cruiseSeason.cruiseseasons
    },

    ports () {
      return this.$store.state.port.ports
    }
  
  },
  methods: {
    initValues () {
      if (this.data._id) return
      this.dataId = null
      this.portName = ''
      this.country = null
    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            _id: this.dataId,
            name: this.portName,
            country : this.country
          }

          if (this.dataId !== null && this.dataId.length >= 0) {
            this.$store.dispatch('updatePort', obj).catch(err => { console.error(err) })
            //VesselService.updateVessel(obj)
          } else {
            delete obj._id
            this.$store.dispatch('addPort', obj).catch(err => { console.error(err) })
          }
          this.$emit('closeSidebar')
          this.initValues()
        }
      })
    }
  },
  created () {
    this.$store.dispatch('getVessels')
    this.$store.dispatch('getCruiseSeasons')
    this.$store.dispatch('getCruiseTypes')
    this.$store.dispatch('getPorts')
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
