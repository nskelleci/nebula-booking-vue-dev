<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div class="vx-row">
    <div id="data-list-list-view" class="vx-col lg:w-3/5 w-full relative data-list-container">
      <vs-table  ref="table"  @selected="handleSelected" pagination :max-items="itemsPerPage" search :data="bookingByCruise">

        <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
          <!-- ITEMS PER PAGE -->
          <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
            <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
              <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ bookingByCruise.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : bookingByCruise.length }} of {{ queriedItems }}</span>
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
              <p class="font-semibold mb-3">Cabin Price</p>
              <div class="flex justify-between" vs-align="center" vs-type="flex" vs-justify="center" v-for="(item,index) in this.cruise.rosCabins" :key="index">
                    <span class="text-grey"><b>{{ item.cabin.number }}</b> ({{ item.cabin.capacity }})</span>
                    <span>{{item.cabin.bedType.name}}</span>
                    <vx-input-group class="mb-base">
                      <template slot="prepend">
                        <div class="prepend-text bg-primary">
                          <span>$</span>
                        </div>
                      </template>

                      <vs-input v-model="item.rosPrice"/>
                      <template slot="append">
                        <div class="append-text bg-primary">
                          <span>.00</span>
                        </div>
                      </template>
                    </vx-input-group>
                     <span><vs-button color="danger" icon-pack="feather" icon="icon-trash" @click="removeSelected(index)"></vs-button></span>
              </div>
              <vs-divider />
            <div class="flex justify-between font-semibold mb-3">
                  <span>Total ROS Cabin</span>
                  <span>{{this.cruise.rosCabins.length}}</span>
              </div>
              <vs-button class="w-full" @click="complate()">COMPLATE</vs-button>
          </vx-card>
    </div>
  </div>
</template>

<script>
import router from '../../../router'
export default {
  props:['cruise'],
  data () {
    return {
      selected:[],
      itemsPerPage: 5,
      isMounted: false
    }
  },
  computed: {
    currentPage () {
      if (this.isMounted) {
        return this.$refs.table.currentx
      }
      return 0
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.bookingByCruise.length
    },
    bookingByCruise() {     
      return this.$store.state.cabin.getAvaliableCabins;
    }
  },
  methods: {
    handleSelected(tr) {
      let isAvalible=true;

      this.cruise.rosCabins.forEach((element)=>{
        if(element.cabin._id==tr._id){
          isAvalible=false;
        }
      });

      if(isAvalible){
        this.cruise.rosCabins.push({
          cabin:tr,
          rosPrice:0
        });
        isAvalible=false;
      }else{
        this.$vs.notify({
            color: 'warning',
            title: 'Error',
            text: 'Rose Cabin is already added'
          })
      }
    },
    removeSelected(index){
      this.cruise.rosCabins.splice(index,1);
    },
    async getBookingByCruise(){
       await this.$store.dispatch("getFetchAvaliableCabins",this.cruise._id);

      this.cruise.rosCabins.forEach(element => {
          console.log(element);
      });
    },

    async complate(){
      await this.$store.dispatch("updateCruise",this.cruise)
      console.log(this.cruise);
    }
  },
  mounted () {
    this.isMounted = true
    this.getBookingByCruise();
  }
}
</script>

<style lang="scss">
#data-list-list-view {
  .vs-con-table {

    /*
      Below media-queries is fix for responsiveness of action buttons
      Note: If you change action buttons or layout of this page, Please remove below style
    */
    @media (max-width: 689px) {
      .vs-table--search {
        margin-left: 0;
        max-width: unset;
        width: 100%;

        .vs-table--search-input {
          width: 100%;
        }
      }
    }

    @media (max-width: 461px) {
      .items-per-page-handler {
        display: none;
      }
    }

    @media (max-width: 341px) {
      .data-list-btn-container {
        width: 100%;

        .dd-actions,
        .btn-add-new {
          width: 100%;
          margin-right: 0 !important;
        }
      }
    }

    .product-name {
      max-width: 23rem;
    }

    .vs-table--header {
      display: flex;
      flex-wrap: wrap;
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
            padding: 20px;
            &:first-child{
              border-top-left-radius: .5rem;
              border-bottom-left-radius: .5rem;
            }
            &:last-child{
              border-top-right-radius: .5rem;
              border-bottom-right-radius: .5rem;
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
