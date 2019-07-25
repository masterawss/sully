<template lang="pug">
    div
        q-btn(dense round flat)
            q-icon(color="black" name="fa fa-search" size="15px" @click="search")
        
</template>

<script>
export default {
    methods: {
        search(){
            this.$q.bottomSheet({
                message: 'Buscar el tema',
                grid:true,
                actions: [
                    {
                        label: 'Google',
                        img: 'https://cdn3.iconfinder.com/data/icons/google-suits-1/32/1_google_search_logo_engine_service_suits-512.png',
                        id: 'google'
                    },
                    {
                        label: 'Google academic',
                        img: 'http://medialab.letras.unmsm.edu.pe/wp-content/uploads/2017/09/2gs.png',
                        id: 'google'
                    },
                    {
                        label: 'Scielo',
                        img: 'https://avatars1.githubusercontent.com/u/505032?s=280&v=4',
                        id: 'scielo'
                    },
                ]
            })
        }
    }
}
</script>

<style>

</style>
