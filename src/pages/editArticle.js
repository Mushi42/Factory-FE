import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";

import "react-datepicker/dist/react-datepicker.css";

export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false,
        color: 1,
        startDate: new Date()
    };

    handleSubmit = event => {
        // event.preventDefault();
        // this.setState({ isLoading: true });
        // const token = localStorage.getItem('token');
        // const url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
        // const name = document.getElementById('inputName').value;
        // const phone = document.getElementById('inputPhone').value;
        // const email = document.getElementById('inputEmail').value;
        // const location = document.getElementById('inputLoca').value;
        // const empid = document.getElementById('inputEmpId').value;
        // const company = document.getElementById('inputComp').value;

        // let bodyFormData = new FormData();
        // bodyFormData.set('name', name);
        // bodyFormData.set('phone', phone);
        // bodyFormData.set('email', email);
        // bodyFormData.set('location', location);
        // bodyFormData.set('emp_id', empid);
        // bodyFormData.set('company', company);
        // bodyFormData.set('token', token);
        // axios.post(url, bodyFormData)
        //     .then(result => {
        //         if (result.data.status) {
        //             this.setState({ redirect: true, isLoading: false })
        //         }
        //     })
        //     .catch(error => {
        //         this.setState({ toDashboard: true });
        //         console.log(error);
        //     });
    };

    renderRedirect = () => {
        if (this.state.redirect) {
            return <Redirect to='/dashboard' />
        }
    };

    handleChange = e => {
        console.log(e);
        this.setState({ color: e.target.value });
        this.showDesignFiles()
        // this.props.onChange(e);
    };

    showDesignFiles() {
        return <div>{Array.from(Array(parseInt(this.state.color) ? parseInt(this.state.color) : 1), (e, i) => {
            return <div key={i} style={{ border: '1px solid #ced4da', borderRadius: 5, padding: 10, margin: 3 }}>
                Design File # {i + 1}
                <div>
                    <label for="cars" style={{ marginRight: 10 }}>Choose a category </label>
                    <select name="cars" id="cars">
                        <option value="pantom">Pantom</option>
                        <option value="cad">CAD</option>
                        <option value="swatch">Swatch</option>
                    </select>
                </div>
                <div>
                    <label style={{ marginRight: 10 }}>Delivery Date</label>
                    <DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} />
                </div>
                <div>
                    <label style={{ marginRight: 10 }}>Fit Sample</label>
                    Yes <input type='radio' />
                    No <input type='radio' />
                </div>
            </div>
        })}</div>
    }

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
                                <li className="breadcrumb-item active">Add</li>
                            </ol>
                        </div>
                        <div className="container-fluid">
                            <div className="card mx-auto">
                                <div className="card-header">Add Article</div>
                                <div className="card-body">
                                    <form onSubmit={this.handleSubmit}>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="file" id="productImage" className="form-control" placeholder="Upload Image" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="productImage">Product Image</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="file" id="techImage" className="form-control" placeholder="Upload Tech pack" required="required" />
                                                        <label htmlFor="techImage">Tech Pack Image</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputStyle" className="form-control" placeholder="Style no." required="required" />
                                                        <label htmlFor="inputStyle">Style Number</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputItemNo" className="form-control" placeholder="Item no." required="required" />
                                                        <label htmlFor="inputItemNo">Item Number</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputFabric" className="form-control" placeholder="Enter Fabric Content" required="required" />
                                                        <label htmlFor="inputFabric">Enter Fabric Content</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text-area" id="inputDescription" className="form-control" placeholder="Enter Description" required="required" />
                                                        <label htmlFor="inputDescription">Enter Description</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputMod" className="form-control" placeholder="Mode Type" required="required" />
                                                        <label htmlFor="inputMod">Mode Type</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputColor" value={this.state.color}
                                                            onChange={this.handleChange} className="form-control" placeholder="Enter Color Count" required="required" />
                                                        <label htmlFor="inputColor">Enter Color Count</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            this.showDesignFiles()
                                        }


                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Update Article&nbsp;&nbsp;&nbsp;
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
                                    <span>Copyright © Softfords <div>{(new Date().getFullYear())}</div></span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
