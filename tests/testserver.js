const express = require('express');
const routers = require('../routes/routes.js');

const testserver = express();
testserver.use('/api', routers);

testserver.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500 // if there is specific status code, store that, else 500

    res.status(statusCode).json({
        error: err.message,
        // success:0,ß
        // stack: err.stack  // uncomment this for development stack trace
    })
})

module.exports = testserver;
