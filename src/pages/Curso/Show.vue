<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-grey-8()
                q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu' )
                    q-icon(:class="'text-color-'+curso.color" name='fa fa-angle-left' )
                q-toolbar-title
                    small.text-weight-bold(:class="'text-color-'+curso.color") {{ curso.nombre }}
                q-btn(v-if="!is_local" :loading="is_download_loading" :class="'text-color-'+curso.color" flat round  size="sm" @click="download" icon="fa fa-arrow-down" )
                q-btn.q-ml-sm(:class="'text-color-'+curso.color" flat round  size="sm" icon="fa fa-ellipsis-v")
                    q-menu
                        q-list
                            q-item(v-if="is_local" clickable v-ripple @click="$router.push({name: 'curso.edit', params: {id: curso.id}})")
                                q-item-section(avatar)
                                    q-icon(name="fa fa-pen" style="font-size: 15px")
                                q-item-section 
                                    | Editar
                            q-item(v-if="is_local" clickable v-ripple @click="eliminar")
                                q-item-section(avatar)
                                    q-icon(name="fa fa-trash" style="font-size: 15px")
                                q-item-section 
                                    | Eliminar
                            
                //- q-btn.q-ml-md( v-if="is_local" flat round  size="sm" @click="$router.push({name: 'curso.edit', params: {id: curso.id}})" icon="fa fa-pen")
                //- q-btn.q-ml-md( v-if="is_local" flat round size="sm" @click="$router.push({name: 'curso.create'})" icon="fa fa-trash")
                //- q-btn.q-ml-md( v-else flat round  size="sm" @click="$router.push({name: 'curso.create'})" icon="fa fa-arrow-down")
                //- w-btn-share.q-ml-md
                //- q-btn.q-ml-md( flat round  size="sm" @click="$router.push({name: 'curso.create'})" icon="fa fa-sync-alt")
                //- q-btn.q-ml-md(flat round  size="sm" @click="$router.push({name: 'curso.create'})" icon="fa fa-ellipsis-v")
                
        q-page-container
            div.q-pa-md(v-if="curso")
                q-card.shadow-smooth
                    q-card-section
                        //- .text-h6.text-weight-bold(:class="'text-color-'+curso.color") {{ curso.nombre }}
                        p.text-grey-7.q-mt-md(v-if="curso.descripcion !== '' || curso.descripcion !== null ")  {{ curso.descripcion }}
                        small
                            strong Docente: 
                            .text-grey {{ curso.docente }}
                        small
                            strong Institución:
                            .text-grey {{ curso.institucion }}
                q-card.q-mt-md.shadow-smooth
                    q-card-section
                        q-list(v-if="curso && curso.temas")
                            q-item-label(header) Temas
                            w-item-tema(v-for="tema in curso.temas" :tema="tema" :key="tema.id")

</template>

<script>
import WItemTema from '../../components/TemaCursoItem'
import WBtnShare from '../../components/BtnShare'
import {QSpace, QMenu} from 'quasar'

import {getCurso as getLocalCurso} from '../../boot/dexie'
import {getCurso as getOnlineCurso} from '../../boot/firebase'

import {auth} from 'firebase'

export default {
    components: {WItemTema, WBtnShare, QMenu},
    data: () => ({
        curso: {},
        temas: [],
        is_local: true,
        is_mine: false,
        is_download_loading: false
    }),
    created(){
        // console.log('ID:', this.$route.params.id);
        let ID_CURSO = this.$route.params.id
        getLocalCurso(ID_CURSO).then( curso => {
            if (!curso ) {
                this.is_local = false
                console.log('BUSCANDO ONLINE');
                
                getOnlineCurso(ID_CURSO).then(curso => {
                    this.curso = curso.data()
                }).catch(e => {
                    console.log('ERROR', e);
                    this.$q.notify({message: 'Ha ocurrido un error'})
                })
            }else this.curso = curso
            
            let user = auth().currentUser
            if (user && user.uid == this.curso.created_by) {
                this.is_mine = true
            }
        }).catch(e => {
            console.log('ERROR', e);
            this.$q.notify({message: 'Ha ocurrido un error'})
        })
    },
    methods: {
        download(){
            this.is_download_loading = true
            this.$db.downloadCurso(this.curso).then(curso => {
                this.is_local = true
                this.$q.notify('Se ha descargado correctamente')
            }).catch( e => {
                this.$q.notify('Ha ocurrido un error')
            }).finally(f => {
                this.is_download_loading = false
            })
        },
        eliminar(){
            this.$q.dialog({
                title: '¿Eliminar curso?',
                message: 'Se quitará de su lista de cursos',
                ok: 'Eliminar',
                cancel: 'Cancelar'
            }).onOk(() => {
                this.$db.deleteFromMiCurso(this.curso.id).then(id => {
                    this.$q.notify('Se eliminó el curso de su lista')
                }).catch(e => {
                    this.$q.notify('Ocurrió un error')
                })
            }).onCancel( () => {

            })
        }
    }
}
</script>

<style>

</style>
