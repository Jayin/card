var loadedCount = 0
var loadImages = []

module.exports = function(Resource, imageCount, cb){
    var countLoadedImage = function(image){
        loadedCount++
        if(loadedCount === imageCount){
            cb(Resource)
        }
    }

    // for(var i=0;i<image_urls.length;i++){
    //     var img = new Image();
    //     img.onload = countLoadedImage.bind(this, img)
    //     img.src = image_urls[i]
    // }
    for(var key in Resource){
        var img = new Image();
        img.onload = countLoadedImage.bind(this, img)
        Resource[key]['image'] = img
        img.src = Resource[key]['url']
    }
}
