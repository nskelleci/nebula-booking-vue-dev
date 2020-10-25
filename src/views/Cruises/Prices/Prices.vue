<!-- =========================================================================================
  File Name: DataListThumbView.vue
  Description: Data List - Thumb View
  ----------------------------------------------------------------------------------------
  Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
  Author: Pixinvent
  Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <div>
        <ais-instant-search
            :search-client="searchClient"
            index-name="instant_search" id="algolia-instant-search-demo">

            <!-- AIS CONFIG -->
            <ais-configure :hits-per-page.camel="9" />

            <div class="algolia-header mb-4">
                <div class="flex md:items-end items-center justify-between flex-wrap">
                    <!-- TOGGLE SIDEBAR BUTTON -->
                    <feather-icon
                        class="inline-flex lg:hidden cursor-pointer mr-4"
                        icon="MenuIcon"
                        @click.stop="toggleFilterSidebar" />

                    <p class="lg:inline-flex hidden font-semibold algolia-filters-label">Filters</p>

                    <div class="flex justify-between items-end flex-grow">
                        <!-- Stats -->
                        <ais-stats>
                            <p slot-scope="{ hitsPerPage, nbPages, nbHits, page, processingTimeMS, query }" class="font-semibold md:block hidden">
                                {{ nbHits }} results found in {{ processingTimeMS }}ms
                            </p>
                        </ais-stats>

                        <div class="flex flex-wrap">

                            <!-- SORTING -->
                            <ais-sort-by :items="[
                                { value: 'instant_search', label: 'Featured' },
                                { value: 'instant_search_price_asc', label: 'Lowest Price' },
                                { value: 'instant_search_price_desc', label: 'Highest Price' },
                            ]">
                                
                            </ais-sort-by>

                            <!-- ITEM VIEW - GRID/LIST -->
                            <div>
                                <feather-icon
                                    icon="GridIcon"
                                    @click="currentItemView='item-grid-view'"
                                    class="p-2 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer"
                                    :svgClasses="{'text-primary stroke-current': currentItemView == 'item-grid-view'}" />
                                <feather-icon
                                    icon="ListIcon"
                                    @click="currentItemView='item-list-view'"
                                    class="p-2 ml-4 shadow-drop rounded-lg d-theme-dark-bg cursor-pointer hidden sm:inline-flex"
                                    :svgClasses="{'text-primary stroke-current': currentItemView == 'item-list-view'}" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>

                <div class="p-6">
                    <h5>Country</h5>
                    <v-select v-model="country" @input="setSelected" label="name" :options="countries" :dir="$vs.rtl ? 'rtl' : 'ltr'" /><br>
                </div>

            <div id="algolia-content-container" class="relative clearfix">
                <vs-sidebar
                    class="items-no-padding vs-sidebar-rounded background-absolute"
                    parent="#algolia-content-container"
                    :click-not-close="clickNotClose"
                    :hidden-background="clickNotClose"
                    v-model="isFilterSidebarActive">

                    <div class="p-6 filter-container">

                        <!-- MULTI RANGE -->
                        <h6 class="font-bold mb-3">Boat Choise</h6>
                        <ais-numeric-menu attribute="name" :items="countries">
                            <ul slot-scope="{ items, refine, createURL }">
                                <li
                                    v-for="item in countries" :key="item._id"  class="flex items-center cursor-pointer py-1">
                                    <feather-icon icon="CircleIcon" :svgClasses="[{ 'text-primary fill-current': item.isRefined}, 'h-5 w-5']" />
                                    <span class="ml-2" :class="{'text-primary': item.isRefined}">{{ item.name }}</span>
                                </li>
                            </ul>
                        </ais-numeric-menu>

                        <vs-divider />

                        <ais-clear-refinements class="flex justify-center">
                            <vs-button class="w-full" slot-scope="{ canRefine, refine, createURL }" @click.prevent="refine" :disabled="!canRefine">Remove Filters</vs-button>
                        </ais-clear-refinements>
                    </div>
                </vs-sidebar>

                <!-- RIGHT COL -->
                <div :class="{'sidebar-spacer-with-margin': clickNotClose}">

                    <!-- SEARCH BAR -->
                    <ais-search-box>
                        <div slot-scope="{ currentRefinement, isSearchStalled, refine }">
                            <div class="relative mb-8">

                                <!-- SEARCH INPUT -->
                                <vs-input class="w-full vs-input-shadow-drop vs-input-no-border d-theme-input-dark-bg" placeholder="Search here" v-model="currentRefinement" @input="refine($event)" @keyup.esc="refine('')" size="large" />

                                <!-- SEARCH LOADING -->
                                <p :hidden="!isSearchStalled" class="mt-4 text-grey">
                                  <feather-icon icon="ClockIcon" svgClasses="w-4 h-4" class="mr-2 align-middle" />
                                  <span>Loading...</span>
                                </p>

                                <!-- SEARCH ICON -->
                                <div slot="submit-icon" class="absolute top-0 right-0 py-4 px-6" v-show="!currentRefinement">
                                    <feather-icon icon="SearchIcon" svgClasses="h-6 w-6" />
                                </div>

                                <!-- CLEAR INPUT ICON -->
                                <div slot="reset-icon" class="absolute top-0 right-0 py-4 px-6" v-show="currentRefinement">
                                    <feather-icon icon="XIcon" svgClasses="h-6 w-6 cursor-pointer" @click="refine('')" />
                                </div>
                            </div>
                        </div>
                    </ais-search-box>

                    <!-- SEARCH RESULT -->
                    <ais-hits>
                        <div>

                            <!-- GRID VIEW -->
                            <template>
                                <div class="items-grid-view vx-row match-height">
                                    <div class="vx-col lg:w-1/3 sm:w-1/2 w-full" v-for="item in related_items" :key="item.objectID">

                                        <item-grid-view :item="item">

                                            <!-- SLOT: ACTION BUTTONS -->
                                            <template slot="action-buttons">
                                                <div class="flex flex-wrap">

                                                    <!-- PRIMARY BUTTON: ADD TO WISH LIST -->
                                                    <div
                                                        class="item-view-primary-action-btn p-3 flex flex-grow items-center justify-center cursor-pointer"
                                                        @click="toggleItemInWishList(item)">

                                                        <span class="text-sm font-semibold ml-2">WISHLIST</span>
                                                    </div>

                                                    <!-- SECONDARY BUTTON: ADD-TO/VIEW-IN CART -->
                                                    <div
                                                        class="item-view-secondary-action-btn bg-primary p-3 flex flex-grow items-center justify-center text-white cursor-pointer"
                                                        @click="cartButtonClicked(item)">
                                                        <feather-icon icon="ShoppingBagIcon" svgClasses="h-4 w-4" />

                                                        <span class="text-sm font-semibold ml-2">VIEW IN CART</span>
                                                    </div>
                                                </div>
                                            </template>
                                        </item-grid-view>

                                    </div>
                                </div>
                            </template>

                        </div>
                    </ais-hits>

                    <!-- PAGINATION -->
                    <ais-pagination>
                        <div slot-scope="{
                                currentRefinement,
                                nbPages,
                                pages,
                                isFirstPage,
                                isLastPage,
                                refine,
                                createURL
                            }"
                        >

                        <vs-pagination

                            :total="nbPages"
                            :max="7"
                            :value="currentRefinement + 1"
                            @input="(val) => { refine(val - 1) }" />
                        </div>
                    </ais-pagination>

        
                </div>
            </div>
        </ais-instant-search>
    </div>
</template>

<script>
import {
  AisClearRefinements,
  AisConfigure,
  AisHierarchicalMenu,
  AisHits,
  AisInstantSearch,
  AisNumericMenu,
  AisPagination,
  AisRangeInput,
  AisRatingMenu,
  AisRefinementList,
  AisSearchBox,
  AisSortBy,
  AisStats
} from 'vue-instantsearch'
import algoliasearch from 'algoliasearch/lite'
import vSelect from 'vue-select'

export default {
  components: {
    ItemGridView: () => import('./ItemGridView.vue'),
    ItemListView: () => import('./ItemListView.vue'),
    AisClearRefinements,
    AisConfigure,
    AisHierarchicalMenu,
    AisHits,
    AisInstantSearch,
    AisNumericMenu,
    AisPagination,
    AisRangeInput,
    AisRatingMenu,
    AisRefinementList,
    AisSearchBox,
    AisSortBy,
    AisStats,
    'v-select': vSelect
  },
  data () {
    return {
      country:null,
      searchClient: algoliasearch(
        'latency',
        '6be0576ff61c053d5f9a3225e2a90f76'
      ),
      // Filter Sidebar
      isFilterSidebarActive: true,
      clickNotClose: true,
      currentItemView: 'item-grid-view',
      numericItems: [
        { label: 'All' },
        { label: '<= $10', end: 10 },
        { label: '$10 - $100', start: 10, end: 100 },
        { label: '$100 - $500', start: 100, end: 500 },
        { label: '>= $500', start: 500 }
      ],
      algoliaCategories: [
        'hierarchicalCategories.lvl0',
        'hierarchicalCategories.lvl1',
        'hierarchicalCategories.lvl2',
        'hierarchicalCategories.lvl3'
      ],
      related_items: [
        {
          'name'       : 'Apple - Apple Watch Series 1 42mm Space Gray Aluminum Case Black Sport Band - Space Gray Aluminum',
          'brand'      : 'Apple',
          'price'      : 229,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/01.png',
          'rating'     : 4,
          'objectID'   : '5546604'
        },
        {
          'name'       : 'Beats by Dr. Dre - Powerbeats2 Wireless Earbud Headphones - Black/Red',
          'brand'      : 'Beats by Dr. Dre',
          'price'      : 199.99,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/08.png',
          'rating'     : 4,
          'objectID'   : '5565002'
        },
        {
          'name'       : 'Amazon - Fire TV Stick with Alexa Voice Remote - Black',
          'brand'      : 'Amazon',
          'price'      : 39.99,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/03.png',
          'rating'     : 4,
          'objectID'   : '5477500'
        },
        {
          'name'       : 'Apple - Apple Watch Nike+ 42mm Silver Aluminum Case Silver/Volt Nike Sport Band - Silver Aluminum',
          'brand'      : 'Apple',
          'price'      : 399,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/07.png',
          'rating'     : 4,
          'objectID'   : '5547700'
        },
        {
          'name'       : 'Google - Chromecast Ultra - Black',
          'brand'      : 'Google',
          'price'      : 69.99,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/05.png',
          'rating'     : 4,
          'objectID'   : '5578628'
        },
        {
          'name'       : 'Beats by Dr. Dre - Beats EP Headphones - White',
          'brand'      : 'Beats by Dr. Dre',
          'price'      : 129.99,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/02.png',
          'rating'     : 4,
          'objectID'   : '5577781'
        },
        {
          'name'       : 'LG - 40" Class (39.5" Diag.) - LED - 1080p - HDTV - Black',
          'brand'      : 'LG',
          'price'      : 279.99,
          'image'      : 'https://pixinvent.com/demo/vuexy-vuejs-admin-dashboard-template/products/09.png',
          'rating'     : 4,
          'objectID'   : '5613404'
        }
      ]
    }
  },
  computed: {
    toValue () {
      return (value, range) => [
        value.min !== null ? value.min : range.min,
        value.max !== null ? value.max : range.max
      ]
    },

    windowWidth () { return this.$store.state.windowWidth },

    countries () {
      return this.$store.state.country.countries

    }
  },
  watch: {
    windowWidth () {
      this.setSidebarWidth()
    }
  },
  methods: {
    setSidebarWidth () {
      if (this.windowWidth < 992) {
        this.isFilterSidebarActive = this.clickNotClose = false
      } else {
        this.isFilterSidebarActive = this.clickNotClose = true
      }
    },
    setSelected(value) {
      console.log(value);
    },
    // GRID VIEW - ACTIONS
    toggleFilterSidebar () {
      if (this.clickNotClose) return
      this.isFilterSidebarActive = !this.isFilterSidebarActive
    },
    toggleItemInWishList (item) {
      // this.$store.dispatch('eCommerce/toggleItemInWishList', item)
    },
    additemInCart (item) {
      // this.$store.dispatch('eCommerce/additemInCart', item)
    },
    cartButtonClicked (item) {
      this.isInCart(item.objectID) ? this.$router.push('/apps/eCommerce/checkout').catch(() => {}) : this.additemInCart(item)
    }
  },
  created () {
    this.setSidebarWidth()
      this.$store.dispatch('getCountries')
      console.log(this.country+"-Seçilen");
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
