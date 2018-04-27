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
        <div className="hero is-info">
          <div className="hero-body">
            <div className="container">
            <nav className="level">
              <div className="level-left">
                <span className="icon is-medium">
                  <i className="fas fa-check-square" aria-hidden="true" />
                </span>&nbsp;
                <h1 className="title level-item is-1">BallotBlock</h1>
              </div>
              <div className="level-right">
                <div className= {"dropdown is-hoverable"}>
                  <div className="dropdown-trigger">
                    <button onClick = {this.dropDownToggle} className="button is-info is-inverted is-outlined level-item" aria-hidden="true">
                      <span>&nbsp;&nbsp;Welcome {this.props.name}</span>
                      <span className="icon is-info">
                        <i className="fas fa-angle-down" aria-hidden="true" />
                      </span>&nbsp;&nbsp;
                    </button>
                  </div>
                  <div className="dropdown-menu" id="dropdown-menu" role="menu">
                    <div className="dropdown-content">
                      <a onClick = {this.logoutEventHandler} className="dropdown-item has-text-info">&nbsp;&nbsp;Logout</a>
                    </div>
                  </div>
                </div>
              </div>
            </nav>
            </div>
          </div>
        </div>
      );
    }
  };
}

export default Header;
