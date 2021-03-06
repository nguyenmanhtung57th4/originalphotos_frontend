import React, { Component } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import config from './config';
import axios from "./axios";

import HomeScreen from "./containers/HomeScreen";
import LoginScreen from "./containers/LoginScreen";
import CheckImageScreen from './containers/CheckImageScreen';
import UploadImageScreen from './containers/UploadImageScreen';
import ChangePassword from './containers/ChangePassword';
import PersonalScreen from './containers/PersonalScreen';


import {Route, Switch, withRouter } from "react-router-dom";

class App extends Component {
  state = {
    username: '',
    id: '',
    loading: false
  };

  componentDidMount() {
    //check login
    const access_token = window.localStorage.getItem("access_token")
    axios.get(config.rootPath + "/api/auth/check?access_token="+access_token)
      .then(response => {
        if(response.data.success){
          this.setState({
            username: response.data.user.username,
            id: response.data.user.id
          });
        }else {
          // this.props.history.push("/")
        }
      }).catch(error =>{
        console.log(error)
      })
  }

  _onLogin = (username, password) => {
    this.setState({
      loading:true
    })
    axios
      .post(config.rootPath + "/api/auth/login", {
        username: username,
        password: password
      })
      .then(response => {
        if (response.data.success){
          window.localStorage.setItem("access_token", response.data.access_token)
          this.setState({
            username: response.data.user.username,
            id: response.data.user.id
          });
          this.props.history.push("/");
        } else {
          alert(response.data.message)
          this.setState({
            loading: false
          })
        }
      })
      .catch(err => console.error(err));
  };

  render() {
    return (
      
        <div className="App">
          <Switch>
            <Route
              exact
              path="/"
              render={props => {
                return <HomeScreen
                  {...props}
                  username={this.state.username}
                  onLogin={this._onLogin}
                />;
              }}
            />
            <Route
              exact
              path="/checkimage"
              render={props => {
                return <CheckImageScreen
                  {...props}
                  username={this.state.username}
                  onLogin={this._onLogin}
                />;
              }}
            />
            <Route
              exact
              path="/uploadimage"
              render={props => {
                return <UploadImageScreen
                  {...props}
                  username={this.state.username}
                  id = {this.state.id}
                  onLogin={this._onLogin}
                />;
              }}
            />
            <Route
              exact
              path="/login"
              render={props => {
                return <LoginScreen
                  {...props}
                  username={this.state.username}
                  onLogin={this._onLogin}
                  loading={this.state.loading}
                />;
              }}
            />
            <Route
              exact
              path="/admin/changepassword"
              render={props => {
                return <ChangePassword
                />;
              }}
            />
            <Route
              exact
              path="/personal"
              render={props => {
                return <PersonalScreen
                  {...props}
                  username={this.state.username}
                  id = {this.state.id}
                  onLogin={this._onLogin}
                />;
              }}
            />
          </Switch>
        </div>
    );
  }
}

export default withRouter(App);
