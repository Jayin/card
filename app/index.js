var $ = require('jquery')
var loadImage = require('./libs/loadImage')
var CONF = require('./conf')

loadImage(CONF.Resource, CONF.ResourceImageUrls.length, function(Resource) {
    var canvas = $('canvas')[0]
    var ctx = canvas.getContext('2d')
    console.log(Resource)

    var renderComponentInput = function(inputs){
        inputs.forEach(function(input){
            ctx.save()
            ctx.font = input.fontSize + " serif"
            ctx.fillStyle = input.fillStyle
            ctx.fillText(input.value, input.x, input.y);
            ctx.restore()
        })
    }

    var renderComponent = function(component){

        var image = component.image
        ctx.drawImage(image, 0, 0, image.width, image.height, component.x||0, component.y||0, image.width, image.height);

        if(component.input && component.input.length>0){
            //有文字则显示
            renderComponentInput(component.input)
        }

    }

    renderComponent(Resource['tieba'])
    renderComponent(Resource['water_mark'])

})




/**
 *
 *自定义 文字的位置
 *图片：Support CDN
 * 0. 基本信息:类别名,图片连接
 * 1. 输入的信息
 *   1.1 输入信息key
 *   1.2 输入信息value
 *   1.3 输入信息的坐标x,y
 *   1.4 输入信息的style（字体大小）
 * 2.
 *
 *
 *
 */
