<script>
import IconCommunityVue from '../components/icons/IconCommunity.vue'
import IconSearchVue from '../components/icons/IconSearch.vue'

export default {
  components: {
    IconCommunityVue,
    IconSearchVue
  },
  data() {
    return {
      searchInput: '',
      suggestions: [],
      apiUrl: 'https://restcountries.com/v3.1/name/',
      typingTimer: null,
      typingDelay: 500 // Waktu penundaan dalam milidetik sebelum mengirim permintaan pencarian
    }
  },
  methods: {
    searchCountries() {
      clearTimeout(this.typingTimer)

      if (this.searchInput) {
        this.typingTimer = setTimeout(() => {
          this.fetchCountries()
        }, this.typingDelay)
      } else {
        this.clearSuggestions()
      }
    },
    async fetchCountries() {
      try {
        const response = await fetch(`${this.apiUrl}${this.searchInput}`)
        const data = await response.json()
        if (response.ok) {
          this.suggestions = data.slice(0, 5) // Mengambil 5 data teratas
        } else {
          console.error('Request failed:', response.status)
        }
      } catch (error) {
        console.error('Request error:', error)
      }
    },
    clearSuggestions() {
      this.suggestions = [] // Mengosongkan daftar saran pencarian
    },
    goToCountryPage(country) {
      window.location.href = `https://example.com/countries/${country.name.common}`
      // Ganti `https://example.com/countries/` dengan URL yang sesuai dengan halaman tujuan
    }
  }
}
</script>

<template>
  <div class="flex flex-col items-center justify-center text-72 min-h-screen">
    <div class="mb-4">
      <span class="fontHeader">Country</span>
    </div>
    <div
      class="flex items-center py-2 px-4 rounded-md inputWidth bg-white borderInput hover:ring-2 hover:ring-purple"
    >
      <input
        type="text"
        placeholder="Type any country name"
        class="text-base focus:outline-none w-full"
        v-model="searchInput"
        @input="searchCountries"
        @blur="clearSuggestions"
      />

      <IconSearchVue class="text-2xl float-right cursor-pointer" />
    </div>
    <div class="bg-white mt-4 BoxResult">
      <ul class="mt-1 BoxShadow" v-if="searchInput && suggestions.length > 0">
        <li
          v-for="suggestion in suggestions"
          :key="suggestion.name.common"
          class="hover:bg-slate-200 px-4 py-2 text-lg text-left mb-2 mt-0 cursor-pointer text-md"
          @click="goToCountryPage(suggestion)"
        >
          {{ suggestion.name.common }}
        </li>
      </ul>
      <p class="mt-1 BoxShadow text-lg text-left px-4 py-2" v-else-if="searchInput && suggestions.length === 0">
        Not found
      </p>
    </div>
  </div>
</template>

<style scoped>
.fontHeader {
  font-size: 72px;
}
.inputWidth {
  width: 700px;
}
.borderInput {
  border: 0.5px solid #c8c8c8;
  border-radius: 10px;
}
.BoxResult {
  width: 700px;
  height: 228px;
  font-size: 18px;
}
.BoxShadow {
  background: #ffffff;
}
</style>