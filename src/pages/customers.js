import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from 'react-router-dom';
import Modal from 'react-modal';
import { deleteCustomer, findAllCustomers } from '../Service/customersService'
import { findAllArticlesForUser } from '../Service/articlesService'


export default class Index extends Component {
    state = {
        customers: [],
        userId: "",
        articles: [],
        toDashboard: false,
        isLoading: false,
        modalIsOpen: false
    };

    constructor(props) {
        super(props);
        this.openModal = this.openModal.bind(this)
        this.afterOpenModal = this.afterOpenModal.bind(this)
        this.closeModal = this.closeModal.bind(this)
    }

    async componentDidMount() {
        let response = await findAllCustomers()
        this.setState({ customers: response })
    }

    async openModal(id) {
        this.setState({ userId: id, modalIsOpen: true });
        let resp = await findAllArticlesForUser({ userRef: id })
        this.setState({ articles: resp })
    }

    async afterOpenModal() {

    }

    closeModal() {
        this.setState({ modalIsOpen: false })
    }

    handleClickDelete = async event => {
        if (window.confirm('Are you sure you wanna delete?')) {
            let response = await deleteCustomer(event.target.value)
            if (response) {
                window.location.reload(false);
            } else {
                alert('Error while deleting...')
            }
        }
    };

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar />
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={{
                            top: '50%',
                            left: '50%',
                            right: 'auto',
                            bottom: 'auto',
                            marginRight: '-50%',
                            transform: 'translate(-50%, -50%)'
                        }}
                        contentLabel="Articles Modal"
                    >
                        <button className="btn btn-danger" onClick={this.closeModal}>X</button>
                        <div className="card mb-3">
                            <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Articles List
                                </div>
                            <div className="card-body">
                                <table className="table table-bordered">
                                    <thead>
                                        <tr>
                                            <th>Item No.</th>
                                            <th>Fabric</th>
                                            <th>Mod Type</th>
                                            <th>Style Number</th>
                                            <th>Color</th>
                                            <th>Created At</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {this.state.articles.map((articles, index) =>
                                            <tr key={articles.itemNo}>
                                                <td>{index + 1}</td>
                                                <td>{articles.fabricContent}</td>
                                                <td>{articles.modeType}</td>
                                                <td>{articles.styleNumber}</td>
                                                <td>{articles.colorCount}</td>
                                                <td>{articles.createdAt}</td>

                                            </tr>)
                                        }
                                    </tbody>
                                </table>
                            </div>
                            <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
                        </div>
                    </Modal>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">CUSTOMERS MANAGEMENT</li>
                                <li className="ml-auto"><Link to={'add'}>Add Customer</Link></li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Customers List
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>id</th>
                                                <th>Name</th>
                                                <th>Phone No</th>
                                                <th>Email ID</th>
                                                <th>Customer No.</th>
                                                <th>Company</th>
                                                <th>Location</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.customers.map((customers, index) =>
                                                <tr key={customers._id}>
                                                    <td><button className="btn btn-success" onClick={() => this.openModal(customers._id)}>{index + 1}</button></td>
                                                    <td>{customers.name}</td>
                                                    <td>{customers.phone}</td>
                                                    <td>{customers.email}</td>
                                                    <td>{customers.empId}</td>
                                                    <td>{customers.factory}</td>
                                                    <td>{customers.location}</td>
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + customers._id }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={customers._id} className="btn btn-sm btn-danger" onClick={this.handleClickDelete} >Delete</button>
                                                    </td>
                                                </tr>)
                                            }
                                        </tbody>
                                    </table>
                                </div>
                                <div className="card-footer small text-muted">Updated yesterday at 11:59 PM</div>
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
