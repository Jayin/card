module.exports = {
    /**
     * 渲染输入的文字
     */
    renderComponentInput: function(canvas, inputs, scale) {
        var context = canvas.getContext('2d')
        if (inputs) {
            inputs.forEach(function(input) {
                context.save()
                context.font = parseInt(input.fontSize)*scale + " serif"
                context.fillStyle = input.fillStyle
                context.fillText(input.value, parseInt(input.x)*scale, parseInt(input.y)*scale)
                context.restore()
            })
        }

    },
    /**
     * 渲染背景图
     */
    renderDesign: function(canvas, component) {
        var context = canvas.getContext('2d')
        var image = component.image
        var scale = canvas.width/image.width

        context.drawImage(image, 0, 0, image.width, image.height, component.x || 0, component.y || 0, canvas.width, canvas.height)
        if (component.inputs && component.inputs.length > 0) {
            //有文字则显示
            this.renderComponentInput(canvas, component.inputs, scale)
        }
    },
    /**
     * 渲染一些部件
     */
    renderComonent: function(canvas, component){
        var context = canvas.getContext('2d')
        var image = component.image
        var scale = canvas.width / 1044
        context.drawImage(image, 0, 0, image.width, image.height, (component.x || 0)*scale, (component.y || 0)*scale, image.width*scale, image.height*scale)

    }
}
