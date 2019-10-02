<template lang="pug">
    q-item
      q-item-section.flex.flex-center(avatar)
        q-icon(v-if="!tema.is_examen" name="fa fa-circle" :class="'text-color-'+tema.curso.color" style="font-size: 20px;" )
        q-icon(v-else name="fa fa-file-alt" :class="'text-color-'+tema.curso.color" style="font-size: 20px;" )
        //- div.ovalo(:class="'gradient-'+tema.curso.color" v-if="tema.is_examen")
        //- div.circle(:class="'gradient-'+tema.curso.color" v-else)
      q-item-section
        q-item-label.text-weight-bolder {{ tema.tema }}
        q-item-label(caption) {{ tema.curso.nombre }}
      q-item-section(avatar)
        w-search-bottom-sheet(:tema="tema.tema")
</template>

<script>

import WSearchBottomSheet from './SearchBottomSheet'
export default {
  components: {WSearchBottomSheet},
  props:['tema'],
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
  .ovalo{
    height: 5px;
    border-radius: 150px;
    width: 20px;
  }
</style>
