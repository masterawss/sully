<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-primary
                q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu')
                    q-icon(name='fa fa-angle-left')
                q-toolbar-title
                    strong Buscar
                q-btn(flat round dense size="sm" icon="fa fa-ellipsis-v" @click="$router.push({name: 'curso.create'})")
                
        q-page-container
            .round.shadow-black.q-mx-md.q-px-md.q-my-md
                q-input(borderless dense v-model="txt_buscar" label="Buscar cursos ...")
                    template(v-slot:prepend)
                        q-icon(name="search")
                    template(v-slot:append)
                        q-icon( v-show="txt_buscar !== ''" name="close" @click="txt_buscar = ''" class="cursor-pointer")
            
            q-page-sticky(position="bottom-right" :offset="[13, 13]")
                q-btn( label="Crear curso" rounded no-caps icon="add" color="secondary" @click="$router.push({name: 'curso.create'})")
</template>

<script>
import {QInput, QPageSticky} from 'quasar'
export default {
    components: {QInput, QPageSticky},
    data: () => ({
        txt_buscar: ''
    })
}
</script>

<style scoped>
    .round{
        border-radius: 50px;
    }
    .flat{
        border-style: none
    }
</style>
