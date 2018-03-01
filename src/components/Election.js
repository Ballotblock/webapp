import React from 'react';
import Table from './Table';

class Election extends React.Component {

  
  constructor(props){
    super(props)
    this.title = ""
    this.window = ""
  }


  //As users click on an election in the election list, a new prop will be passed in here where we do a new 
  //request to grab the election details. 
  componentWillReceiveProps(nextProps){
    var url = "https://ballotblock.azurewebsites.net/api/election/" + nextProps.election + "?id=Alice"
    this.window = ""
    this.title = nextProps.election
    fetch(url).then((response)=>{
      return response.json()
    }).then((json)=>{
      this.propositions = json[0].propositions
      var start = json[0].startDate;
      var end = json[0].endDate;
      var date = new Date(start)
      this.window += (date.getMonth()+1 + "/" + date.getDay() + "/" + date.getFullYear() + " - ")
      date = new Date(end) 
      this.window += (date.getMonth()+1 + "/" + date.getDay() + "/" + date.getFullYear())
      this.setState({"update":"update"}) // call setstate here so component will render updates
    })
  }


    render()  {
       var props = []
       if(this.propositions){
        for(var i = 0 ; i < this.propositions.length ; i++)
        {
          props.push(<Table key = {this.title + i} question = {this.propositions[i].question} choices = {this.propositions[i].choices} ></Table>)
        }
       }
       if(props.length > 0)
       {
         props.push(<a key = "submit" className="button is-large " >Submit</a>)
       }

      return (
            <div className = "has-text-centered">
              <h1 className = "title">{this.title}</h1>
              <h2 className = "subtitle"> {this.window} </h2>
              {props}
            </div>     
      );
    }
  };

  export default Election