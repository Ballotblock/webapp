import React from 'react';
//import Cookie from 'react-cookie';
import './bulma.css'

import Header from "./Header";
import Election from "./Election"
import NavBar from "./NavBar";

class Content extends React.Component {


    componentWillMount() {
        // Do fetch request here to retrieve all of the users ballots for Current Elections
        // use that data to populate the election selection menu on the left of the page
        // pass the electionId of the selected election to <Election> component
    }


    render(){
        return (
        <div>
        <Header name = {this.props.name}></Header>
        <NavBar></NavBar>
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <nav className="panel">
                            <p className="panel-heading">
                                Current Elections
                            </p>
                            <div className="panel-block">
                                <p className="control has-icons-left">
                                <input className="input is-small" type="text" placeholder="search" />
                                <span className="icon is-small is-left">
                                    <i className="fa fa-search" />
                                </span>
                                </p>
                            </div>
                            <a className="panel-block is-active">
                                ASASU2017 Election
                            </a>
                        </nav>
                    </div>
                    <div className="column is-8">
                    <Election election = "ASASU2017 Election"></Election>
                    </div>
                </div>
            </div>   
        </div>
        )
    }
}

export default Content