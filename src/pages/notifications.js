import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link } from "react-router-dom";

class Notifications extends Component {
    render() {
        return (
            <div>
                <Header />
                <div id="wrapper">
                    <Sidebar></Sidebar>
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'}>Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">Alerts</li>
                            </ol>

                            <p className="lead">No Notifications right now...🤔🤔
                                <Link to={'/dashboard'}>return home</Link>.</p>
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


export default Notifications
