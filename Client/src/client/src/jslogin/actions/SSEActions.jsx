import * as types from '../constants/ActionTypes';
import Config from '../constants/Config';
import cookie from 'react-cookies';
import EventSource from 'eventsource'

/**
 * method Register SSE with server
 * @param {*} url 
 */
export function RegisterSSE(url) {
    let token = cookie.load('session-token');
    var eventSourceInitDict = { 
        headers: {
            'cache-control': 'no-cache',
            'Content-Type': 'application/json',
            'Accept': 'application/json',
            'Authorization': 'Bearer ' + token
        }
    };
    return new EventSource(url, eventSourceInitDict); 
}