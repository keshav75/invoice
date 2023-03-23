var express = require('express');
const { ObjectId } = require('bson');
var db = require('../database/connection');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.json({ title: 'Express' });
});

router.get('/all-invoice', async function (req, res) {
  let collection = db.collection('invoiceSchema');
  let results = await collection.find({}).limit(50).toArray();
  res.status(200).json(results);
});

router.post('/create-invoice', async (req, res) => {
  let collection = db.collection('invoiceSchema');
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  return res.status(201).json(result);
});

router.get('/:id', async function (req, res) {
  let collection = db.collection('invoiceSchema');
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (err) {
    return res.status(400).send('Invalid ID');
  }

  let query = { _id: objectId };
  let result = await collection.findOne(query);

  if (!result) res.status(404);
  else res.status(200).json(result);
});

module.exports = router;
