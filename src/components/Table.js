import React from 'react';
import './bulma.css';

class Table extends React.Component {

  render()  {
      return (
        <div>
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <th><abbr>{this.props.question}</abbr></th>
                <th><abbr /></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th className="normalFont">Candidate 1</th>
                <th><input type="radio" name={this.props.question} /></th>
              </tr>
              <tr>
                <th className="normalFont">Candidate 2</th>
                <th><input type="radio" name={this.props.question} /></th>
              </tr>
              <tr>
                <th className="normalFont">Candidate 3</th>
                <th><input type="radio" name= {this.props.question} /></th>
              </tr>
            </tbody>
          </table>
       </div>
      );
    }
  };

  export default Table