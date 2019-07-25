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
                q-step( style="min-height:70vh" :name="1" icon="settings" title="Select campaign settings" :done="step > 1")
                    q-input(color="teal" v-model="form.nombre" label="Nombre")
                    q-input(color="teal" v-model="form.docente" label="Docente")
                    q-input(color="teal" v-model="form.descripcion" label="Descripción (Opcional)")
                    
                q-step( style="min-height:70vh" :name="2" icon="settings" title="Select campaign settings" :done="step > 2")
                    w-tema-item(v-for="i in 3")
                    q-btn.full-width(outline icon="add" rounded color="secondary")


                q-step( style="min-height:70vh" :name="3" icon="settings" title="Select campaign settings" :done="step > 3")
                    q-input(color="teal" bg-color="white" filled v-model="form.nombre" label="Nombre")
                
                template(v-slot:navigation)
                    q-stepper-navigation.text-right
                        q-btn(v-if="step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atrás" class="q-ml-sm")
                        q-btn(@click="$refs.stepper.next()" color="primary" rounded unelevated :label="step === 3 ? 'Guardar' : 'Continuar'")
                    
</template>

<script>
import {QInput, QStepper, QStep, QStepperNavigation} from 'quasar'
import WTemaItem from '../../components/TemaCursoItem'
export default {
    components: {QInput, QStepper, QStep, QStepperNavigation, WTemaItem},
    data: () => ({
        step: 1,
        form: {
            nombre: '',
            docente: '',
            descripcion: ''
        }
    })
}
</script>

<style>

</style>
