// import something here
import Dexie from 'dexie';
import moment from 'moment'

const db = new Dexie('sully');
db.version(1).stores({
    cursos: `++id`,
    temas: `++id, fecha, curso.id`,
    user: `uid`
})
// db.open().catch(err => {
//     console.error(`Open failed: ${err.stack}`);
// });

export async function setCursoWithTemas(curso){
  return db.cursos.put(curso).then(id => {
    return setTemasFromCurso(curso)
  })
}

export async function setCursosWithTemas(cursos){
  let promises = []
  cursos.forEach(curso => {
    promises.push(setCursoWithTemas(curso))
  })
  return Promise.all(promises)
}

export async function setCurso(curso){
  return db.cursos.put(curso)
}

export async function setCursos(cursos){
  let promises = [ ]
  cursos.forEach(curso => {
    promises.push(setCurso(curso))
  });
  return Promise.all(promises)
}

export async function setTemasFromCurso(curso){
  let temas = []
  curso.temas.forEach(tema => {
    tema.curso = curso
    temas.push(tema)
  })
  return db.temas.bulkPut(temas)
}

export async function setTemas(curso){
  return db.temas.bulkPut(curso.temas)
}

export async function getCurso(id){
  return db.cursos.get({id})
}

export async function getCursos(){
  return db.cursos.toArray()
}

export async function getTemas(){
  return db.temas.toArray()
}

export async function getTemasOrdenados(){
  return db.temas.orderBy('fecha').toArray()
}

export async function getUser(){
  return db.user.toArray()
}

export async function searchCurso(id){
  return db.cursos.where({id}).first()
}

export async function setUser(usuario){
  if (usuario) {
    let u = {
      uid: usuario.uid,
      nombre: usuario.displayName,
      email: usuario.email
    }
    return db.user.put(u)
  }
}

export async function getTemasAgrupados(){
  let temas = await db.temas.orderBy('fecha').toArray()
  console.log('TEMAS', temas);
  
  return agruparTemas(temas)
}

function agruparTemas(temas){
  let temas_agrupados = {}
  temas.forEach(tema => {
    temas_agrupados[tema.fecha] = []
  })
  temas.forEach(tema => {
    temas_agrupados[tema.fecha].push(tema)
    // temas_agrupados[tema.fecha]
  })
  return temas_agrupados
}

export async function getTemasAgrupadosAtNow(){
  // let hoy = moment().format()
  let hoy = moment().format("YYYY-MM-DD")
  console.log('Hoy', hoy);
  
  return db.temas.where('fecha').aboveOrEqual(hoy).toArray().then(temas => {
    let ordenado = temas.sort((a, b) => {
      return a.fecha > b.fecha
    })
    console.log('ORDENADO', ordenado);
    return agruparTemas(ordenado)
  })
}

export async function deleteDB(){
  return db.delete().then( () => db.open() )
}

export async function deleteCursoWithTemas(id){
  return db.cursos.delete(id).then( () => {
    return db.temas.where({ 'curso.id': id }).delete()
  })
}

// export async function editMiCurso(){

// }

export default db;
// Import Dexie


// Open it
// 