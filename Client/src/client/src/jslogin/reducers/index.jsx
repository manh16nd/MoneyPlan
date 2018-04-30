import { combineReducers } from 'redux';
import {routerReducer as routing} from 'react-router-redux';
import users from './users';
import navigator from './navigator';
import dailyhelper from './dailyhelper';

export default combineReducers({
	users,
	navigator,
	routing,
	dailyhelper
});