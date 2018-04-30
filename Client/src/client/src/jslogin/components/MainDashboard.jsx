import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';

class MainDashboard extends Component {
    render() {
        var {children} = this.props;
        return (
            <div>
                {children}
            </div>
        )
    }
}

export default MainDashboard;