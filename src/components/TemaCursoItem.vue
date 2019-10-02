<template lang="pug">
    q-item(v-if="!is_editing")
      q-item-section(avatar)
        q-icon( v-if="!tema.is_examen" name="fa fa-circle" style="font-size:15px" )
        q-icon( v-else name="fa fa-file-alt" style="font-size:15px" )
      q-item-section
        q-item-label.text-weight-bolder {{tema.tema}} 
        q-item-label(caption) {{ tema.fecha | moment('dddd, MMMM Do YYYY') }}
      q-item-section(avatar v-if="!noSearch" )
        w-search-bottom-sheet(:tema="tema.tema")
      q-item-section(avatar v-if="showActions")
        div
          q-btn.q-pa-sm(icon="fa fa-pen" flat dense round size="xs" @click="editar")
          q-btn.q-ml-md(icon="fa fa-times" flat dense round size="xs" @click="eliminar")
    //- EDITAR -------------------------------------------------------------------------
    q-card.q-my-sm.shadow-smooth(v-else)
      q-card-section
        q-input(v-model="edit.tema" label="Tema" dense )
        q-input(v-model="edit.fecha" label="Fecha" dense  type="date")
        q-checkbox(v-model="edit.is_examen" label="Es examen" )
        .q-pt-sm
          q-btn(flat color="primary" label="Guardar" no-caps @click="modificar")
          q-btn(flat color="grey" label="Cancelar" no-caps @click="is_editing = false")
      //- w-modal-edit-tema(:tema="tema" @addTema="modificar" :open="modal_edit_tema" @close="modal_edit_tema=false" )
</template>

<script>
import WSearchBottomSheet from './SearchBottomSheet'
import WModalEditTema from './ModalNewTema'
import {QInput, QCheckbox} from 'quasar'
export default {
    components: {WSearchBottomSheet,WModalEditTema, QInput, QCheckbox},
    props: ['tema', 'noSearch', 'showActions', 'index' ],
    data: () => ({
      modal_edit_tema: false,
      edit: {},
      is_editing: false
    }),
    methods: {
      editar(){
        this.is_editing = true
        this.edit = JSON.parse(JSON.stringify(this.tema))
      },
      modificar(){
        let tema = JSON.parse(JSON.stringify(this.edit))
        this.$emit('onChange', { index: this.index, tema })
        this.is_editing = false
      },
      eliminar(){
        this.$emit('onDelete', { index: this.index})
        this.is_editing = false
      },
    }
}
</script>

<style>

</style>
