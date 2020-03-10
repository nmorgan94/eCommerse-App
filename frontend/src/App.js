import React, { Component } from "react";
import { BrowserRouter, Route, Switch, withRouter } from "react-router-dom";
import "./App.css";
import Navbar from "./components/Navbar";
import Basket from "./components/Basket";
import User from "./components/User";
import Home from "./components/Home";
import Checkout from "./components/Checkout";
import ProductDetail from "./components/ProductDetail";
import ValidatedFormLogin from "./components/ValidatedFormLogin";
import ValidatedSignup from "./components/ValidatedSignup";
import Cookies from "universal-cookie";
import { ACCESS_TOKEN } from "./constants";
import { getCurrentUser } from "./utils/APIUtils";
import { Redirect } from "react-router-dom";
import { browserHistory } from "react-router";
import { observer, inject } from "mobx-react";
import Store from "./store/dataStore";

const cookies = new Cookies();

cookies.set("cookieID", "1", { path: "/" });

@inject("dataStore")
@observer
class App extends Component {
  constructor(props) {
    super(props);
  }

  componentDidMount = () => {
    console.log("cookieID", cookies.get("cookieID"));
    this.props.dataStore.handleLogin();
    console.log("Store: " + this.props.dataStore.count);
    this.props.dataStore.increment();
    console.log("Store: " + this.props.dataStore.count);
    this.props.dataStore.nick = 5;
    console.log("Store: " + this.props.dataStore.nick);
  };

  handleLogout = () => {
    localStorage.removeItem(ACCESS_TOKEN);
    this.props.dataStore.isAuthenticated = false;
    this.props.dataStore.currentUser = {};
    this.props.history.push("/");
  };

  render() {
    return (
      <div className="App">
        <Navbar onLogout={this.handleLogout} />

        <Switch>
          <Route exact path="/" component={Home} />
          <Route path="/basket" component={Basket} />
          <Route path="/products/:id" component={ProductDetail} />
          <Route path="/checkout" component={Checkout} />
          <Route path="/login" component={ValidatedFormLogin} />
          <Route path="/signup" component={ValidatedSignup} />
          <Route path="/user" component={User} />
        </Switch>
      </div>
    );
  }
}

export default withRouter(App);
