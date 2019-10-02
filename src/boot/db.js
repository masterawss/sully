import {auth} from 'firebase'
import {getMisCursos, getMisTemas, setCurso, setCursoToMisCursos, deleteMiCurso, editMiCurso as editCursoOnline} from './firebase'
import {
  setCursosWithTemas as setLocalCursosWithTemas, 
  searchCurso as searchLocalCurso, 
  setTemas, 
  deleteDB,
  setUser, 
  setCursoWithTemas as setLocalCursoWithTemas,
  deleteCursoWithTemas,
  // editMiCurso as editCursoLocal
} from './dexie'

var exports = {
  createCurso: async function (curso, save_mis_cursos) {
    let curso_creado = await setCurso(curso)
    if (save_mis_cursos) {
      await setCursoToMisCursos(curso_creado)
      return setLocalCursoWithTemas(curso_creado)
    }
    return curso_creado
  },
  downloadCurso: async function  (curso){
    await setCursoToMisCursos(curso)
    await setLocalCursoWithTemas(curso)
    return curso
  },
  deleteFromMiCurso: async function (id) {
    await deleteMiCurso(id)
    await deleteCursoWithTemas(id)
    return id
  },
  deleteCurso: async function (curso) {
    await deleteCurso(curso)
    await deleteCursoWithTemas(curso)
    return curso
  },
  searchCurso: async function (curso) {
    return await searchLocalCurso(curso)
  },
  downloadMisCursos: async function (uid){
    return getMisCursos(uid).then(cursos => {
        console.log('MIS CURSOS', cursos);
        return setCursos(cursos)
    })
  },
  editMiCurso: async function(curso){
    // console.log('CURSO', curso);
    
    await editCursoOnline(curso)
    // await editCursoLocal(curso)
    return curso
  },
  downloadMisTemas: async function (uid){
    return getMisTemas(uid).then(temas => {
        let temas_listos = []
        temas.forEach(temasUnidos => {
            temasUnidos.forEach(temas_separados => {
                temas_listos.push(temas_separados)
            })
        })
        return setTemas(temas_listos)
    })
  },
  getAll: async function (uid){
    return deleteDB().then(() => {
      auth().onAuthStateChanged(user => {
        setUser(user)
      })
      return getMisCursos(uid).then(cursos => {
        return setLocalCursosWithTemas(cursos)
      })
    })
  }
}

export default async function ({Vue}) {
  Vue.prototype.$db = exports
}


// "async" is optional
// export default async ({ /* app, router, Vue, ... */ }) => {
//   // something to do
// }
