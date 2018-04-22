import React from "react";
import Table from "./Table";
import StaticTable from "./StaticTable";
import moment from 'moment';
import * as Servers from '../settings';


class Election extends React.Component {
  constructor(props) {
    super(props);
    this.title = "";
    this.window = "";
    this.voted = false;
    this.state = {
      loading: "",
      confirm:""
    };
  }

  //As users click on an election in the election list, a new prop will be passed in here where we do a new
  //request to grab the election details.
  componentWillReceiveProps(nextProps) {
    if (!nextProps.election) {
      return false;
    }
    var url =
      Servers.API_SERVER + "election/" +
      nextProps.election +
      "?id=" + this.props.voter;
    this.window = "";
    this.propositions = [];
    this.title = nextProps.election;
    this.setState({
      loading: <div className="is-horizontal-center"><i className="fas fa-spinner fa-spin " style={ {'fontSize':'6em'} } ></i></div>
    });
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        this.propositions = json[0].election.propositions;
        var start = json[0].election.startDate;
        var end = json[0].election.endDate;
        var iso = moment(start);
        this.window += (iso.format('MMMM Do YYYY') + " - ");
        iso = moment(end);
        this.window += (iso.format('MMMM Do YYYY'));
        if (this.propositions) {
          this.answers = new Array(this.propositions.length);
        }
        this.selection = json[0].ballot.selections;
        if(this.selection)
        {
          this.voted = true;
        }
        else
        {
          this.voted = false;
        }
        this.setState({
          update: "update",
          loading: ""
        });
      });
  }


  /**
   * Event handler for when the submit button is clicked
   */
  voteHandler = () => {
    // check make sure all propositions have an answer
    for (var i = 0; i < this.answers.length; i++) {
      if (this.answers[i] == null) {
        alert("Please select an option for all propositions");
        return;
      }
    }

    //check for confirmation
    this.setState({
      confirm: (
        <div className="confirm">
          <h1>Confirm your action</h1>
          <p>Are you sure you want to submit your vote?</p>
          <button onClick = {this.cancelHandler}>Cancel</button>
          <button onClick = {this.confirmHandler}>Confirm</button>
        </div>
      )
    });
  };


  cancelHandler = () => {
    this.setState({
      confirm:""
    })
  }

  confirmHandler = () => {
    this.setState({
      confirm:""
    })
    this.vote();
  }

  // vote function makes the request to the backend to store the vote
  vote = () => {
    var url =
      Servers.API_SERVER + "vote?id=" + this.props.voter;
    var payload = {
      election: this.title,
      answers: this.answers
    };
    this.setState({
      loading: <div className="is-horizontal-center"><i className="fas fa-spinner fa-spin " style={ {'fontSize':'6em'} } ></i></div>
    });
    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
      }).then(response => {
        return response.json();
      })
      .then(json => {
        this.voted = true;
        this.selection = this.answers;
        this.setState({
          update: "update",
          loading: ""
        });
      });
  }

  upDateAnswers = (answerIndex, answer) => {
    if (this.answers) {
      this.answers[answerIndex] = answer;
    } else {
      console.log("ERROR, answers is null");
    }
  };

  // renders an election page that allows you to vote
  renderUnvotedElection() {
    var props = [];
    if (this.propositions) {
      for (var i = 0; i < this.propositions.length; i++) {
        props.push(
          <Table
            key={this.title + i}
            answerIndex={i}
            update={this.upDateAnswers}
            question={this.propositions[i].question}
            choices={this.propositions[i].choices}
          />
        );
      }
    }
    if (props.length > 0) {
      if (!this.voted) {
        props.push(
          <a
            key={this.title + "submit"}
            onClick={this.voteHandler}
            className="button is-large"
          >
            Submit
          </a>
        );
      }
    }
    return (
      <div className="has-text-centered is-horizontal-center">
        {this.state.confirm}
        <h1 className="title">{this.title}</h1>
        {this.state.loading}
        <h2 className="subtitle"> {this.window} </h2>
        {props}
      </div>
    );
  }

  // renders an election page that disallows you to vote
  // the selections of the ballots are highlighted
  renderVotedElection() {
    var props = [];
    if (this.propositions) {
      for (var i = 0; i < this.propositions.length; i++) {
        props.push(
          <StaticTable
            key={this.title + i}
            question={this.propositions[i].question}
            choices={this.propositions[i].choices}
            highlightrow={this.selection[i]}
          />
        );
      }
    }
    return (
      <div className="has-text-centered is-horizontal-center">
        <h1 className="title">{this.title}</h1>
        {this.state.loading}
        <h2 className="subtitle"> {this.window} </h2>
        {props}
      </div>
    );
  }

  render() {
    if (this.voted) {
      return this.renderVotedElection();
    } else {
      return this.renderUnvotedElection();
    }
  }
}

export default Election;
