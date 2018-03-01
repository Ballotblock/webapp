import React from 'react';

import Content from "./Content"

class Login extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {authenticated : false};
    }

    // preforms an authenticate request to rest api
    authenticate = () => {
        document.getElementById("error").innerHTML = "";

        /***********
         * Part Below commented out as our architecture has been redisgned, login would make a request
         * to the intermediary server as the login route is defined and access tokens are designed
        ************/
        this.setState({
            authenticated:true
        })
      }

      // the item that is rendered if the user is authenticated
      renderContent = function () {
        return    <Content name = "Alice" voterId = "Alice"></Content>
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
                                      <p id = "error"> </p>
                                  </form>
                              </div>
                          </div>
                      </div>
                  </div>
              </section>
          );
      }

      render() {
        if(this.state.authenticated)
        {
            return this.renderContent();
        }
        else
        {
            return this.renderLogin();
        }
    }
}

export default Login