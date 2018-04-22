import React from "react";
import { Chart } from "react-google-charts";
import * as Servers from "../settings";
import ElectionList from "../VoterComponents/ElectionList";
import moment from "moment";

class OrganizerElection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      titles: [],
      start: [],
      end: [],
      ended: false,
      listLoading : "",
      loading: ""
    };
    this.dateFormat = "MM/DD/YYYY";
    this.index = 0;
  }

  componentWillMount() {
    this.getMyElections();
  }

  // preform a request to fetch request to get all the election titles
  getMyElections = () => {
    var url = Servers.API_SERVER + "election/creator/" + this.props.name;
    this.setState({
      listLoading: <div className="is-horizontal-center"><i className="fas fa-spinner fa-spin " style={ {'font-size':'6em'} } ></i></div>
    })
    fetch(url)
      .then(response => {
        return response.json();
      })
      .then(json => {
        var elections = json[0];
        var titless = [];
        var starts = [];
        var ends = [];
        for (var i = 0; i < elections.length; i++) {
          titless.push(elections[i].electionId);
          starts.push(elections[i].startDate);
          ends.push(elections[i].endDate);
        }
        this.setState({
          titles: titless,
          start: starts,
          end: ends,
          listLoading:""
        });
      });
  };

  // get the results of an election
  // does date checking, will not make request if the election has not yet ended
  getResults = index => {
    var now = moment();
    var endDate = this.state.end[index];
    var end = moment(endDate);
    if (now < end) {
      //console.log("election has not ended");
      this.setState({
        ended: false
      });
    }
    // results are fetched below!
    else {
      this.setState({
        loading: <div className="is-horizontal-center"><i className="fas fa-spinner fa-spin " style={ {'font-size':'6em'} } ></i></div>,
        ended: true
      })
      var url =
        Servers.API_SERVER + "election/results/" + this.state.titles[index];
      //console.log(url);
      fetch(url)
        .then(response => {
          return response.json();
        })
        .then(json => {
          this.propositions = json.propositions;
          this.results = json.results;
          this.setState({
            loading:""
          });
        });
    }
  };

  // event handler for when a selection gets clicked
  selectElectionHandler = (newElection, index) => {
    console.log(newElection);
    this.index = index;
    this.getResults(index);
  };

  // render a chart if the election has results
  renderChart = () => {
    // need an array of propositions
    // need an array of results
    var charts = [];
    if (this.propositions) {
      for (var i = 0; i < this.propositions.length; i++) {
        //console.log(this.propositions[i].question)
        var choices = this.propositions[i].choices;
        var answer = this.results.splice(
          0,
          this.propositions[i].choices.length
        );
        //console.log(answer)
        var options = {
          title: this.propositions[i].question
        };

        var data = [["Question", "Votes"]];
        data.push();
        for (var j = 0; j < choices.length; j++) {
          data.push([choices[j], answer[j]]);
        }
        //console.log(data)
        charts.push(
          <Chart chartType="PieChart" data={data} options={options} />
        );
      }
    }
    return (
      <div className="is-horizontal-center">
        <p className="subtitle">{this.title}</p>
        <div className=" box">{charts}
          {this.state.loading}
        </div>
      </div>
    );
  };

  // render a simple box if the election has not ended yet
  renderBox = () => {
    var endDate = moment(this.state.end[this.index]);
    var dateString = endDate.format("MMMM Do YYYY");
    return (
      <div className="section">
        <div className="columns">
          <div className="column is-4">
            <ElectionList
              title={"My Elections"}
              list={this.state.titles}
              selectedElection={this.selectElectionHandler}
              index={this.index}
            />
            {this.state.listLoading}
          </div>
          <div className="column is-8">
            <div className=" box">
              <strong>
                {" Come back on " + dateString + " to view the results"}
              </strong>
            </div>
          </div>
        </div>
      </div>
    );
  };

  renderResults = () => {
    var chart = this.renderChart();
    return (
      <div className="section">
        <div className="columns">
          <div className="column is-4">
            <ElectionList
              title={"My Elections"}
              list={this.state.titles}
              selectedElection={this.selectElectionHandler}
              index={this.index}
            />
            {this.state.listLoading}
          </div>
          <div className="column is-8">
          {chart}
          </div>
        </div>
      </div>
    );
  };

  render() {
    if (this.state.ended) {
      return this.renderResults();
    } else {
      return this.renderBox();
    }
  }
}

export default OrganizerElection;
