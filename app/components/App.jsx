import React from 'react';
import $ from 'jquery';
require('./App.css');
require('./normalize.css')
let loadImage = require('../libs/loadImage')
let DESIGN = require('../design')
import urlparser from '../libs/urlparser'
import CanvasRender from '../libs/CanvasRender'
import InputDialog from './InputDialog.jsx'
import DesignSelect from './DesignSelect.jsx'
import AV from 'avoscloud-sdk'

//参数依次为 AppId, AppKey
AV.initialize('Q6RJwINXFrWH20wvODUvxzXE-gzGzoHsz', 'jg9rHTU3IVMgXWyjpdhv4Xun');
// 创建AV.Object子类.
// 该语句应该只声明一次
let CampaignDesign = AV.Object.extend('CampaignDesign')
let CampaignDesignLove = AV.Object.extend('CampaignDesignLove')

export default class App extends React.Component {
    constructor (props) {
        super(props);
        this.canvas = null
        this.ctx = null
        this.state = {
            current: '1',
            showInputdialog: false,
            showDesignSelect: false,
            Resource: DESIGN.Resource,
            campaignDesignLoveCount: 0,
            previewImageUrl: 'http://cardcdn1.fenxiangbei.com/designs/1.jpg'
        }
    }

    updateDesign () {
        console.log('updateDesign==>' + this.state.current);
        // CanvasRender.renderDesign(this.canvas, this.state.Resource[this.state.current])
        // CanvasRender.renderComonent(this.canvas, this.state.Resource['water_mark'])
        // $('#preview-image')[0].src = this.canvas.toDataURL('image/png')
    }

    componentDidMount () {
        let self = this;
        self.canvas = $('canvas')[0]
        self.ctx = self.canvas.getContext('2d')

        loadImage(DESIGN.Resource, DESIGN.allRequiredImages.length, function(newResource) {
            console.log('image load finish!');
            self.setState({
                Resource: newResource
            }, function(){

                var urlobj = urlparser(window.location.href)
                console.log(urlobj);
                //没有design
                if(!urlobj.search.id){
                    console.log("no search.id...");
                    return
                }
                //替换设计
                // $('#preview-image')[0].src  = `http://cardcdn1.fenxiangbei.com/designs/${urlobj.search.id}.jpg`
                self.setState({
                    previewImageUrl: `http://cardcdn1.fenxiangbei.com/designs/${urlobj.search.id}.jpg`
                })
                //获取设计并渲染
                // var query = new AV.Query(CampaignDesign);
                // query.get(urlobj.search.id, {
                //   success: function(campaignDesign) {
                //       console.log('query data:');
                //       console.log(campaignDesign);
                //     // 成功获得实例
                //     // var content = post.get('content');
                //     // var username = post.get('pubUser');
                //     // var pubTimestamp = post.get('pubTimestamp');
                //     //先异步获取数据
                //     let data = {
                //         id: urlobj.search.id,
                //         designId: campaignDesign.get('designId'),
                //         inputs: campaignDesign.get('inputs')
                //     }
                //     console.log(data);
                //     //不需要的可以不加载
                //     let res = DESIGN.Resource
                //     for(let i=0;i<res[data.designId].inputs.length;i++){
                //         res[data.designId].inputs[i].value = data.inputs[i]
                //     }
                //     self.setState({
                //         current: data.designId, //update the design
                //         Resource: res
                //     }, function(){
                //         self.updateDesign()
                //     })

                //   },
                //   error: function(error) {
                //     // 失败了.
                //     alert('获取数据失败')
                //   }
                // })


            })
            //先显示，不要让用户等太久
            console.log('cdm');
            console.log(self.state.Resource);
            self.updateDesign()
            // $('#preview-image')[0].src = self.canvas.toDataURL('image/png')
        })

        this.fetchCampaignDesignLoveCount()
    }

    fetchCampaignDesignLoveCount(){
        let self = this
        let urlobj = urlparser(window.location.href)
        //没有design
        if(!urlobj.search.id){
            console.log("no search.id...");
            return
        }
        let query = new AV.Query(CampaignDesignLove);
        query.equalTo('campaignDesignId', urlobj.search.id);
        query.count({
          success: function(count) {
            // 成功了
            console.log('有' + count + ' 条赞');
            self.setState({
                campaignDesignLoveCount: count
            })
          },
          error: function(error) {
            // 失败了
          }
        });
    }

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
            this.updateDesign()
            this.createCampaignDesign()
        })
        
    }

    createCampaignDesign(){
        console.log("createCampaignDesign")
        let item =  this.state.Resource[this.state.current]

        let campaignDesign = CampaignDesign.new({
            designId: item.id, //设计id
            inputs: item.inputs.map(function(input){ //输入新
                return input.value
            })
        })

        campaignDesign.save(null, {
          success: function(campaignDesign) {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + campaignDesign.id);
            // window.location = 'index.html?id='+campaignDesign.id
            $.ajax({
                method: 'GET',
                url: 'http://api.fenxiangbei.com:3000/?CampaignDesignId='+campaignDesign.id,
                success: function(res){
                    console.log('已创建图片:' + campaignDesign.id);
                    window.location.href = 'index.html?id='+campaignDesign.id
                },
                error: function(){
                    alert('系统繁忙，请稍后再试!')
                }
                
            })
          },
          error: function(campaignDesign, error) {
            // 失败之后执行其他逻辑
            // error 是 AV.Error 的实例，包含有错误码和描述信息.
            console.log('Failed to create new object, with error message: ' + error.message);
          }
        })
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

    clickDesignLove(){
        let self = this
        let urlobj = urlparser(window.location.href)
        //没有design
        if(!urlobj.search.id){
            console.log("no search.id...");
            return
        }
        let campaignDesignLove = CampaignDesignLove.new({
            campaignDesignId: urlobj.search.id
        })

        campaignDesignLove.save(null, {
          success: function(campaignDesignLove) {
            // 成功保存之后，执行其他逻辑.
            console.log('New object created with objectId: ' + campaignDesignLove.id);
            self.fetchCampaignDesignLoveCount()
          },
          error: function(post, error) {
            // 失败之后执行其他逻辑
            // error 是 AV.Error 的实例，包含有错误码和描述信息.
            console.log('Failed to create new object, with error message: ' + error.message);
          }
        });
    }

    clickGoDesign(){
        this.setState({
            showInputdialog: false,
            showDesignSelect: true
        })
    }

    clickGoArticle(){
        window.location.href = 'http://mp.weixin.qq.com/s?__biz=MzA4MTc1Mjc0MA==&mid=400816795&idx=1&sn=fc96d16859775366f6ce91b0923298f1#rd'
    }

    clickAD() {
        window.location = 'http://fenxiangbei.com/'
    }

    render () {
        console.log(this.state.previewImageUrl)
        let res = this.state.Resource
        let inputs = res && res[this.state.current] && res[this.state.current].inputs? res[this.state.current].inputs:[]
        return(
            <div>
                <img id="preview-image" src={this.state.previewImageUrl}/>
                <canvas id="canvas" width="522" height="370" style={{display: 'none'}}>
                </canvas>
                <button style={{background: 'transparent',width: '20%',height: '7%',position: 'absolute',left: '22%',top: '50%',border: 'none'}}>
                    <div style={{color: 'white', fontSize: '1.2rem'}}>{this.state.campaignDesignLoveCount}</div>
                </button>
                <button onClick={this.clickDesignLove.bind(this)} style={{background: 'transparent',width: '100%',height: '7%',position: 'absolute',left: '0',top: '50%',border: 'none'}}></button>
                <button onClick={this.clickGoDesign.bind(this)} style={{background: 'transparent',width: '100%',height: '10%',position: 'absolute',left: '0',top: '60%',border: 'none'}}></button>
                <button onClick={this.clickGoArticle.bind(this)} style={{background: 'transparent',width: '100%',height: '10%',position: 'absolute',left: '0',top: '71%',border: 'none'}}></button>
                <InputDialog display={this.state.showInputdialog}
                            inputs={inputs}
                            onInputChange={this.onInputChange.bind(this)}>
                </InputDialog>
                <DesignSelect Resource={this.state.Resource} display={this.state.showDesignSelect} onDesignChange={this.onDesignChange.bind(this)}>
                </DesignSelect>
                <img  src="http://h5.fenxiangbei.com/card/images/ad.jpg" onClick={this.clickAD.bind(this)} style={{background: 'transparent',width: '100%',height: '10%',position: 'absolute',right: '0',bottom: '0%',border: 'none'}}></img>
            </div>

        );
    }
}
