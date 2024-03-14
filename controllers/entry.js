const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) =>{
  const result = await mongodb.getDb().db().collection('journalE').find();
  result.toArray().then((err, lists) => {
    if (err){
      res.status(400).json({message: err});
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists);
  });
};

const getSingle = async (req, res, next) => {
  if (!ObjectId.isValid(req.params.id)){
    res.status(400).json('Must use a valid id to find an entry.');
  }
  entryId = new ObjectId(req.params.id);
  const result = await mongodb.getDb().db().collection('journalE').find({ _id: entryId });
  result.toArray().then((err, lists) =>{
    if (err){
      res.status(400).json({ message: err });
    }
    res.setHeader('Content-Type', 'application/json');
    res.status(200).json(lists[0]);
  });
};

const createSingle = async (req, res, next) => {
  const currentDate = new Date();
  const entry = {
    date: currentDate.toDateString(),
    time: currentDate.toLocaleTimeString(),
    entryBody: req.body.entryBody,
    oneWord: req.body.oneWord,
    tags: req.body.tags,
    weather: req.body.weather,
    feeling: req.body.feeling
  };
  const response = await mongodb.getDb().db().collection('journalE').insertOne(entry);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating the entry.');
  }
};


const updateSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to update an entry.');
  }
  const currentDate = new Date();
  const entryId = new ObjectId(req.params.id);
  const filter = { _id: entryId };
  const entry = {
    date: currentDate.toDateString(),
    time: currentDate.toLocaleTimeString(),
    entryBody: req.body.entryBody,
    oneWord: req.body.oneWord,
    tags: req.body.tags,
    weather: req.body.weather,
    feeling: req.body.feeling
  };
  const response = await mongodb.getDb().db().collection('journalE').replaceOne(filter, entry);
  if (response.modifiedCount > 0) {
    res.status(204).send();
  } else {
    res.status(500).json(response.error || 'An error occurred and we were not able to update your entry.');
  }
};

const deleteSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete an entry.');
  }
  const entryId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('journalE').deleteOne({ _id: entryId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'An error occurred while deleting the entry.');
  }
};

module.exports = { getAll, getSingle, createSingle, updateSingle, deleteSingle };