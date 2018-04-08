import React from "react";
import Cookies from "js-cookie";
import { Redirect } from "react-router";

class Header extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      redirect: false,
      toggle:""
    };
  }
  logoutEventHandler = () => {
    this.resetCookies();
    window.location.reload();
  };

  resetCookies = () => {
    Cookies.remove("name");
    Cookies.remove("type");
    Cookies.remove("token");
  };

  dropDownToggle = () => {
    if(this.state.toggle === ""){
      this.setState({
        toggle:"is-active"
      })
    }else{
      this.setState({
        toggle:""
      })
    }
  }

  render = function() {
    if (this.state.redirect) {
      return <Redirect to="/" />;
    } else {
      return (
        <div className="section container">
          <nav className="level">
            <div className="level-item">
              <h1 className="title level-item is-1">BallotBlock</h1>
            </div>
            <div className= {"dropdown " + this.state.toggle}>
              <div className="dropdown-trigger">
                <button onClick = {this.dropDownToggle} className="button">
                  <span>Welcome {this.props.name}</span>
                  <span className="icon is-small">
                    <i className="fas fa-angle-down" aria-hidden="true" />
                  </span>
                </button>
              </div>
              <div className="dropdown-menu" id="dropdown-menu" role="menu">
                <div className="dropdown-content">
                  <a className="dropdown-item">Settings</a>
                  <a onClick = {this.logoutEventHandler} className="dropdown-item">Logout</a>
                </div>
              </div>
            </div>
          </nav>
        </div>
      );
    }
  };
}

export default Header;
