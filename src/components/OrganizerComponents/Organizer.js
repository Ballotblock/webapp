import React from "react";
import Header from "../Header";
import Cookies from "js-cookie";
import moment from "moment";
import _ from "lodash";
import * as Servers from "../settings";
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import OrganizerElection from "./OrganizerElection";

class Organizer extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      page: "Create",
      loading:""
    };
    this.name = Cookies.get("name");
    this.type = "Create";
    this.positions = [
      {
        name: "",
        choices: [
          {
            name: ""
          }
        ]
      }
    ];
    this.dates = {
      format: "MM/DD/YYYY"
    };
    this.extractUrl()
  }



  // extracts all the necessary information from the url
  extractUrl() {
    var urlRoute = this.props.location.pathname;
    var title = urlRoute.substr(urlRoute.lastIndexOf('/') + 1);
    //console.log(title)
    if(title === "Create" || title === "MyElection"){
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

  componentDidUpdate(prevProps){
    // check for url updates here
    if (this.props.location !== prevProps.location) {
      this.extractUrl()
      //console.log(this.type)
      if (this.electionTitle === "")
      {
        //tab update
        this.setState({page: this.type});    
      }
      else
      {
        console.log("else")
      }
    }
  }

  // below are all the methods of form control

  addPosition = () => {
    //console.log("addPosition");
    this.positions.push({
      name: "",
      choices: [
        {
          name: ""
        }
      ]
    });
    this.setState({ update: "update" });
  };

  removePosition = index => {
    this.positions.splice(index, 1);
    this.setState({ update: "update" });
  };

  makeRemovePosition = index => {
    return () => this.removePosition(index);
  };


  addChoice = (index) => {
    this.positions[index].choices.push({
      name: "new choice",
    })
    this.setState({ "update": "update" });
  }

  makeAddChoice = (index) => {
    return (() => this.addChoice(index))
  }

  removeChoice = (i, j) => {
    this.positions[i].choices.splice(j, 1)
    this.setState({ "update": "update" })
  }

  makeRemoveChoice = (i, j) => {
    return (() => this.removeChoice(i, j))
  }

  handleChoiceChange = (event, i, j) => {
    this.positions[i].choices[j].name = event.target.value
  }

  handlePositionChange = (event, i) => {
    this.positions[i].name = event.target.value
  }

  makeHandlePositionChange = (i) => {
    return ((event) => this.handlePositionChange(event, i))
  }

  handleChoiceChange = (event, i, j) => {
    this.positions[i].choices[j].name = event.target.value
  }

  makeHandleChoiceChange = (i, j) => {
    return ((event) => this.handleChoiceChange(event, i, j))
  }

  makeElectionJson = () => {
    var outputJson = {
      electionTitle: "String",
      propositions: [],
      startDate: "ISO8601 String",
      endDate: "ISO8601 String"
    };

    outputJson.electionTitle = this.refs.electionName.value;
    outputJson.startDate = moment(
      this.refs.dateStart.valueAsDate,
      this.dates.format
    ).toISOString();
    outputJson.endDate = moment(
      this.refs.dateEnd.valueAsDate,
      this.dates.format
    ).toISOString();

    var error = true;
    var errorMsg = "";
    var start = moment(this.refs.dateStart.valueAsDate, this.dates.format);
    var end = moment(this.refs.dateEnd.valueAsDate, this.dates.format);
    var now = moment();
    if (end.dayOfYear() <= now.dayOfYear()) {
      errorMsg =
        "Check your dates, you cannot create elections that have passed";
    } else if (start.dayOfYear() + 2 < now.dayOfYear()) {
      errorMsg =
        "Check your dates, you cannot create elections that have already started";
    } else if (end.dayOfYear() < start.dayOfYear()) {
      errorMsg = "Check your dates, end date must come after start date";
    } else {
      error = false;
    }

    if (error) {
      alert(errorMsg);
      return;
    }

    _.forEach(this.positions, function (position) {
      var curProp = {
        question: "String",
        choices: [],
        id: "String" //election+question
      };

      curProp.question = position.name;

      curProp.id = outputJson.electionTitle + curProp.question;

      curProp.choices = [];

      _.forEach(position.choices, function (choice) {
        curProp.choices.push(choice.name);
      });

      outputJson.propositions.push(curProp);
    });

    return this.createElection(outputJson);
  };

  createElection = json => {
    var url = Servers.API_SERVER + "election?id=" + this.name;
    var payload = json;

    //console.log(payload);

    this.setState({
      loading: <div className="is-horizontal-center"><i className="fas fa-spinner fa-spin " style={ {'font-size':'6em'} } ></i></div>
    })

    fetch(url, {
      method: "POST",
      body: JSON.stringify(payload)
    })
      .then(response => {
        //PLEASE CHANGE
         // console.log(response.status);
          return response.json();
        })
      .then(json => {
        if (!json) {
         // console.log("noJSON")
          return false;
        }
        //console.log(json);
        this.positions = [

        ]
        this.setState({
          loading: "",
          "update":"update"})
        return true;
      });
  };

  updatePage = pageName => {
    this.props.history.push('/organizer/' + pageName)
    //this.setState({ page: pageName });    
  };

  renderCreateElections = () => {
    var propositions = [];
    for (var i = 0; i < this.positions.length; i += 1) {
      //console.log(this.positions[i].name)
      var question =
        <div key={i + "propsTitle"} className="message-header">
          <input key={i + "question " + this.positions[i].name + this.positions[i].choices} className="input" placeholder="Your Question Here" defaultValue={this.positions[i].name} onChange={this.makeHandlePositionChange(i)} />
          <button className="delete" aria-label="delete" onClick={this.makeRemovePosition(i)} />
        </div>;
      var choices = []
      for (var j = 0; j < this.positions[i].choices.length; j += 1) {
        //console.log(this.positions[i].choices[j].name + " index " + j)
        var choiceString = this.positions[i].choices[j].name
        choices.push(<div key={i + " " + j} className="columns">
          <div className="column is-11">
            <input key={i + " " + j + "choices " + choiceString} className="input" placeholder="Your Choice Here" defaultValue={choiceString} onChange={this.makeHandleChoiceChange(i, j)} ></input>
          </div>
          <div className="column is-1"><button className="delete" aria-label="delete" onClick={this.makeRemoveChoice(i, j)} />
          </div>
        </div>)
      }
      var proposition = (
        <div className="box" key={i + "propsArray"}>
          <article className="message">
            {question}
            <div className="message-body">
              {choices}
              <button className="button" type="button" onClick={this.makeAddChoice(i)}> Add Choice</button>
            </div>
          </article>
        </div>);
      propositions.push(proposition);
    }

    return (
      <div>
        <Header name={this.name} />
        <nav className="navbar">
          <a className="navbar-item selectedRow">Create Elections</a>
          <a
            className="navbar-item"
            onClick={(t) =>this.updatePage("MyElection")}
          >
            My Elections
          </a>
        </nav>
        <div className="section ">
          <h1 className="title">Election Creation</h1>
          <div className="field has-addons">
            <div className="control">
              <p className="subtitle right-padding"> Election Name: </p>
            </div>
            <p className="control">
              <input className="input" type="text" ref="electionName" />
            </p>
          </div>
          <div className="field has-addons">
            <div className="control">
              <p className="subtitle right-padding"> Start Date: </p>
            </div>
            <p className="control">
              <input className="input" type="date" ref="dateStart" />
            </p>
          </div>
          <div className="field has-addons">
            <div className="control">
              <p className="subtitle right-padding"> End Date: </p>
            </div>
            <p className="control">
              <input className="input" type="date" ref="dateEnd" />
            </p>
          </div>
          {this.state.loading}
        </div>
        &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
        <button className="button " type="button" onClick={this.addPosition}>
          Add Position
          </button>
        {propositions}
        <div className="section is-horizontal-center">
          <a className="button is-large" onClick={this.makeElectionJson}>
            Create Election
          </a>
        </div>
      </div>
    );
  };

  //() => this.handleSort(column)
  renderElectionsResult = () => {
    return (
      <div>
        <Header name={this.name} />
        <nav className="navbar">
          <a
            className="navbar-item"
            onClick={(t) =>this.updatePage("Create")}
          >
            Create Elections
          </a>
          <a className="navbar-item selectedRow">My Elections</a>
        </nav>
        <OrganizerElection name={this.name} />
      </div>
    );
  };

  render = function () {
    // make sure user is logged in
    if (!this.name) {
      return <Redirect to="/" />;
    }

    //make sure user is a creator
    var type = Cookies.get("type");
    if (!type || type != 2) {
      return <Redirect to="/" />;
    }

    switch (this.state.page) {
      case "Create":
        return this.renderCreateElections();
      case "MyElection":
        return this.renderElectionsResult();
    }
  };
}

export default Organizer;
