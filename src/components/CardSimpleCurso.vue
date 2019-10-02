<template lang="pug">
    q-card.q-my-sm( :class="'bg-'+curso.color+ ' shadow-'+curso.color")
      q-card-section
        q-item( dark)
          q-item-section(clickable v-ripple @click="$router.push({name: 'curso.show', params: {id: curso.id}})")
            q-item-label.text-weight-bolder {{ curso.nombre }}
            q-item-label(caption) {{ curso.docente }} 
</template>

<script>
export default {
    props: ['curso'],
}
</script>

<style>

</style>
