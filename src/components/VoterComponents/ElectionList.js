import React from 'react';
import ElectionListElement from "./ElectionListElement"

/**
 * this components takes a selectElection handler which is called when one of the rows is clicked
 * needs a list of electionTitles passed in as a prop, this.props.list
 * needs a title passed in as a prop as well, this.props.title
 * also optional is a selectedIndex
 */
class ElectionList extends React.Component {

    constructor(props)
    {
        super(props)
        this.state = {highlightedRow:0}
    }
    
    // listen for clicking an election, pass to parent function
    clickElection = (index) =>{
        this.props.selectedElection(this.props.list[index],index)
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
       
            </div>
        {electionTitles}
        </nav>      
        )
    }
}
 
 export default ElectionList
