import * as types from '../constants/ActionTypes';

const initialState = {
    name:'',
    type:'',
    username: ''
}

export default function users(state = initialState, action) {
    switch (action.type) {
        case 'CHANGE_INFO_USER':
    	    return Object.assign({}, state, action.users);
        case 'CHANGE_INFO_USER_EDIT': 
            return {
                ...state,
                useredit: action.data
            }
        default:
            return state;
    }
}