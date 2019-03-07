const path = require("path");

const express = require("express");
const app = express();

const port = process.env.PORT || 3000  ;

const post = require('./routes/post');

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.html"));
});

app.get("/feed", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "feed.html"));
});


app.use('/post', post)

app.use(express.static(__dirname + '/views'));

app.listen(port, () => console.log(`Example app listening on port ${port}!`))
