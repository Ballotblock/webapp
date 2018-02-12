import React from 'react';

import Header from "./Header";
import Election from "./Election"
import NavBar from "./NavBar";
import ElectionList from './ElectionList';

class Content extends React.Component {

    constructor(props){
        super(props)
        this.state = {selectedElection:"ASASU2017 Election",
                        voterId : this.props.voterId};
      }

    // preform a fetch request to retrieve all of a users ballot
    componentWillMount(props){
        var url = "https://intermediary.azurewebsites.net/api/election/list?id=Alice"
        fetch(url).then((response)=>{
            return response.json()
          }).then((json)=>{
            var ballots = json[0]
            var electionIds = []
            for(var i = 0 ; i < ballots.length ; i ++)
            {
                var eId = this.extractElectionId(ballots[i].ballotId)
                console.log(eId)
                electionIds.push(eId)
            }
            this.setState({electionIds:electionIds})
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
    select = (newElection) => {
        this.setState({selectedElection:newElection})
    }

    render(){
        return (
        <div>
            <Header name = {this.props.name}></Header>
            <NavBar></NavBar>
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <ElectionList title="Current Elections" selectedElection = {this.select} list = {this.state.electionIds} ></ElectionList>
                    </div>
                    <div className="column is-8">
                    <Election election = {this.state.selectedElection}></Election>
                    </div>
                </div>
            </div>   
        </div>
        )
    }
}

export default Content