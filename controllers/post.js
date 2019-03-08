const postModel = require("../models/lib/post.js")

exports.post_create_content = async function (req, res) {

  console.log(req.query);
  let content = await req.query.content;
  res.redirect("http://localhost:5000/feed")
}

exports.post_show = async function (req, res) {
  let data = await postModel.getPosts()
  res.send(data)
}

exports.post_create_user = async function (req, res) {
  console.log(req.query);
  await postModel.saveToDB(req.query.content, req.query.userid)
  res.redirect("http://localhost:3000/feed")
}
