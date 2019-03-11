const connection = require("../../database/connection");

class Post {
  constructor(id, message, user, date){
    this.id = id
    this.message = message
    this.user = user
    this.date = date
  };
  static async saveToDB(content, user) {
   await connection.pool.query(`INSERT INTO posts (message, username) VALUES ('${content}', '${user}')`);

 };
  static async getPosts() {
    let allPostsArray = [];
    let allPosts = await connection.pool.query("SELECT id, message, username, date FROM posts ORDER BY date DESC");
    allPosts.rows.forEach((element) => {
     element.date = element.date.toString().substring(0, 24);
     allPostsArray.push(new Post(element.id, element.message, element.username, element.date))
    });
    return allPostsArray;
  }
}

module.exports = Post;
