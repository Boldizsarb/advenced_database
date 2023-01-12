const express = require("express");
const app = express();
const chalk = require("chalk"); // for the thick
const mongoose = require("mongoose");

app.set("view engine", "ejs"); // seting up ejs views enginge
app.use(express.static("static"));  // static elements whereabouts
app.use("/static", express.static('./static/'));

const expressSession = require("express-session"); // sessions 

require("dotenv").config();// dotenv file 
const { PORT, MONGODB_URI } = process.env; // environment variables, like port and mongodb

const User = require("./models/User"); // user
//const userController = require("./controllers/user"); // user
const bodyParser = require("body-parser"); // body parser


/*
 // session 
app.use("*", async (req, res, next) => {
    global.user = false; // EJS can access it as well! since it is global. 
    if (req.session.userID && !global.user) {
      const user = await User.findById(req.session.userID);
      global.user = user;
    }
    next();
  })

  const authMiddleware = async (req, res, next) => {
    const user = await User.findById(req.session.userID);
    if (!user) {
      return res.redirect('/'); // if the user unathencticated redirects him back to the home page
    }
    next()
  }

*/



// index page
app.get("/", (req, res) =>{
    res.render("index"); // file name only. it will be rendered onto the page 
});

app.get("/login", (req, res) =>{
    res.render("login"); // file name only. it will be rendered onto the page 
});

/////////////////////////////////////////



app.listen(PORT, () => { // listener
    console.log(
      `App listening at http://localhost:${PORT}`,
      chalk.green("✓")
    );
});