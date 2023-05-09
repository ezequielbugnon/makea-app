const loginReduder = (state, action) => {
    switch(action.type){
        case 'AUTHENTICATED':
            return{
                ...state,
                token: action.payload 
            }
        case 'ERROR':
            return{
                ...state,
                token: null,
            }
        case 'ORDERS':
            return{
                ...state,
                orders: action.payload
            }
        case 'LOADING':
            return{
                ...state,
                loading: action.payload
            }
        default:
            return state;
    }
}

export default loginReduder;