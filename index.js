const express = require('express');
const mongoose = require("mongoose");
const MONGO_URI = require("./keys").MONGO_URI
const app = express();
const { Schema } = mongoose;
const bodyParser = require("body-parser");

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
    name: {type: String, required: true},
    age: Number,
    email: String,
    password: String
  })

const User = mongoose.model("User", userSchema);

const homePage = __dirname + "/view/index.html";

app.get("/", (req, res) => {
    res.sendFile(homePage)
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });