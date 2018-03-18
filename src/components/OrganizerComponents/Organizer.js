import React from "react";
import Header from "../Header"

class Organizer extends React.Component {
    
    render()
    {
        return(<div>
            <Header name={this.props.name}></Header>
            <nav className="navbar">
              <a className="navbar-item selectedRow" >Create Elections</a>
              <a className="navbar-item" >Election Results</a>
          </nav>
            </div>);
    }
}

export default Organizer;