// import something here


import {auth} from 'firebase'
import {getMisCursos, getMisTemas} from './firebase'
import {setCursosWithTemas, setTemas, deleteDB, setUser} from './dexie'

export async function downloadCurso(curso){
  await setCursoToMisCursos(curso)
  await setCursoWithTemas(curso)
  return curso
}

export async function createCurso(curso){
  return setCurso(curso)
}

export async function deleteMiCurso(curso){
  await deleteMiCurso(curso)
  await deleteCursoWithTemas(curso)
  return curso
}

export async function deleteCurso(curso){
  await deleteCurso(curso)
  await deleteCursoWithTemas(curso)
  return curso
}

export async function searchCurso(curso){
  return await searchLocalCurso(curso)
}

export async function downloadMisCursos(uid){
  return getMisCursos(uid).then(cursos => {
      console.log('MIS CURSOS', cursos);
      return setCursos(cursos)
  })
}

export async function downloadMisTemas(uid){
  return getMisTemas(uid).then(temas => {
      let temas_listos = []
      temas.forEach(temasUnidos => {
          temasUnidos.forEach(temas_separados => {
              temas_listos.push(temas_separados)
          })
      })
      return setTemas(temas_listos)
  })
}

export async function getAll(uid){
    return deleteDB().then(() => {
      auth().onAuthStateChanged(user => {
        setUser(user)
      })
      return getMisCursos(uid).then(cursos => {
          return setCursosWithTemas(cursos)
      })
      // let promiseGet = [ downloadMisCursos(uid), downloadMisTemas(uid) ]
      // return Promise.all(promiseGet)
    })
}


// "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
//   // something to do
// }
