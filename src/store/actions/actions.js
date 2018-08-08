import * as actionTypes from './actionTypes';

export const addNote = note => {
    return{
        type: actionTypes.ADD_NOTE,
        note
    }
}

export const setActiveNote = note => {
    return {
        type: actionTypes.SET_ACTIVE_NOTE,
        note
    }
}

export const setUnactive = () => {
    return {
        type: actionTypes.SET_UNACTIVE
    }
}