import React, { Component } from 'react';
import { Link } from 'react-router-dom';

export default class Sidebar extends Component {
    render() {
        return (
            <div id="wrapper">
                <ul className="sidebar navbar-nav">
                    <li className="nav-item active">
                        <Link to={'/dashboard'} className="nav-link"><i className="fas fa-fw fa-tachometer-alt"></i>
                            <span>&nbsp;Dashboard</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/customers'} className="nav-link"><i className="fas fa-fw fa-chart-area"></i>
                            <span>&nbsp;Customers</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/articles'} className="nav-link"><i className="fas fa-fw fa-chart-area"></i>
                            <span>&nbsp;Articles</span></Link>
                    </li>
                    <li className="nav-item">
                        <Link to={'/alerts'} className="nav-link"><i className="fas fa-fw fa-chart-area"></i>
                            <span>&nbsp;Notifications</span></Link>
                    </li>
                </ul>
            </div>
        );
    }
}
