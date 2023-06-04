<script>
import IconCommunityVue from '../components/icons/IconCommunity.vue'
import IconSearchVue from '../components/icons/IconSearch.vue'
import {mapActions, mapState} from 'pinia'
import {useCountriesStore} from '../stores/countries'
import ListSuggestionVue from '../components/table/ListSuggestion.vue'

export default {
  components: {
    IconCommunityVue,
    IconSearchVue,
    ListSuggestionVue
  },

  computed:{
    ...mapState(useCountriesStore,['suggestions'])
  },
  data() {
    return {
      searchInput: '',
      typingTimer: null,
      typingDelay: 500 // Waktu penundaan dalam milidetik sebelum mengirim permintaan pencarian
    }
  },
  methods: {

    ...mapActions(useCountriesStore,['fetchCountries']),

    searchCountries() {
      clearTimeout(this.typingTimer)

      if (this.searchInput) {
        this.typingTimer = setTimeout(() => {
          this.fetchCountries(this.searchInput)
        }, this.typingDelay)
      } else {
        this.clearSuggestions()
      }
    },

    clearSuggestions() {
      this.suggestions = [] // Mengosongkan daftar saran pencarian
    },
    
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
        <ListSuggestionVue v-for="suggestion in suggestions" :key="suggestion.name.common"  :suggestion="suggestion"  />
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