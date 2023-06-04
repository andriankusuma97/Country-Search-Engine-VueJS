import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countries', {
 state:()=>({
  suggestions: [],
  apiUrl: 'https://restcountries.com/v3.1/name/',
  dataCountries:'',
  flags:'',
  latLong: '',
  capital: '',
  region: '',
  subregion: '',
  callingCode: '',
  countriesWithSameCallingCode: [],
  currency: '',
  countriesWithSameCurrency: []
 }),

 actions: {
  async fetchCountries(input) {
    try {
      const response = await fetch(`${this.apiUrl}${input}`)
      const data = await response.json()
      if (response.ok) {
        this.suggestions = data.slice(0, 5) // Mengambil 5 data teratas
      } else {
        console.error('Request failed:', response.status)
        this.suggestions= []
      }
    } catch (error) {
      console.error('Request error:', error)
    }
  },
  async fetchNameData(fullName) {
    try {
      const responseName = await fetch(`https://restcountries.com/v3.1/name/${fullName}?fullText=true`);
      const countryData = await responseName.json();
      this.dataCountries = countryData[0]
      this.flags = countryData[0].flags.png;
      this.latLong = countryData[0].latlng.join(', ');
      this.capital = countryData[0].capital;
      this.region = countryData[0].region;
      this.subregion = countryData[0].subregion;
      this.callingCode = countryData[0].idd.root[1] + countryData[0].idd.suffixes[0] ;
      this.currency = Object.keys(countryData[0].currencies)[0];
    } catch (error) {
      throw new Error(`Failed to fetch name data: ${error}`);
    }
  },
  async fetchCallingCodeData() {
    try {
      const responseCallingCode = await fetch(`https://restcountries.com/v2/callingcode/${this.callingCode}`);
      this.countriesWithSameCallingCode = await responseCallingCode.json();
    } catch (error) {
      throw new Error(`Failed to fetch calling code data: ${error}`);
    }
  },

  async fetchCurrencyData() {
    try {
      const responseCurrency = await fetch(`https://restcountries.com/v2/currency/${this.currency}`);
      this.countriesWithSameCurrency = await responseCurrency.json();
    } catch (error) {
      throw new Error(`Failed to fetch currency data: ${error}`);
    }
  }
 }

})
