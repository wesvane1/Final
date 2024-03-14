const mongodb = require('../db/connect');
const ObjectId = require('mongodb').ObjectId;

const getAll = async (req, res, next) =>{
  const result = await mongodb.getDb().db().collection('favorites').find();
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
    oneWord: req.body.oneWord,
    tags: req.body.tags,
    weather: req.body.weather,
    feeling: req.body.feeling
  };
  const response = await mongodb.getDb().db().collection('favorites').insertOne(entry);
  if (response.acknowledged) {
    res.status(201).json(response);
  } else {
    res.status(500).json(response.error || 'Some error occurred while creating a favorite entry.');
  }
};


const moveToFav = async (req, res) => {
  const entryId = new ObjectId(req.params.id);
  const filter = { _id: entryId };
  // This finds the entry in the main collection
  const entryToMove = await mongodb.getDb().db().collection('journalE').findOne(filter);
  if (!entryToMove) {
    return res.status(404).json('Not a valid entry.');
  }

  // This copies said entry into the favorites collection
  const response = await mongodb.getDb().db().collection('favorites').insertOne(entryToMove);
  
  // This deletes the entryToMove from the main collection
  const deleted = await mongodb.getDb().db().collection('journalE').deleteOne(filter);
  if (deleted.deletedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'An error occurred while moving the entry.');
  }
};

const moveFromFav = async (req, res) => {
  const entryId = new ObjectId(req.params.id);
  const filter = { _id: entryId };
  // This finds the entry in the main collection
  const entryToMove = await mongodb.getDb().db().collection('favorites').findOne(filter);
  if (!entryToMove) {
    return res.status(404).json('Not a valid entry.');
  }

  // This copies said entry into the favorites collection
  const response = await mongodb.getDb().db().collection('journalE').insertOne(entryToMove);
  
  // This deletes the entryToMove from the main collection
  const deleted = await mongodb.getDb().db().collection('favorites').deleteOne(filter);
  if (deleted.deletedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'An error occurred while moving the entry.');
  }
};

const deleteSingle = async (req, res) => {
  if (!ObjectId.isValid(req.params.id)) {
    res.status(400).json('Must use a valid id to delete an entry.');
  }
  const entryId = new ObjectId(req.params.id);
  const response = await mongodb.getDb().db().collection('favorites').deleteOne({ _id: entryId }, true);
  if (response.deletedCount > 0) {
    res.status(204).send();
  }
  else {
    res.status(500).json(response.error || 'An error occurred while deleting the entry.');
  }
};

module.exports = { getAll, createSingle, moveToFav, moveFromFav, deleteSingle };