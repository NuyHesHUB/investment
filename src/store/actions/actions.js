import * as actionTypes from './actionTypes';

/* Login */
/* export function login(userUid){
    return {
        type: actionTypes.LOG_IN,
        userUid: userUid
    }   
}; */

/* Logout */  
/* export function logout(){
    return {
        type: actionTypes.LOG_OUT
    }
}; */

/* export const setUserUid = (userUid) => {
    return {
      type: actionTypes.SET_USER_UID,
      userUid: userUid,
    };
}; */

/* export const setBoardData = (boardData) => {
    return {
        type: actionTypes.SET_BOARD_DATA,
        boardData: boardData,
    };
}; */

/* export const setPostData = (postData) => ({
    type: actionTypes.SET_POST_DATA,
    postData: postData,
  }); */

/* export const setGalleryCategoryData = (galleryListData) => ({
    type: actionTypes.SET_CATEGORY_DATA,
    galleryListData: galleryListData,
}) */


/* Admin Data */

export const setAdminUserData = (adminUserData) => ({
    type: actionTypes.ADMIN_USER_DATA,
    adminUserData: adminUserData
})

export const setAdminBoardData = (adminBoardData) => ({
    type: actionTypes.ADMIN_BOARD_DATA,
    adminBoardData: adminBoardData
})

export const setAdminPostData = (adminPostData) => ({
    type: actionTypes.ADMIN_POST_DATA,
    adminPostData: adminPostData
})

/* PostCard */

export const setOngoingPostCardCount = (num) => ({
    type: actionTypes.ONGOING_POSTCARD,
    payload: num,
})

export const setDeadlinePostCardCount = (num) => ({
    type: actionTypes.DEADLINE_POSTCARD,
    payload: num,
})

/* Ongoing Post Data */

export const setOngoingPostData = (ongoingPostData) => ({
    type: actionTypes.ONGOING_POST_DATA,
    payload: ongoingPostData
})

export const setDeadlinePostData = (deadlinePostData) => ({
    type: actionTypes.DEADLINE_POST_DATA,
    payload: deadlinePostData
})

export const setUserNameData = (userNameData) => ({
    type: actionTypes.USER_NAME_DATA,
    userNameData: userNameData
})