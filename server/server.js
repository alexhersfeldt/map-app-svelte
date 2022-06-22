// Express Server
const express = require("express");
const app = express();
const cors = require("cors");
const User = require("./models/User")
require("dotenv").config()

app.use(express.json());
app.use(express.static(__dirname +"../client/public"));
app.use(cors());


// MongooDB connection 
const mongoose = require("mongoose");
const MongoStore = require ("connect-mongo")
mongoose.connect(process.env.DATABASE_URL, { useNewURLParser: true });
const db = mongoose.connection;
db.on("error", (error) => console.error(error));
db.once("open", () => console.log("Connected to DB"));


// Session setup
const session = require("express-session")
const sessionMiddleware = session({
  resave:true,
  saveUninitialized:true,
  secret:"maps rule the world",
  store: MongoStore.create({mongoUrl: process.env.DATABASE_URL})
})

app.use(sessionMiddleware);


// Socket Setup
const port = process.env.PORT || 3000
const http = require("http");
const server = http.createServer(app.listen(port, () => {
  console.log(`Server is up at port ${port}`);
}));
let socket = require('socket.io')
let io = socket(server)
//const Server = require("socket.io").Server
//const io = new Server(server);

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('disconnect', () => {
    console.log('user disconnected');
  });
});

const wrap = middleware => (socket, next) => middleware(socket.request, {}, next);
io.use(wrap(sessionMiddleware));

// Passport Setup
const passport = require("passport")
passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());

// Rest API Routes
const authRouter = require("./routes/auth.js");
app.use("/api", authRouter);



/*server.listen(port, () => {
    console.log(`Server is up at port ${port}`);
});*/
