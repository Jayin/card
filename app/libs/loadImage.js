var loadedCount = 0
var loadImages = []

module.exports = function(Resource, imageCount, cb){
    var countLoadedImage = function(image){
        loadedCount++
        if(loadedCount === imageCount){
            cb(Resource)
        }
    }
    for(var key in Resource){
        //设计图
        // var img1 = new Image();
        // img1.onload = countLoadedImage.bind(this, img1)
        // Resource[key]['image'] = img1
        // img1.src = Resource[key]['url']
        //预览选项图
        if(Resource[key]['preview']){
            var img2 = new Image();
            img2.onload = countLoadedImage.bind(this, img2)
            Resource[key]['previewImage'] = img2
            img2.src = Resource[key]['preview']
        }
    }
}
