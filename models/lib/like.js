const connection = require("../../database/connection");

class Like {
  constructor(likeid, postid) {
    this.likeid = likeid
    this.postid = postid
  };

  static async saveToDB(postid) {
   await connection.pool.query(`INSERT INTO likes (postid) VALUES ('${postid}')`);
  };

  static async getLikes() {
    let allLikesArray = [];
      let allLikes = await connection.pool.query("SELECT * FROM likes");
      allLikes.rows.forEach((element) => {
        allLikesArray.push('a fake like')
      });
      return allLikesArray;
  }
}
module.exports = Like;
