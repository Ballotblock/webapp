import React from 'react';
import './bulma.css'

class NavBar extends React.Component {


    selectItem = (type) =>
    {
        this.props.selectType(type);
    }

    render=  function() {
        return (
            <nav className="navbar">
                <a className="navbar-item" onClick = {(t) => this.selectItem("Current Elections")} >Current Elections</a>
                <a className="navbar-item" onClick = {(t) => this.selectItem("Upcomming Elections")} >Upcomming Elections</a>
                <a className="navbar-item" onClick = {(t) => this.selectItem("Past Elections")} >Past Elections</a>
            </nav>
        );
    }
}

export default NavBar;