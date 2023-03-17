var express = require('express');
const { ObjectId } = require('mongodb');
var db = require('../database/connection');
var router = express.Router();

/* GET home page. */
router.get('/', function (req, res, next) {
  res.render('index', { title: 'Express' });
});

router.get('/all-invoice', async function (req, res, next) {
  let collection = db.collection('invoiceSchema');
  console.log(collection);
  let results = await collection.find({}).limit(50).toArray();
  res.send(results).status(200);
});

router.post('/create-invoice', async (req, res) => {
  console.log(db);
  let collection = await db.collection('invoiceSchema');
  let newDocument = req.body;
  newDocument.date = new Date();
  let result = await collection.insertOne(newDocument);
  res.send(result).status(204);
});

router.get('/:id', async function (req, res, next) {
  let collection = db.collection('invoiceSchema');
  let query = { _id: ObjectId(req.params.id) };
  let result = await collection.findOne(query);

  if (!result) res.send('Not found').status(404);
  else res.send(result).status(200);
});

module.exports = router;
