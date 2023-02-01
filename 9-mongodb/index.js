const { MongoClient } = require("mongodb");

const url = "mongodb://127.0.0.1:3000";
const client = new MongoClient(url);

client.connect((err, data) => {
  if (err) return console.log("connect failed");
  console.log("connect success");
});

// second params for variable client
// {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
// }
