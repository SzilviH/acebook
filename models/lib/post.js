const connection = require("../../database/connection");


class Post {
  constructor(id, message){
    this.id = id
    this.message = message
  };
  static async saveToDB(content) {
   await connection.pool.query(`INSERT INTO posts (message) VALUES ('${content}')`);

 };
  static async getPosts() {
    let allPostsArray = [];
    let allPosts = await connection.pool.query("SELECT * FROM posts");
     allPosts.rows.forEach((message) => {
       allPostsArray.push(new Post(message.id, message.message))
     })
     return allPostsArray;
  }


}


module.exports = Post;
