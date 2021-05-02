import React, { Component } from 'react';
import Header from "../elements/header";
import Sidebar from "../elements/sidebar";
import { Link, Redirect } from 'react-router-dom';
import axios from 'axios';

export default class Index extends Component {
    state = {
        articles: [
            {
                image: "",
                techPackImage: "",
                styleNumber: 1,
                itemNo: 3,
                fabricContent: 'fabric content',
                descriptive: 'this is descriptive',
                modType: 'M',
                color: 'red',
                designFile: []
            },
            {
                image: "",
                techPackImage: "",
                styleNumber: 2,
                itemNo: 7,
                fabricContent: 'fabric content',
                descriptive: 'this is descriptive',
                modType: 'F',
                color: 'blue',
                designFile: []
            },
            {
                image: "",
                techPackImage: "",
                styleNumber: 3,
                itemNo: 19,
                fabricContent: 'fabric content',
                descriptive: 'this is descriptive',
                modType: 'D',
                color: 'yellow',
                designFile: []
            },
        ],
        toDashboard: false,
        isLoading: false
    };

    constructor(props) {
        super(props);
        this.url = 'https://gowtham-rest-api-crud.herokuapp.com/employees';
        this.token = localStorage.getItem('token');
    }

    componentDidMount() {
        // axios.get(this.url, { params: { token: this.token } })
        //     .then(response => {
        //         const articles = response.data.data.employees;
        //         this.setState({ articles });
        //     })
        //     .catch(error => {
        //         this.setState({ toDashboard: true });
        //         console.log(error);
        //     });
    }

    handleClickDelete = event => {
        axios.delete(this.url + '/' + event.target.value, { params: { token: this.token } })
            .then(response => {
                this.componentDidMount();
                this.setState({ isLoading: true })
            })
            .catch(error => {
                console.log(error.toString());
                this.setState({ toDashboard: true });
            });
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
                                                <th>Designs</th>
                                                <th className="text-center">Action</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {this.state.articles.map((articles, index) =>
                                                <tr key={articles.itemNo}>
                                                    <td>{index + 1}</td>
                                                    <td>{articles.fabricContent}</td>
                                                    <td>{articles.modType}</td>
                                                    <td>{articles.styleNumber}</td>
                                                    <td>{articles.color}</td>
                                                    <td>{articles.designFile}</td>
                                                    <td className="text-center">
                                                        <Link className="btn btn-sm btn-info" to={{ pathname: 'edit', search: '?id=' + articles.id }}>Edit</Link>
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
