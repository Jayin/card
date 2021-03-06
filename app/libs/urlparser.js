/**
 * https://gist.github.com/sofish/505e3c63f08dee01e543
 * @param  {[type]} url [description]
 * @return {[type]}     [description]
 */
module.exports = function(url) {
    var a = document.createElement('a');
    a.href = url;

    var search = function(search) {
        if (!search) return {};

        var ret = {};
        search = search.slice(1).split('&');
        for (var i = 0, arr; i < search.length; i++) {
            arr = search[i].split('=');
            var key = arr[0],
                value = arr[1];
            if (/\[\]$/.test(key)) {
                ret[key] = ret[key] || [];
                ret[key].push(value);
            } else {
                ret[key] = value;
            }
        }
        return ret;
    };

    return {
        protocol: a.protocol,
        host: a.host,
        hostname: a.hostname,
        pathname: a.pathname,
        search: search(a.search),
        hash: a.hash
    }
};
