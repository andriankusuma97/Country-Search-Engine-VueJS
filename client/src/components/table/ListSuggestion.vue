<script>
export default {
  props: ['suggestion']
}
</script>

<template>
  <li
    class="hover:bg-slate-200 px-4 py-2 text-lg text-left mb-2 mt-0 cursor-pointer text-md"
    @click.prevent="$router.push('/about/' + suggestion.name.common)"
  >
    {{ suggestion.name.common }}
  </li>
</template>
