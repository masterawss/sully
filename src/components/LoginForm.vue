<template lang="pug">
    div
        q-input(label="Correo electrónico" v-model="credenciales.email")
        q-input(label="Contraseña" v-model="credenciales.password" type="password")
        q-btn.q-mt-md.full-width.shadow-teal(label="Ingresar" unelevated no-caps rounded color="primary" :loading="loading" @click="login")
        q-btn.q-my-sm.full-width(outline no-caps @click="$emit('goRegister')" label="Registrarse" rounded color="primary")
        //- div
            .text-center.q-my-md
                span.text-grey o inicia sesión con:
            .row.q-col-gutter-md
                .col-6
                    q-btn.shadow-red.full-width(color="red" rounded no-caps label="Google")
                .col-6
                    q-btn.shadow-blue.full-width(color="indigo" rounded no-caps label="Facebook")
</template>

<script>
import {QInput } from 'quasar'
import {login} from '../boot/firebase'
export default {
    components: {QInput},
    methods: {
        login(){
            this.loading = true
            login(this.credenciales).then(response => {
                this.$db.getAll(response.user.uid).then(r => {
                    console.log('LISTO', r);
                    this.loading = false
                    this.$router.push({name: 'welcome'})
                })
            })
            .catch(e => {
                this.loading = false
                console.log('ERROR', e);
                this.$q.notify({message: 'Hubo un problema'})
            })
        },
        // async downloadMisCursos(uid){
        //     return getMisCursos(uid).then(cursos => {
        //         console.log('MIS CURSOS', cursos);
        //         return setCursos(cursos)
        //     })
        // },
        // async downloadMisTemas(uid){
        //     return getMisTemas(uid).then(temas => {
        //         let temas_listos = []
        //         temas.forEach(temasUnidos => {
        //             temasUnidos.forEach(temas_separados => {
        //                 temas_listos.push(temas_separados)
        //             })
        //         })
        //         return setTemas(temas_listos)
        //     })
        // },
        // async getAll(uid){
        //     let promiseGet = [ this.downloadMisCursos(uid), this.downloadMisTemas(uid) ]
        //     return Promise.all(promiseGet)
        // }
    },
    data: () => ({
        loading: false,
        credenciales: {
            email: '',
            password: ''     
        }
    }),

}
</script>

<style>

</style>
