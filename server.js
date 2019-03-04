// const { createServer } = require("http");
const path = require("path");

const express = require("express");
const db = require("./database/connection");
const app = express();
const port = 3000;

const post = require('./routes/post');


app.use(express.static("PUBLIC"));

app.get("/home", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.html"));
});

// app.get('/users', db.getUsers)

app.use('/post', post)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
