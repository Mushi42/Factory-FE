import React, { Component } from 'react';
import axios from 'axios';
import { Redirect } from 'react-router-dom';
import TitleComponent from "./title";

export default class Login extends Component {

    state = {
        email: '',
        password: '',
        redirect: false,
        authError: false,
        isLoading: false,
        location: {},
    };


    handleEmailChange = event => {
        this.setState({ email: event.target.value });
    };
    handlePwdChange = event => {
        this.setState({ password: event.target.value });
    };

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        const url = 'http://34.134.95.38:7000/api/v1/admin/login';
        const email = this.state.email;
        const password = this.state.password;
        console.log("The credentaiks", email, password)
        let body = {
            username: email,
            password: password
        }
        axios.post(url, body)
            .then(async result => {
                console.log(result.data.data.token)
                if (result.data.data.status) {
                    await localStorage.setItem('token', result.data.data.token);
                    this.setState({ redirect: true, isLoading: false });
                    await localStorage.setItem('isLoggedIn', true);
                    // alert('Everything is done..')
                }
            })
            .catch(error => {
                console.log(error);
                this.setState({ authError: true, isLoading: false });
            });
    };

    // componentDidMount() {
    //     const url = 'https://freegeoip.app/json/';
    //     axios.get(url)
    //         .then(response => {
    //             const location = response.data;
    //             this.setState({ location });
    //         })
    //         .catch(error => {
    //             this.setState({ toDashboard: true });
    //             console.log(error);
    //         });
    // }

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        return (
            <div className="container">
                <TitleComponent title="Factory Grid Login "></TitleComponent>
                <div className="card card-login mx-auto mt-5">
                    <div className="card-header">Login</div>

                    <div className="card-body">
                        <form onSubmit={this.handleSubmit}>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputEmail" placeholder="Email address" type="text" name="email" onChange={this.handleEmailChange} autoFocus required />
                                    <label htmlFor="inputEmail">Email address</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Email.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="form-label-group">
                                    <input type="password" className={"form-control " + (this.state.authError ? 'is-invalid' : '')} id="inputPassword" placeholder="******" name="password" onChange={this.handlePwdChange} required />
                                    <label htmlFor="inputPassword">Password</label>
                                    <div className="invalid-feedback">
                                        Please provide a valid Password.
                                    </div>
                                </div>
                            </div>
                            <div className="form-group">
                                <div className="checkbox">
                                    <label>
                                        <input type="checkbox" value="remember-me" />Remember Password
                                    </label>
                                </div>
                            </div>
                            <div className="form-group">
                                <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Login &nbsp;&nbsp;&nbsp;
                                    {isLoading ? (
                                        <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                    ) : (
                                        <span></span>
                                    )}
                                </button>
                            </div>
                            {/* <div className="form-group">
                                <div className="form-group">
                                    <b>email:</b> gowthaman.nkl1@gmail.com
                                </div>
                                <div className="form-group">
                                    <b>password :</b> password
                                </div>
                            </div> */}
                        </form>
                        <div className="text-center">
                            {/* <Link className="d-block small mt-3" to={'register'}>Register an Account</Link> */}
                            {/*<a className="d-block small" href="forgot-password.html">Forgot Password?</a>*/}
                        </div>
                    </div>
                </div>
                {this.renderRedirect()}
            </div>
        );
    }
}


