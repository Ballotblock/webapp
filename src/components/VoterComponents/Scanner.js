import React from 'react'
import QrReader from 'react-qr-scanner'


// this components takes a property of "title" and "voter"
// it is this title+voter that is checkd against the scanned QR code
class Scanner extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            msg: "",
            color : ""
        }
        this.key = this.props.title + "/" + this.props.voter
    }


    //call back function when something is scanned
    handleScan = (data) =>{
        // console.log(data)
        // console.log(this.key)
        if(data){
            if(data == this.key){
                this.setState({
                    msg:"Your vote is original!",
                    color: "has-text-success"
                })
            }else
            {
                this.setState({
                    msg:"QR code does not match ballot!",
                    color: "has-text-danger"
                })
            }
        }
    }

    handleError = (err) => {
        console.error(err)
    }

    render() {
        const previewStyle = {
            height: 240,
            width: 240,
          }
        return(
            <div> 
                <p> Scan your QR code down below:
                </p>
                <p className={this.state.color}>
                {this.state.msg}
                </p>
                <QrReader
                    delay={2000}
                    style={previewStyle}
                    onError={this.handleError}
                    onScan={this.handleScan}
                />
            </div>
        )
    }
}

export default Scanner;