import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    userUid: '',
}

const reducer = (state = initialState, action) => {
    switch (action.type) {
        case actionTypes.LOG_IN:
            return {
                ...state,
                authenticated: true,
                userUid: action.userUid,
            }
            
        case actionTypes.LOG_OUT:
            return {
                ...state,
                authenticated: false,
                userUid: '',
            }

        case actionTypes.SET_USER_UID:
            return {
                ...state,
                userUid: action.userUid, // userUid 상태 업데이트
            };

        default: return state;
    }
    
}

export default reducer;