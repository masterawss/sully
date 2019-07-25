<template lang="pug">
    q-item
      q-item-section(avatar)
        div.circle(:class="'gradient-'+random")
      q-item-section
        q-item-label.text-weight-bolder Título del curso
        q-item-label(caption) Nombre del curso {{random}}
      q-item-section(avatar)
        w-search-bottom-sheet
</template>

<script>

import WSearchBottomSheet from './SearchBottomSheet'
export default {
  components: {WSearchBottomSheet},
  data: () => ({
    random: Math.floor((Math.random() * 5) + 1)
  })
}
</script>

<style>
  .circle{
    height: 15px;
    width: 15px;
    border-radius: 15px;
  }
</style>
