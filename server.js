const path = require("path");
const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = process.env.PORT ;
const post = require('./routes/post');
const comment = require('./routes/comment');
const like = require('./routes/like');

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "home.html"));
});

app.get("/feed", (req, res) => {
    res.sendFile(path.resolve(__dirname, "views", "feed.html"));
});

app.use('/post', post);
app.use('/likes', like);
app.use('/comments', comment);
app.use(express.static(__dirname + '/views'));
app.listen(port, () => console.log(`MAGICAL app listening here: ${port}!`));
