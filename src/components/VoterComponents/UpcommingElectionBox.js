import React from "react";


class UpcommingElectionBox extends React.Component {


    render() {
        return (
            <div className="box">
            <article className="media">
              <div className="media-content">
                <div className="content">
                  <p>  
                    <strong className="has-text-info">{this.props.title}</strong>
                    <br />
                    <small>{this.props.date}</small>
                    <br />
                    <small>Organization: {this.props.organization}</small>  
                  </p>
                </div>
              </div>
            </article>
          </div>
        )
    }
}

export default UpcommingElectionBox;