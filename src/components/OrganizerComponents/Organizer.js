import React from "react";
import Header from "../Header"
import Cookies from 'js-cookie';
import moment from "moment";
import _ from "lodash";
import * as Servers from '../settings'
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Organizer extends React.Component {
    
    constructor(props){
        super(props)
        this.state = {
          page: "createElection"
        }
        this.name = Cookies.get("name")
        this.positions = [
          {
            name: "prop1",
            edit: false,
            choices: [
              {
                name: "choice1",
                edit: false
              }
            ]
          }, 
          {
            name: "prop2",
            edit: false,
            choices: [
              {
                name: "choice1",
                edit: false
              },
              {
                name: "choice2",
                edit: false
              }
            ]
          }
        ]
        this.dates = {
          format: "MM/DD/YYYY"
        }
    }

    addPosition = () =>
    {
      this.positions.push({
        name: "prop" + this.positions.length,
        edit: false,
        choices: ["choice1"]
      })
      this.setState({"update":"update"});
    }

    removePosition = (index) =>
    {
      this.positions.splice(index, 1)
      this.setState({"update":"update"})
    }

    makeRemovePosition = (index) =>
    {
      return(() => this.removePosition(index))
    }

    addChoice = (index) =>
    {
      this.positions[index].choices.push({
        name:"choice"+(this.positions[index].choices.length+1),
        edit:false
      })
      this.setState({"update":"update"});
    }

    makeAddChoice = (index) =>
    {
      return(() => this.addChoice(index))
    }

    removeChoice= (i, j) =>
    {
      this.positions[i].choices.splice(j, 1)
      this.setState({"update":"update"})
    }

    makeRemoveChoice = (i, j) =>
    {
      return(() => this.removeChoice(i,j))
    }

    editPosition = (i) =>
    {
      this.positions[i].edit = !(this.positions[i].edit)
      this.setState({"update":"update"})
    }

    makeEditPosition = (i) =>
    {
      return(() => this.editPosition(i))
    }

    handlePositionChange = (event,i) =>
    {
      this.positions[i].name = event.target.value
    }

    makeHandlePositionChange = (i) =>
    {
      return((event) => this.handlePositionChange(event,i))
    }

    editChoice = (i, j) =>
    {
      this.positions[i].choices[j].edit = !(this.positions[i].choices[j].edit)
      this.setState({"update":"update"})
    }

    makeEditChoice = (i, j) =>
    {
      return(() => this.editChoice(i,j))
    }

    handleChoiceChange = (event,i,j) =>
    {
      this.positions[i].choices[j].name = event.target.value
    }

    makeHandleChoiceChange = (i,j) =>
    {
      return((event) => this.handleChoiceChange(event,i,j))
    }

    makeElectionJson = () =>
    { 

      var outputJson = {
        "electionTitle": "String",
        "propositions": [],
        "startDate": "ISO8601 String",
        "endDate": "ISO8601 String"
      };

      outputJson.electionTitle = this.refs.electionName.value;
      outputJson.startDate = moment(this.refs.dateStart.valueAsDate, this.dates.format).toISOString();
      outputJson.endDate = moment(this.refs.dateEnd.valueAsDate, this.dates.format).toISOString();

      _.forEach(this.positions, function(position){
        var curProp = {
        "question": "String",
        "choices": [],
        "id": "String"//election+question
      }

        curProp.question = position.name;

        curProp.id = outputJson.electionTitle+curProp.question;

        curProp.choices = [];

        _.forEach(position.choices, function(choice){
          curProp.choices.push(choice.name);
        });

        outputJson.propositions.push(curProp);

      });



      return this.createElection(outputJson);
    }


    createElection = (json) => {
      var url = Servers.API_SERVER + "election?id=" + this.name;
      var payload =  json;

      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
      })
        .then(response => {
          //PLEASE CHANGE
            console.log(response.status);
            return response.json();
          })
        .then(json => {
          if (!json) {
            console.log("noJSON")
            return false;
          }
          //below we store a cookie manually on client side

          console.log(json);
          this.setState({page: "createElection"})
          this.positions = [
            {
              name: "prop1",
              edit: false,
              choices: [
                {
                  name: "choice1",
                  edit: false
                }
              ]
            }, 
            {
              name: "prop2",
              edit: false,
              choices: [
                {
                  name: "choice1",
                  edit: false
                },
                {
                  name: "choice2",
                  edit: false
                }
              ]
            }
          ]
          return true;
        });
    };

    updatePage = (pageName) => {
      return (() =>  this.setState({page: pageName}))
    };

    renderCreateElections = () =>
    {
        var foo = []
        var realFoo = []
        var foa = []
        for(var i = 0; i < this.positions.length; i += 1){
            //(a < b) ? 'minor' : 'major'
            foo.push(<div>
              <dt>
              {(this.positions[i].edit) ? <input type="text" onChange={this.makeHandlePositionChange(i)}/>: this.positions[i].name} 
              <button className ="button" type="button" onClick = {this.makeRemovePosition(i)}>-</button>
              <button className ="button" type="button" onClick = {this.makeEditPosition(i)}>EDIT</button>
            </dt>
            <button className = "button" type="button" onClick={this.makeAddChoice(i)}> Add Choice</button></div>)

        for(var j = 0; j < this.positions[i].choices.length; j += 1){
              foa.push(<dd>
                {(this.positions[i].choices[j].edit) ? <input type="text" onChange={this.makeHandleChoiceChange(i,j)} />: this.positions[i].choices[j].name}
                <button className ="button" type="button" onClick = {this.makeRemoveChoice(i,j)}>-</button>
                <button className ="button" type="button" onClick = {this.makeEditChoice(i,j)}>EDIT</button>
              </dd>)
            }
           

            realFoo.push(<div className="box">{foo[i]} {foa}</div>)

            foa = [];
        }
        
        return(
          <div>
            <Header name={this.name}></Header>
            <nav className="navbar">
              <a className="navbar-item selectedRow" >Create Elections</a>
              <a className="navbar-item" onClick={this.updatePage("electionResults")}>Election Results</a>
-           </nav>
            <div className = "section is-horizontal-center" >
              <h1 className = "title">Election Creation</h1>
              <div>
                Election Name <input type="text" ref="electionName"></input>
              </div>
              <div>
                Start Date <input type="date" ref="dateStart"></input>
              </div>
              <div>
                End Date <input type="date" ref="dateEnd"></input>
              </div>
              <dl className= "section is-horizontal-center" >
              <button className ="button"  type="button" onClick = {this.addPosition}> Add Position </button>
              <button className = "button" type = "button"onClick = {this.makeElectionJson} > Create Election </button>
              {realFoo}
            </dl>
            </div>
-         </div>);   
    }

     renderElectionsResult = () =>{
      return(
        <div>
          <Header name={this.name}></Header>
          <nav className="navbar">
            <a className="navbar-item"onClick={this.updatePage("createElection")}>Create Elections</a>
            <a className="navbar-item selectedRow" >Election Results</a>
  -       </nav>
        </div>
      )
     }



    render =  function() {
      // make sure user is logged in 
      if(!this.name){
        return  <Redirect to="/"/>
      }

      //make sure user is a creator
      var type = Cookies.get('type');
      if(!type || type != 2 )
      {
        return  <Redirect to="/"/>
      }

      switch(this.state.page){
        case "createElection":
          return this.renderCreateElections();
        case "electionResults":
          return this.renderElectionsResult();
      }
 
    }
}

export default Organizer;
