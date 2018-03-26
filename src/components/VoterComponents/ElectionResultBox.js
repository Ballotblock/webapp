import React from "react";
import { Chart } from "react-google-charts";

class ElectionResultBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      render: "box"
    };
  }

  /**
   * Below is the event handler for when the "View Results" button is pressed
   */
  viewResultsHandler = () => {
    this.setState({
      render:'chart'
    })
  };

  hideResultsHandler = () => {
    this.setState({
      render:'box'
    })
  }

  renderChart = () => {
    var options = {
      title: "Favorite Shape"
    };

    var data = [["Question", "Votes"], ["Circle", 23], ["Triangle", 12]];

    var options1 = {
      title: "Favorite Color"
    };

    var data1 = [
      ["Question", "Votes"],
      ["Red", 23],
      ["Blue", 12],
      ["Yellow", 24],
      ["Green", 49]
    ];

    return (
      <div className="box" style={{overflowX: 'auto'}} >
        <table className="table">
          <tbody>
            <tr>
              <td>
                <Chart chartType="PieChart" data={data} options={options} />
              </td>
              <td>
                <Chart chartType="PieChart" data={data1} options={options1} />
              </td>
            </tr>
          </tbody>
        </table>
        <button className="button" onClick = {this.hideResultsHandler}>Hide Results </button>
      </div>
    );
  };

  renderBox = () => {
    return (
      <div className="box">
        <article className="media">
          <div className="media-content">
            <div className="content">
              <p>
                <strong>{this.props.title}</strong>
                <br />
                <small>{this.props.date}</small>
                <br />
                <small>Organization: {this.props.organization}</small>
              </p>
            </div>
          </div>
          <div className="media-right">
            <button className="button" onClick={this.viewResultsHandler}>
              View Results
            </button>
          </div>
        </article>
      </div>
    );
  };

  render() {
    if(this.state.render === "box"){
      return this.renderBox();
    }
    else if (this.state.render === "chart"){
      return this.renderChart()
    }
  }
}

export default ElectionResultBox;
