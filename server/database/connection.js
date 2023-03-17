const { MongoClient } = require('mongodb');

const connectionString =
  process.env.ATLAS_URI ||
  'mongodb+srv://kj:ZzRnPnYyplWoXn0j@cluster0.3m1rqvs.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true
});

try {
  client.connect();
  var db = client.db('invoice');
  console.log('Connected to MongoDB Atlas');
} catch (err) {
  console.error(err);
}

module.exports = db;
