import { ref, computed } from 'vue'
import { defineStore } from 'pinia'

export const useCountriesStore = defineStore('countries', {
 state:()=>({
  suggestions: [],
  apiUrl: 'https://restcountries.com/v3.1/name/',
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
 }

})
