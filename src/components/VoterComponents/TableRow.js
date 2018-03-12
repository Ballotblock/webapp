import React from 'react';


// TableRow is a row in the table, each row contains a choice for the proposition
class TableRow extends React.Component {
  
  rowClick = () => {
    this.props.rowClickHandler(this.props.index);
  }

  render()  {
      var class_name = "normalFont " + this.props.highlight
      return (
        <tr>
            <th className= {class_name} onClick = {this.rowClick} >{this.props.children}</th>
         </tr>
      );
    }
  };

  export default TableRow