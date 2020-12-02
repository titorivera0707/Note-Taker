//Dependancies
// We need to require all of our dependancies
const express = require("express");
const { fstat } = require("fs");
const app = express;
const path = require("path");
const { report } = require("process");

let num = 0
// Global Variables
// Declaring global 
const PORT = process.env.PORT || 10000;
const db = require("./db/db.json")
console.log(db)

// Middlewear
// we need the urlencoded middle which gives us access to req.
app.use(express.urlencoded({extended: true}));
app.use(express.json())

// we need a middlewear to have our css and javascript files to be loaded from our public files.
app.use(express)
// Routes
// HTML Routes here
// We're gonna need to create a route to serve out HTML files so when we hit those endpoints, the browswer will serve the HTML to us.
// Our goal is to display whats in the index.html to the root route i.e. PORT 10000.
// fs module, path
// if we were to go the fs route we would need to use readfile to grab the data within the index/html and then res.send(data) to our front end
// if we were to use res.sendFile
// we are defining our home route, which takes in a callback
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});
// API routes here
// our end goal is to return the data in db.json in our response
// what are our tools? we have express get, express post, express delete.
// #1 we can make a variable to store the db.json file.
// #2 we need to use the fswritefile so we can grab the data and send it to the front-end.

app.get("/api/notes", (req, res) => {
    rep.json(db)
})

app.get("/api/test", (req, res) => {
    num++
    const x = {
        title: "hello",
        text: "world",
        id: num
    }
    db.push(x)
    // last step is to use fswritefile to write the db data back to the db.json file
    res.json(db)
})

// when doing a post request remember to console.log the req.
// a post follows similar syntax using req and res as the call
// because we declare our db at the very top

// Server listener

app.listen(PORT, () => {
    console.log("You started up the server!")
});