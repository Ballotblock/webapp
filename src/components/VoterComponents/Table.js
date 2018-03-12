import React from 'react';
import TableRow from './TableRow'



// Table class holds the information for a single proposition
// It holds a single question, and a list of choices. 
class Table extends React.Component {


  constructor(props){
    super(props)
    this.state = {highlightrow:-1}
  }
  //called when one of the rows in the table is clicked
  rowClickHandler = (index) => {
    this.props.update(this.props.answerIndex, index)
    this.setState({highlightrow:index})
  }

  render()  {
    var rows = []
    if(this.props.choices)
    {
      for(var i = 0 ; i < this.props.choices.length ; i ++)
      {
        var class_name = ""
        if(this.state.highlightrow === i)
        {
          class_name = "selectedRow"
        }
        rows.push(<TableRow name={this.props.question} highlight = {class_name}  key = {i} index = {i} rowClickHandler = {this.rowClickHandler}>{this.props.choices[i]}</TableRow>)
      }
    }
      return (
        <div>
          <table className="table is-fullwidth is-hoverable">
            <thead>
              <tr>
                <td>
                   <abbr>{this.props.question}</abbr>
                </td>
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