const commentModel = require("../models/lib/comments.js");

exports.saveComment = async (req, res) => {
    await commentModel.saveToDB(req.body.content, req.body.author, req.body.postId)
};

exports.allComments = async (req, res) => {
    let data = await commentModel.getComments();
    res.send(data);
};