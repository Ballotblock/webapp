import React from "react";


class ElectionResultBox extends React.Component {


    render() {
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
                <button className="button">View Results</button>
              </div>
            </article>
          </div>
        )
    }
}

export default ElectionResultBox;