<template lang="pug">
    div
        .row.q-mx-md.items-center
            .col-6
                strong Cursos
            .col-6.text-right
                q-btn(dense flat no-caps label="Ver más" @click="$router.push({name: 'curso.index'})")
        q-scroll-area(horizontal style="height: 120px; width: 100%;")
            .row.no-wrap
                div.q-pa-sm(v-for="curso in cursos" :key="curso.id" )
                    w-card-curso(style="width:270px" :curso="curso")
                    //- | asdad asdsdasdfasdfasd sad fasfasdfasdfasdfadasdasdasdsfasdfsdfas dfsdf asdfas dfñlkfñlksd ñlfsdlñf
</template>

<script>
import {QScrollArea} from 'quasar'
import WCardCurso from './CardSimpleCurso'

// import {getCursos} from '../boot/dexie'

export default {
    components: {QScrollArea, WCardCurso},
    props: ['cursos'],
    data: () => ({
        // cursos: []
    }),
    created () {
        // getCursos().then(cursos => {
        //     this.cursos = cursos
        // })
    },
}
</script>

<style>

</style>
