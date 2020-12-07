//Dependancies
// We need to require all of our dependancies
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

app.get("/api/notes", (req, res) => {
    res.json(db)
})

app.post("/api/notes", (req, res) => {
    db.push(req.body)
    fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        if (err) return console.log(err)
        console.log("Information added")
    })
    res.json(db)
})

app.delete("/api/notes/:id", (req, res) => {
    const id = req.params.id
    for( let i = 0; i < db.length; i++) {
        if(db[i].id === id) {
            db.splice(i, 1);
        }
    }
    fs.writeFile("db/db.json", JSON.stringify(db), (err) => {
        if (err) return console.log(err)
        console.log("Information deleted")
    })
    res.json(db)
})

app.get("/api/test", (req, res) => {
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