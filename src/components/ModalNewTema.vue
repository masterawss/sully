<template lang="pug">
    q-dialog(v-model="open" persistent)
        q-card( style="width: 700px; max-width: 90vw;")
            q-card-section
                //- q-avatar(icon="signal_wifi_off" color="primary" text-color="white")
                span.q-ml-sm Agregar nuevo tema
                q-input(label="Tema" v-model="form.tema")
                q-input(label="Fecha" type="date" v-model="form.fecha")
                q-checkbox.q-mt-md(v-model="form.is_examen" label="Día de exámen")

            q-card-actions(align="right")
                q-btn(flat no-caps label="Cancelar" color="grey" @click="close")
                q-btn(flat no-caps label="Agregar" color="primary" @click="agregar" )
</template>

<script>
import {QCard, QCardSection, QCardActions, QDialog, QInput, QCheckbox} from 'quasar'
export default {
    props: ['open', 'tema'],
    components: {QCard, QCardSection, QCardActions, QDialog, QInput, QCheckbox},
    data: () => ({
        form:{
            tema: '',
            fecha: null,
            is_examen: false,
        }
    }),
    created (){
        if (this.tema)
            this.form = this.tema
    },
    methods: {
        close(){
            this.$emit('close', false)
        },
        agregar(){
            let t = JSON.parse(JSON.stringify(this.form))
            console.log('EMITIENDO DESDE MODAL', t);
            this.$emit('addTema', t)
            this.form.tema = ''
            this.form.is_examen = false
            this.$emit('close', false)
        }
    }
}
</script>

<style>

</style>
