const postModel = require("../models/lib/post.js")

exports.post_show = async function (req, res) {
  let data = await postModel.getPosts()
  res.send(data)
}

exports.post_create = async function (req, res) {
  await postModel.saveToDB(req.query.content, req.query.userid)
  res.redirect("/feed")
}
