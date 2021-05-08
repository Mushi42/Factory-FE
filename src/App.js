import React, { Component } from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
import Login from "./pages/login";
import Dashboard from "./pages/dashboard";
import Index from "./pages/customers";
import AddPage from "./pages/addCustomer";
import AddArticle from "./pages/addArticle";
import EditCustomerPage from "./pages/editCustomer";
import EditArticlePage from "./pages/editArticle";
import Register from "./pages/register";
import NotFound from "./pages/notfound";
import ArticlesPage from './pages/articles'
import notificationPage from './pages/notifications'

class App extends Component {

    render() {
        return (
            <div className="App">
                <Router>
                    <Switch>
                        <Route exact path='/' component={Login} />
                        <Route path='/dashboard' component={Dashboard} />
                        <Route path='/customers' component={Index} />
                        <Route path='/articles' component={ArticlesPage} />
                        <Route path='/register' component={Register} />
                        <Route path='/add' component={AddPage} />
                        <Route path='/add-article' component={AddArticle} />
                        <Route path='/edit/' component={EditCustomerPage} />
                        <Route path='/edit-article/' component={EditArticlePage} />
                        <Route path='/alerts/' component={notificationPage} />
                        <Route path='*' component={NotFound} />
                    </Switch>
                </Router>
            </div>
        );
    }
}

export default App;
