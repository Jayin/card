import React from 'react';
require('./App.css');
import $ from 'jquery';
let loadImage = require('../libs/loadImage')
let DESIGN = require('../design')
import InputDialog from './InputDialog.jsx'
import DesignSelect from './DesignSelect.jsx'
import CanvasRender from '../libs/CanvasRender'


export default class App extends React.Component {
    canvas: null
    ctx: null

    constructor(props) {
        super(props);
        this.state = {
            current: '1',
            showInputdialog: false,
            showDesignSelect: true,
            Resource: DESIGN.Resource
        }
    }

    updateDesign(){
        console.log('updateDesign==>'+this.state.current);
        CanvasRender.renderComponent(this.ctx, this.state.Resource[this.state.current])
        CanvasRender.renderComponent(this.ctx, this.state.Resource['water_mark'])
    }

    componentDidMount () {
        let self = this;
        self.canvas = $('canvas')[0]
        self.ctx = self.canvas.getContext('2d')

        loadImage(DESIGN.Resource, DESIGN.allImages.length, function(newResource) {
            console.log('image load finish!');
            self.setState({
                Resource: newResource
            })

            console.log('cdm');
            console.log(self.state.Resource);
            self.updateDesign()


        })}

    clickSwitch(){
        this.setState({
            showInputdialog: false,
            showDesignSelect: true
        })
    }
    //确认生成新的证书
    onInputChange(inputs){
        console.log('App:onInputChange:');
        console.log(inputs);
        let res = this.state.Resource
        res[this.state.current].inputs = inputs
        this.setState({
            showInputdialog: false,
            Resource: res
        }, function(){

        })
        this.updateDesign()
    }
    /**
     * 更换了设计
     */
    onDesignChange(newDesignItem){
        let res = this.state.Resource
        console.log('change the design item==>');
        console.log(newDesignItem);
        this.setState({
            current: newDesignItem.id,
            showInputdialog: true,
            showDesignSelect: false
        }, function(){
            this.updateDesign()
        })


    }

    render () {
        let res = this.state.Resource
        let inputs = res && res[this.state.current] && res[this.state.current].inputs? res[this.state.current].inputs:[]
        return(
            <div>
                <img src="images/type1.jpg" style={{display: 'none'}}/>
                <canvas id="canvas" width="1044" height="740">
                    Sorry, your browser doesn't support the &lt;canvas&gt; element.
                </canvas>
                <button onClick={this.clickSwitch.bind(this)} style={{background: 'transparent',width: '50%',height: '10%',position: 'absolute',right: '0',top: '50%',border: 'none'}}></button>
                <InputDialog display={this.state.showInputdialog}
                            inputs={inputs}
                            onInputChange={this.onInputChange.bind(this)}>
                </InputDialog>
                <DesignSelect Resource={this.state.Resource} display={this.state.showDesignSelect} onDesignChange={this.onDesignChange.bind(this)}>
                </DesignSelect>
            </div>

        );
    }
}
