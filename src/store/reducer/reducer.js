import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    user: null,
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                authenticated: true,
            }
            
        case actionTypes.LOG_OUT:
            return {
                ...state,
                authenticated: false,
            }
        default: return state;
    }
    
}

export default reducer;