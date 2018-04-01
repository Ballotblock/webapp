import React from "react";
import Cookies from "js-cookie";
import { Redirect } from 'react-router'

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect:false
    }
  }
  logoutEventHandler = () => {
    this.resetCookies();
    // this.setState ({
    //   redirect:true
    // })
    window.location.reload();
  };

  resetCookies = () => {
    Cookies.remove("name");
    Cookies.remove("type");
    Cookies.remove("token");
  };

  render = function() {

    if(this.state.redirect){
      console.log("Header lin 23")
      return <Redirect to ="/" />
    }
    else 
    {
      return (
        <div className="section container">
          <nav className="level">
            <div className="level-item">
              <h1 className="title level-item is-1">BallotBlock</h1>
            </div>
            <ul className="nav">
              <li className="drop">
                Welcome {this.props.name}
                <ul>
                  <li>
                    <a>Account Settings</a>
                  </li>
                  <li>
                    <a onClick={this.logoutEventHandler}>Logout</a>
                  </li>
                </ul>
              </li>
            </ul>
          </nav>
        </div>
      );
    }
  };
}

export default Header;
