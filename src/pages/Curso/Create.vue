<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-primary
                q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu')
                    q-icon(name='fa fa-angle-left')
                q-toolbar-title
                    strong Crear curso
                q-btn(flat round dense size="sm" icon="fa fa-ellipsis-v" @click="$router.push({name: 'curso.create'})")
                
        q-page-container
            q-stepper( v-model="step" contracted ref="stepper" color="primary" animated)
                q-step( :name="1" icon="settings" title="Select campaign settings" :done="step > 1")
                    q-input(color="teal" bg-color="white" filled v-model="form.nombre" label="Nombre")
                    
                q-step( :name="2" icon="settings" title="Select campaign settings" :done="step > 1")
                    q-input(color="teal" bg-color="white" filled v-model="form.nombre" label="Nombre")

                q-step( :name="3" icon="settings" title="Select campaign settings" :done="step > 1")
                    q-input(color="teal" bg-color="white" filled v-model="form.nombre" label="Nombre")
</template>

<script>
import {QInput, QStepper, QStep} from 'quasar'
export default {
    components: {QInput, QStepper, QStep},
    data: () => ({
        step: 1,
        form: {
            nombre: ''
        }
    })
}
</script>

<style>

</style>
