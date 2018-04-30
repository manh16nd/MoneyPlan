import * as types from '../constants/ActionTypes';
import { constructUrl, parseUrl } from '../utils/RouteUtils';
import { initDefaultRoute } from './AppsActions';

export function changePath(route) {
    return {
        type: types.CHANGE_PATH,
        route: route
    };
}

export function changePathTab({tab, childtab}) {
    return dispatch => {
        return dispatch(changePath({tab, childtab}));
    };
}

export function navigateTo(route, shouldPushState = true) {
  return (dispatch, getState) => {
    const { navigator } = getState();
    if (constructUrl(route) === constructUrl(navigator.route)) {
        return null;
    }
    if (shouldPushState) {
        pushState(route);
    }
    return dispatch(changePath(route));
  };
}

export function initNavigator() {
  return dispatch => {
    if (window.location.hash !== '') {
        dispatch(initDefaultRoute(parseUrl(window.location.hash)));
    }
  };
}

function pushState(route) {
    history.pushState({ route }, '', `#/${constructUrl(route)}`);
}