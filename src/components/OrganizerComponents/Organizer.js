import React from "react";
import Header from "../Header"

class Organizer extends React.Component {
    
    render()
    {
        return(<div>
            <Header name={this.props.name}></Header>
            <h1 className = "is-size-1 has-text-centered">Election Creator stuff here</h1>
            </div>);
    }
}

export default Organizer;