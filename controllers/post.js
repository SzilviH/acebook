const postModel = require("../models/lib/post.js")

exports.post_create = function (req, res) {
  postModel.saveToDB(req.query.content)
  res.sendFile("/Users/sauleguzyte/Projects/week9/abook/Acebook/views/feed.html")
}
