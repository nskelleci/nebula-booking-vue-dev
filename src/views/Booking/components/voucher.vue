<!-- =========================================================================================
    File Name: Invoice.vue
    Description: Invoice Page
    ----------------------------------------------------------------------------------------
    Item Name: Vuexy - Vuejs, HTML & Laravel Admin Dashboard Template
      Author: Pixinvent
    Author URL: http://www.themeforest.net/user/pixinvent
========================================================================================== -->


<template>
    <div id="invoice-page">

         <div class="flex flex-wrap items-center justify-between">
        <vx-input-group class="mb-base mr-3">
          <!-- <vs-input placeholder="Email" />

          <template slot="append">
            <div class="append-text btn-addon">
              <vs-button type="border" class="whitespace-no-wrap">Send Invoice</vs-button>
            </div>
          </template> -->
        </vx-input-group>
        <div class="flex items-center">
          <vs-button class="mb-base mr-3" icon-pack="feather" icon="icon icon-file" @click="printInvoice">Print Voucher</vs-button>
        </div>
        </div>

        <vx-card id="invoice-container">
            <div class="text-center mt-2">
                <img src="@/assets/images/logo/miray-logo.jpg" style="width: 160px;" class="rounded mx-auto d-block" alt="...">
            </div>
            <div class="item-center">
                <vs-divider><h2><b>YURT DIŞI GEMİ SEYAHATİ SÖZLEŞMESİ</b></h2></vs-divider>
            </div>

            <!-- 1. TARAFLAR -->
            <div class="vx-row leading-loose p-base">
                <vs-divider position="center"><h4><b>1. TARAFLAR</b></h4></vs-divider>
            </div>

            <div class="vx-row leading-loose p-base">
                 <vs-divider position="left"><h5>ŞİRKET BİLGİLERİ</h5></vs-divider>
                <div class="vx-col w-1/3 text-left">
                  <div class="invoice__recipient-info my-4">
                        <h6>Şirket Ad & Ünvanı</h6>
                        <p>Miray Gemicilik İşletme ve Personel Tic.Ltd.Şti.</p>
                    </div>
                </div>

                <div class="vx-col w-1/3 text-center">
                  <div class="invoice__recipient-info my-4">
                        <h6 class="mt-4">Vergi ve Mersis No</h6>
                        <p>8010650402 / 0801-0650-4020-0017 </p>
                    </div>
                </div>

                <div class="vx-col w-1/3 text-right">
                  <div class="invoice__recipient-info my-4">
                        <h6 class="mt-4">Adres Bilgileri</h6>
                        <p>Maslak Mahallesi, Maslak Meydan Sokak, Spring Giz Plaza, No:5, Kat:15, Daire 49 Sarıyer / İstanbul</p>
                    </div>
                </div>

            </div>

            <div class="vx-row leading-loose p-base">
                 <vs-divider position="left"><h5>ACENTA BİLGİLERİ</h5></vs-divider>
                <div class="vx-col w-1/3 text-left">
                  <div class="invoice__recipient-info my-4">
                        <h6>Acenta Adı</h6>
                        <p>{{ booking.agency.companyName }}</p>
                    </div>
                </div>

                <div class="vx-col w-1/3 text-center">
                  <div class="invoice__recipient-info my-4">
                        <h6>Acenta Kodu</h6>
                        <p>{{ booking.agency.agencyCode }}</p>
                    </div>
                </div>

                <div class="vx-col w-1/3 text-right">
                  <div class="invoice__recipient-info my-4">
                        <h6 class="mt-4">Adres Bilgileri</h6>
                        <p>{{ booking.agency.address }}</p>
                    </div>
                </div>

            </div>

            <div class="p-base">
                
                 <vs-divider position="left"><h5>YOLCU BİLGİLERİ</h5></vs-divider>
                <vs-table hoverFlat :data="booking.Passengers">
                    <!-- HEADER -->
                    <template slot="thead">
                        <vs-th class="pointer-events-none">Adı</vs-th>
                        <vs-th class="pointer-events-none">Soyadı</vs-th>
                        <vs-th class="pointer-events-none">Doğum Tarihi</vs-th>
                        <vs-th class="pointer-events-none">Pasaport No</vs-th>
                        <vs-th class="pointer-events-none">Pasaport Bitiş Tarihi</vs-th>
                        <vs-th class="pointer-events-none">Telefon</vs-th>
                        <vs-th class="pointer-events-none">Adres</vs-th>
                    </template>

                    <!-- DATA -->
                    <template slot-scope="{data}">
                        <vs-tr v-for="(tr, index) in data" :key="index">
                            <vs-td>{{ data[index].firstName }}</vs-td>
                            <vs-td>{{ data[index].lastName }}</vs-td>
                            <vs-td>{{ data[index].Dob | formatShortDate}}</vs-td>
                            <vs-td>{{ data[index].passportNo }}</vs-td>
                            <vs-td>{{ data[index].passportExpiryDate | formatShortDate }}</vs-td>
                            <vs-td>{{ data[index].phoneNumber }}</vs-td>
                            <vs-td>{{ data[index].address }}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>

                <!-- INVOICE SUMMARY TABLE -->
                <div class="w-1/4 ml-auto mt-4">
                    <vs-tr>
                        <vs-th class="pointer-events-none">TOTAL</vs-th>
                        <vs-td>{{ ""+booking.totalPrice+"" | priceFormat}}</vs-td>
                    </vs-tr>
                </div>
            </div>

            <!-- 2. SEYAHATİN KAPSAMI -->
            <div class="vx-row leading-loose p-base">
                <vs-divider position="center"><h4><b>2. SEYAHATİN KAPSAMI</b></h4></vs-divider>
            </div>
            <div class="vx-row leading-loose p-base">
                 <div class="vx-col w-1/3 text-left">
                  <div class="invoice__recipient-info my-4">
                        <h6>Seyahat Adı</h6>
                        <p>Yunan Adaları</p>
                    </div>
                </div>
                <div class="vx-col w-1/3 text-center">
                  <div class="invoice__recipient-info my-4">
                        <h6>Rezervasyon Tarihi</h6>
                        <p>{{ booking.createdAt | formatShortDate }}</p>
                    </div>
                </div>
                <div class="vx-col w-1/3 text-right">
                  <div class="invoice__recipient-info my-4">
                        <h6>Konaklama Türü</h6>
                        <p>Tam Pansiyon</p>
                    </div>
                </div>
                 <div class="vx-col w-1/3 text-left">
                  <div class="invoice__recipient-info my-4">
                        <h6>Oda Tipi</h6>
                        <p>{{ booking.cabin.cabinCategory.name }}</p>
                    </div>
                </div>
                 <div class="vx-col w-1/3 text-center">
                  <div class="invoice__recipient-info my-4">
                        <h6>Kişi Sayısı</h6>
                        <p>{{ booking.Passengers.length}}</p>
                    </div>
                </div>
                <div class="vx-col w-1/3 text-right">
                  <div class="invoice__recipient-info my-4">
                        <h6>Seyahat Kodu</h6>
                        <p>{{ booking.refNo }}</p>
                    </div>
                </div>
            </div>

            <!-- 3. ULAŞIM DETAYLAR -->
            <div class="vx-row leading-loose p-base">
                <vs-divider position="center"><h4><b>3. ULAŞIM DETAYLARI</b></h4></vs-divider>
            </div>

            <div class="p-base">
                <vs-table hoverFlat :data="booking.cruise.schedule">
                    <!-- HEADER -->
                    <template slot="thead">
                        <vs-th class="pointer-events-none">Tarih</vs-th>
                        <vs-th class="pointer-events-none">Port</vs-th>
                        <vs-th class="pointer-events-none">Kalkış Saati</vs-th>
                        <vs-th class="pointer-events-none">Varış Saati</vs-th>
                        
                    </template>

                    <!-- DATA -->
                    <template slot-scope="{data}">
                        <vs-tr v-for="(tr, index) in data" :key="index">
                            <vs-td>{{ data[index].date | formatShortDate}}</vs-td>
                             <vs-td>{{ data[index].port }}</vs-td>
                             <vs-td>{{ data[index].departureTime }}</vs-td>
                            <vs-td>{{ data[index].arrivalTime}}</vs-td>
                        </vs-tr>
                    </template>
                </vs-table>
            </div>

            <div class="p-base">
               <p style="text-align:justify">
                 LÜTFEN HAREKET TARİH VE SAATİNİZİ KONTROL EDİP ACENTENİZDEN 1 GÜN ÖNCE TEYİT ALINIZ. <br><br>

                  Koronavirüs nedeniyle yolcudan sağlığının seyahate elverişli olduğunu teşvik eden
                  doktor raporları isteme hakkını haiz olup seyahate uygunluğunu etkileyebilecek bir
                  durumu olan Yolcular, rezervasyon öncesinde doktor raporu ibraz etmelidir.<br><br>

                  Yolcu Koronavirüs salgını olduğu, katılmış olduğu seyahat nedeniyle gemide ve karada
                  Koronavirüse yakalanabileceğini, gemide ve adada karantina uygulanabileceğini,
                  istenilen seviyede sağlık ekipmanı ve personelinin bulunamayabileceğini salgın nedeniyle seferlerin iptal edilebileceğini, sefer tarihlerinde ve rota da değişiklik olabileceğini
                  bilmekte olup daha sonradan Koronavirüs salgını nedeniyle şirketten hiçbir şekilde
                  herhangi bir hukuki talepte bulunamayacaktır.<br><br>

                  Aşağıdaki ifadeler kendilerine atfedilen anlamlarda kullanılacaktır:
               </p>
            </div>

            <!-- 4. 20. ARASI İÇERİKLER  (voucher.json)-->
            <div v-for="(item,index) in voucherJson" :key="index">
              <div class="vx-row leading-loose p-base">
                <vs-divider position="center"><h4><b>{{(index+4)+". "+ item.title}}</b></h4></vs-divider>
              </div>
              <div  class="p-base">
              <p style="text-align:justify">{{item.desc}}</p>
              </div>
            </div>

            <!-- İMZA -->
            <div class="p-base">
              <p class="text-center"><span class="font-semibold">HİZMET ALAN(LAR) ADINA</span></p>
            </div>
            <div class="vx-row leading-loose p-base">
                 <div class="vx-col w-1/2 text-center">
                  <div class="invoice__recipient-info my-4">
                        <h6><u>Yolcu İmzası</u></h6>
                    </div>
                </div>
                <div class="vx-col w-1/2 text-center">
                  <div class="invoice__recipient-info my-4">
                        <h6><u>Acenta İmzası/Kaşesi</u></h6>
                    </div>
                </div>
            </div>
        </vx-card>
    </div>
</template>

<script>
import voucherjson from './voucher.json'
export default{
  data () {
    return {
      voucherJson: voucherjson,
    }
  },
  computed: {
    booking (){
      return this.$store.state.booking.getBookingID
    }
  },
  methods: {
    printInvoice () {
      window.print()
      window.close();
    },
    async getBooking() {
      await this.$store.dispatch("getBookingbyId",this.$route.params.id);
    }
  },
  mounted () {
    this.$emit('setAppClasses', 'invoice-page')
  },
  created(){
    this.getBooking();
  }
}
</script>

<style lang="scss">
@media print {
  .invoice-page {
    * {
      visibility: hidden;
    }

    #content-area {
      margin: 0 !important;
    }

    .vs-con-table {
      .vs-con-tbody {
        overflow: hidden !important;
      }
    }

    #invoice-container,
    #invoice-container * {
      visibility: visible;
    }
    #invoice-container {
      position: absolute;
      left: 0;
      top: 0;
      box-shadow: none;
    }
  }
}

@page {
  size: auto;
}
</style>
