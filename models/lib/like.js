const connection = require("../../database/connection");

class Like {

  static async saveLike(postid) {
   await connection.pool.query(`INSERT INTO likes (postid) VALUES ('${postid}')`);
  };

  static async getLikes(postid) {
    let likesOnPost = [];
      let allLikes = await connection.pool.query(`SELECT * FROM likes WHERE postid ='${postid}'`);
        allLikes.rows.forEach((element) => {
        likesOnPost.push(element)
      });
      let likes = likesOnPost.length
      return likes;
  }
}
module.exports = Like;
