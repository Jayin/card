import React, { PropTypes } from 'react'

class FollowDialog extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            display: props.display
        }
    }

    componentWillReceiveProps(nextProps) {
        this.setState({
            display: nextProps.display
        })
    }

    clickToDissMiss(){
        this.setState({
            display: false
        })
    }

    render () {
        return (
            <div onClick={this.clickToDissMiss.bind(this)} style={{display: this.state.display?'block':'none',position: "absolute", top: '0', left: '0',right: '0', bottom: '0', background: 'rgba(0,0,0,0.65)',textAlign: 'center'}} >
                <img src="../images/qr_code.jpg" style={{position: 'absolute',width: '39%',left: '30%',top: '40%'}}></img>
            </div>
        )
    }
}

export default FollowDialog
