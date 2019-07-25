<template lang="pug">
    
    div
        q-item
            q-item-section(avatar)
                q-circular-progress.text-white(
                show-value
                :value="value"
                size="50px"
                :thickness="0.2"
                color="orange"
                center-color="grey-8"
                track-color="transparent")
                    q-icon(name="volume_up")
            q-item-section
                q-item-label Item with caption
                q-item-label(caption) Caption
        
</template>

<script>
import {QCircularProgress} from 'quasar'
export default {
    components: {QCircularProgress},
    data: () => ({
        value: 80,
    })
}
</script>

<style>

</style>
