import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { changeAppId, changeTab, changePathTab } from '../../actions';
import { browserHistory } from 'react-router';

const propTypes = {
    dispatch: PropTypes.func.isRequired,
    users: PropTypes.object.isRequired
}

class NavigationMenu extends Component {
    constructor(props) {
        super(props);
        this.state = {
            menuactive: []
        };
    }
    componentDidMount() {
    }

    /**
     *  phuong thuc don su thay doi option
     */
    handleToolChange(e) {

    }

    /**
     * Method click tab menu
    */
    onClickMenu(p_query, e) {
        let { dispatch } = this.props;
        dispatch(changePathTab(p_query));
        browserHistory.push('/dashboard?tab=' + p_query.tab + '&childtab=' + p_query.childtab);
    }

    renderMenu() {
        const { route, users } = this.props;
        if (users.type == 3) {
            return null;
        }
        return (
            <li className={`${route.tab == 'manager' ? 'treeview active' : 'treeview'}`} style={{ cursor: 'pointer' }}>
                <a href="javascript:void(0)">
                    <i className="fa fa-users"></i>
                    <span > Admin </span>
                    <i className="fa fa-angle-left pull-right"></i>
                </a>
                <ul className="treeview-menu menu-open">
                    {this.renderDailyHelper()}
                    {this.renderBook()}
                </ul>
            </li>
        )
    }

    /**
     * render book
     */
    renderBook() {
        const { route } = this.props;
        return (
            <li className={`${route.childtab == 'book' ? 'active' : ''}`}
                onClick={this.onClickMenu.bind(this, { tab: 'manager', childtab: 'book' })}>
                <a href="javascript:void(0)"><i></i> Books </a>
            </li>
        )
    }

    /*
    * get list Helper
    */
    renderDailyHelper() {
        const { route } = this.props;
        return (
            <li className={`${route.childtab == 'dailyhelper' ? 'active' : ''}`}
                onClick={this.onClickMenu.bind(this, { tab: 'manager', childtab: 'dailyhelper' })}>
                <a href="javascript:void(0)"><i></i> Daily Update and Helper </a>
            </li>
        )
    }

    /**
     * render menu
     */
    renderTreeMenu() {
        const { route } = this.props;
        return (
            <ul className="sidebar-menu">
                <li className="header">MENU</li>
                {this.renderMenu()}
            </ul>
        )
    }

    /**
     * render main chính
     */
    render() {
        const { users, permissions } = this.props;
        return (

            <nav className="navbar navbar-expand-lg navbar-light fixed-top" id="mainNav">
                <div className="container">
                    <a className="navbar-brand js-scroll-trigger" href="#page-top">Start Bootstrap</a>
                    <button className="navbar-toggler navbar-toggler-right" type="button" data-toggle="collapse" data-target="#navbarResponsive" aria-controls="navbarResponsive" aria-expanded="false" aria-label="Toggle navigation">
                        Menu
                    <i className="fa fa-bars"></i>
                    </button>
                    <div className="collapse navbar-collapse" id="navbarResponsive">
                        <ul className="navbar-nav ml-auto">
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#download">Download</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#features">Features</a>
                            </li>
                            <li className="nav-item">
                                <a className="nav-link js-scroll-trigger" href="#contact">Contact</a>
                            </li>
                        </ul>
                    </div>
                </div>
            </nav>
        )
    }
}
NavigationMenu.propTypes = propTypes;
function mapStateToProps(state) {
    const { users, navigator } = state;
    const { route } = navigator;
    return {
        users,
        route
    };
}
export default connect(mapStateToProps)(NavigationMenu);

