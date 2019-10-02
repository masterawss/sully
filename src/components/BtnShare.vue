<template lang="pug">
    div
        q-btn(flat round  size="sm" @click="dialog=true" icon="fa fa-share-alt")

        q-dialog(v-model="dialog" position="bottom")
            q-card(style="width: 500px")
                q-card-section
                    .text-h6
                        strong Compartir curso:
                    .row.items-center.q-mt-md.q-mb-md
                        .col
                            q-input(v-model="url" ref="input" readonly label="Link del curso")
                        .col-auto
                            q-btn.bg-grey-3.text-grey-8( dense no-caps label="Copiar"  unelevated @click="copiar")

                    social-sharing(:url="url" inline-template)
                        div
                            .row.items-center
                                .col-7 Compartir en:
                                .col-5
                                    .row
                                        .col-6.text-center
                                            network(network="facebook")
                                                img(src="https://facebookbrand.com/wp-content/uploads/2019/04/f_logo_RGB-Hex-Blue_512.png?w=32&h=32")
                                        .col-6.text-center
                                            network(network="whatsapp")
                                                img(src="https://image.flaticon.com/icons/png/32/134/134937.png")
</template>

<script>
import {QDialog, QAvatar, QInput} from 'quasar'
export default {
    components: {QDialog, QAvatar, QInput},
    created(){
        this.url = this.$env.BASE_URL+this.$route.fullPath
        // console.log('RUTA', this.$route.fullPath);
        
    },
    data: () => ({
        url: '',
        dialog: false,
    }),
    methods: {
        copiar(){
            let copy_text = this.$refs.input
            copy_text.select()
            document.execCommand("copy");
            this.$q.notify({message: 'Copiado'})
        }
    }
}
</script>

<style>

</style>
