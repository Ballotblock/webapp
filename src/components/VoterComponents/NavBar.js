import React from 'react';
import NavBarElement from "./NavBarElement"

class NavBar extends React.Component {

    constructor(props){
        super(props)
        this.tabNames = ["Current Elections","Upcoming Elections","Past Elections"]
        this.currentSelection = 0
    }

    selectItem = (type, index) =>
    {
        this.currentSelection = index
        this.props.selectType(type);
        this.setState({"update":"update"});
    }

    componentWillReceiveProps(nextProps)
    {
        // set the index based on the passed in type
        for (var i = 0 ; i < this.tabNames.length ; i ++)
        {
            if(nextProps.electionType === this.tabNames[i]){
                this.currentSelection = i
                this.setState({"update":"update"});
            }
        }
    }

    render=  function() {
        var tabs = []

        for(var i = 0; i < this.tabNames.length; i += 1){
            //(a < b) ? 'minor' : 'major'
            tabs.push(<NavBarElement key={"nav" + this.tabNames[i]} highlighted = {(this.currentSelection === i)} index = {i} selectItemHandler = {this.selectItem}>{this.tabNames[i]}</NavBarElement>)
        }
            
        return (
            <nav className="navbar">
                {tabs}
            </nav>
        );
    }
}

export default NavBar;