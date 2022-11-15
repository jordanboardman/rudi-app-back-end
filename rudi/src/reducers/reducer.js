const reducer = (state, action) => {
    if (state === undefined){
        state = {
            something: ''
        }
    }

    switch(action.type){
        default: return state
    }
}

export default reducer