<template lang="pug">
    q-card.q-my-sm( :class="'gradient-'+i+ ' shadow-'+i")
      q-card-section
        q-item(clickable v-ripple dark @click="$router.push({name: 'curso.show', params: {id: 1}})")
          q-item-section
            q-item-label.text-weight-bolder Nombre del curso
            q-item-label(caption) Nombre del profesor
          q-item-section(avatar)
            q-icon(color="white" name="fa fa-angle-right")
</template>

<script>
export default {
    data: () => ({
        i: Math.floor(Math.random() * 5 + 1)
    })
}
</script>

<style>

</style>
