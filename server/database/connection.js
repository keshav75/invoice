const { MongoClient } = require('mongodb');

const connectionString =
  process.env.ATLAS_URI ||
  'mongodb+srv://abc:abc@cluster0.wjluujy.mongodb.net/test';

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
