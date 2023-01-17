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


  // using dotenv, can now pull the values from our environment
 

const { PORT, MONGODB_URI } = process.env;


  //connect to database


mongoose.connect(MONGODB_URI, { useNewUrlParser: true });
mongoose.connection.on("error", (err) => {
  console.error(err);
  console.log(
    "MongoDB connection error. Please make sure MongoDB is running.",
    chalk.red("✗")
  );
  process.exit();
});

 //middlewear

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

// images
const imgControl = require('./controllers/pictures');

const router = express.Router();
const imageController = require('./controllers/pictures');
const { upload } = imageController;

app.get('/viewPictures', imgControl.list);

app.get('/image', imageController.getImages);
app.post('/image', upload.single('image'), imageController.postImage); // 
//app.get("/usersCards/delete/:id", CardController.delete);
app.get("/viewPictures/delete/:id",imgControl.remove);


module.exports = router;

//app.get("/", homeController.list);
app.post("/addcard", CardController.create);
app.get("/usersCards", CardController.list1);
app.get("/usersCards/delete/:id", CardController.delete);

app.get("/usersCards/update/:id", CardController.edit);
app.post("/usersCards/update/:id", CardController.update);

//app.get("/category/category/:category", CardController.list2); // since it is a string we need to specify what that is! 

app.get("/category/category/:category", CardController.list2, (req, res) => {
  res.render('category', { cards: cards,category:category }) });

app.get("/", CardController.list3, (req, res) => {
  res.render('index', { errors: {} })    
});


app.get("/logout", async (req, res) => {
  req.session.destroy();
  global.user = false;
  res.redirect('/');
})
app.get("/mycards", (req, res) => {
  res.render('forCards', { errors: {} })    
});







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