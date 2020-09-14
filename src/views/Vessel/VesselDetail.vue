<template>
  <div class="container">
    <div class="profile-header">
            <div class="relative">
                <div class="cover-container rounded-t-lg">
                    <img src="../../assets/images/uploads/gemini-out1.jpg" alt="Vessel Image" class="responsive img-fluid">
                </div>                
            </div>
            <div class="flex items-center justify-end flex-wrap profile-header-nav p-6">
                <div class="w-full flex-grow sm:flex sm:items-center sm:w-auto">
                    <div class="text-sm sm:flex-grow">
                        <ul class="sm:flex justify-around mt-8 w-full md:mt-0 md:ml-auto md:w-3/4">
                            <li class="p-2 sm:p-0">Name : {{vessel.name}}</li>
                            <li class="p-2 sm:p-0">Flag : {{vessel.flag}}</li>
                            <li class="p-2 sm:p-0">IMO : 89808908909</li>
                            <li class="p-2 sm:p-0">Cabin Count : 400</li>
                            
                        </ul>
                    </div>
                </div>
            </div>
        </div>
      <div class="mt-5">
            <vs-divider position="center">DETAILS</vs-divider>
            <vs-tabs alignment="fixed">
                <vs-tab label="Cabin Categories">
                  <CabinCategories />
                </vs-tab>
                <vs-tab label="Bed Types">
                  <BedTypes />
                </vs-tab>
                <vs-tab label="Cabins">
                  <Cabins />
                </vs-tab>
            </vs-tabs>
        </div>
  </div>
</template>

<script>
//import routes from '../../router'
import BedTypes from './BedType/BedTypes.vue'
import CabinCategories from './CabinCategory/CabinCategories'
import Cabins from './Cabin/Cabins'
import axios from '@/axios.js'
export default {
  components: {
    BedTypes,
    CabinCategories,
    Cabins
  },
  data () {
    return {
    
    }
  },
  computed : {
    vessel () {
      return this.$store.state.vessel.vessel
    }
  },
  methods : {
    
  },
  created ()  { 
    this.$store.dispatch('getVessel', this.$route.params.id)
  },
  mounted () {
  }
}
</script>

<style lang="scss">
  #profile-page {
    .profile-img-container {
        display: flex;
        align-items: center;
        position: absolute;
        bottom: -3.6rem;
        left: 10%;
        width: 80%;
        justify-content: space-between;
    }

    .user-profile-img {
        border: .3rem solid #fff;
        box-shadow: 0px 0px 10px 3px rgba(0,0,0,0.3);
    }

    .user-latest-image {
        transition: all .2s ease-in-out;

        &:hover {
            transform: scale(1.2);
        }
    }

    .profile-header-nav {
        background-color: #fff;
    }

    img {
  max-width: 65%;
  height: 5%;
}
}
</style>