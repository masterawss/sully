
export function CREATE_CURSO (context, curso) {
    
    let c = context.commit('SET_CURSO', curso)
    console.log('CONTEXT', c);
}
