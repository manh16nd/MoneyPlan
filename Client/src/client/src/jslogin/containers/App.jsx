import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import  Login from '../components/Login';

const propTypes = {
  dispatch: PropTypes.func.isRequired,
  route: PropTypes.object.isRequired
};

class App extends Component {
    render() {
        return( 
            <Login /> 
        );
    }
}

App.propTypes = propTypes;
function mapStateToProps(state) {
	const { navigator, users } = state;
	const { route } = navigator;
    const { logined } = users;
	return {
		route,
        logined
	};
}
export default connect(mapStateToProps)(App);