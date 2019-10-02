<template lang="pug">
    q-card.q-py-sm.shadow-smooth
      q-card-section
        q-item()
          q-item-section(avatar)
            q-icon( :class="'text-color-'+curso.color" name="fa fa-circle")
          q-item-section(clickable v-ripple @click="$router.push({name: 'curso.show', params: {id: curso.id}})")
            q-item-label.text-weight-bolder.text-grey-7(color="grey") {{ curso.nombre }}
            q-item-label(caption) {{ curso.docente }} 
              //- br
              //- q-chip.text-white( :class="'gradient-'+curso.color" dense) {{curso.temas.length}} temas
          w-card-curso-actions(v-if="showActions" :curso="curso")
          
          //- q-item-section(avatar)
            q-icon(color="white" name="fa fa-angle-right")
</template>

<script>
import WCardCursoActions from './CardCursoActions'
import {QChip} from 'quasar'
export default {
  props: ['curso', 'showActions'],
  components: {WCardCursoActions, QChip},
  data: () => ({

  })
}
</script>