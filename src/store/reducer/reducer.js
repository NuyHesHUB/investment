import * as actionTypes from '../actions/actionTypes';

const initialState = {
    /* authenticated: false, */
    /* userUid: '', */
    /* boardData: [], */
    /* postData: [], */
    adminUserData: [],
    adminBoardData: [],
    adminPostData: [],
    ongoingPostcardCount: 6,
    deadlinePostcardCount: '',
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
                deadlinePostcardCount: ''
            }
        /* case actionTypes.LOG_IN:
            return {
                ...state,
                authenticated: true,
                userUid: action.userUid,
            } */
            
        /* case actionTypes.LOG_OUT:
            return {
                ...state,
                authenticated: false,
                userUid: '',
            } */

        /* case actionTypes.SET_USER_UID:
            return {
                ...state,
                userUid: action.userUid, 
            }; */
        
        /* case actionTypes.SET_BOARD_DATA:
            return {
                ...state,
                boardData: action.boardData,
            }; */
        
        /* case actionTypes.SET_POST_DATA:
            return {
                ...state,
                postData: action.postData
            }; */
            
        /* case actionTypes.SET_CATEGORY_DATA:
            return {
                ...state,
                galleryListData: action.galleryListData
            }; */

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