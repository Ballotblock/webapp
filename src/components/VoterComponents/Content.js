import React from "react";
import Header from "../Header";
import Election from "./Election";
import NavBar from "./NavBar";
import ElectionList from "./ElectionList";

class Content extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      voterId: this.props.voterId,
      electionType: "Current Elections",
      loading: ""
    };
    this.currentIndex = 0;
  }

  // preform a fetch request to retrieve all of a users' ballot
  componentWillMount(props) {
    var url =
      "https://ballotblock.azurewebsites.net/api/election?id=" +
      this.props.voterId;
    this.setState({
      loading: <div className="loading" />
    });  
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var ballots = json[0];
        var electionIds = [];
        this.markedBallots = [];
        this.answers = [];
        for (var i = 0; i < ballots.length; i++) {
          var eId = this.extractElectionId(ballots[i].ballotId);
          var mark = ballots[i].marked;
          this.markedBallots.push(mark);
          this.answers.push(ballots[i].selections);
          electionIds.push(eId);
        }
        this.setState({
          electionIds: electionIds, //array of elections
          selectedElection: electionIds[0], // index of the current selected election, starts with the first election created
          loading: ""
        });
      });
  }

  // takes the ballotId and extracts the electionId
  extractElectionId = ballotId => {
    var electionId = ballotId.split("_");
    return electionId[1];
  };

  /*
    * select is the event handler in the ElectionList child component
    * the election list presents a list of clickable elections, clicking on another election
    * would render a new election with different propositions on the right of the list
     */
  selectElection = (newElection, index) => {
    this.currentIndex = index;
    this.setState({ selectedElection: newElection });
  };

  /**
   *  function called when one of the options on the navigation bar on type is clicked
   */
  selectType = type => {
    if (this.state.electionType !== type) {
      this.setState({ electionType: type });
    }
  };

  voteHandler = (index, selection) => {
    this.markedBallots[index] = true;
    this.answers[index] = selection;
  };

  renderCurrentElections = () => {
    var hasVoted = false;
    var selection = "";
    if (this.markedBallots) {
      if (this.markedBallots[this.currentIndex]) {
        hasVoted = true;
      }
    }
    if (this.answers) {
      if (this.answers[this.currentIndex]) {
        selection = this.answers[this.currentIndex];
      }
    }
    return (
      <div>
        <Header name={this.props.name} />
        <NavBar selectType={this.selectType} />
        <div className="section">
          <div className="columns">
            <div className="column is-4">
              <ElectionList
                title={this.state.electionType}
                selectedElection={this.selectElection}
                list={this.state.electionIds}
              />
              {this.state.loading}
            </div>
            <div className="column is-8">
              <Election
                key={"current"}
                voter={this.props.voterId}
                updateMarks={this.voteHandler}
                index={this.currentIndex}
                selection={selection}
                hasVoted={hasVoted}
                election={this.state.selectedElection}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  /**
   * Note that the up comming elections and past elections just return blank pages for now
   * TODO : separate the dates of the ballots into the appropriate categories so they can be
   *           rendered in the correct tab
   */
  renderUpComingElections = () => {
    return (
      <div>
        <Header name={this.props.name} />
        <NavBar selectType={this.selectType} />
        <div className="section">
          <div className="columns">
            <div className="column is-4">
              <ElectionList
                title={this.state.electionType}
                selectedElection={this.selectElection}
              />
            </div>
            <div className="column is-8">
              <Election key="upcomming" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderPastElections = () => {
    return (
      <div>
        <Header name={this.props.name} />
        <NavBar selectType={this.selectType} />
        <div className="section">
          <div className="columns">
            <div className="column is-4">
              <ElectionList
                title={this.state.electionType}
                selectedElection={this.selectElection}
              />
            </div>
            <div className="column is-8">
              <Election key="paste" />
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderJoinElections = () => {
    return (
      <div>
        <Header name={this.props.name} />
        <NavBar selectType={this.selectType} />
        <div className="section">
          <div className="columns">
            <div className="column is-4">
              <ElectionList
                title={this.state.electionType}
                selectedElection={this.selectElection}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.electionType === "Current Elections") {
      return this.renderCurrentElections();
    } else if (this.state.electionType === "Upcomming Elections") {
      return this.renderUpComingElections();
    } else if (this.state.electionType === "Past Elections") {
      return this.renderPastElections();
    } else if (this.state.electionType === "Join Elections") {
      return this.renderJoinElections();
    }
  }
}

export default Content;
