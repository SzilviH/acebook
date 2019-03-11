const connection = require("../../database/connection");

class Post {
  constructor(id, message, user){
    this.id = id
    this.message = message
    this.user = user
  };
  static async saveToDB(content, user) {
   await connection.pool.query(`INSERT INTO posts (message, username) VALUES ('${content}', '${user}')`);

 };
  static async getPosts() {
    let allPostsArray = [];
    let allPosts = await connection.pool.query("SELECT * FROM posts");
     allPosts.rows.forEach((message) => {
       console.log(message)
       allPostsArray.push(new Post(message.id, message.message, message.username))
     });
     return allPostsArray;
  }
}

module.exports = Post;
