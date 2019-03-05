// const { createServer } = require("http");
const path = require("path");

const express = require("express");
const app = express();
const connection = require("./database/connection")

const port = 3000;

const post = require('./routes/post');

app.use(express.static("PUBLIC"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.html"));
});

app.get("/feed", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "feed.html"));
});

app.use('/post', post)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
