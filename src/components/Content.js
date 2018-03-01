import React from 'react';

import Header from "./Header";
import Election from "./Election"
import NavBar from "./NavBar";
import ElectionList from './ElectionList';

class Content extends React.Component {

    constructor(props){
        super(props)
        this.state = {
            voterId : this.props.voterId,
            electionType : "Current Elections"
        };
      }

    // preform a fetch request to retrieve all of a users' ballot
    componentWillMount(props){
        var url = "https://ballotblock.azurewebsites.net/api/election?id=Alice"
        fetch(url).then((response)=>{
            return response.json()
          }).then((json)=>{
            var ballots = json[0]
            var electionIds = []
            var markedBallots = []
            for(var i = 0 ; i < ballots.length ; i ++)
            {
                var eId = this.extractElectionId(ballots[i].ballotId)
                var mark = ballots[i].marked;
                markedBallots.push(mark)
                electionIds.push(eId)
            }
            this.setState({
                electionIds:electionIds, //array of elections
                selectedElection : electionIds[0],   // index of the current selected election, starts with the first election created
                votedElections : markedBallots // array of booleans, a true at index 0 means the election with the id at electionsId[0] has already been voted in
            })
          })
    }

    // takes the ballotId and extracts the electionId
    extractElectionId = (ballotId) => {
        var electionId = ballotId.split("_")
        return (electionId[1])
    }

    /*
    * select is the event handler in the ElectionList child component
    * the election list presents a list of clickable elections, clicking on another election
    * would render a new election with different propositions on the right of the list
     */
    selectElection = (newElection) => {
        this.setState({selectedElection:newElection})
    }


    /**
     *  function called when one of the options on the navigation bar on type is clicked
     */
    selectType = (type) => {
        this.setState({electionType:type})
    }


    /*
    Below are the event handlers for the click events in the navbar
    */
   renderCurrentElections = () => {
    return (
        <div>
            <Header name = {this.props.name}></Header>
            <NavBar selectType = {this.selectType}></NavBar>
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <ElectionList title={this.state.electionType} selectedElection = {this.selectElection} list = {this.state.electionIds} ></ElectionList>
                    </div>
                    <div className="column is-8">
                    <Election key = "current" election = {this.state.selectedElection}></Election>
                    </div>
                </div>
            </div>   
        </div>
        )
   }

   /**
    * Note that the up comming elections and past elections just return blank pages for now
    * TODO : separate the dates of the ballots into the appropriate categories so they can be 
    *           rendered in the correct tab
    */
   renderUpComingElections = () => {
    return (
        <div>
            <Header name = {this.props.name}></Header>
            <NavBar selectType = {this.selectType} ></NavBar>
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <ElectionList title={this.state.electionType} selectedElection = {this.selectElection}></ElectionList>
                    </div>
                    <div className="column is-8">
                    <Election key = "upcomming" ></Election>
                    </div>
                </div>
            </div>   
        </div>
        )
   }

   renderPastElections = () => {
    return (
        <div>
            <Header name = {this.props.name}></Header>
            <NavBar selectType = {this.selectType} ></NavBar>
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <ElectionList title={this.state.electionType} selectedElection = {this.selectElection}></ElectionList>
                    </div>
                    <div className="column is-8">
                    <Election key = "paste" ></Election>
                    </div>
                </div>
            </div>   
        </div>
        )
   }

    render(){
        if(this.state.electionType === "Current Elections")
        {
            return this.renderCurrentElections();
        }
        else if(this.state.electionType === "Upcomming Elections")
        {
            return this.renderUpComingElections();
        }
        else if(this.state.electionType === "Past Elections")
        {
            return this.renderPastElections();
        }
    }
}

export default Content