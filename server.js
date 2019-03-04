// const { createServer } = require("http");
const path = require("path");

const express = require("express");
const db = require("./database/connection");
const app = express();
const port = 3000;


app.use(express.static("PUBLIC"));

app.get("/", (req, res) => {
    res.sendFile(path.resolve(__dirname, "PUBLIC", "views/home.html"));
});

app.get('/users', db.getUsers)

app.listen(port, () => console.log(`Example app listening on port ${port}!`))

// const server = createServer(app);
// server.listen(port, err => {
//     if (err) {throw err}
//     else {
//         console.log("Server Started!");
//     }
// });