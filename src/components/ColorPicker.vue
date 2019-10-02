<template lang="pug">
    .form__input.text-center
        swatches(v-model="color" inline :colors="colors" shapes="circles" popover-to="left" @input="change")
</template>

<script>
import Swatches from 'vue-swatches'
import "vue-swatches/dist/vue-swatches.min.css"
export default {
    components: {Swatches},
    props: ['color'],
    data: () => ({
        
        // color: 'blueviolet',
        colors: [
            'blueviolet',
            'blue',
            'dodgerblue',
            'deeppink',
            'red',
            'orange',
            'gold',
            'yellowgreen',
            'teal',
            'slategrey',
        ]
        // colors: [ 
        //     '#F44336',
        //     '#E91E63',
        //     '#9C27B0',
        //     '#3F51B5',
        //     '#2196F3',
        //     '#00BCD4',
        //     '#009688',
        //     '#4CAF50',
        //     '#FF9800',
        //     '#607D8B',
        //  ],
    }),
    methods: {
        change(color){
            this.$emit('change', color)
        }
    }
}
</script>

<style>

</style>
