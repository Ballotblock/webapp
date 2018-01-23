import React from 'react';
import './bulma.css'

class NavBar extends React.Component {
    render=  function() {
        return (
            <nav className="navbar">
                <a className="navbar-item">Current Elections</a>
                <a className="navbar-item">Upcoming Elections</a>
                <a className="navbar-item">Past Elections</a>
            </nav>
        );
    }
}

export default NavBar;