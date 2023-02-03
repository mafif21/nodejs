const mongoose = require("mongoose");
const url = "mongodb://127.0.0.1:27017/contactapp";

mongoose.set("strictQuery", false);
mongoose.connect(url);
