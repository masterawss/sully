<template lang="pug">
    q-carousel(v-model="slide"
    transition-prev="fade"
    transition-next="fade"
    swipeable
    animated
    padding
    height="100vh")
        q-carousel-slide(name="uno" class="column no-wrap flex-center")
            .q-mt-md.text-center
                img(src="../statics/fogg-searching-1.png" width="100%") 
                .text-h5.q-my-md 
                    strong Deja de buscar papeles.
                .text-grey No pierdas el tiempo buscando tus planes de estudio impresos. Llévalo todo en tu smartphone.
            .fixed-bottom.text-right.q-pa-md
                q-btn( unelevated flat no-caps @click="slide='dos'" rounded color="primary" icon-right="chevron_right" label="Siguiente")
        q-carousel-slide(name="dos" class="column no-wrap flex-center")
            .q-mt-md.text-center
                img(src="../statics/clip-list-is-empty.png" width="100%")
                .text-h5.q-my-md 
                    strong Organízate
                .text-grey Encuentre los temas ordenados por fechas y cursos.
            .fixed-bottom.text-right.q-pa-md
                q-btn.q-mr-md(label="Atrás" @click="slide='uno'" flat no-caps)
                q-btn( unelevated flat no-caps @click="slide='tres'" rounded color="primary" icon-right="chevron_right" label="Siguiente")
        q-carousel-slide(name="tres" class="column no-wrap flex-center")
            .q-mt-md.text-center
                img(src="../statics/hugo-searching.png" width="100%") 
                .text-h5.q-my-md 
                    strong Investiga el tema.
                .text-grey Repasa o anticípate buscando los temas en páginas educativas.
            .fixed-bottom.text-right.q-pa-md
                q-btn.q-mr-md(label="Atrás" @click="slide='dos'" flat no-caps)
                q-btn( unelevated flat no-caps @click="$router.push({name: 'index'})" rounded color="primary" icon-right="chevron_right" label="Iniciar")
</template>

<script>
import {QCarousel, QCarouselSlide} from 'quasar'
export default {
    components:{QCarousel,QCarouselSlide},
    data: () => ({
        slide: 'uno'
    })
}
</script>

<style>

</style>
