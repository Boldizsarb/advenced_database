require("dotenv").config();
const express = require("express");
const path = require("path");
const mongoose = require("mongoose");
const chalk = require("chalk");
const bodyParser = require("body-parser");

const expressSession = require("express-session");
const User = require("./models/User");
const userController = require("./controllers/user");
/**
 * Controllers (route handlers).
 */

const Card = require("./models/Card");
const CardController = require("./controllers/cards");



const app = express();
app.set("view engine", "ejs");

/**
 * notice above we are using dotenv. We can now pull the values from our environment
 */

const { PORT, MONGODB_URI } = process.env;

/**
 * connect to database
 */

mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

/***
 * We are applying our middlewear
 */
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(expressSession({ secret: 'SecretCookie', cookie: { expires: new Date(253402300000000) } }))

//Add Glboal User & page authorisation

app.use("*", async (req, res, next) => {
  global.user = false;
  if (req.session.userID && !global.user) {
    const user = await User.findById(req.session.userID);
    global.user = user;
  }
  next();
})

const authMiddleware = async (req, res, next) => {
  const user = await User.findById(req.session.userID);
  if (!user) {
    return res.redirect('/');
  }
  next()
}

//app.get("/", homeController.list);

app.get("/", (req, res) => {
  res.render('index', { errors: {} })    
});

app.get("/usersCards", CardController.list);
app.get("/usersCards/delete/:id", CardController.delete);




app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})
app.get("/mycards", (req, res) => {
  res.render('forCards', { errors: {} })    
});


app.post("/addcard", CardController.create);




app.get("/join", (req, res) => {
  res.render('creatingUser', { errors: {} })    //User
});

app.post("/join", userController.create);       // from the controller/users.j
app.get("/login", (req, res) => {
  res.render('loginUser', { errors: {} })
});
app.post("/login", userController.login);


app.listen(PORT, () => {
  console.log(
    `Example app listening at http://localhost:${PORT}`,
    chalk.green("✓")
  );
});