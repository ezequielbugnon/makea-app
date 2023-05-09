const CatalogueReduder = (state , action) => {
    switch(action.type){
        case 'CHARGE':
            return{
                ...state,
                data: action.payload 
            }
        case 'ERROR':
            return{
                ...state,
                data: null,
                filter: null,
            }
        case 'FILTER':
                return{
                    ...state,
                    filter: action.payload,
                }
        default:
            return state;
    }
}

export default CatalogueReduder;