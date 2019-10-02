<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-primary
                q-btn(flat dense round @click='regresar' aria-label='Menu')
                    q-icon(name='fa fa-angle-left')
                q-toolbar-title
                    strong(v-if="util.is_edit") Editar curso
                    strong(v-else) Crear curso
                //- q-btn(flat round dense size="sm" icon="fa fa-ellipsis-v" @click="$router.push({name: 'curso.create'})")
                
        q-page-container
            q-stepper( v-model="util.step" contracted ref="stepper" color="primary" animated)
                //- STEP 1 ------------------------------------------------------------------------------------------------------------
                q-step( style="min-height:71vh" :name="1" icon="settings" title="Select campaign settings" :done="util.step > 1")
                    q-input.q-mb-sm(dense color="teal" v-model="form.nombre" label="Nombre")
                    q-input.q-mb-sm(dense color="teal" v-model="form.descripcion" label="Descripción (Opcional)")
                    q-input.q-mb-sm(dense color="teal" v-model="form.docente" label="Docente")
                    q-input.q-mb-sm(dense color="teal" v-model="form.institucion" label="Institución")
                    .text-grey.q-mt-lg Elegir el color:
                    w-color-picker( :color="form.color" @change="changeColor")
                    q-checkbox(v-if="!util.is_edit" v-model="util.save_mis_cursos" label="Guardar en mis cursos")
                //- STEP 2 ------------------------------------------------------------------------------------------------------------
                q-step( style="min-height:71vh" :name="2" icon="settings" title="Select campaign settings" :done="util.step > 2")
                    
                    //- div
                        q-input(label="Fecha de inicio")
                        .text-center.q-mt-sm
                            q-btn( no-caps label="Generar fechas" color="primary")

                    .text-center.q-my-md(v-show="form.temas.length == 0") 
                        strong Agrega los temas del curso.
                    q-list(v-show="form.temas.length > 0")
                        .row.justify-center.items-center.q-mx-md
                            .col-6
                                strong.text-grey-7 Temas 
                            .col-6.text-right 
                                q-btn(label="Re-ordenar" no-caps dense flat @click="util.modal_ordenar = true")
                        //- .text-right
                            q-btn(label="Ordenar" flat no-caps @click="ordenar")
                        q-item(v-for="tema,i in form.temas" :key="i")
                            q-item-section
                                q-item-label.text-weight-bolder {{ tema.tema }}
                                q-item-label(caption v-show="tema.is_examen") Exámen
                            q-item-section(avatar)
                                q-item-label(caption) {{ tema.fecha }}
                    q-btn.full-width.q-mt-md(outline icon="add" rounded color="secondary" @click="openNuevoTema")

                template(v-slot:navigation)
                    q-stepper-navigation.text-right
                        q-btn(v-if="util.step > 1" flat color="primary" @click="$refs.stepper.previous()" label="Atrás" class="q-ml-sm")
                        q-btn(@click="nextOrSave" :loading="util.loading" color="primary" rounded unelevated :label="util.step === 2 ? 'Guardar' : 'Continuar'")
            
            w-modal-new-tema(:open="util.modal_new_tema" @close="util.modal_new_tema=false" @addTema="addModalTema")
            
            q-dialog(v-model="util.modal_ordenar")
                q-card( style="width: 700px; max-width: 90vw;")
                    q-card-section
                        q-checkbox(label="Programar fecha de inicio" v-model="util.iniciar_con_fecha")
                        q-input( v-show="util.iniciar_con_fecha" v-model="util.fecha_inicio" label="Iniciar desde la fecha" type="date")
                        q-btn.full-width.q-mt-md(label="Ordenar" no-caps color="primary" @click="ordenarLista")
</template>

<script>
import {QInput, QStepper, QStep, QStepperNavigation, QCheckbox, QSpace, QDialog} from 'quasar'
import WTemaItem from '../../components/TemaCursoItem'
import WModalNewTema from '../../components/ModalNewTema'
import WColorPicker from '../../components/ColorPicker'

import {createCurso, getMiCurso} from '../../boot/firebase'


export default {
    components: {QInput, QStepper, QStep, QStepperNavigation, WTemaItem, WModalNewTema, WColorPicker, QCheckbox, QSpace, QDialog},
    data: () => ({
        util: {
            step: 1,
            modal_new_tema: false,
            modal_ordenar: false,
            save_mis_cursos: true,
            loading: false,
            is_edit: false,
            iniciar_con_fecha: false,
            fecha_inicio: null
        },
        form: {
            nombre: '',
            docente: '',
            descripcion: '',
            institucion: '',
            color: 'blueviolet',
            temas: [],
        },
    }),
    created (){
        let id = this.$route.params.id
        if (id) {
            this.util.is_edit = true
            console.log('ID', id);
            
            getMiCurso(id).then( (curso) => {
                this.form = curso.data()
                console.log('CURSO:', curso);
                
                // this.form.temas = temas
            })
        }  
    },
    methods: {
        save(){
            this.util.loading = true
            if (this.util.is_edit) this.editarCurso()
            else this.crearCurso()
        },
        crearCurso(){
            this.$db.createCurso(this.form, this.util.save_mis_cursos).then(e => {
                console.log('AGREGADO', e);
                this.$router.push({name: 'index'})
            }).catch(e => {
                console.log('ERROR', e);
            }).finally( () => {
                this.util.loading = false
            })
        },
        editarCurso(){
            this.util.loading = true
            let curso = JSON.parse(JSON.stringify(this.form))
            this.$db.editMiCurso(curso).then(r => {
                this.$q.notify('Guardado correctamente')
                this.$router.push({name: 'index'})
            }).catch(e => {
                this.$q.notify('Ha ocurrido un error')
                console.log('ERROR:', e);
            }).finally(f => {
                this.util.loading = false
            })
        },
        changeColor (color){
            this.form.color = color 
        },
        openNuevoTema(){
            this.util.modal_new_tema = true
        },
        addModalTema(tema){
            this.form.temas.push(JSON.parse(JSON.stringify(tema)))
        },
        nextOrSave(){
            if (this.util.step == 2) {
                this.save()
            }else{
                this.$refs.stepper.next()
            }
        },
        
        edited (tema, i){
            console.log('TEMA', tema);
            console.log('I', i);
        },
        regresar(){
            this.$q.dialog({
                title: '¿Estás seguro de salir?',
                message: 'Sus cambios se descartarán',
                ok: 'Salir',
                cancel: 'Cancelar'
            }).onOk(() => {
                this.$router.go(-1)
            })
        },
        change(tema_modificado){
            console.log('MODIFICADO', tema_modificado);
        },
        ordenar(){
            this.form.temas.sort((a,b) => new Date(a.fecha) - new Date(b.fecha))
        },
        modificarTema({index, tema}){
            this.form.temas[index] = tema
            this.ordenar()
            console.log('MODIFICADO', this.form.temas);
            
        },
        eliminarTema({index, tema}){
            this.form.temas.splice(index, 1)
        },
        ordenarLista(){
            if (this.util.iniciar_con_fecha) {
                let fecha = new Date(this.util.fecha_inicio)
                this.form.temas.map( (tema, index) => {
                    tema.fecha = fecha
                })
            }
        }
    },
    computed:{
        temasOrdenados(){
            return this.form.temas.sort((a,b) => new Date(a.fecha) - new Date(b.fecha))
        }
    }
}
</script>

<style>

</style>
