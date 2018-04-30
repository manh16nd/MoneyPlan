import * as types from '../constants/ActionTypes';

const initialRoute = { 
    tab: 'mangager',
    chidltab: 'dailyhelper', 
};
const initialState = { route: initialRoute };

export default function navigator(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_PATH:
            return Object.assign({}, state, {
                route: action.route
            });
        default:
            return state;
    }
}