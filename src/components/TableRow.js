import React from 'react';

class TableRow extends React.Component {

  render()  {
      return (
        <tr>
            <th className="normalFont">{this.props.children}</th>
            <th><input type="radio" name={this.props.name} /></th>
         </tr>
      );
    }
  };

  export default TableRow