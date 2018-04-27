import React from 'react'


class NavBarElement extends React.Component {
   
   	bar = () =>{
   		this.props.selectItemHandler(this.props.children, this.props.index);
   	}

    render =  function() {
        return (
            <a className = {(this.props.highlighted) ? "navbar-item selectedRow" : "navbar-item"} onClick = {this.bar}>{this.props.children}</a>
        );
    }
}

export default NavBarElement;