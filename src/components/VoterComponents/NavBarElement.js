import React from 'react'


class NavBarElement extends React.Component {
   
   	bar = () =>{
   		this.props.selectItemHandler(this.props.children, this.props.index);
   		console.log(this.props.children + " Clicked")
   	}

    render =  function() {
        console.log(this.props.highlighted);
        return (
            <a className = {(this.props.highlighted) ? "navbar-item selectedRow" : "navbar-item"} onClick = {this.bar}>{this.props.children}</a>
        );
    }
}

export default NavBarElement;