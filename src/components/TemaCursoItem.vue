<template lang="pug">
    q-item
      q-item-section
        q-item-label.text-weight-bolder Título del curso
        q-item-label(caption) 12/08/2019
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

</style>
