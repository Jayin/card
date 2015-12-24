var tieba = {
    "title": "贴吧证书",
    "url": "/images/type1.jpg",
    "x":"0",
    "y":"0", //该图片显示的位置
    "inputs": [{
        "key": "请输入姓名",
        "value": "XXX",
        "x": "220",
        "y": "283",
        "fillStyle": "#0000FF",
        "fontSize": "48px"

    }]
}

var water_mark = {
    "title": "水印",
    "url": "/images/water_mark.png",
    "x":"800",
    "y":"670",
}

var Resource = {
    "tieba": tieba,
    "water_mark": water_mark
}

var getResourceImageUrls = function(resource) {
    var result = []
    for (var key in resource) {
        result.push(resource[key]['url'])
    }
    return result
}

module.exports = {
    Resource: Resource,
    ResourceImageUrls: getResourceImageUrls(Resource)
}
