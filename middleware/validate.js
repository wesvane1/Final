const validator = require('../helpers/validate');

const saveEntry = (req, res, next) => {
  const validationRule = {
    entryBody: 'required|string',
    oneWord: 'required|string',
    tags: 'required|string',
    weather: 'required|string',
    feeling: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

const saveComm = (req, res, next) => {
  const validationRule = {
    entryBody: 'required|string',
    why: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) =>{
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else{
      next();
    }
  });
};

const saveUser = (req, res, next) => {
  const validationRule = {
    name: 'required|string',
    email: 'required|string'
  };
  validator(req.body, validationRule, {}, (err, status) => {
    if (!status) {
      res.status(412).send({
        success: false,
        message: 'Validation failed',
        data: err
      });
    } else {
      next();
    }
  });
};

module.exports = {
  saveEntry,
  saveComm,
  saveUser
};