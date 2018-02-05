import React from 'react';
import './bulma.css';
import Table from './Table';

class Election extends React.Component {

  constructor(props){
    super(props)
    this.state = {selections :[]};
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