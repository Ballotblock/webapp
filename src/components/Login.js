import React from 'react';
import Content from "./VoterComponents/Content"

class Login extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
            authenticated : false , 
            page:'Login',
            loading:''
        };
        this.name = ""
        this.registration_url = "https://ballotblockregistration.azurewebsites.net/api/"
        this.error = ""
    }

    //link listenr for "already have account"
    haveAccount = () => {
        this.setState({
            page:'Login',
            loading:''
        })
    }

    //link listener for "sign up"
    signUp = () =>{ 
        this.setState({
            page:'SignUp',
            loading:''
        })
    }
    
    //button listener for login
    loginClick = () => {
        this.login(this.refs.user.value, this.refs.pass.value)
    }

    createAccountClick = () => {
        console.log(this.refs.username.value)
        console.log(this.refs.password.value)
        console.log(this.accountType.value)
    }

  
    login = (username,password) => {
        var url = this.registration_url + "token"
        var payload = {
            "username" : username,
            "password" : password
        }
        this.setState({
            loading:<div className="loadingLogin"></div>
        })
        fetch(url, {
            method:"POST",
            body:JSON.stringify(payload)
        }).then((response)=>{
            if(response.status === 202)
            {
                return response.json()
            }
        }).then((json)=>{
            if(!json)
            {
                this.error = "wrong username or password"
                this.setState({
                    "error":"Wrong username or password",
                    loading:''
                })
                return false;
            }
            var account_type = json.account_type
            this.setState({
                authenticated:true,
                account_type:account_type,
                loading:''
            })
            return true;
        })
    }

    createAccount(username,password,accountType){

    }

    // the item that is rendered if the user is authenticated
    renderContent = function () {
        return  <Content name = "Alice" voterId = "Alice"></Content>
    }

    renderLogin = function() {
        return (
            <section className="hero is-fullheight">
              {this.state.loading}
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
                                        <a className="button is-block is-info is-large is-fullwidth" onClick = {this.loginClick}>Login</a>
                                        &nbsp;
                                        <p className="has-text-danger" id="error">{this.state.error}</p>
                                    </form>
                                </div>
                                <p className="has-text-grey">
                                    <a onClick = {this.signUp}>Sign Up</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                                    <a>Forgot Password</a> &nbsp;&nbsp;
                                </p>
                            </div>
                        </div>
                    </div>
                </section>
        );
    }

    renderSignUp = function() {
        return (
            <section className="hero  is-fullheight">
              <div className="hero-body">
                <div className="container has-text-centered">
                  <div className="column is-5 is-offset-4">
                    <h3 className="title has-text-grey">Create Account</h3>
                    <div className="box">
                      <form>
                        <div className="field">
                          <div className="control">
                            <input className="input is-large is-fullwidth" type="email" ref="username" placeholder="Your Username" autoFocus />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input className="input is-large is-fullwidth" type="password" ref="password" placeholder="Enter Password" />
                          </div>
                        </div>
                        <div className="field">
                          <div className="control">
                            <input className="input is-large is-fullwidth" type="password" ref="confirm" placeholder="Confirm Password" />
                          </div>
                        </div>
                        <div className="field">
                            <div className="control">
                                <div className="select is-medium is-fullwidth">
                                <select ref = {(input)=> this.accountType = input}>
                                    <option value="voter">Voter</option>
                                    <option value="election_creator" >Election Creator</option>
                                </select>
                                </div>
                            </div>
                        </div>
                        <div className="field">
                        </div>
                        <a className="button is-block is-info is-large is-fullwidth" onClick = {this.createAccountClick} >Create Account</a>
                      </form>
                      &nbsp;
                    </div>
                    <p className="has-text-grey">
                      <a onClick={this.haveAccount}>Already Have Account</a> &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                      <a>Forgot Password</a> &nbsp;&nbsp;&nbsp;
                    </p>
                  </div>
                </div>
              </div>
            </section>
          );
    }

    render() {
        // return (<div className="loading"></div>)
 
        if(this.state.authenticated)
        {
            if(this.state.account_type === 1)
            {
                return this.renderContent();
            }
            else
            {
                // return election_creator page
            }
        }
        else
        {
            if(this.state.page === "Login")
            {
                return this.renderLogin();
            }
            else if(this.state.page === "SignUp")
            {
                return this.renderSignUp();
            }
            
        }
    }
}

export default Login