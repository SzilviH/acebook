const connection = require("../../database/connection");

class Like {
  constructor(likeid, postid) {
    this.likeid = likeid
    this.postid = postid
  };

  static async saveToDB(postid) {
   await connection.pool.query(`INSERT INTO likes (postid) VALUES ('${postid}')`);
  };

  static async getLikes(postid) {
    let likesPerPost = [];
      let allLikes = await connection.pool.query(`SELECT * FROM likes WHERE postid ='${postid}'`);
        allLikes.rows.forEach((element) => {
        likesPerPost.push(element)
      });
      let nrOfLikes = likesPerPost.length
      return nrOfLikes;
  }
}
module.exports = Like;
