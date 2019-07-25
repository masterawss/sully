<template lang="pug">
  div
    w-cursos-horizontal

    q-list
      q-item-label(header) Hoy
      w-item-tema(v-for="i in 4")

      q-item-label(header) Mañana
      w-item-tema(v-for="i in 3")
      
</template>

<script>
import WItemTema from '../components/TemaItem'
import WCursosHorizontal from '../components/CursosHorizontal'
export default {
  components: { WItemTema, WCursosHorizontal},

}
</script>

<style>

</style>


