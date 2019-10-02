<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header
      q-toolbar.bg-white.text-primary
        q-btn(flat dense round @click='leftDrawerOpen = !leftDrawerOpen' aria-label='Menu')
          q-icon(name='menu')
        q-toolbar-title
          strong.logo-font Syllabus
        w-avatar-user
        
        //- div Quasar v{{ $q.version }}
    q-drawer(v-model='leftDrawerOpen' bordered )
      q-list
        //- |{{user}}
        q-item(clickable v-ripple)
          q-item-section(avatar)
            q-icon(name="far fa-user")
          q-item-section
            q-item-label {{ user.displayName }}
            q-item-label(caption) {{ user.email }}

        q-separator
        q-item-label(header) Menú
        q-item(clickable @click="$router.push({name: 'index'})")
          q-item-section(avatar)
            q-icon(name='home')
          q-item-section
            q-item-label Principal
            //- q-item-label(caption) quasar.dev
        q-item(clickable @click="$router.push({name: 'curso.index'})")
          q-item-section(avatar)
            q-icon(name='book')
          q-item-section
            q-item-label Cursos
        q-item(clickable @click="$router.push({name: 'temas.index'})")
          q-item-section(avatar)
            q-icon(name='toc')
          q-item-section
            q-item-label Temas

        q-item(clickable @click="logOut")
          q-item-section(avatar)
            q-icon(name='exit_to_app')
          q-item-section
            q-item-label Salir
            //- q-item-label(caption) github.com/quasarframework
        //- q-item(clickable tag='a' target='_blank' href='https://chat.quasar.dev')
          q-item-section(avatar)
            q-icon(name='chat')
          q-item-section
            q-item-label Discord Chat Channel
            q-item-label(caption) chat.quasar.dev
        
    q-page-container
      router-view
</template>

<script>
import { openURL, QSeparator } from 'quasar'
import WAvatarUser from '../components/AvatarUser'
import {logout} from '../boot/firebase'
import {auth} from 'firebase'
export default {
  name: 'MyLayout',
  created (){
    this.user = auth().currentUser
  },
  components: {WAvatarUser, QSeparator},
  data () {
    return {
      user: {},
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL,
    logOut(){
      logout().then(r => {
        this.$router.push({name: 'login'})
      })
      .catch(e => {
        this.$q.notify({message: 'Error de conexión'})
      })
    }
  }
}
</script>

<style>
</style>
