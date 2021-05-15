import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from 'react-router-dom';
import { findAllArticles, findAllCustomers } from '../Service/articlesService'

export default class Index extends Component {
    state = {
        articles: [],
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
    }

    async componentDidMount() {
        let resp = await findAllArticles()
        this.setState({ articles: resp })
    }

    handleClickDelete = event => {
        // axios.delete(this.url + '/' + event.target.value, { params: { token: this.token } })
        //     .then(response => {
        //         this.componentDidMount();
        //         this.setState({ isLoading: true })
        //     })
        //     .catch(error => {
        //         console.log(error.toString());
        //         this.setState({ toDashboard: true });
        //     });
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
                    <div id="content-wrapper">
                        <div className="container-fluid">
                            <ol className="breadcrumb">
                                <li className="breadcrumb-item">
                                    <Link to={'/dashboard'} >Dashboard</Link>
                                </li>
                                <li className="breadcrumb-item active">ARTICLES MANAGEMENT</li>
                                <li className="ml-auto"><Link to={'add-article'}>Add Article</Link></li>
                            </ol>
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
                                                <th className="text-center">Action</th>
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
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit-article', search: '?id=' + articles.id }}>Edit</Link>
                                                        &nbsp; | &nbsp;
                                                        <button value={articles.id} className="btn btn-sm btn-danger" disabled={index === 0 ? true : false} onClick={this.handleClickDelete} >Delete</button>
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
