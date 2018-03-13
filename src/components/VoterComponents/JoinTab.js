import React from "react";


class JoinTab extends React.Component {

    render() {
        return (
            <div>
              <div className="box">
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>  
                        <strong>Election 1</strong> 
                        <br />
                        <small> Start Date - End Date</small>
                        <br />
                        <small> Organization: Some Organization 1</small>  
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <button className="button">Join</button>
                  </div>
                </article>
              </div>
              <div className="box">
                <article className="media">
                  <div className="media-content">
                    <div className="content">
                      <p>  
                        <strong>Election 2</strong> 
                        <br />
                        <small> Start Date - End Date</small>
                        <br />
                        <small> Organization: Some Organization 2 </small>  
                      </p>
                    </div>
                  </div>
                  <div className="media-right">
                    <button className="button">Join</button>
                  </div>
                </article>
              </div>
            </div>
        );
    }
}

export default JoinTab;