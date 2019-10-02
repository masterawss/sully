<template lang="pug">
    div
        q-btn(dense round flat)
            q-icon(color="black" name="fa fa-search" size="15px" @click="search")
        
</template>

<script>
export default {
    props: ['tema'],
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
                        id: 'google_academic'
                    },
                    {
                        label: 'Scielo',
                        img: 'http://www.citrevistas.cl/revista-formacion/scielo.gif',
                        id: 'scielo'
                    },
                    {
                        label: 'Dialnet',
                        img: 'https://pbs.twimg.com/profile_images/875608239861186560/wZm_OpR5_400x400.jpg',
                        id: 'scielo'
                    },
                    {
                        label: 'Microsoft académico',
                        img: 'https://cdn1.iconfinder.com/data/icons/flat-and-simple-part-1/128/microsoft-128.png',
                        id: 'scielo'
                    },
                    {
                        label: 'Youtube',
                        img: 'https://www.dokensip.com/wp-content/uploads/2017/04/Youtube.png',
                        id: 'scielo'
                    },
                ]
            }).onOk(action => {
                let url = ''
                console.log(action.id);
                console.log('Tema: ', this.tema);
                
                switch (action.id) {
                    case 'google':
                        url = 'https://www.google.com/search?q='+this.tema
                        break;
                    case 'google_academic':
                        url = 'https://scholar.google.com.pe/scholar?hl=es&as_sdt=0%2C5&q='+this.tema+'&btnG='
                        break;
                    case 'scielo':
                        url = 'https://search.scielo.org/?lang=es&count=15&from=0&output=site&sort=&format=summary&fb=&page=1&q='+this.tema
                        break;
                    default:
                        break;
                }
                window.open(url)
            })
        }
    }
}
</script>

<style>

</style>
