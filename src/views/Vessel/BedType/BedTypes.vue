<template>
  <div class>
    <BedTypeForm :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
  <div class="p-3 mb-4 mr-4 rounded-lg cursor-pointer flex text-lg font-medium text-base text-primary border border-solid border-primary" @click="addNewData">
    <feather-icon icon="PlusIcon" svgClasses="h-4 w-4" />
    <span class="ml-2 text-base text-primary">Add New</span>
  </div>
  <vs-list>
  <vs-list-item :data="bedtype" :key="_id" v-for="(bedtype,_id) in bedTypes" :title= "bedtype.name"  :subtitle= "bedtype.description">
    <feather-icon icon="EditIcon" svgClasses="w-5 h-5 hover:text-primary stroke-current" @click.stop="editData(bedtype)" />
    <feather-icon icon="TrashIcon" svgClasses="w-5 h-5 hover:text-danger stroke-current" class="ml-2" @click.stop="deleteData(bedtype._id)" />
  </vs-list-item>

   </vs-list>
    
    
    <!-- {{this.$store.state.vessel}} -->
  </div>
</template>

<script>
import BedTypeForm from './BedTypeForm'
export default {
  components: {
    BedTypeForm
  },
  data () {
    return {
      //bedTypes: [],
      isMounted: false,
      addNewDataSidebar: false,
      sidebarData: {}
    }
  },
  computed: {
    bedTypes () {
      return this.$store.state.bedType.bedtypes
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
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  created () {
    this.$store.dispatch('getBedTypes', this.$route.params.id)
  },
  mounted () {
    this.isMounted = true

  }
}
</script>

<style></style>
