import * as types from '../constants/ActionTypes';
import Config from '../constants/Config';
import cookie from 'react-cookies';
import swal from 'sweetalert'

export function showAppError(err) {
    return swal('error', err, 'error');
}

export function showAppSuccess(text) {
   return swal('success', text, 'success');
}


export function initDefaultRoute1(routedefault) {
    return {
        type: types.ROUTE_DEFAULT,
        routedefault
    };
}

/**
 * method fire event change helper in store
 * @param {*} helperlist 
 */
export function changeStoreHelper(helperlist) {
    return {
        type: types.CHANGE_DAILY_HELPER,
        helper: helperlist
    };
}

/**
 * method update card select in store
 */
export function changeStoreCardSelect(cardselect) {
    return {
        type: types.CHANGE_DAILY_CARD_SELECT,
        cardselect
    };
}

/**
 * update store card delete
 * @param {*} idcarddelete 
 */
export function changeStoreCard(idcarddelete) {
    return {
        type: types.CHANGE_DELETECARD_CARD_SUCCESS,
        idcarddelete
    };
}

/**
 * Metho fire vent update list card type = daily_update in store
 * @param {*} dailyupdate 
 */
export function changeStoreDaily(dailyupdate) {
    return {
        type: types.CHANGE_DAILY_UPDATE,
        dailyupdate
    };
}

export function initDefaultRoute(p_router) {
    return dispatch => {
        dispatch(initDefaultRoute1(p_router));
    };
}

/**
 * change dailylist
 * @param {*} dailylist 
 */
export function changeDailyList(dailylist) {
    return dispatch => {
       return dispatch(changeStoreDaily(dailylist));
    };
}

/**
 * change helper list
 * @param {*} helperlist 
 */
export function changeHelperList(helperlist) {
    return dispatch => {
        return dispatch(changeStoreHelper(helperlist));
     };
}

/**
 * change card Select
 * @param {*} helperlist 
 */
export function changeCardSelect(cardselect) {
    return dispatch => {
        return dispatch(changeStoreCardSelect(cardselect));
     };
}

/**
 * deletecard success
 * @param {*} idcard 
 */
export function deleteCardSuccess(idcard) {
    return dispatch => {
        return dispatch(changeStoreCard(idcard));
    };
}



/**
 * delete article
 */
export function deleteArticle(idcard, idarticle) {
    return RequestApi(Config.API_CARD + '/' + idcard + '/article' , "DELETE", {id: idarticle});
}

/**
 * add article
 */
export function saveArticle(idcard, article) {
    return RequestApi(Config.API_CARD + '/' + idcard + '/article' , "PUT", article);
}

/**
 * save card
 */
export function saveCard(cardselect) {
  return RequestApi(Config.API_CARD , "PUT", cardselect);
}

/**
 * delete card
 */
export function deleteCard(idcard) {
    return RequestApi(Config.API_CARD + '/' + idcard, "DELETE", null);
}

/**
 * add new card
 * @param {*} idcard 
 */
export function addCard(cardselect) {
    return RequestApi(Config.API_CARD, "POST", cardselect);
}


/**
 * add new card
 * @param {*} idcard 
 */
export function getArticleUri(p_uri) {
    return RequestApi(Config.API_CARD + "/article/parse?uri=" + p_uri, "GET", null);
}

export function addBook(bookselect) {
    return RequestApi(Config.API_BOOK, "POST", bookselect);
}

export function saveBook(bookselect) {
    return RequestApi(Config.API_BOOK, "PUT", bookselect);
}


export function deleteBook(idbook) {
    return RequestApi(Config.API_BOOK + '/' + idbook, "DELETE", null);
}

export function RequestApi(url, method, data) {
    let token = cookie.load('session-token');
    if(data) {
        return fetch(url, {
            method: method,
            headers: {
                'cache-control': 'no-cache',
                'Content-Type': 'application/json',
		'Accept': 'application/json',
                'Authorization': 'Bearer ' + token
            },
            body: JSON.stringify(data)
        }); 
    } else {
        return fetch(url, {
            method: method,
            headers: {
                'cache-control': 'no-cache',
		'Accept': 'application/json',
                'Content-Type': 'application/json',
                'Authorization': 'Bearer ' + token
            }
        }); 
    }
}
