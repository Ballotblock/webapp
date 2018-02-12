import React from 'react';
import Table from './Table';

class Election extends React.Component {

  
  constructor(props){
    super(props)
    this.title = ""
  }


  //As users click on an election in the election list, a new prop will be passed in here where we do a new 
  //request to grab the election details. 
  componentWillReceiveProps(nextProps){
    var url = "https://intermediary.azurewebsites.net/api/election/" + nextProps.election + "/get?id=Alice"
    this.title = nextProps.election
    fetch(url).then((response)=>{
      return response.json()
    }).then((json)=>{
      this.propositions = json[0].propositions
      this.setState({"update":"update"})
    })
  }

    render()  {
       var props = []
       if(this.propositions){
        for(var i = 0 ; i < this.propositions.length ; i++)
        {
          props.push(<Table key = {i} question = {this.propositions[i].question} choices = {this.propositions[i].choices} ></Table>)
        }
       }

      return (
            <div>
              <h1 className = "title">{this.title}</h1>
              {props}
              <a className="button is-block is-large " >Submit</a>
            </div>     
      );
    }
  };

  export default Election