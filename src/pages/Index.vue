<template lang="pug">
  q-pull-to-refresh(@refresh="refresh")
    div(v-if="cursos.length>0")
      w-cursos-horizontal( v-if="cursos" :cursos="cursos")

      .row.q-mx-md.items-center
        .col-6
            strong Temas 
        .col-6.text-right 
            q-btn(dense flat no-caps label="Ver más" @click="$router.push({name: 'temas.index'})")
      q-list(v-if="temas && Object.keys(temas).length" )
        div(v-for="temas_fecha,i in temas" v-if="temas" :key="i")
          q-item-label.text-primary(header v-if="i == hoy" )
            strong {{i | moment("dddd, MMMM Do") }}
          q-item-label(header v-else ) {{i | moment("dddd, MMMM Do") }}
          w-item-tema(v-for="tema in temas_fecha" :key="tema.id" :tema="tema")
      .text-center.q-mt-xl.q-mx-md(v-else)
        img.q-mb-md(src="../statics/relax.svg" width="250px")
        .text-h6.text-primary.q-mb-md 
          strong No hay temas pendientes en su agenda
        .text-grey Disfrute de su tiempo.
    div.flex.flex-center.q-mt-xl.q-mx-md.text-center(v-else)
      img.q-mb-md(src="../statics/anotado.svg" width="220px")
      .text-h5.text-primary  
        strong Parece que aún no tienes cursos suscritos
      q-btn.q-my-md(color="accent" rounded unelevated label="Agregar cursos" no-caps @click="$router.push({name: 'curso.search'})")
      //- q-item-label(header) Mañana
      //- w-item-tema(v-for="i in 3")
      
</template>

<script>
import WItemTema from '../components/TemaItem'
import WCursosHorizontal from '../components/CursosHorizontal'

import {getTemasAgrupadosAtNow, getCursos} from '../boot/dexie'
import {getAll} from '../boot/utils'

import {auth} from 'firebase'

import {QPullToRefresh} from 'quasar'
import moment from 'moment';
// import {setCurso, getCurso, getTemasAtNow} from '../boot/dexie'

export default {
  components: { WItemTema, WCursosHorizontal, QPullToRefresh},
  created(){
    this.hoy =  moment().format("YYYY-MM-DD")
    console.log('HOY', this.hoy);
    
    getCursos().then(cursos=> { this.cursos = cursos })
    getTemasAgrupadosAtNow().then(temas => { this.temas = temas })
  },
  data: () => ({
    temas: [],
    cursos: [],
    hoy: ''
  }),
  methods: {
    refresh (done){
      auth().onAuthStateChanged(user => {
        if(user){
          this.$db.getAll(user.uid).then(r => {
            console.log('R', r);
            getCursos().then(cursos=> { this.cursos = cursos })
            getTemasAgrupadosAtNow().then(temas => { 
              console.log('TEMAS', temas);
              this.temas = temas })
            done()
          })
        }
      })
    }
  }
}
</script>

<style>

</style>


