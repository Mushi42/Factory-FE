import React, { Component } from 'react';
import { Link, Redirect } from 'react-router-dom';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { findSingleCustomer, updateCustomer } from '../Service/customersService'

export default class EditPage extends Component {

    constructor(props) {
        super(props);
        this.url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
        this.token = localStorage.getItem('token');
    }

    state = {
        id: '',
        redirect: false,
        isLoading: false
    };

    async componentDidMount() {
        console.log(this.props.location)
        let id = this.props.location.search;
        id = id.toString().substring(4)

        console.log('id', id)
        let response = await findSingleCustomer(id)
        document.getElementById('inputName').value = response.name;
        document.getElementById('inputPhone').value = response.phone;
        document.getElementById('inputEmail').value = response.email;
        document.getElementById('inputLoca').value = response.location;
        document.getElementById('inputEmpId').value = response.empId;
        document.getElementById('inputComp').value = response.factory;
    }

    handleSubmit = async event => {
        event.preventDefault();
        this.setState({ isLoading: true });
        let obj = {};
        obj.name = document.getElementById('inputName').value;
        obj.phone = document.getElementById('inputPhone').value;
        obj.email = document.getElementById('inputEmail').value;
        obj.location = document.getElementById('inputLoca').value;
        obj.empId = document.getElementById('inputEmpId').value;
        obj.factory = document.getElementById('inputComp').value;

        let id = this.props.location.search;
        id = id.toString().substring(4)

        let response = await updateCustomer(id, obj)
        if (response) {
            this.props.history.push('/customers')
        } else {
            alert('There is an Error while updating customer')
        }
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Edit</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">User Edit</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputName" className="form-control" placeholder="Enter name" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="inputName">Enter name</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputPhone" className="form-control" placeholder="Enter Phone" required="required" />
                                                        <label htmlFor="inputPhone">Enter Phone</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="email" id="inputEmail" className="form-control" placeholder="Email address" required="required" />
                                                        <label htmlFor="inputEmail">Email address</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputComp" className="form-control" placeholder="Enter Company" required="required" />
                                                        <label htmlFor="inputComp">Enter Factory</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputEmpId" className="form-control" placeholder="Enter Emp ID" required="required" />
                                                        <label htmlFor="inputEmpId">Enter Emp ID</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputLoca" className="form-control" placeholder="Enter Location" required="required" />
                                                        <label htmlFor="inputLoca">Enter Location</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Employee &nbsp;&nbsp;&nbsp;
                                            {isLoading ? (
                                                <span className="spinner-border spinner-border-sm" role="status" aria-hidden="true"></span>
                                            ) : (
                                                <span></span>
                                            )}
                                        </button>
                                    </form>
                                    {this.renderRedirect()}
                                </div>
                            </div>
                        </div>

                        <footer className="sticky-footer">
                            <div className="container my-auto">
                                <div className="copyright text-center my-auto">
                                    <span>Copyright © Your Website 2019</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}


