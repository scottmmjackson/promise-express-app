const express = require('express');
const promise = require('bluebird');
const app = express();

promise.resolve({app})
.then(resolveConfig)
.then(bindRoutes)
.then(listen)

function resolveConfig(svc) {
  svc.config = {
    port: 3000
  }
  return svc;
}

function bindRoutes(svc) {
  with(svc) {
    app.get('/', (req, res) => {
      res.send("it works!")
    });
  }
  return svc;
}

function listen(svc) {
  with(svc) {
    const port = config.port;
    app.listen(port, () => console.log(`Listening on ${port}`))
  }
  return svc;
}
