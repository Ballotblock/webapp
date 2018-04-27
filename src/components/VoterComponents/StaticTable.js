import React from 'react';


// A non editable table to show elections that have been voted upon
class StaticTable extends React.Component {
    render()  {
      var rows = []
      if(this.props.choices)
      {
        for(var i = 0 ; i < this.props.choices.length ; i ++)
        {
          var class_name = "normalFont"
          if(this.props.highlightrow === i)
          {
            class_name += " selectRow"
          }
          rows.push(<tr key={i+this.props.question}>
              <th className={class_name}>{this.props.choices[i]}</th>
          </tr>)
        }
      }
        return (
          <div>
            <table  className="table is-fullwidth">
              <thead>
                <tr>
                  <td>
                     <abbr>{this.props.question}</abbr>
                  </td>
                </tr>
              </thead>
              <tbody >
                {rows}
              </tbody>
            </table>
         </div>
        );
      }
    };
  
    export default StaticTable