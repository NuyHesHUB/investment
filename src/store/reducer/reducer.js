import * as actionTypes from '../actions/actionTypes';

const initialState = {
    adminUserData: [],
    adminBoardData: [],
    adminPostData: [],

    ongoingViewRows: 6,
    ongoingTotalRows: null,
    ongoingPostData: [],
    ongoingMoreBtn: true,

    deadlineViewRows: 6,
    deadlineTotalRows: null,
    deadlinePostData: [],
    deadlineMoreBtn: true,

}

const reducer = (state = initialState, action) => {
    switch (action.type) {

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
        
        case actionTypes.ONGOING_VIEW_ROWS:
            return {
                ...state,
                ongoingViewRows: action.payload
            }
        
        case actionTypes.ONGOING_TOTAL_ROWS:
            return {
                ...state,
                ongoingTotalRows: action.payload
            }

        case actionTypes.ONGOING_POST_DATA:
            return {
                ...state,
                ongoingPostData: action.payload
            }

        case actionTypes.ONGOING_MORE_BTN:
            return {
                ...state,
                ongoingMoreBtn: action.payload
            }

        case actionTypes.DEADLINE_VIEW_ROWS:
            return {
                ...state,
                deadlineViewRows: action.payload
            }

        case actionTypes.DEADLINE_TOTAL_ROWS:
            return {
                ...state,
                deadlineTotalRows: action.payload
            }

        case actionTypes.DEADLINE_POST_DATA:
            return {
                ...state,
                deadlinePostData: action.payload
            }
        
        case actionTypes.DEADLINE_MORE_BTN:
            return {
                ...state,
                deadlineMoreBtn: action.payload
            }
            
        default: return state;
    }
    
}

export default reducer;