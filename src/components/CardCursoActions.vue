<template lang="pug">
    q-item-section(avatar)
        q-btn(icon="fa fa-plus" v-if="!exist" dense flat round size="sm" :loading="loading" @click="addCurso")
        q-btn(icon="fa fa-times" v-else dense flat round size="sm" :loading="loading" @click="deleteCurso")
        //- q-icon(color="white" name="fa fa-angle-right")
</template>

<script>
// import {getUser, searchCurso, deleteCursoWithTemas as deleteLocalCursoWithTemas, setCursoWithTemas} from '../boot/dexie'
// import {addCurso, deleteCursoFromMisCursos, getCursoWithTemas} from '../boot/firebase'
import firebase from 'firebase'
export default {
    props: ['curso'],
    data: () => ({
        loading: false,
        exist: false
    }),
    methods: {
        addCurso(){
            this.loading = true
            this.$db.downloadCurso(this.curso).then(r=>{
                this.exist = true
            }).catch(e => {
                console.log('OCURRIO UN ERROR', e);
            }).finally(() => {
                this.loading = false
            })
        },
        deleteCurso(){
            this.$q.dialog({message: '¿Está seguro de eliminar de su lista de cursos?', ok: 'Borrar', cancel: 'Cancelar'})
            .onOk(() => {
                this.loading = true
                this.$db.deleteFromMiCurso(this.curso.id).then( r=> {
                    this.exist =false
                    console.log('ELIMINADO', r);
                }).catch(e => {
                    this.$q.notify({message: 'Ha ocurrido un error'})
                    console.log('OCURRIO UN ERROR', e);
                }).finally(() => {
                    this.loading = false
                })
            })
        }
    },
    created(){
        this.loading = true
        this.$db.searchCurso(this.curso.id).then(curso => {
            if (curso !== undefined)
                this.exist = true
        }).catch(e => {
            console.log('ERROR', e);
        }).finally(() => {
            this.loading = false
        })
    }
}
</script>

<style>

</style>
