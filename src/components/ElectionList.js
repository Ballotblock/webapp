import React from 'react';
import ElectionListElement from "./ElectionListElement"

// this component displays a list of elections for users to click
// as the user can click on an election to view his/her ballot
// gui wise, its the box on the bottom left that contains a search bar on top 
// with a list of elections
class ElectionList extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {highlightedRow:0}
    }
    
    // listen for clicking an election, pass to parent function
    clickElection = (index) =>{
        this.props.selectedElection(this.props.list[index])
        this.setState({highlightedRow:index})
    }

    render(){

        var electionTitles = []
        // create a new <a> element for every election in the list passed as a prop
        if(this.props.list){

            for(var i = 0 ; i < this.props.list.length ; i++)
            {
                
                var class_name = ""
                if(this.state.highlightedRow === i)
                {
                    class_name = "selectedRow"
                }
                electionTitles.push(<ElectionListElement key = {i} index = {i} class_name = {class_name} clickElectionHandler = {this.clickElection} >{this.props.list[i]}</ElectionListElement>)
            }
        }
        
        return(
        <nav className="panel">
            <p className="panel-heading">
                {this.props.title}
            </p>
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input className="input is-small" type="text" placeholder="search" />
                    <span className="icon is-small is-left">
                        <i className="fa fa-search" />
                    </span>
                </p>
            </div>
        {electionTitles}
        </nav>      
        )
    }
}
 
 export default ElectionList
