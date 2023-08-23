import * as actionTypes from './actionTypes';

/* Login */
export function login(user){
    return {
        type: actionTypes.LOG_IN,
        payload: user
    }
};

/* Logout */  
export function logout(){
    return {
        type: actionTypes.LOG_OUT
    }
};