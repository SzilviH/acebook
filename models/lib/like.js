const connection = require("../../database/connection");

class Like {

  constructor(likeid, postid) {
      this.likeid = likeid
      this.postid = postid
  };

  static async saveLike(postid) {
   await connection.pool.query(`INSERT INTO likes (postid) VALUES ('${postid}')`);
  };

  static async getLikes() {
    console.log('hello');
    let likes = [];
      let allLikes = await connection.pool.query(`SELECT * FROM likes`);
      console.log(allLikes);
        allLikes.rows.forEach((element) => {
          console.log(element);
        likes.push(new Like(element.likeid, element.postid))
      });

      return likes;
  }
}
module.exports = Like;
