<!-- =========================================================================================
    File Name: ItemListView.vue
    Description: Item Component - List VIew
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->

<template>
    <vx-card class="list-view-item overflow-hidden" v-on="$listeners">

        <template slot="no-body">
            <div class="vx-row item-details no-gutter">

                <!-- IMG COL -->
                <div class="vx-col sm:w-1/4 w-full item-img-container bg-white flex items-center justify-center cursor-pointer">
                    <img src="/img/gemini-out1.19829b92.jpg" class="grid-view-img p-4">
                </div>
                <!-- ITEM NAME & DESC COL -->
                <div class="vx-col sm:w-1/2">
                    <div class="p-4 pt-6">
                        <slot name="item-meta">
                            <h6 class="item-name font-semibold mb-1 hover:text-primary cursor-pointer">{{ item.name }}</h6>
                            <p class="text-sm mb-4">Route :<span class="font-semibold cursor-pointer">{{ item.description }}</span></p>
                            <p class="text-success mt-4 font-bold text-sm">Check in Date</p>
                            <vs-input min="1" max="10" :value="item.checkInDate.slice(0, 10)" class="inline-flex" readonly/>
                            <p class="text-danger mt-4 font-bold text-sm">Check out Date</p>
                            <vs-input min="1" max="10" :value="item.checkOutDate.slice(0, 10)" class="inline-flex" readonly/>
                        </slot>
                    </div>
                </div>
                <!-- PURCHASE COL -->
                <div class="vx-col sm:w-1/4 w-full flex items-center sm:border border-0 border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">

                    <div class="p-4 flex flex-col w-full">
                        <div class="my-6">
                            <h5 class="font-bold text-center">{{ item.vessel.name}}</h5>
                            <span class="text-grey flex items-start justify-center mt-1">
                                <feather-icon icon="FlagIcon" svgClasses="w-4 h-4" />
                                <span class="text-sm ml-2">{{ item.vessel.flag }}</span>
                            </span>
                        </div>
                        <slot name="action-buttons" />
                    </div>
                </div>
                </div>
            </div>
        </template>

    </vx-card>
</template>

<script>
export default{
  props: {
    item: {
      type: Object,
      required: true
    }
  },

}
</script>

<style lang="scss" scoped>
.list-view-item {
    .item-name, .item-description {
        display: -webkit-box;
        -webkit-box-orient: vertical;
        overflow: hidden;
    }

    .item-name {
        -webkit-line-clamp: 2;
    }

    .item-description {
        -webkit-line-clamp: 5;
    }

    .grid-view-img {
        max-width: 100%;
        max-height: 100%;
        width: auto;
        transition: .35s;
    }

    &:hover {
        transform: translateY(-5px);
        box-shadow: 0px 4px 25px 0px rgba(0,0,0,.25);

        .grid-view-img{
            opacity: 0.9;
        }
    }
}
</style>
