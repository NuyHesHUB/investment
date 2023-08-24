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