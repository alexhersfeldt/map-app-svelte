const express = require("express");
const app = express();

const path = require("path");
const cors = require("cors");
const mongoose = require("mongoose");
const passport = require("passport")
const session = require("express-session")
const MongoStore = require ("connect-mongo")
const User = require("./models/User")
const port = process.env.PORT || 5000

const dbUrl = "mongodb+srv://admin:simcity4@map-app.goax4ec.mongodb.net/?retryWrites=true&w=majority"



app.use(express.static(__dirname +"/public"));

app.use(express.json())



app.use(cors());

mongoose.connect(dbUrl, { useNewURLParser: true, useUnifiedTopology: false });
//const username = "admin";
//const password = "simcity4";
//const cluster = "map-app";
//const dbname = "map";

//mongoose.connect(
//  `mongodb+srv://${username}:${password}@${cluster}.goax4ec.mongodb.net/${dbname}?retryWrites=true&w=majority`, 
//  {
//    useNewUrlParser: true,
//    useUnifiedTopology: true
//  }
//);

const db = mongoose.connection;
db.on("error", (error) => console.error(error))
db.once("open", () => console.log("Connected to DB"))

app.use(
  session({
      resave:true,
      saveUninitialized:true,
      secret:"maps rule the world"
      
  })
)

passport.use(User.createStrategy())
passport.serializeUser(User.serializeUser())
passport.deserializeUser(User.deserializeUser())
app.use(passport.initialize())
app.use(passport.session())


const authRouter = require("./routes/auth.js");

app.use("/api", authRouter)


app.use('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public', 'index.html'));
});


app.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});