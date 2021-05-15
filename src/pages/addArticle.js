import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from "react-router-dom";
import DatePicker from "react-datepicker";
import { findAllCustomers } from '../Service/customersService'
import { upload } from '../Service/uploadService'
import { createArticle } from '../Service/articlesService'
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
        let response = await findAllCustomers()
        this.setState({ customers: response })
    }

    makeDataforDynamicForms = async () => {
        let obj = {}, arr = []
        let length = this.state.designSelectValue.length
        if (length == 0) {
            length = 1
        }
        console.log('here in the function...', length)
        for (let i = 0; i < length; i++) {
            console.log('fsd', i)
            console.log(this.state.designArray[i].img)
            console.log(this.state.designSelectValue[i].value)
            obj.category = this.state.designSelectValue[i].value
            obj.image = await upload(this.state.designArray[i].img)
            obj.image = obj.image.accessPath
            arr.push(obj)
            // console.log("asda", obj.category)
        }
        console.log(arr)
        return arr
    }

    handleSubmit = async event => {
        let obj = {}
        event.preventDefault();
        this.setState({ isLoading: true });
        obj.userRef = this.state.selectUser
        let productImage = await upload(this.state.productImage)
        obj.productImage = productImage.accessPath
        let techImage = await upload(this.state.techImage)
        obj.techPackImage = techImage.accessPath
        obj.styleNumber = document.getElementById('inputStyle').value;
        obj.itemNumber = document.getElementById('inputItemNo').value;
        obj.fabricContent = document.getElementById('inputFabric').value;
        obj.description = document.getElementById('inputDescription').value;
        obj.modeType = document.getElementById('inputMod').value;
        obj.deliveryDate = this.state.startDate
        obj.colorCount = document.getElementById('inputColor').value;
        obj.isFitSample = this.state.isFitSample

        let data = await this.makeDataforDynamicForms()
        obj.designFile = data
        console.log(obj)

        let response = await createArticle(obj)
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
    };

    handleSelectChange = event => {
        this.setState({ selectUser: event.target.value })
    }



    productImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            console.log(img)
            this.setState({
                productImage: img
            });
        }
    }

    techImageChange = event => {
        if (event.target.files && event.target.files[0]) {
            let img = event.target.files[0];
            this.setState({
                techImage: img
            });
        }
    }

    handledDesignSelectChange = (event, index) => {
        let obj = {}
        obj.iter = index
        obj.value = event.target.value
        this.setState({ designSelectValue: [...this.state.designSelectValue, obj] })
    }

    designImageChange = (event, index) => {
        let obj = {}
        obj.iter = index
        obj.img = event.target.files[0];
        this.setState({ designArray: [...this.state.designArray, obj] });
    }

    showDesignFiles() {
        return <div>{Array.from(Array(parseInt(this.state.color) ? parseInt(this.state.color) : 1), (e, i) => {
            return <div key={i} style={{ border: '1px solid #ced4da', borderRadius: 5, padding: 10, margin: 3 }}>
                Design File # {i + 1}
                <div>
                    <label for="designs" style={{ marginRight: 10 }}>Choose a category </label>
                    <select name="desgins" id={i} key={i} onChange={e => this.handledDesignSelectChange(e, i)} required>
                        <option value="--">Select Value</option>
                        <option value="pantom">Pantom</option>
                        <option value="cad">CAD</option>
                        <option value="swatch">Swatch</option>
                    </select>
                </div>
                <div>
                    <input type='file' key={i} required onChange={e => this.designImageChange(e, i)} />
                </div>
            </div>
        })}</div>
    }

    handleFitSampleChange = e => {
        this.setState({ isFitSample: e.target.checked });
    }

    render() {
        const isLoading = this.state.isLoading;
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }

        let customersList = this.state.customers.length > 0
            && this.state.customers.map((item, i) => {
                return (
                    <option key={i} value={item._id}>{item.name}</option>
                )
            }, this);
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
                                                <div>
                                                    <label for="cars" style={{ marginRight: 10 }}>Select a user against you are creating article </label>
                                                    <select name="customers" id="customers" value={this.state.selectValue}
                                                        onChange={this.handleSelectChange} >
                                                        {customersList}
                                                    </select>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="file" id="productImage" className="form-control" placeholder="Upload Image" required autoFocus="autofocus" onChange={this.productImageChange} />
                                                        <label htmlFor="productImage">Product Image</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="file" id="techImage" className="form-control" placeholder="Upload Tech pack" required onChange={this.techImageChange} />
                                                        <label htmlFor="techImage">Tech Pack Image</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputStyle" className="form-control" required placeholder="Style no." />
                                                        <label htmlFor="inputStyle">Style Number</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputItemNo" className="form-control" required placeholder="Item no." />
                                                        <label htmlFor="inputItemNo">Item Number</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputFabric" className="form-control" required placeholder="Enter Fabric Content" />
                                                        <label htmlFor="inputFabric">Enter Fabric Content</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text-area" id="inputDescription" className="form-control" required placeholder="Enter Description" />
                                                        <label htmlFor="inputDescription">Enter Description</label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>

                                        <div className="form-group">
                                            <div className="form-row">
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="text" id="inputMod" className="form-control" required placeholder="Mode Type" />
                                                        <label htmlFor="inputMod">Mode Type</label>
                                                    </div>
                                                </div>
                                                <div className="col-md-6">
                                                    <div className="form-label-group">
                                                        <input type="number" id="inputColor" value={this.state.color}
                                                            onChange={this.handleChange} className="form-control" required placeholder="Enter Color Count" />
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
                                            <input type='checkbox' onChange={this.handleFitSampleChange} value={this.state.isFitSample} />
                                        </div>


                                        <button className="btn btn-primary btn-block" type="submit" disabled={this.state.isLoading ? true : false}>Add&nbsp;&nbsp;&nbsp;
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
