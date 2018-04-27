import React from "react";
import { Chart } from "react-google-charts";
import * as Servers from '../settings';
/**
 * This props needs the following props passed in
 * election : title of the election
 *
 */
class ElectionResults extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      loading: ""
    };
  }

  componentWillReceiveProps(nextProps){
    if (!nextProps.election) {
      return false;
    }
    if (this.title === nextProps.election ){
      return false;
    }
    this.propositions = null;
    this.title = nextProps.election
    var url = Servers.API_SERVER + "election/results/" + this.title;
    this.setState({
      loading: <div><i className="fa fa-spinner fa-spin fa-3x" ></i></div>
    })
    //console.log(url)
    fetch(url)
      .then(response => {
        return response.json()
      })
      .then(json => {
        this.propositions = json.propositions;
        this.results = json.results
        this.setState({
          update: "update",
          loading: ""
        });
      })

  }

  renderChart = () => {
    // need an array of propositions
    // need an array of results
    var charts = []
    if(this.propositions){
      for ( var i = 0 ; i < this.propositions.length; i ++){
        //console.log(this.propositions[i].question)
        var choices = this.propositions[i].choices
        var answer = this.results.splice(0,this.propositions[i].choices.length)
        var options = {
          title:this.propositions[i].question
        }
        
        var data = [["Question", "Votes"]]
        data.push()
        for(var j = 0 ; j < choices.length ; j ++){
          data.push( [choices[j],answer[j]])
        }
        //console.log(data)
        charts.push(<Chart chartType="PieChart" data={data} options={options} />)
      }
    }
    //console.log(charts)
    return (
      <div className="is-horizontal-center">
        <h2 className="subtitle is-3 has-text-info">{this.title}</h2>
        <div className="box">
          {charts}
          {this.state.loading}
        </div>
      </div>
    );
  };

  render() {
    return this.renderChart();
  }
}

export default ElectionResults;
