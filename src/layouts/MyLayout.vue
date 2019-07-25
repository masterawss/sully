<template lang="pug">
  q-layout(view='lHh Lpr lFf')
    q-header
      q-toolbar.bg-white.text-primary
        q-btn(flat dense round @click='leftDrawerOpen = !leftDrawerOpen' aria-label='Menu')
          q-icon(name='menu')
        q-toolbar-title
          strong Sully
        
        //- div Quasar v{{ $q.version }}
    q-drawer(v-model='leftDrawerOpen' bordered )
      q-list
        q-item-label(header) Menú
        q-item(clickable @click="$router.push({name: 'index'})")
          q-item-section(avatar)
            q-icon(name='home')
          q-item-section
            q-item-label Principal
            //- q-item-label(caption) quasar.dev
        q-item(clickable @click="$router.push({name: 'curso.index'})")
          q-item-section(avatar)
            q-icon(name='code')
          q-item-section
            q-item-label Cursos
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
import { openURL } from 'quasar'

export default {
  name: 'MyLayout',
  data () {
    return {
      leftDrawerOpen: this.$q.platform.is.desktop
    }
  },
  methods: {
    openURL
  }
}
</script>

<style>
</style>
