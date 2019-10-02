<template lang="pug">
    div
        .text-h6
            strong Crear cuenta
        q-input.q-mt-sm(dense label="Nombre completo" v-model="form.nombre")
        q-input.q-mt-sm(dense label="Correo electrónico" v-model="form.email" type="email")
        q-input.q-mt-sm(dense label="Contraseña" v-model="form.password" type="password")
        q-input.q-mt-sm(dense label="Repetir contraseña" v-model="password" type="password")

        q-btn.full-width.q-mt-md( :loading="loading" label="Crear cuenta" @click="crearCuenta" rounded color="primary" no-caps)
        q-btn.q-my-sm.full-width(outline no-caps @click="$emit('goLogin')" label="Iniciar sesión" rounded color="primary")
        //- .text-center.q-mt-md
            span.text-grey O puedes
            q-btn( :loading="loading" dense no-caps flat label="Iniciar sesión" @click="$emit('goLogin')" color="primary")
</template>

<script>
import {QInput} from 'quasar'

import firebase from 'firebase'

import {createWithEmail} from '../boot/firebase'

export default {
    components: {QInput},
    data: () => ({
        form: {
            nombre: '',
            email: '',
            password: ''
        },
        password: '',
        loading: false
    }),
    methods: {
        crearCuenta(){
            this.loading = true
            let user = this.form
            createWithEmail(user).then(r => {
                this.loading = false
                this.$router.push({name: 'welcome'})
            }).catch(e => {
                this.loading = false
                console.log('ERROR REGISTRANDO', e);
                this.$q.notify({message: 'Error: '+ e.message})
            })
        }
    }
}
</script>

<style>

</style>
