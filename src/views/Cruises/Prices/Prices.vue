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
    <!-- Overview -->
    <div class="vx-col w-full md:w-1/4 lg:w-1/4 xl:w-1/4 mb-base">
        <vx-card>
          <ul>
            <h6>Boat Choise</h6>
            <li
              v-for="item in countries"
              :key="item._id"
              vs-radio
              class="flex items-center cursor-pointer py-1"
            >
              <vs-radio v-model="selectedVessel" vs-value="item">{{
                item.name
              }}</vs-radio>
            </li>
          </ul>
        </vx-card>
    </div>
            <div class="vx-col w-full  md:w-3/4 lg:w-3/4 xl:w-3/4 mb-base">

      <!-- RIGHT COL -->
        <vx-card>
          <div id="data-list-thumb-view" class="data-list-container">

    <vs-table ref="table"   v-model="selected" pagination :max-items="itemsPerPage" search :data="prices">
{ "cruiseType":"3 Günlük Tur","cabinCategory":"Dış Kabin","season":"Normal","market":"Turkish","vessel":"12345678","price":"100.00" },
      <template slot="thead">
        <vs-th>Cruise Type</vs-th>
        <vs-th>Cabin Category</vs-th>
        <vs-th>Season</vs-th>        
        <vs-th>Market</vs-th>
        <vs-th>Vessel</vs-th>
        <vs-th>Price</vs-th>        
      </template>

      <template slot-scope="{data}">
        <tbody>
          <vs-tr :data="item" :key="_id" v-for="(item,_id) in data" >

            <vs-td>
              <p class="product-name font-medium truncate">{{ item.cruiseType }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.cabinCategory }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.season }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.market }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.vessel }}</p>
            </vs-td>
            <vs-td>
              <p class="product-name font-medium truncate">{{ item.price }}</p>
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
import vSelect from "vue-select";

export default {
  components: {
    "v-select": vSelect
  },
  data() {
    return {
      selectedVessel: null,
      country: null,
      // Filter Sidebar
      clickNotClose: true,
      prices: [
        { "cruiseType":"3 Günlük Tur","cabinCategory":"Dış Kabin","season":"Normal","market":"Turkish","vessel":"12345678","price":"100.00" },
        { "cruiseType":"3 Günlük Tur","cabinCategory":"Dış Kabin","season":"Normal","market":"Turkish","vessel":"12345678","price":"200.00" },
        { "cruiseType":"3 Günlük Tur","cabinCategory":"Dış Kabin","season":"Normal","market":"Turkish","vessel":"12345678","price":"300.00" },
        { "cruiseType":"3 Günlük Tur","cabinCategory":"Dış Kabin","season":"Normal","market":"Turkish","vessel":"12345678","price":"400.00" },
        { "cruiseType":"3 Günlük Tur","cabinCategory":"Dış Kabin","season":"Normal","market":"Turkish","vessel":"12345678","price":"500.00" }
      ]
    }
  },
  computed: {
    windowWidth() {
      return this.$store.state.windowWidth;
    },

    countries() {
      return this.$store.state.country.countries;
    }
  },
  watch: {
    windowWidth() {
      // this.setSidebarWidth()
    }
  },
  methods: {
    setSelected(value) {
      console.log(value);
    }
    // GRID VIEW - ACTIONS
    // toggleFilterSidebar () {
    //   if (this.clickNotClose) return
    //   this.isFilterSidebarActive = !this.isFilterSidebarActive
    // },
  },
  created() {
    // this.setSidebarWidth()
    this.$store.dispatch("getCountries");
    console.log(this.country + "-Seçilen");
  }
};
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
