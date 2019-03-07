const postModel = require("../models/lib/post.js")

exports.post_create = function (req, res) {
  postModel.saveToDB(req.query.content)
  res.redirect("http://localhost:3000/feed")
}

exports.post_show = async function (req, res) {
  let data = await postModel.getPosts()
  res.send(data)
}
