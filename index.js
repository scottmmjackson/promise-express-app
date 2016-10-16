'use strict';
// import your libraries here
const express = require('express');
const promise = require('bluebird');
const app = express();

// this is essentially your "main loop".
// it's the entry point for your application.
// more importantly, it indicates the flow of data through your
// service locator object.
//
// We begin by kicking off a resolved promise with an object containing only our express app
promise.resolve({app})

  // then we have a function that pulls in environment variables, config files, whatever
  .then(resolveConfig)

  // then we apply our configs to the express app. All the `app.use` stuff goes here
  .then(configureExpress)

  // then we bind our routes in the app
  .then(bindRoutes)

  // then we listen for requests
  .then(listen)

  // whoops! we crashed
  .catch(crashHandler);


// This doesn't need to be in this file. It's probably better if it's in a `config.js` file
function resolveConfig(svc) {
  // functions that only mutate the service locator object don't need `with` statements
  svc.config = require('./config.json');
  return svc;
}

// Note the use of the "with" keyword. If you're migrating code, this is important
function configureExpress(svc) {
  svc.app.use(require('body-parser').json(svc.bodyParserOptions));
  return svc;
}

// This should DEFINITELY be in its own file.
function bindRoutes(svc) {
  function getHandler(req, res) {
    res.send('it works!')
  }

  svc.app.get('/', getHandler);
  return svc;
}

// This doesn't need to be in its own file- but it can be! That's the magic of service location!
function listen(svc) {
  const port = svc.config.port;
  function listeningMessage() {
    console.log(`Listening on ${port}`)
  }
  svc.app.listen(port, listeningMessage);
  return svc;
}

function crashHandler(err) {
  console.error("Something terrible happened!", err);
  // Close DB connections?
  // Something else?
}