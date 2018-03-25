import React from "react";
import Header from "../Header";
import Election from "./Election";
import NavBar from "./NavBar";
import { Router, Route } from "react-router";
import ElectionList from "./ElectionList";
import ElectionResults from "./ElectionResults";
import * as Servers from "../settings";
import moment from 'moment';

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

  // preform a fetch request to retrieve all current ballots
  componentWillMount(props) {
    this.getElections("current")
  }

  // preforms requests to get a list of election ids
  // date can either be "current" , "past" , or "upcomming"
  getElections = (date) => {
    var url = Servers.API_SERVER + "election/" + date;
    this.setState({
      loading: <div className="loading" />
    });
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var elections = json[0];
        console.log(json);
        var electionIds = [];
        for (var i = 0; i < elections.length; i++) {
          var eId = elections[i].electionId;
          electionIds.push(eId);
        }
        if(elections[0].organizer){
            this.dates = [];
            this.organizers = [];
            for (var i = 0; i < elections.length; i++) {

                // get all necessary dates
                 var start = elections[i].startDate;
                 var end = elections[i].endDate;
                 var date = this.formatDate(start,end);
                 this.dates.push(date);
                
                //get all organizers
                var resource = elections[i].organizer;
                var org = this.extractOrganizer(resource);
                this.organizers.push(org);
              }
        }
        this.setState({
          electionIds: electionIds, //array of elections
          selectedElection: electionIds[0], // index of the current selected election, starts with the first election created
          loading: ""
        });
      });
  };


  formatDate = (start,end) => {
      var s = moment(start);
      var e = moment(end);
      return (s.format('MMMM Do YYYY') + " - " + e.format('MMMM Do YYYY'));
  }

  extractOrganizer = (resource) => {
    return resource.split('#')[1];
  }

  /*
     * select is the event handler in the ElectionList child component
     * the election list presents a list of clickable elections, clicking on another election
     * would render a new election with different propositions on the right of the list
     * 
     * This is for the current elections tab
     */
  selectElection = (newElection, index) => {
    this.currentIndex = index;
    this.setState({
      selectedElection: newElection
    });
  };

  /**
   *  function called when one of the options on the navigation bar on type is clicked
   */
  selectType = type => {
    if (this.state.electionType !== type) {
      this.setState({
        electionType: type
      });

      if (type === "Upcomming Elections") {
      } else if (type === "Past Elections") {
        this.getElections("past");
      } else if (type === "Current Elections") {
        this.getElections("current");
      }
    }
  };

  voteHandler = (index, selection) => {
    this.markedBallots[index] = true;
    this.answers[index] = selection;
  };

  renderCurrentElections = () => {
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
                index={this.currentIndex}
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
          <div className="panel-block">
            <p className="control has-icons-left">
              <input
                className="input is-small"
                type="text"
                placeholder="search"
              />
              <span className="icon is-small is-left">
                <i className="fa fa-search" />
              </span>
            </p>
          </div>
        </div>
        <ElectionResults 
        titles = {this.state.electionIds}
        dates = {this.dates}
        organizations = {this.organizers}
        />
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
    }
  }
}

export default Content;
