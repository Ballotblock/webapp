import React from 'react'


class NavBarElement extends React.Component {
   
   	bar = () =>{
   		this.props.selectItemHandler(this.props.children, this.props.index);
   		console.log(this.props.children + " Clicked")
   	}

    render =  function() {
        return (

            <a className = {(this.props.highlighted) ? "navbar-item selectedRow has-text-info" : "navbar-item"} onClick = {this.bar}>{this.props.children}</a>

        );
    }
}

export default NavBarElement;