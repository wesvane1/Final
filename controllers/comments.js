const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) =>{
  const result = await mongodb.getDb().db().collection('comments').find();
  result.toArray().then((err, lists) => {
    if (err){
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const createSingle = async (req, res, next) => {
  const currentDate = new Date();
  const entry = {
    date: currentDate.toDateString(),
    time: currentDate.toLocaleTimeString(),
    entryBody: req.body.entryBody,
    why: req.body.why
  };
  const response = await mongodb.getDb().db().collection('comments').insertOne(entry);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the comment.');
  }
};

const updateSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update a comment.');
  }
  const currentDate = new Date();
  const commId = new ObjectId(req.params.id);
  const filter = { _id: commId };
  const entry = {
    date: currentDate.toDateString(),
    time: currentDate.toLocaleTimeString(),
    entryBody: req.body.entryBody,
    why: req.body.why
  };
  const response = await mongodb.getDb().db().collection('comments').replaceOne(filter, entry);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred and we were not able to update your comment.');
  }
};

const deleteSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete a comment.');
  }
  const commId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('comments').deleteOne({ _id: commId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'An error occurred while deleting the comment.');
  }
};

module.exports = { getAll, createSingle, updateSingle, deleteSingle };