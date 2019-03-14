const likeModel = require("../models/lib/like.js")

exports.getLikes = async function (req, res) {
  let data = await likeModel.getLikes()
  res.send(data)
}

exports.saveLike = async function (req, res) {
  await likeModel.saveLike(req.query.postid)
}
