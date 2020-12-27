<template>
  <div class="vx-row">
    <div class="vx-col lg:w-2/2 w-full">
      <vx-card title="Cruise Detail" class="mb-base">
        <!-- Avatar -->
        <div class="vx-row">
          <!-- Information - Col 1 -->
          <div class="vx-col flex-1" id="account-info-col-1">
            <table>
              <tr>
                <td class="font-semibold">CheckIn Date</td>
                <td>{{ cruise.checkInDate | formatShortDate }}</td>
              </tr>
              <tr>
                <td class="font-semibold">CheckOut Date</td>
                <td>{{ cruise.checkOutDate | formatShortDate }}</td>
              </tr>
            </table>
          </div>
          <!-- /Information - Col 1 -->

          <!-- Information - Col 2 -->
          <div class="vx-col flex-1" id="account-info-col-2">
            <table>
              <tr>
                <td class="font-semibold">Cruise Name</td>
                <td>{{ cruise.cruiseType.name }}</td>
              </tr>
              <tr>
                <td class="font-semibold">Vessel Name</td>
                <td>{{ cruise.vessel.name }}</td>
              </tr>
            </table>
          </div>
        </div>
      </vx-card>
    </div>
      <div class="w-full">
        <div class="flex items-end px-3">
          <feather-icon svgClasses="w-6 h-6" icon="UserIcon" class="mr-2" />
          <span class="font-medium text-lg leading-none">Cabins</span>
        </div>
        <vs-divider />
        <BookingByCruiseTable :cruise="cruise"/>
      </div>
  </div>
</template>
<script>
import router from "../../router";
const BookingByCruiseTable = () => import('./components/CabinTableForRose')
export default {
  data() {
    return {};
  },
  computed: {
    cruise() {
      return this.$store.state.cruise.cruise;
    },
  },
  methods: {
    async getCruiseDetail() {
      await this.$store.dispatch("getCruiseDetail", this.$route.params.id);
    },
  },
  components: {
    BookingByCruiseTable,
  },
  created() {
    this.getCruiseDetail();
  },
};
</script>

<style lang="scss">
@media screen and (min-width: 1201px) and (max-width: 1211px),
  only screen and (min-width: 636px) and (max-width: 991px) {
  #account-info-col-1 {
    width: calc(100% - 12rem) !important;
  }

  // #account-manage-buttons {
  //   width: 12rem !important;
  //   flex-direction: column;

  //   > button {
  //     margin-right: 0 !important;
  //     margin-bottom: 1rem;
  //   }
  // }
}
</style>