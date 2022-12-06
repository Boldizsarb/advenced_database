const express = require("express");
const app = express();

app.set("view engine", "ejs");
app.set("view engine", "ejs"); // seting up ejs views enginge
app.use(express.static("static"));  // static elements whereabouts
app.use("/static", express.static('./static/'));





// index page
app.get("/", (req, res) =>{
    res.render("index"); // file name only. it will be rendered onto the page 
    });


    app.listen(3000, ()=>{console.log("Server started!")});