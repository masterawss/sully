<template lang="pug">
    .row.items-center
        .col
            .round.shadow-smooth.q-mx-md.q-px-md.q-my-md
                q-input(borderless dense v-model="txt_buscar" label="Buscar cursos ...")
                    //- template(v-slot:prepend)
                        q-icon(name="search")
                    template(v-slot:append)
                        q-icon( v-show="txt_buscar !== ''" name="close" @click="txt_buscar = ''" class="cursor-pointer")
                    //- template(v-slot:after)
                    //-     q-btn(round dense flat icon="send")
        q-btn.q-mr-lg(icon="search" dense round color="accent" @click="search" :loading="loading" :disable="txt_buscar.length < 5")
</template>

<script>
import {QInput} from 'quasar'
export default {
    components: {QInput},
    data: () => ({
        txt_buscar: '',
        loading: false
    }),
    methods: {
        search(){
            this.loading = true
            this.$firebase.collection('cursos').orderBy('nombre')
            .startAt(this.txt_buscar).endAt(this.txt_buscar+"\uf8ff").limit(30).get().then(cursos => {
                let cursos_encontrados = []
                cursos.forEach(curso => {
                    let c = curso.data()
                    c.id = curso.id
                    cursos_encontrados.push(c)
                });
                console.log('CURSOS', cursos_encontrados);
                this.$emit('cursos_encontrados',cursos_encontrados)
            }).finally(() => {
                this.loading = false
            })
        }
    }
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