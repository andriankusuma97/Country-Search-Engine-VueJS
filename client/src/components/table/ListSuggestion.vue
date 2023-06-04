<script>
export default {
  props: ['suggestion']
}
</script>

<template>
  <li class="hover:bg-slate-200 px-4 py-2 text-lg text-left mb-2 mt-0 cursor-pointer text-md">
    {{ suggestion.name.common }}
  </li>
</template>
