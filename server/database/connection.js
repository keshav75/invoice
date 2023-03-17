const { MongoClient, ServerApiVersion } = require('mongodb');

const connectionString =
  process.env.ATLAS_URI ||
  'mongodb+srv://kj:1234@cluster0.231odkp.mongodb.net/?retryWrites=true&w=majority';

const client = new MongoClient(connectionString, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  serverApi: ServerApiVersion.v1
});

try {
  client.connect();
  var db = client.db('invoice');
  console.log('Connected to MongoDB Atlas');
} catch (err) {
  console.error(err);
}

module.exports = db;
