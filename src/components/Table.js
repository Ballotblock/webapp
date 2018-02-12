import React from 'react';
import TableRow from './TableRow'



// Table class holds the information for a single proposition
// It holds a single question, and a list of choices. 
class Table extends React.Component {

  render()  {
    var rows = []
    for(var i = 0 ; i < this.props.choices.length ; i ++)
    {
      rows.push(<TableRow name={this.props.question} key = {i} >{this.props.choices[i]}</TableRow>)
    }
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
              {rows}
            </tbody>
          </table>
       </div>
      );
    }
  };

  export default Table