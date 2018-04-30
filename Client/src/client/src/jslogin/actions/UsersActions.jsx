import * as types from '../constants/ActionTypes';
import { navigateTo, changePathTab }  from './NavigatorActions';
import Config from '../constants/Config';
import { Link, browserHistory } from 'react-router'
import cookie from 'react-cookies';

function changeInfoUser(users) {
    console.log(users);
    return {
        type: types.CHANGE_INFO_USER,
        users
    }
}

export function logOut() {
    return dispatch => {
        cookie.remove('session-token');
        cookie.remove('session-token', { path: '/' });
        let query = {
            tab: '',
            childtab: ''
        }
        dispatch(changePathTab(query))
        browserHistory.push('/login');
    };
}


/**
 * login with email, password
 */
export function loginWithEmail(p_email, p_password) {
    return fetch(Config.API_LOGIN, {
        method: "post",
        headers: {
            'cache-control': 'no-cache',
            'Accept': 'application/json',
            'Content-Type': 'application/json'
        },
        //make sure to serialize your JSON body
        body: JSON.stringify({
            username: p_email,
            password: p_password
        })
    });
}
