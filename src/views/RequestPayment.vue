<!-- =========================================================================================
  File Name: DataListListView.vue
  Description: Data List - List View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
  <div id="data-list-list-view" class="data-list-container">
    <payment-request-form :isSidebarActive="addNewDataSidebar" @closeSidebar="toggleDataSidebar" :data="sidebarData" />
    <vs-table ref="table" v-model="selected" pagination :max-items="itemsPerPage" search :data="paymentRequests">

      <div slot="header" class="flex flex-wrap-reverse items-center flex-grow justify-between">
        <!-- ITEMS PER PAGE -->
        <vs-dropdown vs-trigger-click class="cursor-pointer mb-4 mr-4 items-per-page-handler">
          <div class="p-4 border border-solid d-theme-border-grey-light rounded-full d-theme-dark-bg cursor-pointer flex items-center justify-between font-medium">
            <span class="mr-2">{{ currentPage * itemsPerPage - (itemsPerPage - 1) }} - {{ paymentRequests.length - currentPage * itemsPerPage > 0 ? currentPage * itemsPerPage : paymentRequests.length }} of {{ queriedItems }}</span>
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
            <vs-th sort-key="description">Rezervation Number</vs-th>
            <vs-th sort-key="cabinCategory">Description</vs-th>
            <vs-th sort-key="bedType">Payment Type</vs-th>
            <vs-th sort-key="df">Amount</vs-th>
            <vs-th sort-key="df">Status</vs-th>
            <vs-th sort-key="df">Date</vs-th>
        </template>

        <template slot-scope="{data}">
          <tbody>
            <vs-tr :data="tr" :key="indextr" v-for="(tr, indextr) in data">

              <vs-td>
                <router-link :to="{name : 'mybookingsdetail', params: {id: tr.booking._id} }">
                <p class="product-category">{{ tr.booking.refNo }}</p>
                </router-link>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.description}}</p>
              </vs-td>

              <vs-td>
                <p class="product-category">{{ tr.paymenType }}</p>
              </vs-td>

              <vs-td>
                <vs-chip color="success" class="product-order-status">{{ tr.amount }}</vs-chip>
              </vs-td>
              <vs-td @click="activePrompt=true">
                <vs-chip :color="tr.status=='Confirmed' ? 'success'  : ''" v-if="tr.status=='Confirmed' ? true  : false" class="product-order-status">{{ tr.status }}</vs-chip>
                <vs-chip :color="tr.status=='Pending Review' ? 'warning'  : ''" v-if="tr.status=='Pending Review' ? true  : false" class="product-order-status">{{ tr.status }}</vs-chip>
                <vs-chip :color="tr.status=='Rejected' ? 'danger'  : ''" v-if="tr.status=='Rejected' ? true  : false" class="product-order-status">{{ tr.status }}</vs-chip>
              </vs-td>
              <vs-td>
                {{ tr.createdAt | formatShortDate}} 
              </vs-td>

            </vs-tr>
          </tbody>
        </template>
    </vs-table>
  </div>
</template>

<script>
import PaymentRequestForm from './components/PaymentRequestForm'
export default {
  data () {
    return {
      selected:[],
      itemsPerPage: 10,
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
    paymentRequests () {
      return this.$store.state.paymentRequest.paymentRequests
    },
    queriedItems () {
      return this.$refs.table ? this.$refs.table.queriedResults.length : this.paymentRequests.length
    },
  },
  watch:{
      selected(){
        this.sidebarData = {
            _id:this.selected._id,
            booking:this.selected.booking._id,
            description:this.selected.description,
            paymenType:this.selected.paymenType,
            amount:this.selected.amount,
            status:this.selected.status
        }
        this.toggleDataSidebar(true)
      }
  },
  components:{
    PaymentRequestForm
  },
  methods: {
    toggleDataSidebar (val = false) {
      this.addNewDataSidebar = val
    }
  },
  async created () {
    await this.$store.dispatch("getPaymentRequest");
  },
  mounted () {
    this.isMounted = true
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
