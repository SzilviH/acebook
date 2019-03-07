const postModel = require("../models/lib/post.js")
let isDeployed = process.env.PORT
exports.post_create = function (req, res) {
  postModel.saveToDB(req.query.content);
  if(isDeployed) {
    res.redirect("https://whispering-stream-75013.herokuapp.com/feed")
  }
  else {
    res.redirect("http://localhost:3000/feed")
  }
};

exports.post_show = async function (req, res) {
  let data = await postModel.getPosts()
  res.send(data)
}
