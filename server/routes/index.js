var express = require('express');
const { ObjectId } = require('bson');
var db = require('../database/connection');
var router = express.Router();
var axios = require('axios');

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

router.post('/:id/webhook', async (req, res) => {
  let collection = db.collection('invoiceSchema');
  console.log(req.body);
  try {
    const invoice = collection.findOneAndUpdate(
      { _id: new ObjectId(req.params._id) },
      {
        $set: {
          paymentStatus: 'paid',
          paymentDetails: {
            transactionId: req.body.payment_id,
            paymentDate: new Date()
          }
        }
      },
      { new: true }
    );
    res.json(invoice);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error updating invoice');
  }

  res.status(200);
});

router.get('/:id/payment', async (req, res) => {
  let collection = db.collection('invoiceSchema');
  let objectId;
  try {
    objectId = new ObjectId(req.params.id);
  } catch (err) {
    return res.status(400).send('Invalid ID');
  }

  let query = { _id: objectId };
  let invoiceDetails = await collection.findOne(query);

  const createPaymentRequest = async access_token => {
    const encodedParams = new URLSearchParams();
    encodedParams.set('allow_repeated_payments', 'false');
    encodedParams.set('send_email', 'false');
    encodedParams.set('amount', invoiceDetails.amount);
    encodedParams.set('purpose', 'digital payment');
    encodedParams.set(
      'redirect_url',
      `https://invoice-server.onrender.com/invoice/${req.params.id}`
    );
    encodedParams.set(
      'webhook',
      ` https://invoice-server.onrender.com/${req.params.id}/webhook`
    );

    const options = {
      method: 'POST',
      url: 'https://test.instamojo.com/v2/payment_requests/',
      headers: {
        accept: 'application/json',
        Authorization: `Bearer ${access_token}`,
        'content-type': 'application/x-www-form-urlencoded',
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Methods': 'DELETE, POST, GET, OPTIONS',
        'Access-Control-Allow-Headers':
          'Content-Type, Authorization, X-Requested-With',
        'Sec-Fetch-Site': 'cross-site',
        ' Sec-Fetch-Mode': 'cors'
      },
      data: encodedParams
    };

    await axios
      .request(options)
      .then(function (response) {
        var result = response.data;
        return res.status(200).send({ result });
      })
      .catch(function (error) {
        console.error(error);
      });
  };

  const encodedParams = new URLSearchParams();
  encodedParams.set('grant_type', 'client_credentials');
  encodedParams.set('client_id', 'test_JLvYMS7DqeFWTMIB542h4Rn5x0tqOW4G979');
  encodedParams.set(
    'client_secret',
    'test_hkipeMBRjn7t9yoCzb6CpvA1KhjWWnNedBgbj1nZqpx139VhyddV2IyQ0XZSnWhneiho1EGVlFteOau3MOebEiOAKimEt0hsNpG0q0HyJftZsyaOkNH9GuvkBIj'
  );
  const options = {
    method: 'POST',
    url: 'https://test.instamojo.com/oauth2/token/',
    headers: {
      accept: 'application/json',
      'content-type': 'application/x-www-form-urlencoded'
    },
    data: encodedParams
  };

  await axios
    .request(options)
    .then(response => response)
    .then(data => {
      var access_token = data.data.access_token;
      createPaymentRequest(access_token);
    })

    .catch(function (error) {
      console.error(error);
    });
});

module.exports = router;
