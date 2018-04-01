import React from "react";
import Header from "../Header"
import Cookies from 'js-cookie';
import { BrowserRouter as Router, Route, Redirect } from "react-router-dom";

class Organizer extends React.Component {
    
    constructor(props){
        super(props)
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


        var foo = []
        var realFoo = []
        var foa = []
        for(var i = 0; i < this.positions.length; i += 1){
            //(a < b) ? 'minor' : 'major'
            foo.push(<div>
              <dt>
              {(this.positions[i].edit) ? <input type="text" onChange={this.makeHandlePositionChange(i)} />: this.positions[i].name} 
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
              <a className="navbar-item" >Election Results</a>
-           </nav>
            <div className = "section is-horizontal-center" >
              <h1 className = "title">Election Creation</h1>
              <div>
                Election Name <input type="text" name="electionName"></input>
              </div>
              <dl className= "section is-horizontal-center" >
              <button className ="button"  type="button" onClick = {this.addPosition}>Add Position</button>
              <button className = "button" type = "button" > Create Election </button>
              {realFoo}
            </dl>
            </div>
-         </div>);    
    }
}

export default Organizer;