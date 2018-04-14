import React from "react";
import { Chart } from "react-google-charts";
import * as Servers from '../settings';
import ElectionList from "../VoterComponents/ElectionList";
/**
 * This props needs the following props passed in
 * election : title of the election
 *
 */
class OrganizerElection extends React.Component {
    constructor(props) {
        super(props);
    }


    // render a chart if the election has results
    renderChart = () => {
        // need an array of propositions
        // need an array of results
        var charts = []
        if (this.propositions) {
            for (var i = 0; i < this.propositions.length; i++) {
                //console.log(this.propositions[i].question)
                var choices = this.propositions[i].choices
                var answer = this.results.splice(0, this.propositions[i].choices.length)
                //console.log(answer)

                var options = {
                    title: this.propositions[i].question
                }

                var data = [["Question", "Votes"]]
                data.push()
                for (var j = 0; j < choices.length; j++) {
                    data.push([choices[j], answer[j]])
                }
                //console.log(data)
                charts.push(<Chart chartType="PieChart" data={data} options={options} />)
            }
        }

        //console.log(charts)
        return (
            <div className="is-horizontal-center">
                <p className="subtitle">{this.title}</p>
                <div className=" box">
                    {charts}
                </div>
            </div>
        );
    };

    render() {
        return (
            <div className="section">
                <div className="columns">
                    <div className="column is-4">
                        <ElectionList
                            title={"My Elections"}
                        />
                    </div>
                    <div className="column is-8">
                    </div>
                </div>
            </div>
        )
    }
}

export default OrganizerElection;
