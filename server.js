const express = require("express");
const fs = require("fs");
const app = express();
const path = require("path");

let num = 0
const PORT = process.env.PORT || 10000;
const db = require("./db/db.json")
console.log(db)

app.use(express.urlencoded({extended: true}));
app.use(express.json())
app.use(express.static("public"))

app.get("/notes", (req, res) => {
    res.sendFile(path.join(__dirname, "public/notes.html"))
});

app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "public/index.html"))
});

app.get("/api/notes/", (req, res) => {
    // res.sendFile(path.join(__dirname, "/public/notes.html"))
    res.json(db)
})

app.post("/api/notes/", (req, res) => {
    num++
    let newtodo = {
        title: req.body.title,
        text: req.body.text,
        id: num
    };
    db.push(newtodo)
    fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        if (err) return console.log(err)
        console.log("Information added");
    })
    res.end(JSON.stringify(db));
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id
    db.splice(id-1, 1);

    fs.writeFile("./db/db.json", JSON.stringify(db), (err) => {
        if (err) return console.log(err)
        console.log("Information deleted")
        res.json(db)
    })
})

// app.get("/api/notes/:id", (req, res) => {
//     const id = req.params.id
// })

app.get("/api/notes", (req, res) => {
    num++
    const x = {
        title: "hello",
        text: "world",
        id: num
    }
    db.push(x)
    res.json(db)
})

app.listen(PORT, () => {
    console.log("You started up the server!")
});