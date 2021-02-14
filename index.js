const express = require('express');
const mongoose = require("mongoose");
const MONGO_URI = require("./keys").MONGO_URI
const app = express();
const { Schema } = mongoose;
const bodyParser = require("body-parser");

app.use(bodyParser.urlencoded({ extended: "false" }));
app.use(bodyParser.json());

mongoose.connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

const userSchema = new Schema({
    firstName: {type: String, required: true},
    lastName: String,
    age: Number,
    email: String,
    password: String
  })

const User = mongoose.model("User", userSchema);

const homePage = __dirname + "/view/index.html";
const signup = __dirname + "/view/signup.html";
const login = __dirname + "/view/login.html";
const userProfile = __dirname + "/view/userProfile.html";

app.get("/", (req, res) => {
    res.sendFile(homePage)
})

app.get("/signup", (req, res) => {
  res.sendFile(signup)
})

app.get("/login", (req, res) => {
  res.sendFile(login)
})

app.get("/userProfile", (req, res) => {
  res.sendFile(userProfile)
})

app.post("/", (req, res) => {
    let p;
    p = new User(req.body);
    /*p.save(function(err, data) {
        if (err) return console.error(err);
        done(null, data)
      })*/
    res.send(p)
    console.log(p)
})

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });