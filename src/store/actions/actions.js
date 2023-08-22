import * as actionTypes from './actionTypes';

/* Login */
export function login(){
    return {
        type: actionTypes.LOG_IN
    }
};

/* Logout */  
export function logout(){
    return {
        type: actionTypes.LOG_OUT
    }
};