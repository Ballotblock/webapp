import React from 'react';
import './bulma.css';
import NavBar from './NavBar';
import Table from './Table';

class Election extends React.Component {

  constructor(props){
    super(props)
    this.state = {selections :[]};
  }

  componentWillMount() {
    //preform fetch request to get all the necessary data about the election
    // example url for election data url = "http://40.112.150.44:3000/api/elections/ASASU2017%20Election"
    var electionId = this.props.election;
    console.log(electionId);
  }
    render()  {
      return (
            <div>
              <Table question = "Senator for Barett Honors College"></Table>
              <Table question = "Senator for Ira A Fulton Schools"></Table>
              <a className="button is-block is-large " >Submit</a>
            </div>     
      );
    }
  };

  export default Election