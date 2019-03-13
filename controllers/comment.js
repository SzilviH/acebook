const commentModel = require("../models/lib/comments.js");

exports.saveComment = async (req, res) => {
    console.log("controller")
    await commentModel.saveToDB(req.body.content, req.body.author, req.body.postId)
};
