# promise-express-app
Simple skeleton project demonstrating the use of a promise chain and service locator pattern in Node

## Get the repo

`git clone https://github.com/scottmmjackson/promise-express-app`

## Set everything up

`npm install`

## Run the server

`npm start`

## What is this?

- [Bluebird](https://github.com/petkaantonov/bluebird) is a Javascript library providing Promises (similar to Futures)
- [Express](http://expressjs.com/) is a NodeJS web application framework

## What is this repo about?

This is demonstrating an intuitive webapp design pattern in Node that avoids callback hell and extrapolates to many different types of NodeJS applications.

The basic principle is that you have a Javascript object `{}` that is initialized with the core framework objects you'll be using and snowballs with the various services you provide. Since you only use the reference to this object and its properties, you avoid memory leaks into the global scope and allow one-time dereferencing of any service you wish to destroy.

First, I chose bluebird promises- although promises are not necessary, if at all possible you should stick with one async approach. It's entirely possible to follow the rest of my patterns by calling `bindSomething(svc)` functions sequentially that all operate on the service locator object until the app is fully initialized. Alternatively, you could use an event stream like Highland, Kefir, or RxJS. Whatever is clearest to the reader about how data flows is best.

Second, I avoid hardcoding with the `resolveConfig` method. The method is primarily responsible for pulling in the `config.json` file, but could also be used to provide interpolation.

Third, any time I need to use a callback, it's a named function. This is a stylistic preference- if I absolutely positively need to use an anonymous callback, I'll know. But better yet, it simplifies splitting out the callbacks into their own file (and being placed in the service locator) if the business logic gets quite complex.

Many of these suggestions may seem excessive, but in any non-trivial Node application, they become quite useful.
