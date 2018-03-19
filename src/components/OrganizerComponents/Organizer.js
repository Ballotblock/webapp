import React from "react";
import Header from "../Header"

class Organizer extends React.Component {
    
    constructor(props){
        super(props)
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
                name: "choice1",
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
        var foo = []
        foo.push(<div>Postions <button type="button" onClick = {this.addPosition}>+</button></div>)
        for(var i = 0; i < this.positions.length; i += 1){
            //(a < b) ? 'minor' : 'major'
            foo.push(<dt>
              {(this.positions[i].edit) ? <input type="text" onChange={this.makeHandlePositionChange(i)} />: this.positions[i].name} 
              <button type="button" onClick = {this.makeRemovePosition(i)}>-</button>
              <button type="button" onClick = {this.makeEditPosition(i)}>EDIT</button>
            </dt>)
            foo.push((<div>Choices <button type="button" onClick={this.makeAddChoice(i)}>+</button></div>))
            for(var j = 0; j < this.positions[i].choices.length; j += 1){
              foo.push(<dd>
                {(this.positions[i].choices[j].edit) ? <input type="text" onChange={this.makeHandleChoiceChange(i,j)} />: this.positions[i].choices[j].name}
                <button type="button" onClick = {this.makeRemoveChoice(i,j)}>-</button>
                <button type="button" onClick = {this.makeEditChoice(i,j)}>EDIT</button>
              </dd>)
            }
        }
        
        return(
          <div>
            <Header name={this.props.name}></Header>
            <nav className="navbar">
              <a className="navbar-item selectedRow" >Create Elections</a>
              <a className="navbar-item" >Election Results</a>
-           </nav>
            <div>
              <h1>Election Creation</h1>
              <div>
                Election Name <input type="text" name="electionName"></input>
              </div>
            </div>
            <dl>
              {foo}
            </dl>
-         </div>);    
    }
}

export default Organizer;