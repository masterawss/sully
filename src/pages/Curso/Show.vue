<template lang="pug">
    q-layout(view='lHh Lpr lFf')
        q-header
            q-toolbar.bg-white.text-primary
                q-btn(flat dense round @click='$router.go(-1)' aria-label='Menu')
                    q-icon(name='fa fa-angle-left')
                q-toolbar-title
                    
                q-btn(flat round dense size="sm" icon="fa fa-ellipsis-v" @click="$router.push({name: 'curso.create'})")
                
        q-page-container
            div.q-ma-md
                .text-h6.text-primary.text-weight-bold Nombre del curso lorem ipsum
                small.text-grey Nombre del profesor

                p.text-grey-7.q-mt-md
                    | Adipisicing ipsum labore sint sunt ad pariatur laboris ullamco dolore sunt excepteur. Esse minim ad qui voluptate anim ullamco labore aute minim nostrud. Ipsum commodo nisi nisi laboris nostrud cillum mollit deserunt ad. Adipisicing laborum nostrud cupidatat consequat. Sunt non est aliqua ipsum occaecat elit proident aute deserunt.
                
                q-list
                    q-item-label(header) Temas
                    w-item-tema(v-for="i in 4")

</template>

<script>
import WItemTema from '../../components/TemaCursoItem'
import {QSpace} from 'quasar'
export default {
    components: {WItemTema}
}
</script>

<style>

</style>
