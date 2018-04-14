import React from "react";
import Header from "../Header"
import Cookies from 'js-cookie';
import moment from "moment";
import _ from "lodash";
import * as Servers from '../settings'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";
import OrganizerElection from "./OrganizerElection";

class Organizer extends React.Component {

  constructor(props) {
    super(props)
    this.state = {
      page: "createElection"
    }
    this.name = Cookies.get("name")
    this.positions = [
      {
        name: "prop",
        choices: [
          {
            name: "choice1"
          }]
      }
    ]
    this.dates = {
      format: "MM/DD/YYYY"
    }
  }

  addPosition = () => {
    console.log('addPosition')
    this.positions.push({
      name: "prop" + this.positions.length,
      choices: [
        {
          name: "choice1"
        }]
    })
    this.setState({ "update": "update" });
  }

  removePosition = (index) => {
    this.positions.splice(index, 1)
    this.setState({ "update": "update" })
  }

  makeRemovePosition = (index) => {
    return (() => this.removePosition(index))
  }

  addChoice = (index) => {
    this.positions[index].choices.push({
      name: "new choice",
      edit: false
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

  editPosition = (i) => {
    this.positions[i].edit = !(this.positions[i].edit)
    this.setState({ "update": "update" })
  }

  makeEditPosition = (i) => {
    return (() => this.editPosition(i))
  }

  handlePositionChange = (event, i) => {
    this.positions[i].name = event.target.value
  }

  makeHandlePositionChange = (i) => {
    return ((event) => this.handlePositionChange(event, i))
  }

  editChoice = (i, j) => {
    this.positions[i].choices[j].edit = !(this.positions[i].choices[j].edit)
    this.setState({ "update": "update" })
  }

  makeEditChoice = (i, j) => {
    return (() => this.editChoice(i, j))
  }

  handleChoiceChange = (event, i, j) => {
    this.positions[i].choices[j].name = event.target.value
  }

  makeHandleChoiceChange = (i, j) => {
    return ((event) => this.handleChoiceChange(event, i, j))
  }

  makeElectionJson = () => {

    var outputJson = {
      "electionTitle": "String",
      "propositions": [],
      "startDate": "ISO8601 String",
      "endDate": "ISO8601 String"
    };

    outputJson.electionTitle = this.refs.electionName.value;
    outputJson.startDate = moment(this.refs.dateStart.valueAsDate, this.dates.format).toISOString();
    outputJson.endDate = moment(this.refs.dateEnd.valueAsDate, this.dates.format).toISOString();

    var error = true;
    var errorMsg = "";
    var start = moment(this.refs.dateStart.valueAsDate, this.dates.format);
    var end = moment(this.refs.dateEnd.valueAsDate, this.dates.format);
    var now = moment();
    if (end.dayOfYear() <= now.dayOfYear()) {
      errorMsg = "Check your dates, you cannot create elections that have passed"
    }
    else if (start.dayOfYear() + 1 < now.dayOfYear()) {
      errorMsg = "Check your dates, you cannot create elections that have already started"
    }
    else if (end.dayOfYear() < start.dayOfYear()) {
      errorMsg = "Check your dates, end date must come after start date"
    }
    else {
      error = false;
    }

    if (error) {
      alert(errorMsg)
      return
    }

    _.forEach(this.positions, function (position) {
      var curProp = {
        "question": "String",
        "choices": [],
        "id": "String"//election+question
      }

      curProp.question = position.name;

      curProp.id = outputJson.electionTitle + curProp.question;

      curProp.choices = [];

      _.forEach(position.choices, function (choice) {
        curProp.choices.push(choice.name);
      });

      outputJson.propositions.push(curProp);

    });



    return this.createElection(outputJson);
  }

  createElection = (json) => {
    var url = Servers.API_SERVER + "election?id=" + this.name;
    var payload = json;

    console.log(payload)
    // fetch(url, {
    //   method: "POST",
    //   body: JSON.stringify(payload)
    // })
    //   .then(response => {
    //     //PLEASE CHANGE
    //       console.log(response.status);
    //       return response.json();
    //     })
    //   .then(json => {
    //     if (!json) {
    //       console.log("noJSON")
    //       return false;
    //     }
    //     console.log(json);
    //     this.positions = [

    //     ]
    //     this.setState({"update":"update"})
    //     return true;
    //   });
  };

  updatePage = (pageName) => {
    return (() => this.setState({ page: pageName }))
  };

  renderCreateElections = () => {
    var foo = []
    var realFoo = []
    var foa = []
    for (var i = 0; i < this.positions.length; i += 1) {
      //(a < b) ? 'minor' : 'major'
      foo.push(<div>
        <dt>
          {(this.positions[i].edit) ? <input type="text" onChange={this.makeHandlePositionChange(i)} /> : this.positions[i].name}
          <button className="button" type="button" onClick={this.makeRemovePosition(i)}>-</button>
        </dt>
        <button className="button" type="button" onClick={this.makeAddChoice(i)}> Add Choice</button></div>)

      for (var j = 0; j < this.positions[i].choices.length; j += 1) {
        foa.push(<dd>
          {(this.positions[i].choices[j].edit) ? <input type="text" onChange={this.makeHandleChoiceChange(i, j)} /> : this.positions[i].choices[j].name}
          <button className="button" type="button" onClick={this.makeRemoveChoice(i, j)}>-</button>
        </dd>)
      }
      realFoo.push(<div className="box ">{foo[i]} {foa}</div>)
      foa = [];
    }

    return (
      <div>
        <Header name={this.name}></Header>
        <nav className="navbar">
          <a className="navbar-item selectedRow" >Create Elections</a>
          <a className="navbar-item" onClick={this.updatePage("electionResults")}>Election Results</a>
        </nav>
        <div className="section is-horizontal-center" >
          <h1 className="title">Election Creation</h1>
          <div>
            Election Name <input type="text" ref="electionName"></input>
          </div>
          <div>
            Start Date <input type="date" ref="dateStart"></input>
          </div>
          <div>
            End Date <input type="date" ref="dateEnd"></input>
          </div>
          <dl className="section is-horizontal-center" >
            <button className="button" type="button" onClick={this.addPosition}> Add Position </button>
            <button className="button" type="button" onClick={this.makeElectionJson} > Create Election </button>
            {realFoo}
          </dl>
        </div>
      </div>);
  }

  renderElectionsResult = () => {
    return (
      <div>
        <Header name={this.name}></Header>
        <nav className="navbar">
          <a className="navbar-item" onClick={this.updatePage("createElection")}>Create Elections</a>
          <a className="navbar-item selectedRow" >Election Results</a>
        </nav>
        <OrganizerElection/>
      </div>
    )
  }



  render = function () {
    // make sure user is logged in 
    if (!this.name) {
      return <Redirect to="/" />
    }

    //make sure user is a creator
    var type = Cookies.get('type');
    if (!type || type != 2) {
      return <Redirect to="/" />
    }

    switch (this.state.page) {
      case "createElection":
        return this.renderCreateElections();
      case "electionResults":
        return this.renderElectionsResult();
    }

  }
}

export default Organizer;
