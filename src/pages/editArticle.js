import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { findSingleArtcile, updateArticle } from '../Service/articlesService'

import "react-datepicker/dist/react-datepicker.css";

export default class AddPage extends Component {

    state = {
        redirect: false,
        toDashboard: false,
        isLoading: false,
        selectUser: '',
        color: 1,
        customers: [],
        designArray: [],
        isFitSample: false,
        productImage: '',
        techImage: '',
        startDate: new Date(),
        designSelectValue: [],
    };

    async componentDidMount() {
        console.log(this.props.location)
        let id = this.props.location.search;
        id = id.toString().substring(4)

        console.log('id', id)
        let resp = await findSingleArtcile(id)
        document.getElementById('inputStyle').value = resp.styleNumber
        document.getElementById('inputItemNo').value = resp.itemNumber
        document.getElementById('inputFabric').value = resp.fabricContent
        document.getElementById('inputDescription').value = resp.description
        document.getElementById('inputMod').value = resp.modeType
        document.getElementById('inputColor').value = resp.colorCount
        this.setState({ startDate: new Date(resp.deliveryDate) })
        this.setState({ selectUser: resp.userRef })
    }

    handleSubmit = async event => {
        let obj = {}
        event.preventDefault();
        this.setState({ isLoading: true });
        obj.userRef = this.state.selectUser
        // let productImage = await upload(this.state.productImage)
        // obj.productImage = productImage.accessPath
        // let techImage = await upload(this.state.techImage)
        // obj.techPackImage = techImage.accessPath
        obj.styleNumber = document.getElementById('inputStyle').value;
        obj.itemNumber = document.getElementById('inputItemNo').value;
        obj.fabricContent = document.getElementById('inputFabric').value;
        obj.description = document.getElementById('inputDescription').value;
        obj.modeType = document.getElementById('inputMod').value;
        obj.deliveryDate = this.state.startDate
        obj.colorCount = document.getElementById('inputColor').value;
        // obj.isFitSample = this.state.isFitSample

        // let data = await this.makeDataforDynamicForms()
        // obj.designFile = data
        console.log(obj)
        let id = this.props.location.search;
        id = id.toString().substring(4)
        let response = await updateArticle(id, obj)
        console.log('resposne =', response)
        if (response) {
            this.props.history.push('/articles')
        } else {
            alert('There is an Error while creating articles')
        }
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
        // return <div>{Array.from(Array(parseInt(this.state.color) ? parseInt(this.state.color) : 1), (e, i) => {
        //     return <div key={i} style={{ border: '1px solid #ced4da', borderRadius: 5, padding: 10, margin: 3 }}>
        //         Design File # {i + 1}
        //         <div>
        //             <label for="cars" style={{ marginRight: 10 }}>Choose a category </label>
        //             <select name="cars" id="cars">
        //                 <option value="pantom">Pantom</option>
        //                 <option value="cad">CAD</option>
        //                 <option value="swatch">Swatch</option>
        //             </select>
        //         </div>
        //         <div>
        //             <input type='file' key={i} required />
        //         </div>
        //     </div>
        // })}</div>
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
                                                        <input type="file" id="productImage" disabled className="form-control" placeholder="Upload Image" required="required" autoFocus="autofocus" />
                                                        <label htmlFor="productImage">Product Image</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="file" id="techImage" disabled className="form-control" placeholder="Upload Tech pack" required="required" />
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
                                                            onChange={this.handleChange} disabled className="form-control" placeholder="Enter Color Count" required="required" />
                                                        <label htmlFor="inputColor">Enter Color Count</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        {
                                            this.showDesignFiles()
                                        }
                                        <div>
                                            <label style={{ marginRight: 10 }}>Delivery Date</label>
                                            <DatePicker selected={this.state.startDate} onChange={date => this.setState({ startDate: date })} />
                                        </div>
                                        <div>
                                            <label style={{ marginRight: 10 }}>Fit Sample</label>
                                                Yes <input type='radio' />
                                                No <input type='radio' />
                                        </div>

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
