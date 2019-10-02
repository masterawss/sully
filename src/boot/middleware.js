// import something here
import firebase from 'firebase'
// "async" is optional
export default async ({ router /* app, router, Vue, ... */ }) => {
  // something to do
  router.beforeEach( (to, from, next) => {
    firebase.auth().onAuthStateChanged(user => {
      const requiresAuth = to.matched.some(record => record.meta.auth)
      if(requiresAuth && !user) next({name: 'login'})
      else if(!requiresAuth && user) next({name: 'index'})
      else next()
    })


  })
}
