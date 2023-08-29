import * as actionTypes from '../actions/actionTypes';

const initialState = {
    authenticated: false,
    userUid: '',
    boardData: [],
    postData: [],
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
        
        case actionTypes.SET_BOARD_DATA: // 새로운 액션 추가
            return {
                ...state,
                boardData: action.boardData, // boardData 상태 업데이트
            };
        
        case actionTypes.SET_POST_DATA:
            return {
                ...state,
                postData: action.postData
            };
        default: return state;
    }
    
}

export default reducer;