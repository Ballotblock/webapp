import React from 'react';
import './bulma.css'

import Header from "./Header";

class Login extends React.Component {
    
    constructor(props){
        super(props)
        // normally here we would check for the existence of a cookie or something to see if the user was already authenticated
        this.state = {authenticated : false};
    }

    // the below methods are me just trying to keep track of the lifecycle of a react component for debugging
    // they are commented out
    // componentWillUnmount(){
    //     console.log("unmount");
    // }
    // componentDidMount() {
    //     console.log("didmount");
    // }
    // componentWillUpdate(nextProps, nextState){
    //     console.log("update");
    // }

    // preforms an authenticate request rest api
    authenticate = () => {
        var url = 'https://authenticationserv.azurewebsites.net/Login';
        var data = {"username": this.refs.user.value , "password":this.refs.pass.value};
        console.log(JSON.stringify(data));
        const self = this;  // save "this" of the class so we can set the state
        fetch(url , {
          method : 'POST',
          body : JSON.stringify(data),
          headers: new Headers({
            'content-type': 'application/json',
             'accept':  'application/json'
          })
        })
        .then((response) =>{
            console.log(response.status);
            if(response.status === 200)
            {
                self.setState({
                    authenticated:true
                });
            }
        });
      }

      // the item that is rendered if the user is authenticated
      renderHeader = function () {
        return <Header>Alice</Header>
      }

      // the login page that is rendered if the user is not authenticated
      renderLogin = function() {
        return (
            <section className="hero is-light is-fullheight">
                  <div className="hero-body">
                      <div className="container has-text-centered">
                          <div className="column is-4 is-offset-4">
                              <h3 className="title has-text-grey">Login</h3>
                              <div className="box">
                                  <form>
                                      <div className="field">
                                          <div className="control">
                                              <input className="input is-large" ref="user" placeholder="Username" autoFocus />
                                          </div>
                                      </div>
                                      <div className="field">
                                          <div className="control">
                                              <input className="input is-large" type="password"  ref="pass" placeholder="Password" />
                                          </div>
                                      </div>
                                      <div className="field">
                                      </div>
                                      <a className="button is-block is-info is-large is-fullwidth" onClick = {this.authenticate}>Login</a>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          );
      }

      render() {
        //console.log("render");
        if(this.state.authenticated)
        {
            return this.renderHeader();
        }
        else
        {
            return this.renderLogin();
        }
    }
}

export default Login