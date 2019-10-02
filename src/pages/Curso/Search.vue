<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-primary
                q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu')
                    q-icon(name='fa fa-angle-left')
                q-toolbar-title
                    strong Buscar
                //- q-btn(flat round dense size="sm" icon="fa fa-ellipsis-v")
                
        q-page-container
            w-search-input(@cursos_encontrados="cursosEncontrados")
            .flex.flex-center
                q-circular-progress.q-mt-xl(
                indeterminate
                v-show="loading"
                size="50px"
                color="primary")
            w-card-curso.q-mb-xs(v-for="curso in cursos" :key="curso.id" :curso="curso" :show-actions="true")

            .q-mt-xl.q-pt-md
        q-page-sticky(position="bottom-right" :offset="[13, 13]")
            q-btn( label="Crear curso" rounded no-caps icon="add" color="secondary" @click="$router.push({name: 'curso.create'})")
</template>

<script>
import { QPageSticky, QCircularProgress} from 'quasar'
import WSearchInput from '../../components/SearchInput'
import WCardCurso from '../../components/CardCurso2'
export default {
    components: { QPageSticky,WSearchInput,WCardCurso, QCircularProgress},
    data: () => ({
        cursos: [],
        loading: false
    }),
    created(){
        this.loading = true
        this.$firebase.collection('cursos').get().then(querySnapshot => {
            this.loading = false
            if (!querySnapshot.empty) {
                querySnapshot.forEach(curso => {
                    let c = curso.data()
                    // c.id = curso.id
                    this.cursos.push(c)
                });
            }
        })
    },
    methods: {
        cursosEncontrados(cursos){
            console.log('LOS CURSOS', cursos);
            
            this.cursos = cursos
        }
    }
}
</script>

<style>

</style>

