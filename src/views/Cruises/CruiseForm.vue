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
      <div class="vx-row">
        <div class="vx-col sm:w-3/3 w-full mb-2">
          <vs-input label="Name" v-model="cruisename" class="mt-5 w-full" name="cruisename" v-validate="'required|min:3'" />
          <span class="text-danger text-sm" v-show="errors.has('cruisename')">{{ errors.first('cruisename') }}</span>
        </div>
      </div>

      <div class="vx-row">
        <div class="vx-col sm:w-3/3 w-full mb-2">
          <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for="" class="vs-input--label">Description</label>
            <vs-textarea counter="256" label="Description" v-model="description" />
        </div>
        </div>
      </div>
        
      <div class="vx-row">
         <div class="vx-col sm:w-1/3 w-full mb-2">
            <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
              <label for="" class="vs-input--label">Vessels</label>
              <v-select label="name" :options="vessels" v-model="selectedVessel" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
            </div>
         </div>
         <div class="vx-col sm:w-1/3 w-full mb-2">
          <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for="" class="vs-input--label">Cruise Types</label>
            <v-select label="name" :options="cruiseTypes" v-model="selectedCruiseType" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
          </div>
         </div>
         <div class="vx-col sm:w-1/3 w-full mb-2">
           <div class="vs-component vs-con-input-label vs-input mt-5 w-full vs-input-primary">
            <label for="" class="vs-input--label">Season</label>
            <v-select label="name" :options="seasons" v-model="selectedSeasons" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
        </div>
         </div>
      </div>
       
      <div class="vx-row">
         <div class="vx-col sm:w-1/2 w-full mb-2">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Start Date/Time</label><br>
            <flat-pickr class="w-full"  :config="configFromdateTimePicker" v-model="fromDate" placeholder="Start Date" v-validate="'required'"  @on-change="onFromChange" /><br>
        </div>
         </div>
         <div class="vx-col sm:w-1/2 w-full mb-2">
            <div class=" vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">End Date/Time</label><br>
            <flat-pickr class="w-full" :config="configTodateTimePicker" v-model="toDate" placeholder="End Date" @on-change="onToChange" v-validate="'required'" /><br>
        </div>
         </div>
      </div>
      <vs-divider>Schedule</vs-divider>
      <vs-button type="flat" size="small" :disabled="disabled" :color="scheduleButton.color" icon-pack="feather" :icon="scheduleButton.icon" @click="changeAddSchedule()">{{scheduleButton.name}}</vs-button>
      
      <div class="vx-row" v-if="addScheduleForm">
        <div class="vx-col sm:w-2/6 ">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Date</label><br>
            <flat-pickr ref="portDate" class="w-full"  :config="configPortDatePicker" v-model="scheduleItem.portDate" placeholder="Date" v-validate="'required'"  /><br>
          </div>
        </div>
        <div class="vx-col sm:w-2/6">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
              <label for="" class="vs-input--label">Port</label>
              <v-select ref="port" label="name" class="w-full" :options="ports" v-model="scheduleItem.port" :dir="$vs.rtl ? 'rtl' : 'ltr'" v-validate="'required'" /><br>
          </div>
        </div>
        <div class="vx-col sm:w-1/6">
              <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
                <label for="" class="vs-input--label">Arrival Time</label>
                <flat-pickr ref="arrivalTime" :config="configPortTime" class="w-full" v-model="scheduleItem.arrivalTime" placeholder="Arrival Time" />
              </div>
            <vs-button color="danger" size="small" @click="clearArrivalTime()">Clear Time</vs-button>

        </div>
        <div class="vx-col sm:w-1/6">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
            <label for="" class="vs-input--label">Departure Time</label>
            <flat-pickr ref="departureTime" :config="configPortTime" class="w-full" v-model="scheduleItem.departureTime" placeholder="Departure Time" />
          </div>
          <vs-button color="danger" size="small" @click="clearDepartureTime()">Clear Time</vs-button>
        </div>
        <div class="vx-col sm:w-1/6">
          <div class="vs-component vs-con-input-label vs-input w-full vs-input-primary">
             <label for="" class="vs-input--label"></label>
            <vs-button type="flat" color="success" radius size="large" icon-pack="feather" icon="icon-plus-circle" @click="addSchedule()">
            </vs-button>
          </div>
        </div>
      </div>
      <vs-table stripe :data="schedule">
            <template slot="thead">
                <vs-th>Port Date</vs-th>
                <vs-th>Port</vs-th>
                <vs-th>Arrival Time</vs-th>
                <vs-th>Departure Time</vs-th>
                <vs-th>Delete</vs-th>
            </template>

            <template slot-scope="{data}">
                <vs-tr :key="index" v-for="(item, index) in data">
                    <vs-td :data="data[index].date">
                        {{data[index].date | formatShortDate}}
                    </vs-td>
                    <vs-td :data="data[index].port">
                        {{data[index].port.name}}
                    </vs-td>
                    <vs-td :data="data[index].arrivalTime">
                        {{data[index].arrivalTime}}
                    </vs-td>
                    <vs-td :data="data[index].departureTime">
                        {{data[index].departureTime}}
                    </vs-td>
                    <vs-td>
                        <vs-button size="small" @click="delSchedule(index)" icon-pack="feather" icon="icon-trash" color="danger"></vs-button>
                    </vs-td>
                </vs-tr>
            </template>
      </vs-table>
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
import flatPickr from 'vue-flatpickr-component'
import 'flatpickr/dist/flatpickr.css'

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
      addScheduleForm : false,
      disabled : true,
      scheduleButton : {
        name : 'Add Schedule',
        color : 'primary',
        icon : null,
        disabled : true
      },
      dataId: null,
      cruisename: '',
      fromDate: null,
      toDate: null,
      scheduleItem:{
        portDate : null,
        arrivalTime : null,
        departureTime : null,
        port:null
      },
      configFromdateTimePicker: {
        minDate: new Date(),
        maxDate: null
      },
      configTodateTimePicker: {
        minDate: null
      },
      configPortDatePicker: {
        minDate: this.fromDate,
        maxDate : this.toDate
      },
      configPortTime: {
        enableTime: true,
        enableSeconds: false,
        noCalendar: true
      },
      description: '',
      counterDanger: false,
      selectedCruiseType:'',
      selectedSeasons:'',
      portName: '',
      settings: { // perfectscrollbar settings
        maxScrollbarLength: 60,
        wheelSpeed: .60
      },
      selectedVessel:null,
      schedule:[]
    }

  },
  watch: {
    isSidebarActive (val) {
      if (!val) return
      if (Object.entries(this.data).length === 0) {
        this.initValues()
        this.$validator.reset()
      } else {
        const { _id, name, description, checkInDate, checkOutDate, vessel, season, cruiseType, schedule} = JSON.parse(JSON.stringify(this.data))
        this.dataId = _id
        this.cruisename = name
        this.description = description
        this.fromDate = checkInDate
        this.toDate = checkOutDate
        this.selectedVessel = vessel
        this.selectedSeasons = season
        this.selectedCruiseType = cruiseType
        this.schedule = schedule
        this.initValues()
      }
      // Object.entries(this.data).length === 0 ? this.initValues() : { this.dataId, this.dataName, this.dataCategory, this.dataOrder_status, this.dataPrice } = JSON.parse(JSON.stringify(this.data))
    },

    configPortDatePicker : {
      deep : true,
      async handler () {
        if (this.configPortDatePicker.minDate !== undefined && this.configPortDatePicker.maxDate !== undefined) {
          this.disabled = false
        } else {
          this.disabled = true
        }
      }
     
    },
    selectedVessel () {
      this.$store.dispatch('getCruiseTypesByVessel', this.selectedVessel._id)
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
      return !!(!this.errors.any() && this.cruisename && this.fromDate && this.toDate && this.description && this.selectedVessel && this.selectedCruiseType && this.selectedSeasons && this.schedule.length > 0)
    },
    scrollbarTag () { 
      return this.$store.getters.scrollbarTag 
    },

    vessels () {
      return this.$store.state.vessel.vessels
    },

    cruiseTypes () {
      return this.$store.state.cruiseType.cruiseTypesByVessel
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
      this.cruisename = ''
      this.description = ''
      this.selectedVessel = null
      this.selectedCruiseType = null
      this.selectedSeasons = null
      this.fromDate = null
      this.toDate = null
      this.schedule = [] 
      this.portDate = null
      this.arrivalTime = null
      this.departureTime = null
      this.port = null
      this.disabled = true
      this.addScheduleForm = false
    },
    onFromChange (selectedDates, dateStr) {
      this.$set(this.configTodateTimePicker, 'minDate', dateStr)
      this.$set(this.configPortDatePicker, 'minDate', dateStr)
    },
    onToChange (selectedDates, dateStr) {
      this.$set(this.configFromdateTimePicker, 'maxDate', dateStr)
      this.$set(this.configPortDatePicker, 'maxDate', dateStr)

    },
    submitData () {
      this.$validator.validateAll().then(result => {
        if (result) {
          const obj = {
            _id: this.dataId,
            name:this.cruisename,
            checkInDate:this.fromDate,
            checkOutDate:this.toDate,
            description:this.description,
            vessel:this.selectedVessel,
            cruiseType:this.selectedCruiseType,
            season:this.selectedSeasons,
            schedule:this.schedule
          }
          console.log(obj)
          
          if (this.dataId !== null && this.dataId.length >= 0) {
            this.$store.dispatch('updateCruise', obj).catch(err => { console.error(err) })
            //VesselService.updateVessel(obj)
          } else {
            delete obj._id
            this.$store.dispatch('addCruise', obj).catch(err => { console.error(err) })
          }
          this.$emit('closeSidebar')
          this.initValues()
          
        }
      })
    },
    changeAddSchedule () {
      if (this.addScheduleForm) {
        this.addScheduleForm = false
        this.scheduleButton.color = 'primary'
        this.scheduleButton.icon = null
        this.scheduleButton.name = 'Add Schedule'
        this.portDate = null
        this.arrivalTime = null
        this.departureTime = null
      } else {
        this.addScheduleForm = true
        this.scheduleButton.color = 'success'

        this.scheduleButton.icon = 'icon-check'
        this.scheduleButton.name = 'Done'
      } 
    },
    addSchedule () {
      const scheduleItem = {
        date : this.$refs.portDate.value,
        arrivalTime : this.$refs.arrivalTime.value,
        departureTime : this.$refs.departureTime.value,
        port:this.$refs.port.value
      }
      this.schedule.push(scheduleItem)
    },
    delSchedule (index) {
      this.schedule.splice(index, 1)
      this.schedule.sort(function (a, b) {
        return new Date(b.date) - new Date(a.date)
      })
      this.schedule.reverse()
    },
    clearArrivalTime () {
      this.scheduleItem.arrivalTime = null
      this.$refs.arrivalTime.value = null
    },
    clearDepartureTime () {
      this.scheduleItem.departureTime = null
      this.$refs.departureTime.value = null

    }
  },
  created () {
    this.$store.dispatch('getVessels')
    this.$store.dispatch('getCruiseSeasons')
    this.$store.dispatch('getCruiseTypes')
    this.$store.dispatch('getPorts')
    this.scheduleItem.arrivalTime = null
    this.scheduleItem.departureTime = null
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
    width: 820px;
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
