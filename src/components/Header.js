import React from 'react';
import './bulma.css';

class Header extends React.Component {

    render = function() {
        return (
            <div className="section container">
                <nav className="level">
                    {/* Left side */}
                    <div className="level-left">
                        <div className="level-item">
                            <h1 className="title level-item is-1">Ballotblock</h1>
                        </div>
                    </div>
                    <div className="level-right">
                        <h2 id="username">{this.props.name}</h2>
                    </div>
                </nav>
            </div>
        );
    }
}

export default Header