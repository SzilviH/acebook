const postModel = require("../models/lib/post.js")

exports.post_create = function (req, res) {
  postModel.saveToDB(req.query.content);
    res.redirect("/feed")
};

exports.post_show = async function (req, res) {
  let data = await postModel.getPosts()
  res.send(data)
}
