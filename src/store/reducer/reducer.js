import * as actionTypes from '../actions/actionTypes';

const initialState = {
    adminUserData: [],
    adminBoardData: [],
    adminPostData: [],
    ongoingPostcardCount: null,
    deadlinePostcardCount: 6,
    ongoingPostData: [],
    deadlinePostData: [],
}

const reducer = (state = initialState, action) => {
    switch (action.type) {

        case actionTypes.ONGOING_POSTCARD:
            return {
                ...state,
                ongoingPostcardCount: action.payload
            }
            
        case actionTypes.DEADLINE_POSTCARD:
            return {
                ...state,
                deadlinePostcardCount: action.payload
            }
        
        case actionTypes.ONGOING_POST_DATA:
            return {
                ...state,
                ongoingPostData: action.payload
            };
        
        case actionTypes.DEADLINE_POST_DATA:
            return {
                ...state,
                deadlinePostData: action.payload
            };
            
        case actionTypes.ADMIN_USER_DATA:
            return {
                ...state,
                adminUserData: action.adminUserData
            };
        
        case actionTypes.ADMIN_BOARD_DATA:
            return {
                ...state,
                adminBoardData: action.adminBoardData
            }
        
        case actionTypes.ADMIN_POST_DATA:
            return {
                ...state,
                adminPostData: action.adminPostData
            }
            
        default: return state;
    }
    
}

export default reducer;