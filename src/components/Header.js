import React from 'react';

class Header extends React.Component {

    render = function() {
        return (
            <div className="section container">
                <nav className="level">
                    {/* Left side */}
                    
                        <div className="level-item">
                            <h1 className="title level-item is-1">BallotBlock</h1>
                        </div>
                        <h2 id="username">{this.props.name}</h2>
                </nav>
            </div>
        );
    }
}

export default Header