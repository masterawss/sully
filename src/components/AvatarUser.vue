<template lang="pug">
    //- span {{user}}
    q-avatar(v-if="user" @click="$router.push({name: 'perfil'})" )
        img( v-if="user.photoURL && user.photoURL !== ''" src="https://pbs.twimg.com/profile_images/1062059313882169344/hJqXjvV3_400x400.jpg")
        q-icon(v-else name="far fa-user")
</template>

<script>
import {QAvatar} from 'quasar'
import firebase from 'firebase'
import {getUser} from '../boot/firebase'
export default {
    components: {QAvatar},
    created(){
        firebase.auth().onAuthStateChanged( user => {
            if (user) {
                this.user = user
            }
        })
    },
    data: () => ({
        user: null
    })
}
</script>

<style>

</style>
