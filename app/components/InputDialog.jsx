import React, {PropTypes} from 'react'

class InputDialog extends React.Component {
    constructor(props) {
        super(props);
        console.log('constructor');
        console.log(props.onInputChange);
        this.state = {
            inputs : props.inputs || [],
            display: props.display || false,
            onInputChange: props.onInputChange
        }
        console.log(this.state )
    }

    componentWillReceiveProps(nextProps) {
        console.log('componentWillReceiveProps-->');
        console.log(nextProps);
        this.setState({
            inputs : nextProps.inputs || this.state.inputs,
            display: nextProps.display,
            onInputChange: nextProps.onInputChange || this.state.onInputChange
        })
    }

    onInputItemChange(index, evt) {
        var tmp_inputs = this.state.inputs
        tmp_inputs[index].value = evt.target.value
        this.setState({
            inputs: tmp_inputs
        })
    }

    clickCreate(){
        console.log('clickCreate');
        console.log(this.state);
        console.log(this.state.onInputChange);
        if(this.state.onInputChange){
            console.log(this.state.inputs);
            this.state.onInputChange(this.state.inputs)

        }
    }

    render() {
        console.log('input');
        console.log(this.state.inputs);
        let self = this
        var Inputs = this.state.inputs.map(function(input, index){
            return (
                <input key={index} placeholder={input.key} onChange={self.onInputItemChange.bind(self, index)} value={input.value}
                    style={{height: '33px',border: '1px solid #999999',borderRadius: '10px',textAlign: 'center',fontSize: '1.3rem',width: '60%', marginTop: '1%'}}></input>
            )
        })

        return (
            <div style={{position: 'absolute',top: '0',right: '0',bottom: '0',left: '0',background: 'rgba(0, 0, 0, 0.62)', display: (this.state.display?'block':'none')}}>
                    <div style={{width: '74%',maxHeight: '41%', minHeight: '22%',position: 'absolute',left: '13%',top: '30%',background: 'white',
                        textAlign:'center', paddingTop:'10%', paddingBottom:'10%',overflow: 'scroll',borderRadius: '5px'}}>
                        {Inputs}
                        <button
                            onClick={this.clickCreate.bind(this)}
                            style={{background: '#f45e45',color: 'white',borderRadius: '10px',padding: '11px', marginTop: '12%',fontSize: '1.3rem',width: '60%'}}>
                            生成我的逼格证书
                        </button>
                    </div>
            </div>
        )

    }
}

export default InputDialog;
