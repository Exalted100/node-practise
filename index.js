const express = require('express');
const mongoose = require("mongoose");
const MONGO_URI = require("./keys").MONGO_URI
const SESSION_SECRET = require("./keys").SESSION_SECRET
const app = express();
const { Schema } = mongoose;
const bodyParser = require("body-parser");
const session = require("express-session")
const passport = require("passport")
const ObjectID = require('mongodb').ObjectID;

const { MongoClient } = require('mongodb');

async function myDB(callback) {
    const URI = MONGO_URI; // Declare MONGO_URI in your .env file
    const client = new MongoClient(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true });

    try {
        // Connect to the MongoDB cluster
        await client.connect();

        // Make the appropriate DB calls
        await callback(client);

    } catch (e) {
        // Catch any errors
        console.error(e);
        throw new Error('Unable to Connect to Database')
    }
}

app.use(session({
  secret: SESSION_SECRET,
  resave: true,
  saveUninitialized: true,
  cookie: { secure: false }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use(express.static(__dirname + "/view"));

app.use(function(req, res, next) {
  console.log("route switch");
  next();
})

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

myDB(async (client) => {
  const myDataBase = await client.db('database').collection('users');

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

  // Serialization and deserialization here...
  passport.serializeUser((user, done) => {
    done(null, user._id);
  });
  passport.deserializeUser((id, done) => {
    myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
      done(null, doc);
    });
  });
  // Be sure to add this...
}).catch((e) => {
  app.route('/').get((req, res) => {
    res.send("unable to login");
  });
});

/*app.get("/", (req, res) => {
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
    p.save(function(err, data) {
        if (err) return console.error(err);
        done(null, data)
      })
    res.send(p)
    console.log(p)
})

passport.serializeUser((user, done) => {
  done(null, user._id);
});
passport.deserializeUser((id, done) => {
  // myDataBase.findOne({ _id: new ObjectID(id) }, (err, doc) => {
  done(null, null);
  // });
});*/

let PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
    console.log('Listening on port ' + PORT);
  });