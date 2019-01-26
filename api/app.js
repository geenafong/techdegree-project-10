'use strict';

// load modules
const express = require('express');
const morgan = require('morgan');
const routes = require("./routes/routes");
const mongoose = require("mongoose");
const jsonParser = require('body-parser').json;
const cors = require('cors');

// variable to enable global error logging
const enableGlobalErrorLogging = process.env.ENABLE_GLOBAL_ERROR_LOGGING === 'true';

// create the Express app
const app = express();

// middleware function to set the appropriate headers to support CORS
app.use(function(req, res, next) {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept, Authorization");
  if(req.method ==="OPTIONS"){
    res.header('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
    return res.status(200).json({});
  }
  next()
});

//configure mongoose
mongoose.connect("mongodb://localhost:27017/fsjstd-restapi");
const db = mongoose.connection;
app.use(cors())

// message to the console if there's an error connecting to the database.
db.on("error", function(err){
    console.error("connection error:", err)
});

// message to the console once the connection has been successfully opened.
db.once("open", function(){
    console.log("db connection successful");
});


// setup morgan which gives us http request logging
app.use(morgan('dev'));

//Parses response object
app.use(jsonParser());

// api routes 
app.use("/api", routes);

// setup a friendly greeting for the root route
app.get('/', (req, res) => {
  res.json({
    message: 'Welcome to the REST API project!',
  });
});

// send 404 if no other route matched
app.use((req, res) => {
  res.status(404).json({
    message: 'Route Not Found',
  });
});

// setup a global error handler
app.use((err, req, res, next) => {
  if (enableGlobalErrorLogging) {
    console.error(`Global error handler: ${JSON.stringify(err.stack)}`);
  }

  res.status(err.status || 500).json({
    message: err.message,
    error: {},
  });
});

// set our port
app.set('port', process.env.PORT || 5000);

// start listening on our port
const server = app.listen(app.get('port'), () => {
  console.log(`Express server is listening on port ${server.address().port}`);
});
