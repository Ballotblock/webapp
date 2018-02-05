import React from 'react';
 


class ElectionList extends React.Component {

    render(){
        return(
        <nav className="panel">
            <p className="panel-heading">
                {this.props.title}
            </p>
            <div className="panel-block">
                <p className="control has-icons-left">
                    <input className="input is-small" type="text" placeholder="search" />
                    <span className="icon is-small is-left">
                        <i className="fa fa-search" />
                    </span>
                </p>
            </div>
            <a className="panel-block is-active">
                ASASU2017 Election
            </a>
        </nav>      
        )
    }
}
 
 export default ElectionList
