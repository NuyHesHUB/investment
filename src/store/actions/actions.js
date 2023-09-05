import * as actionTypes from './actionTypes';

/* Login */
export function login(userUid){
    return {
        type: actionTypes.LOG_IN,
        userUid: userUid
    }   
};

/* Logout */  
export function logout(){
    return {
        type: actionTypes.LOG_OUT
    }
};

export const setUserUid = (userUid) => {
    return {
      type: actionTypes.SET_USER_UID,
      userUid: userUid,
    };
};

export const setBoardData = (boardData) => {
    return {
        type: actionTypes.SET_BOARD_DATA,
        boardData: boardData,
    };
};

export const setPostData = (postData) => ({
    type: actionTypes.SET_POST_DATA,
    postData: postData,
  });



export const setAdminUserData = (adminUserData) => ({
    type: actionTypes.ADMIN_USER_DATA,
    adminUserData: adminUserData
})

export const setAdminPostData = (adminPostData) => ({
    type: actionTypes.ADMIN_POST_DATA,
    adminPostData: adminPostData
})