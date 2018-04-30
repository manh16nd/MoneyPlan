import React, { Component, PropTypes } from 'react';
import { connect } from 'react-redux';
import { Link, browserHistory } from 'react-router'
import { instanceOf } from 'prop-types';
import { autobind } from 'core-decorators';
import { navigateTo, changePathTab } from '../../actions/NavigatorActions';
import { loginWithEmail } from '../../actions/UsersActions';
import cookie from 'react-cookies';

const propTypes = {
    dispatch: PropTypes.func.isRequired
}

class Login extends Component {
    constructor(props) {
        super(props);
        this.state = {
            email: "",
            password: "",
            error: "",
            enable: true
        };
    }

    componentDidMount() {
        // let self = this;
        // let token = cookie.load('session-token');
        // if (token) {
        // }
    }

    onChangeEmail(e) {
        this.setState({ email: e.target.value });
    }

    onChangePassword(e) {
        this.setState({ password: e.target.value });
    }

    onLogIn(e) {
        let self = this;
        e.preventDefault();
        let { email, password } = this.state;
        this.setState({ enable: false });
        if (!email) {
            this.setState({ error: 'Email is requried!', enable: true });
            return;
        }
        if (!password) {
            this.setState({ error: 'Password is requried!', enable: true });
            return;
        }

        loginWithEmail(email.trim(), password.trim())
            .then(response => {
                if (response.status != 200) {
                    return {
                        status: 400
                    }
                }
                return response.json()
            })
            .then(result => {
                if (result.status == 400) {
                    self.setState({ error: 'wrong username or wrong password', enable: true });
                } else {
                    cookie.save('session-token', result.token);
                    let { dispatch } = self.props;
                    let query = {
                        tab: 'manager',
                        childtab: 'dailyhelper'
                    }
                    dispatch(changePathTab(query));
                    browserHistory.push('/dashboard?tab=' + query.tab + '&childtab=' + query.childtab);
                }
            }).catch(error => {
                self.setState({ error: error, enable: true });
            });
    }

    render() {
        let { error, enable } = this.state;
        return (
            <div className="login-box">
                <div className="login-box-body" style={{ background: 'white' }}>    
                    <form action="#">
                        <div className="login-logo">
                            <a href="#"><b>Admin</b></a>
                        </div>
                        <div className="form-group has-feedback">
                            <input className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail.bind(this)} />
                            <span className="glyphicon glyphicon-envelope form-control-feedback"></span>
                        </div>
                        <div className="form-group has-feedback">
                            <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChangePassword.bind(this)} />
                            <span className="glyphicon glyphicon-lock form-control-feedback"></span>
                        </div>
                        <p className="login-box-msg" style={{ color: 'red' }}>{error}</p>
                        <div className="row">
                            <div className="col-xs-8">
                            </div>
                            <div className="col-xs-4">
                                <button className="btn btn-primary btn-block btn-flat" disabled={!enable} onClick={this.onLogIn.bind(this)} >Login</button>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        )
        // return (
        //     <div>
        //         <form action="#">
        //             <div className="panel panel-body login-form">
        //                 <div className="text-center">
        //                     <div className="icon-object border-slate-300 text-slate-300"><i className="icon-reading"></i></div>
        //                     <h5 className="content-group">LOGIN ADMIN</h5>
        //                 </div>
        //                 <div className="form-group has-feedback has-feedback-left">
        //                     <input type="text" className="form-control" placeholder="Email" value={this.state.email} onChange={this.onChangeEmail.bind(this)} />
        //                     <div className="form-control-feedback">
        //                         <i className="icon-envelop4 text-muted"></i>
        //                     </div>
        //                 </div>
        //                 <div className="form-group has-feedback has-feedback-left">
        //                     <input type="password" className="form-control" placeholder="Password" value={this.state.password} onChange={this.onChangePassword.bind(this)} />
        //                     <div className="form-control-feedback">
        //                         <i className="icon-lock2 text-muted"></i>
        //                     </div>
        //                 </div>
        //                 {error ? (
        //                     <div className="form-group has-error has-feedback">
        //                         <span className="help-block">{error}</span>
        //                     </div>
        //                 ) : ''}
        //                 <div className="form-group">
        //                     <button type="submit" className="btn btn-primary btn-block" disabled={!enable} onClick={this.onLogIn.bind(this)}>LOGIN <i className="icon-arrow-right14 position-right"></i></button>
        //                 </div>
        //             </div>
        //         </form>

        //     </div>
        // )
    }
}

Login.propTypes = propTypes;
function mapStateToProps(state) {
    return {
    };
}
export default connect(mapStateToProps)(Login);

