import * as types from '../constants/ActionTypes';

const initialState = { 
    dailyupdate: [],
    helper: [],
    idselect: '',
    typeselect: ''
};
//const initialState = { route: initialRoute };
export default function dailyhelper(state = initialState, action) {
    switch (action.type) {
        case types.CHANGE_DAILY_UPDATE:
            return Object.assign({}, state, {
                dailyupdate: action.dailyupdate
            });
        case types.CHANGE_DAILY_HELPER:
            return Object.assign({}, state, {
                helper: action.helper
            });
        case types.CHANGE_DAILY_CARD_SELECT:
            return Object.assign({}, state, {
                idselect: action.cardselect.idselect,
                typeselect: action.cardselect.typeselect
            });
        case types.CHANGE_DELETECARD_CARD_SUCCESS:
            let { dailyupdate, helper } = state;
            let arrayDailyNew = [];
            let helperNew = [];
            dailyupdate.map(item => {
                if(item.id != action.idcarddelete) {
                    arrayDailyNew.push(item);
                }
            });
            helper.map(item => {
                if(item.id != action.idcarddelete) {
                    helperNew.push(item);
                }
            });
            return Object.assign({}, state, {
                dailyupdate: arrayDailyNew,
                helper: helperNew
            });
        default:
            return state;
    }
}