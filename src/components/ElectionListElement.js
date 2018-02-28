import React from 'react';
 

// reprents a single row in our list of elections 
// the gui part is the little navigator on the left of the screen
class ElectionListElement extends React.Component {
    
    // listen for clicking an election
    retrieveElection = () =>{
        this.props.clickElectionHandler(this.props.index)
    }

    render(){
        var classes = "panel-block " + this.props.class_name
        return (
            <a className = {classes}  onClick = {this.retrieveElection} > {this.props.children} </a>
        )
    }
}
 
 export default ElectionListElement