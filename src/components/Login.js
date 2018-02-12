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

        //var url = 'https://authenticationserv.azurewebsites.net/Login';
        //var data = {"username": this.refs.user.value , "password":this.refs.pass.value};
        //const self = this;  // save "this" of the class so we can set the state
        // fetch(url , {
        //   method : 'POST',
        //   body : JSON.stringify(data),
        //   headers: new Headers({
        //     'content-type': 'application/json',
        //      'accept':  'application/json'
        //   })
        // })
        // .then((response) =>{
        //     console.log(response.status);
        //     if(response.status === 200)
        //     {
        //         self.setState({
        //             authenticated:true
        //         });
        //     }
        //     else
        //     {
        //        document.getElementById("error").innerHTML = "Wrong username or password"
        //     }
        // });
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