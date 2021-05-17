import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from 'react-router-dom';
import { findAllNotifications } from '../Service/notificationService'

export default class Index extends Component {
    state = {
        notificatons: [],
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let resp = await findAllNotifications()
        console.table(resp)
        this.setState({ notificatons: resp })
    }

    render() {
        if (this.state.toDashboard === true) {
            return <Redirect to='/' />
        }
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar />
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Notifications</li>
                            </ol>
                            <div className="card mb-3">
                                <div className="card-header"><i className="fas fa-table"></i>
                                    &nbsp;&nbsp;Notifications
                                </div>
                                <div className="card-body">
                                    <table className="table table-bordered">
                                        <thead>
                                            <tr>
                                                <th>Item No.</th>
                                                <th>Content</th>
                                                <th>Customer</th>
                                                <th>Mod Type</th>
                                                <th>Style Number</th>
                                                <th>Delivery Date</th>
                                                <th>Created At</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.notificatons.map((notification, index) =>
                                                <tr key={notification.itemNo}>
                                                    <td>{index + 1}</td>
                                                    <td>{notification.fabricContent}</td>
                                                    <td>{notification.userRef}</td>
                                                    <td>{notification.modeType}</td>
                                                    <td>{notification.styleNumber}</td>
                                                    <td>{notification.deliveryDate}</td>
                                                    <td>{notification.createdAt}</td>
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
                                    <span>Copyright © Softfords 2021</span>
                                </div>
                            </div>
                        </footer>
                    </div>
                </div>
            </div>
        );
    }
}
