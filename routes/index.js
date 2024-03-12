const routes = require('express').Router();

routes.use('/', require('./hello'));

module.exports = routes;