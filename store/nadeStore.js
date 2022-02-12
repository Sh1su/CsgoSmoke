export const state = () => ({
    nades: [{"type":"smoke","map":"Dust2","pos":[48.063380281690144 ,40.49295774647887]}],
    

})

export const getters = {
    
}

export const actions = {
    addNade({ commit }, obj){
        commit("SET_NADE", obj);
    }
}

export const mutations = {
    SET_NADE(state, payload){
        state.nades.push(payload);
    }
}