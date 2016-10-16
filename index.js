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


// This doesn't need to be in this file. It's probably better if it's in a `config.js` file
function resolveConfig(svc) {
  svc.config = {
    port: 3000
  }
  return svc;
}

// Note the use of the "with" keyword. If you're migrating code, this is important
function configureExpress(svc) {
  with(svc) {
    app.use(require('body-parser'))
  }
  return svc;
}

// This should DEFINITELY be in its own file.
function bindRoutes(svc) {
  with(svc) {
    app.get('/', (req, res) => {
      res.send("it works!")
    });
  }
  return svc;
}

// This doesn't need to be in its own file- but it can be! That's the magic of service location!
function listen(svc) {
  with(svc) {
    const port = config.port;
    app.listen(port, () => console.log(`Listening on ${port}`))
  }
  return svc;
}
