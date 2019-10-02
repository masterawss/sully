<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header
      q-toolbar.bg-white.text-primary
        q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu')
          q-icon(name='fa fa-angle-left')
        q-toolbar-title
          strong Mis cursos
        q-btn(flat round dense size="sm" icon="fa fa-plus" @click="$router.push({name: 'curso.search'})")
    q-page-container
      div
        w-card-curso.q-mb-xs(v-for="curso in cursos" :key="curso.id" show-actions="true" :curso="curso")
        

        //- q-card
        //-   q-card-section
        //-     .text-weight-bolder Nombre del curso
        //-     .text-grey Nombre del Profesor

        //- q-card.q-my-sm.text-white.bg-red.rounded(flat v-for="i in 4")
        //-   q-card-section
        //-     strong Nombre del curso
        //-     br
        //-     span Nombre del Profesor
        
        //- q-page-sticky(position="bottom-right" :offset="[13, 13]")
          q-btn( label="Nuevo curso" rounded no-caps icon="add" color="secondary" @click="$router.push({name: 'curso.create'})")
</template>

<style>
</style>

<script>
import {QCard, QCardSection} from 'quasar'
import WCardCurso from '../../components/CardCurso2'
import firebase from 'firebase'
export default {
  name: 'PageIndex',
  components: {QCard, QCardSection, WCardCurso},
  created(){
    firebase.auth().onAuthStateChanged( user => {
        if (user) {
            this.$firebase.collection('usuarios').doc(user.uid).collection('cursos_suscritos').get().then(querySnapshot => {
                let cursos = []
                querySnapshot.forEach(curso => {
                    let c = curso.data()
                    c.id = curso.id
                    cursos.push(c)
                })
                console.log('CURSOSS',cursos);
                this.cursos = cursos
            })
        }  
    })
  },
  data: () => ({
    cursos: []
  })
}
</script>

<style>
  .rounded{
    border-radius: 15px
  }
</style>

