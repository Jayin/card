import React from 'react';
import $ from 'jquery';
require('./ShareApp.css');
let loadImage = require('../libs/loadImage')
let DESIGN = require('../design')
import urlparser from '../libs/urlparser'

import CanvasRender from '../libs/CanvasRender'

export default class App extends React.Component {
    canvas: null
    ctx: null
    constructor (props) {
        super(props);
        this.state = {
            current: '1',
            Resource: DESIGN.Resource
        }
    }

    updateDesign () {
        console.log('updateDesign==>' + this.state.current);
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
            }, function(){

                var urlobj = urlparser(window.location.href)
                console.log(urlobj);
                //先异步获取数据
                let data = {
                    id: "xxx",
                    designId: "3",
                    inputs: [
                        '唐杰英'
                    ]
                }
                //不需要的可以不加载
                let res = DESIGN.Resource
                for(let i=0;i<res[data.designId].inputs.length;i++){
                    res[data.designId].inputs[i].value = data.inputs[i]
                }
                self.setState({
                    current: data.designId, //update the design
                    Resource: res
                }, function(){
                    self.updateDesign()
                })


            })
            //先显示，不要让用户等太久
            console.log('cdm');
            console.log(self.state.Resource);
            self.updateDesign()

        })

    }

    render () {
        return(
            <div>
                <canvas id="canvas" width="1044" height="740">
                    Sorry, your browser doesn't support the &lt;canvas&gt; element.
                </canvas>
            </div>

        );
    }
}
