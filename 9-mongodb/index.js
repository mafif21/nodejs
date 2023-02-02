const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) return console.log("cant connect this local db");

  // collection name
  const colName = "coba";

  // choose collection
  const db = client.db(colName);
});
