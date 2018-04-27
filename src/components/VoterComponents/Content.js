import React from "react";
import Header from "../Header";
import Election from "./Election";
import NavBar from "./NavBar";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import ElectionList from "./ElectionList";
import ElectionResults from "./ElectionResults";
import UpcommingElections from "./UpcommingElections";
import * as Servers from "../settings";
import moment from "moment";
import Cookies from 'js-cookie';


class Content extends React.Component {
  constructor(props) {
    super(props);

    this.name = Cookies.get("name");
    this.electionTitle = "";
    this.extractUrl()
    this.state = {
      voterId: this.props.voterId,
      electionType: this.type,
      loading: ""
    };
    this.currentIndex = 0;
    
  }

  // extracts all the necessary information from the url
  extractUrl() {
    var urlRoute = this.props.location.pathname;
    var title = urlRoute.substr(urlRoute.lastIndexOf('/') + 1);
    //console.log(title)
    if(title === "Upcoming Elections" || title === "Past Elections"  || title === "Current Elections" ){
      this.type = title
      this.electionTitle = ""
    }
    else{
      urlRoute = urlRoute.substr(0,urlRoute.lastIndexOf('/'))
      var type = urlRoute.substr(urlRoute.lastIndexOf('/') + 1);
      //console.log(type)
      this.type = type
      this.electionTitle = title
    }
  }

  // preform a fetch request to retrieve all current ballots
  componentWillMount(props) {
    // if not logged in, return
    if(!this.name){
      return;
    }
    this.extractUrl()
    if (this.type === "Upcoming Elections") {
      this.getElections("upcomming");
    } else if (this.type === "Past Elections") {
      this.getElections("past");
    } else if (this.type === "Current Elections") {
      this.getElections("current");
    }
  }

  componentDidUpdate(prevProps){
    // check for url updates here
    //console.log(this.props.location.pathname)
    // console.log( prevProps.location.pathname)
    if (this.props.location !== prevProps.location) {
      this.extractUrl()
      // tab update
      console.log("update")
      if (this.electionTitle === "")
      {
        this.titles = [];
        this.dates = [];
        this.currentIndex = 0;
        this.setState({
          electionType: this.type,
          electionIds: []
        });
        if (this.type === "Upcoming Elections") {
          this.getElections("upcomming");
        } else if (this.type === "Past Elections") {
          this.getElections("past");
        } else if (this.type === "Current Elections") {
          this.getElections("current");
        }
      }
      else
      {
        this.setState({
          selectedElection: this.electionTitle
        });
      }
    }
  }

  // preforms requests to get a list of election ids
  // date can either be "current" , "past" , or "upcomming"
  getElections = date => {
    var url = Servers.API_SERVER + "election/" + date;
    this.setState({
      loading: <div className="is-horizontal-center"><i className="fa fa-spinner fa-spin fa-3x" ></i></div>
    });
    //console.log(url);
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var elections = json[0];
        //console.log(json);
        var electionIds = [];
        for (var i = 0; i < elections.length; i++) {
          var eId = elections[i].electionId;
          electionIds.push(eId);
        }
        if (elections[0] && elections[0].organizer) {
          this.dates = [];
          this.organizers = [];
          for (var i = 0; i < elections.length; i++) {
            // get all necessary dates
            var start = elections[i].startDate;
            var end = elections[i].endDate;
            var date = this.formatDate(start, end);
            this.dates.push(date);

            //get all organizers
            var org = elections[i].organizer;
            this.organizers.push(org);
          }
        }


        if(this.electionTitle){
          //console.log(this.electionTitle)
          // check to make sure there is an election in election list
          var index = 0;
          for (var i = 0 ; i < electionIds.length ; i++){
            if(this.electionTitle == electionIds[i]){
              index = i
            }
          }
          this.currentIndex = index;
          this.setState({
            electionIds: electionIds, //array of elections
            selectedElection: electionIds[index], // index of the current selected election, starts with the first election created
            loading: ""
          });
        }
        else{
          this.currentIndex = 0;
          this.setState({
            electionIds: electionIds, //array of elections
            selectedElection: electionIds[0], // index of the current selected election, starts with the first election created
            loading: ""
 
          });
        }
      });
  };

  formatDate = (start, end) => {
    var s = moment(start);
    var e = moment(end);
    return s.format("MMMM Do YYYY") + " - " + e.format("MMMM Do YYYY");
  };

  /*
     * select is the event handler in the ElectionList child component
     * the election list presents a list of clickable elections, clicking on another election
     * would render a new election with different propositions on the right of the list
     * 
     * This is for the current elections tab
     */
  selectElection = (newElection, index) => {
    if(this.currentIndex == index){
      return 
    }
    else{
      this.currentIndex = index;
      this.props.history.push('/voter/' + this.type + "/" + newElection)
    }
     //console.log(this.state.selectedElection) 
    // this.setState({
    //   selectedElection: newElection
    // });
  };

  /**
   *  function called when one of the options on the navigation bar on type is clicked
   */
  selectType = type => {
    if (this.state.electionType !== type) {
      // this below changes the url
      this.props.history.push('/voter/' + type)
    }
  };

  voteHandler = (index, selection) => {
    this.markedBallots[index] = true;
    this.answers[index] = selection;
  };

  renderCurrentElections = () => {
    return (
      <div className="">
        <Header name={this.name} />
        <NavBar selectType={this.selectType} 
           electionType = {this.state.electionType}
        />
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
            <div className="column is-6 is-offset-1">
              <Election
                key={"current"}
                voter={this.name}
                index={this.currentIndex}
                election={this.state.selectedElection}
              />
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderUpComingElections = () => {
    return (
      <div>
        <Header name={this.name} />
        <NavBar selectType={this.selectType} 
        electionType = {this.state.electionType}/>
        <div className="section">
            <h2 className="subtitle is-3 has-text-info">
              Upcoming Elections
            </h2>
          {this.state.loading}
        </div>
        <UpcommingElections
          titles={this.state.electionIds}
          dates={this.dates}
          organizations={this.organizers}
        />
      </div>
    );
  };

  renderPastElections = () => {
    //console.log(this.state.electionIds)
    return (
      <div>
        <Header name={this.name} />
        <NavBar selectType={this.selectType} 
        electionType = {this.state.electionType}/>
        <div className="section">
          <div className="columns">
            <div className="column is-4">
              <ElectionList
                title={this.state.electionType}
                selectedElection={this.selectElection}
                list={this.state.electionIds}
                index = {this.currentIndex}
              />
              {this.state.loading}
            </div>
            <div className="column is-6 is-offset-1">
              <ElectionResults election={this.state.selectedElection} />
            </div>
          </div>
        </div>
      </div>
    );
  };

  render() {

    //check to make sure user has logged in 
    if(!this.name){
      return  <Redirect to="/"/>
    }

    // make sure user is a voter
    var type = Cookies.get('type');
    if(!type || type != 1 )
    {
      return  <Redirect to="/"/>
    }

    if (this.state.electionType === "Current Elections") {
      return this.renderCurrentElections();
    } else if (this.state.electionType === "Upcoming Elections") {
      return this.renderUpComingElections();
    } else if (this.state.electionType === "Past Elections") {
      return this.renderPastElections();
    }
  }
}

export default Content;
