import React from 'react';

import Header from "./Header";
import Election from "./Election"
import NavBar from "./NavBar";
import ElectionList from './ElectionList';

class Content extends React.Component {

    render(){
        return (
        <div>
        <Header name = {this.props.name}></Header>
        <NavBar></NavBar>
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <ElectionList title="Current Elections"></ElectionList>
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