import * as actionTypes from '../actions/actionTypes';

const initialState = {
    notes: [],
    activeNote: null,
    isActive: false
}

const reducer = (state = initialState, action) => {
    switch(action.type) {
        case actionTypes.ADD_NOTE:
            return {
                ...state,
                notes: state.notes.concat(action.note),
                isActive: false
            }

        case actionTypes.SET_ACTIVE_NOTE: 
            return {
                ...state,
                activeNote: action.note,
                isActive: true
            }
        
        case actionTypes.SET_UNACTIVE: 
            return {
                ...state, 
                isActive: false
            }
        default: 
            return state;
    }
}

export default reducer;