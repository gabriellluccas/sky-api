const express = require('express');
const routes = require('./routes');

const router = express.Router();
const paths = [];
const routeGenerator = (route) => {
  const {
    _method, _path, _function, _middleware,
  } = route;
  paths.push(_path);
  if (_middleware) router[_method](_path, _middleware);
  router[_method](_path, _function);
};

Object.values(routes).map((file) => file.map((route) => routeGenerator(route)));

module.exports = router;
