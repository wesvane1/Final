const routes = require('express').Router();

routes.use('/', require('./swagger'))
routes.use('/entries', require('./entries'));

module.exports = routes;