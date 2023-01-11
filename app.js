const express = require("express");
const app = express();
const chalk = require("chalk"); // for the thick

app.set("view engine", "ejs"); // seting up ejs views enginge
app.use(express.static("static"));  // static elements whereabouts
app.use("/static", express.static('./static/'));


require("dotenv").config();// dotenv file 
const { PORT, MONGODB_URI } = process.env; // environment variables, like port and mongodb



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