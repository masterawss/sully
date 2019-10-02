// import something here
import { firestorePlugin } from 'vuefire'
import firebase from 'firebase'

import {deleteDB, setUser} from './dexie'
import { DH_UNABLE_TO_CHECK_GENERATOR } from 'constants';

export const db = firebase
  .initializeApp(
    {
      apiKey: "AIzaSyDradB_VGqnA17JGx_A49TbeRCJ0K1kiXM",
      authDomain: "isully.firebaseapp.com",
      databaseURL: "https://isully.firebaseio.com",
      projectId: "isully",
      storageBucket: "isully.appspot.com",
      // messagingSenderId: "YOUR_MESSAGING_SEND_ID"
    }
  )
  .firestore()


export default async ({ Vue/* app, router, Vue, ... */ }) => {
  Vue.use(firestorePlugin)
  Vue.prototype.$firebase = db
}


export async function setCurso(curso){

  let user = firebase.auth().currentUser
  if(user){
    let cursoRef = await db.collection('cursos').doc()
    curso.created_by = user.uid
    curso.id = cursoRef.id
    return cursoRef.set(curso).then(r => {
      console.log('CRUSO FIREBASE', r);
      return curso
    })
  }
}

export async function setCursoToMisCursos(curso){
  let user = firebase.auth().currentUser
  if (user) {
    let curso_creado = await db.collection('usuarios').doc(user.uid)
                                .collection('cursos_suscritos').doc(curso.id)
                                .set(curso)
    return curso_creado
  }
  return null
}

export async function deleteMiCurso(curso_id){
  let user = firebase.auth().currentUser
  if (user) {
    let curso_eliminado = await db.collection('usuarios').doc(user.uid)
                                .collection('cursos_suscritos').doc(curso_id).delete()
    return curso_eliminado
  }
}

export async function deleteCurso(curso){
  let user = firebase.auth().currentUser
  if (user && curso.created_by == user.uid) {
    let curso_eliminado = await db.collection('cursos').doc(curso.id).delete()
    return curso_eliminado
  }
}

export async function createWithEmail(user){
  console.log('asdasdsdf', user);
  
  return firebase.auth().createUserWithEmailAndPassword(user.email, user.password).then(r => {
    let u = {
      nombre: user.nombre,
      email: user.email,
    }
    console.log('RESPUESTA', r);
    
    return db.collection('usuarios').doc(r.user.uid).set(u).then(r => {
      return setUser(r.user)
    })
  })
}

export async function getUser(){
  let user = firebase.auth().currentUser
  if (user) {
    // return user
    return db.collection('usuarios').doc(user.uid).get()
  }
  return null
}

export async function login({email, password}){
  return firebase.auth().signInWithEmailAndPassword(email, password).then(user => {
    console.log('USER FROM FIREBASE LOGIN: ', user);
    return setUser(user.user).then(() => {
      return user
    })
  })
}

export async function getCurso(id){
  return db.collection('cursos').doc(id).get()
}
export async function getMiCurso(id){
  let user = firebase.auth().currentUser
  if (user) {
    return db.collection('usuarios').doc(user.uid).collection('cursos_suscritos').doc(id).get()
  }
}

export async function getCursoWithTemas(id){
  return db.collection('cursos').doc(id).get().then( curso => {
    var c = curso.data()
    c.id = curso.id
    return db.collection('cursos').doc(id).collection('temas').get().then(temasSnap => {
      if (!temasSnap.empty) {
        let temas = []
        temasSnap.forEach(tema => {
          let t = {}
          t = tema.data()
          t.curso = c
          temas.push(t)
        })
        return { curso: c, temas }
      }
    })
  })
}

export async function logout(){
  return firebase.auth().signOut().then( () => {
    return deleteDB()
  })
}

export async function getTemasFromCursos(cursos){
  let promise_temas = []
  cursos.forEach(curso => {
    let temasRef = db.collection('cursos').doc(curso.id).collection('temas').get()
    promise_temas.push(temasRef)
  })
  return Promise.all(promise_temas)
}

export async function getMisTemas(uid){
  return getMisCursos(uid).then(cursos => {
    
    let temas = []
    cursos.forEach(curso => {
      temas.push(curso.temas)
    });
    return temas
  })
}

export async function getTemaFromCurso(curso){
  return db.collection('cursos').doc(curso.id).collection('temas').get().then(temasSnap => {
    let temas = []
    temasSnap.forEach(tema => {
      let t = tema.data()
      t.curso = curso
      temas.push(t)
    })
    return temas
  })
}

export async function getMisCursos(uid){
  return db.collection('usuarios').doc(uid).collection('cursos_suscritos').get().then(querySnapshot => {
    let cursos = []
    querySnapshot.forEach(curso => {
      let c = curso.data()
      c.id = curso.id
      cursos.push(c)
    })
    return cursos
  })
}

export async function editMiCurso(curso){
  let user = firebase.auth().currentUser
  if(user){
    let cursoRef = await db.collection('usuarios').doc(user.uid).collection('cursos_suscritos').doc(curso.id).set(curso)
    return cursoRef
  }
}