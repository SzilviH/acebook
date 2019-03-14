const likeModel = require("../models/lib/like.js")

exports.getLikes = async function (req, res) {
  let data = await likeModel.getLikes(req.query.postid)
  res.send(data.toString())
}

exports.saveLike = async function (req, res) {
  await likeModel.saveLike(req.query.postid)
}
