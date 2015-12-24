module.exports = {
    renderComponentInput: function(context, inputs) {
        if (inputs) {
            inputs.forEach(function(input) {
                context.save()
                context.font = input.fontSize + " serif"
                context.fillStyle = input.fillStyle
                context.fillText(input.value, input.x, input.y)
                context.restore()
            })
        }

    },
    renderComponent: function(context, component) {
        var image = component.image
        context.drawImage(image, 0, 0, image.width, image.height, component.x || 0, component.y || 0, image.width, image.height)

        if (component.inputs && component.inputs.length > 0) {
            //有文字则显示
            this.renderComponentInput(context, component.inputs)
        }
    }
}
