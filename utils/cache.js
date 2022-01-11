const NodeCache = require('node-cache');

const cache = new NodeCache();

// cache middleware
module.exports = duration  => (req,res,next) => {
    // assuming get requests
    const key = req.originalUrl;
    const cachedResponse = cache.get(key)

    if(cachedResponse){
        res.send(cachedResponse)
    } else {
        res.originalSend = res.send;
        res.send = body => {
            res.originalSend(body)
            cache.set(key, body, duration)
        }
        next()
    }

}


