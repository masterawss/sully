<template lang="pug">
    .column.justify-center(style="height: 100%")
        .col.self-center
            .text-center
                img.q-mt-md(height='100px' src='../assets/logo.svg' alt='')
            
            .text-center
                .logo-font.text-h4.text-blue-grey-9(color='primary') Syllabus
                //- .full-width.q-mx-lg.bg-secondary.q-pa-xs(style="border-radius: 10px;")
                .text-grey.q-pt-lg.q-px-xl 
                    strong El plan de estudio de todos tus cursos desde tu celular. 
            .q-mx-md.q-mt-md
                q-tab-panels(v-model="panel" animated)
                    q-tab-panel(name="login")
                        w-login-form( @goRegister="panel = 'register'")
                    q-tab-panel(name="register")
                        w-register-form( @goLogin="panel = 'login'" )
                        
</template>

<script>
import { QTabPanel, QTabPanels} from 'quasar'
import WLoginForm from '../components/LoginForm'
import WRegisterForm from '../components/RegisterForm'
export default {
    components: { QTabPanel, QTabPanels, WLoginForm, WRegisterForm},
    data: () => ({
        email: '',
        password: '',
        panel: 'login'
    })
}
</script>

<style>

</style>
