
const express = require('express');
const app = express();
// const cors = require('cors');   // disabling cors for developement
const routes= require('./routes/routes.js');


app.use(express.urlencoded({extended: true}));
app.use(express.json());

app.use('/api', routes);

app.get('/' , (req,res) => {
    res.send("connected to home")
});


// global error handler here
app.use((err,req,res,next) => {
    const statusCode = err.statusCode || 500 // if there is specific status code, store that, else 500

    res.status(statusCode).json({
        error: err.message,
        // success:0,ß
        // stack: err.stack  // uncomment this for development stack trace
    })
})

app.listen(3000);