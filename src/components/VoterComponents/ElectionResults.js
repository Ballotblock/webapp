import React from "react";
import { Chart } from "react-google-charts";

/**
 * This props needs the following props passed in
 * election : title of the election
 *
 */
class ElectionResults extends React.Component {
  constructor(props) {
    super(props);
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
      <div className="is-horizontal-center">
        <p className="subtitle">{this.props.election}</p>
        <div className=" box">
          <Chart chartType="PieChart" data={data} options={options} />
          <Chart chartType="PieChart" data={data1} options={options1} />
        </div>
      </div>
    );
  };

  render() {
    return this.renderChart();
  }
}

export default ElectionResults;
