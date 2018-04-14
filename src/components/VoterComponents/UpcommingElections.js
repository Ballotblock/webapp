import React from "react";
import UpcommingElectionBox from "./UpcommingElectionBox";


class UpcommingElections extends React.Component {

    /**
     * This props needs the following props passed in
     * titles : an array of election titles
     * dates : an array of election dates
     * organizations : an array of organizations
     * 
     * Each child component takes the following:
     *    title
     *    date
     *    organization
     */

    render() {
        var boxes = [];
        if(this.props.titles && this.props.dates && this.props.organizations)
        {
          for(var i = 0 ; i <this.props.titles.length ; i++){
            boxes.push(<UpcommingElectionBox key = {this.props.titles[i] + "upcomming"}
              title = {this.props.titles[i]}
              date = {this.props.dates[i]}
              organization = {this.props.organizations[i]}
            ></UpcommingElectionBox>)
          }
        }
        return (
            <div>
              {boxes}
            </div>
        );
    }
}

export default UpcommingElections;
