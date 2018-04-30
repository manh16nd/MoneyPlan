import React from 'react';
import {Route, IndexRedirect, Redirect} from 'react-router';
import Login from './components/Login';
import MainDashboard from './components/MainDashboard';
import Dashboard from './components/Dashboard';

export default function createRoutes() {
  return (
    <Route component={MainDashboard}>
    	<IndexRedirect to="login" />
    	<Route path="dashboard" component={Dashboard}/>
    	<Route path="login" component={Login}/>
    	<Redirect from="*" to="login" />
    </Route>
  )
}