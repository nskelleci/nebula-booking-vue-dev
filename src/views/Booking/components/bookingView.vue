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
                    <img src="https://images.r.cruisecritic.com/cruiserschoice/2019/cabin_compressed.jpg"  class="grid-view-img p-4">
                </div>

                <!-- ITEM NAME & DESC COL -->
                <div class="vx-col sm:w-1/2">
                    <div class="p-4 pt-6">
                        <slot name="item-meta">
                            <h6 class="item-name font-semibold mb-1 hover:text-primary cursor-pointer">{{ item.cabinCategory.name }}</h6>
                            <p class="text-sm mb-4">Bed Type: <span class="font-semibold cursor-pointer">{{ item.bedType.description }}</span></p>
                            <p class="item-description text-sm">{{ item.description }}</p>
                        </slot>
                    </div>
                </div>

                <!-- PURCHASE COL -->
                <div class="vx-col sm:w-1/4 w-full flex items-center sm:border border-0 border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">

                    <div class="p-4 flex flex-col w-full">

                        <div class="text-warning flex self-end border border-solid border-warning py-1 px-2 rounded">
                            <span class="text-sm mr-1">{{ item.number }}</span>
                            <feather-icon icon="HashIcon" svgClasses="h-4 w-4" />
                        </div>

                        <div class="my-6">
                            <h5 class="font-bold text-center">{{ parseInt(item.numberOfAdult)+parseInt(item.numberOfChild)}}</h5>
                            <span class="text-grey flex items-start justify-center mt-1">
                                 <p class="text-sm ml-2">Adult: {{item.numberOfAdult}}</p><br>
                             <p class="text-sm ml-2">Child: {{item.numberOfChild}}</p><br>
                            </span>
                             <span class="text-grey flex items-start justify-center mt-1">
                                <p class="text-success text-sm">Capacity: {{item.capacity}}</p>
                            </span>
                            
                        </div>

                        <!-- SLOT: ACTION BUTTONS -->
                        <slot name="action-buttons" />
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
