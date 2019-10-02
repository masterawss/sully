<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-primary
                q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu')
                    q-icon(name='fa fa-angle-left')
                q-toolbar-title
                    strong Temas
                
        q-page-container
            div(v-for="temas_fecha,i in temas" :key="i")
                q-item-label.text-primary(header v-if="i == hoy" )
                    strong {{i | moment("dddd, MMMM Do") }}
                q-item-label(header v-else ) {{i | moment("dddd, MMMM Do") }}
                w-item-tema(v-for="tema in temas_fecha" :key="tema.id" :tema="tema")
</template>

<script>
import {getTemasAgrupados} from '../../boot/dexie'
import WItemTema from '../../components/TemaItem'
import moment from 'moment'
export default {
    data: () => ({
        temas: [],
        is_loading:false,
        hoy: ''
    }),
    components: {WItemTema},
    created(){
        this.hoy =  moment().format("YYYY-MM-DD")
        this.is_loading = true
        getTemasAgrupados().then(temas => {
            this.temas = temas
            // this.temas = JSON.parse(JSON.stringify(temas))
        }).catch(e => {
            console.log('ERROR', e);
            this.$q.notify('Ha ocurrido un error')
        }).finally(() => {
            this.is_loading = false
        })
    }
}
</script>

<style>

</style>
