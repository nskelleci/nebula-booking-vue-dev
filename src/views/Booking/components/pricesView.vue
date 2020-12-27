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
                            <h6 class="item-name font-semibold mb-1 hover:text-primary cursor-pointer">{{ item.cabinCategory.name }}</h6>
                            <p class="font-medium text-grey mt-4">Cruise Type</p>
                            <p class="text-success font-medium">{{ item.cruiseType.name }}</p>
                              <vs-chip color="danger mt-5" v-if="viewObj.hasRos">
                               <span class="font-medium">Ros Available</span>
                              </vs-chip>
                            

                        </slot>
                    </div>
                </div>
                <!-- PURCHASE COL -->
                <div class="vx-col sm:w-1/4 w-full flex items-center sm:border border-0 border-solid d-theme-border-grey-light border-r-0 border-t-0 border-b-0">

                    <div class="p-4 flex flex-col w-full">
                        <div class="my-6">
                            <h5 class="font-bold text-center">{{getPrice.price}}</h5>
                            <span class="text-grey flex items-start justify-center mt-1">
                                  <!--<feather-icon icon="CheckCircleIcon" svgClasses="w-4 h-4" />
                                <span class="text-sm ml-2">All in One</span> -->
                            </span>
                        </div>
                        <slot name="action-buttons" />
                    </div>
                </div>
                </div>
        </template>

    </vx-card>
</template>

<script>
export default {
    data ()  {
        return {
            viewObj : {
                price : 0,
                hasRos : false
            }
        }    
    },
  props: {
    item: {
      type: Object,
      required: true
    },
    cruise: {
      type: Object,
      required: true
    }
  },
  computed:{
         getPrice () {
            let blockedCabins=this.$store.state.blockedCabin.blockedCabinsbyCruise;

            if(this.cruise.rosCabins.length === 0) {
                this.viewObj.price = this.item.endUserPrice
                this.viewObj.hasRos = false               

                return this.viewObj
            }else{

            for (let index = 0; index < this.cruise.rosCabins.length; index++) {
                const rosElement = this.cruise.rosCabins[index];
                if(this.item.cabinCategory._id===rosElement.cabin.cabinCategory._id){
                    let result = false
                    blockedCabins.forEach(element => {
                        if(element.cabin._id===rosElement.cabin._id){
                            result = true
                            
                        }
                        console.log(result)
                    });
                    if(!result) {
                        console.log("Ros Avalible");
                        console.log("Ros Element",rosElement.cabin);
                        this.viewObj.price = rosElement.rosPrice
                        this.viewObj.hasRos = true
                    }else{
                        console.log("Ros NOT Avalible");
                        this.viewObj.price = this.item.endUserPrice
                        this.viewObj.hasRos = false 
                    }
                    break
                }else{
                    this.viewObj.price = this.item.endUserPrice
                }
            }

            }
            console.log("viewObject", this.viewObj)
            return this.viewObj
            
        }
    }
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
