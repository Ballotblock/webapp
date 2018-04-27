import React from "react";
import Content from "./VoterComponents/Content";
import Organizer from "../components/OrganizerComponents/Organizer"
import * as Servers from './settings'
import Cookies from 'js-cookie';

import { BrowserRouter as Router, Route, Redirect} from "react-router-dom";

class Login extends React.Component {
  constructor(props) {
    super(props);
    
    var session = Cookies.get('name');
    var type = Cookies.get('type');
    this.registration_url = Servers.REGISTRATION_SERVER;
    this.loginError = "";

    if(session && type) {
      this.state = {
        authenticated: true,
        page: "Login",
        loading: "",
        name: session,
        account_type: parseInt(type)
      };
    }
    else{
      this.state = {
        authenticated: false,
        page: "Login",
        loading: "",
        name: session,
      };
    }
  }

  //link listener for "already have account"
  haveAccount = () => {
    this.setState({
      page: "Login",
      loading: ""
    });
  };

  //link listener for "sign up"
  signUp = () => {
    this.setState({
      page: "SignUp",
      loading: ""
    });
  };

  //button listener for login
  loginClick = () => {
    this.login(this.refs.user.value, this.refs.pass.value);
  };

  //listen for enter key press
  listenKeyPress = (event) => { if(event.key === 'Enter'){ this.login(this.refs.user.value, this.refs.pass.value); } }

  createAccountClick = () => {
    var username = this.refs.username.value;
    var password = this.refs.password.value;
    var confirm = this.refs.confirm.value;

    //check to make sure nothing is empty
    if (username === "" || password === "" || confirm === "") {
      this.setState({ signUpError: "Please fill in all the options" });
      return false;
    }
    //check to make sure passwords match
    if (password !== confirm) {
      this.setState({ signUpError: "Passwords do not match" });
      return false;
    }

    this.createAccount(username, password, this.accountType.value);
  };

  login = (username, password) => {
    var url = this.registration_url + "token";
    var payload = {
      username: username,
      password: password
    };
    this.setState({
      loading:  <div><i className="fas fa-spinner fa-spin " style={ {'font-size':'3em'} } ></i></div>
    });
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(response => {
        if (response.status === 202) {
          return response.json();
        }
      })
      .then(json => {
        if (!json) {
          this.error = "wrong username or password";
          this.setState({
            loginError: "Wrong username or password",
            loading: ""
          });
          return false;
        }
        //below we store a cookie manually on client side
        var token = JSON.stringify(json);
        var account_type = json.account_type;

        Cookies.set('token',token);
        Cookies.set('name',username);
        Cookies.set('type',account_type);

        this.setState({
          authenticated: true,
          account_type: account_type,
          loading: "",
          name: username
        });
        return true;
      });
  };

  createAccount(username, password, accountType) {
    var url = this.registration_url + "account";
    var payload = {
      username: username,
      password: password,
      account_type: accountType
    };
    this.setState({
      loading: <div><i className="fas fa-spinner fa-spin " style={ {'font-size':'3em'} } ></i></div>
    });

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
    }).then(response => {
      if (response.status === 201) {
        this.setState({ signUpError: "Account created",
        loading: "",
       });
        this.login(username,password);
      } else {
        this.setState({ signUpError: "Unable to create account",
        loading: "" });
        return false;
      }
    });
  }

  // the component that is rendered if the voter is authorized
  renderContent = function() {
    return <Redirect to="/voter/Current Elections" />
  };

  //the componnents that is rendered if the election organizer is authorized
  renderOrganizer = function() {
    return <Redirect to="/organizer/Create" />
  }

  renderLogin = function() {
    return (
      <section className="hero is-info is-fullheight">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-4 is-offset-4">
              <h3 className="title is-1">Login</h3>
              <div className="box">
              {this.state.loading}
                <form>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        ref="user"
                        placeholder="Username"
                        autoFocus
                        onKeyPress={this.listenKeyPress}
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large"
                        type="password"
                        ref="pass"
                        placeholder="Password"
                        id="one"
                        onKeyPress={this.listenKeyPress}
                      />
                    </div>
                  </div>
                  <div className="field" />
                  <a
                    className="button is-block is-info is-large is-fullwidth"
                    onClick={this.loginClick}
                  >
                    Login
                  </a>
                  &nbsp;
                  <p className="has-text-danger" id="error">
                    {this.state.loginError}
                  </p>
                </form>
              <p className="has-text-grey">
              <a className="has-text-grey">Need an account? </a>
                <a  className="has-text-info is-inverted" onClick={this.signUp}>Sign Up</a>{" "}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  renderSignUp = function() {
    return (
      <section className="hero  is-fullheight is-info">
        <div className="hero-body">
          <div className="container has-text-centered">
            <div className="column is-5 is-offset-4">
              <h3 className="title is-1">Create Account</h3>
              <div className="box">
              {this.state.loading}
                <form>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large is-fullwidth"
                        type="email"
                        ref="username"
                        placeholder="Your Username"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large is-fullwidth"
                        type="password"
                        ref="password"
                        placeholder="Enter Password"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <input
                        className="input is-large is-fullwidth"
                        type="password"
                        ref="confirm"
                        placeholder="Confirm Password"
                      />
                    </div>
                  </div>
                  <div className="field">
                    <div className="control">
                      <div className="select is-medium is-fullwidth">
                        <select ref={input => (this.accountType = input)}>
                          <option value="voter">Voter</option>
                          <option value="election_creator">
                            Election Creator
                          </option>
                        </select>
                      </div>
                    </div>
                  </div>
                  <div className="field" />
                  <a
                    className="button is-block is-info is-large is-fullwidth"
                    onClick={this.createAccountClick}
                  >
                    Create Account
                  </a>
                  &nbsp;
                  <p className="has-text-danger">{this.state.signUpError}</p>
                </form>
              <p className="has-text-grey">
                    <a className="">Already have an account? </a>
                    <a onClick={this.haveAccount} className="has-text-info is-inverted">Sign In</a>{" "}
                    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
              </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  };

  render() {
    if (this.state.authenticated) {
      if (this.state.account_type === 1) {
        return this.renderContent();
      } else {
        return this.renderOrganizer();
      }
    } else {
      if (this.state.page === "Login") {
        return this.renderLogin();
      } else if (this.state.page === "SignUp") {
        return this.renderSignUp();
      }
    }
  }
}

export default Login;
