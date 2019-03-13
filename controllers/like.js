const likeModel = require("../models/lib/like.js")


exports.show_like = async function (req, res) {
  let data = await likeModel.getLikes()
  res.send(data)
}

exports.like_create = async function (req, res) {
  await likeModel.saveToDB(req.query.postid)
  res.redirect("/feed")
}
