const { MongoClient } = require("mongodb");

const uri = "mongodb://127.0.0.1:27017";
const client = new MongoClient(uri, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

client.connect((err, client) => {
  if (err) return console.log("cant connect this local db");

  // collection name
  const dbName = "coba";

  // choose collection
  const db = client.db(dbName);

  // insert one data to mongodb
  db.collection("user").insertOne(
    { name: "Paijo", age: 80, isAdmin: true },
    (err, res) => {
      if (err) return console.log("Data cant input in database");
      console.log("Data success input");
    }
  );
});
