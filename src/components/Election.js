import React from 'react';
import Table from './Table';

class Election extends React.Component {

  
    constructor(props){
      super(props)
      this.title = ""
      this.window = ""
      this.voted = false;
    }

  //As users click on an election in the election list, a new prop will be passed in here where we do a new 
  //request to grab the election details. 
    componentWillReceiveProps(nextProps){
      var url = "https://ballotblock.azurewebsites.net/api/election/" + nextProps.election + "?id=" + this.props.voter
      this.window = ""
      this.voted = nextProps.hasVoted
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
        this.answers = new Array(this.propositions.length)
        this.setState({"update":"update"}) // call setstate here so component will render updates
      })
    }


  /**
   * Event handler for when the submit button is clicked
   */
    vote = () => {
      // check make sure all propositions have an answer   
      for(var i = 0 ; i < this.answers.length;  i++)
      {
          if(this.answers[i] == null) 
          {
            alert("Please select an option for all propositions")
            return
          }
      }
      //make fetch request
      var url = "http://ballotblock.azurewebsites.net/api/vote?id=" + this.props.voter 
      console.log(this.title) 
      console.log(this.answers)
      var payload = {
        "election" : this.title,
        "answers" : this.answers
      }
      fetch(url, {
        method: "POST",
        body: JSON.stringify(payload)
      }).then( (response) =>{
        return response.json()
      }).then( (json) => {
        this.voted = true;
        alert("vote sucessful, comfirmation box needs to be added")
        this.props.updateMarks(this.props.index)
        this.setState({"update":"update"}) // call setstate here so component will render updates
      })
    }

    upDateAnswers = (answerIndex , answer) => {
      if(this.answers){
        this.answers[answerIndex] = answer
      }
      else
      {
        console.log("ERROR, answers is null")
      }
    }

    render()  {
       var props = []
       if(this.propositions)
       {
          for(var i = 0 ; i < this.propositions.length ; i++)
          {
            props.push(<Table key = {this.title + i} answerIndex = {i} update={this.upDateAnswers} question = {this.propositions[i].question} choices = {this.propositions[i].choices} ></Table>)
          }
       }
       if(props.length > 0)
       {
         if(this.voted)
         {
            props.push(<a key = {this.title + "submit"} className="button is-large"  disabled>Submit</a>)
         }
         else
         {
            props.push(<a key = {this.title + "submit"} className="button is-large" onClick = {this.vote}>Submit</a>)
         }
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