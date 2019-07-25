<template lang="pug">
    div
        .row.q-mx-md.items-center
            .col-6
                strong Cursos
            .col-6.text-right
                q-btn(dense flat no-caps label="Ver más" @click="$router.push({name: 'curso.index'})")
        q-scroll-area(horizontal style="height: 120px; width: 100%;")
            .row.no-wrap
                div.q-pa-sm(v-for="n in 5" :key="n" )
                    w-card-curso(style="width:250px")
                    //- | asdad asdsdasdfasdfasd sad fasfasdfasdfasdfadasdasdasdsfasdfsdfas dfsdf asdfas dfñlkfñlksd ñlfsdlñf
</template>

<script>
import {QScrollArea} from 'quasar'
import WCardCurso from './CardCurso'
export default {
    components: {QScrollArea, WCardCurso}
}
</script>

<style>

</style>
