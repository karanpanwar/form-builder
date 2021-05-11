import React from "react";
import "./app.css";
import Navbar from "react-bootstrap/Navbar";
import Nav from "react-bootstrap/Nav";
import Homepage from "./homepage/homepage";
import CreateForm from "./create-form/create-form";
import FormView from "./form/form-view";
import {Switch, Route, NavLink} from "react-router-dom";

class App extends React.Component {
    render() {
        return (
            <>
                <div className="container">
                    <Navbar expand="md">
                        <Navbar.Brand>
                            <NavLink to="/" >
                                DEMO
                            </NavLink>
                        </Navbar.Brand>
                        <Navbar.Toggle aria-controls="basic-navbar-nav"/>
                        <Navbar.Collapse id="basic-navbar-nav">
                            <Nav className="ml-auto">
                                <NavLink to="/" className="nav-link" exact>
                                    Home
                                </NavLink>
                                <NavLink to="/create-form" className="nav-link">
                                Create Form
                                </NavLink>
                            </Nav>
                        </Navbar.Collapse>
                    </Navbar>
                </div>
                <div className="mid-content">
                <Switch>
                    <Route exact path="/" component={Homepage}/>
                    <Route path="/create-form" component={CreateForm}/>
                    <Route path="/form/:slug" component={FormView}/>
                </Switch>
                </div>
            </>
        );
    }
}

export default App;
