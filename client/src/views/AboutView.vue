<script>
import { mapActions, mapState } from 'pinia'
import { useCountriesStore } from '../stores/countries'
import BackHome from '../components/icons/BakHome.vue'

export default {
  components: {
    BackHome
  },
  data() {
    return {
      fullName: ''
    }
  },
  computed: {
    ...mapState(useCountriesStore, [
      'dataCountries',
      'latLong',
      'capital',
      'region',
      'subregion',
      'callingCode',
      'countriesWithSameCallingCode',
      'currency',
      'countriesWithSameCurrency',
      'flags'
    ])
  },
  created() {
    this.fullName = this.$route.params.name
    this.fetchNameData(this.fullName)
      .then(() => this.fetchCallingCodeData())
      .then(() => this.fetchCurrencyData())
      .catch((error) => {
        console.error(error)
      })
  },
  methods: {
    ...mapActions(useCountriesStore, ['fetchNameData', 'fetchCallingCodeData', 'fetchCurrencyData'])
  }
}
</script>

<template>
  <div class="styleMargin min-h-screen">
    <router-link
      to="/"
      class="bg-purpleSecondary p-2 rounded-md mb-4 flex items-center space-x-2 text-white buttonStyle"
    >
      <BackHome class="text-sm text-white" /> <span> Back to Homepage </span>
    </router-link>

    <div class="mb-4">
      <div class="mb-0 flex items-center space-x-2">
        <span class="fontHeader">{{ fullName }}</span>
        <img :src="flags" :alt="fullName" style="width: 46px; height: 30px" />
      </div>
      <div class="mt-0 flex items-center space-x-2">
        <div v-if="dataCountries?.cca2" class="rectangle">
          <span>
            {{ dataCountries?.cca2 }}
          </span>
        </div>
        <div v-if="dataCountries.name?.official" class="rectangle">
          <span>
            {{ dataCountries.name?.official }}
          </span>
        </div>
        <div v-if="dataCountries.name.nativeName.ind?.official" class="rectangle">
          <span>
            {{ dataCountries.name?.nativeName?.ind?.official }}
          </span>
        </div>
      </div>
    </div>

    <div class="flex mt-5">
      <div class="firstCard flex flex-col">
        <span class="header2">LatLong</span>
        <span class="textContent">{{ latLong }}</span>
      </div>
      <div class="firstCard flex flex-col">
        <span class="header3"
          >Capital: <b> {{ capital[0] }} </b>
        </span>
        <span class="header3"
          >Region : <b> {{ region }} </b>
        </span>
        <span class="header3"
          >Subregion : <b> {{ subregion }} </b>
        </span>
      </div>
    </div>

    <div class="flex">
      <div class="secondCard flex flex-col">
        <span class="header2">Calling Code</span>
        <span class="textContent">{{ callingCode }}</span>
        <span class="">
          <span class="text-purpleSecondary text-bold underline">
            {{ countriesWithSameCallingCode.length }} country
          </span>
          with this currency</span
        >
      </div>
      <div class="secondCard flex flex-col">
        <span class="header2">Currency</span>
        <span class="textContent">{{ currency }}</span>
        <span class="">
          <span class="text-purpleSecondary text-bold underline">
            {{ countriesWithSameCurrency.length }} country
          </span>
          with this currency</span
        >
      </div>
    </div>
  </div>
</template>

<style scoped>
.styleMargin {
  padding: 90px;
  background: #ffffff;
}
.buttonStyle {
  width: 180px;
}
.fontHeader {
  font-weight: 700;
  font-size: 48px;
  text-align: center;
}
.rectangle {
  padding: 5px 20px 5px 20px;
  background: #8dd5cc;
  border-radius: 50px;
  font-size: 12px;
  color: #ffffff;
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 700;
  line-height: 14px;
  text-align: center;
}
.firstCard {
  width: 540px;
  height: 143px;
  margin-left: 25px;
  background: #ffffff;
  box-shadow: -4px -4px 4px rgba(0, 0, 0, 0.02), 4px 4px 4px rgba(0, 0, 0, 0.02);
  border-radius: 5px;
  padding: 25px 25px 29px 25px;
}
.secondCard {
  width: 540px;
  height: 143px;
  margin-left: 25px;
  padding: 25px 0 29px 0;
}
.header2 {
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 11px;
}
.header3 {
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 500;
  font-size: 18px;
  line-height: 21px;
  margin-bottom: 8px;
}
.textContent {
  font-family: 'SF Pro Text';
  font-style: normal;
  font-weight: 700;
  font-size: 48px;
  line-height: 57px;

  color: #8362f2;
}
</style>
