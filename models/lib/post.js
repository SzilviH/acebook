const connection = require("../../database/connection");

class Post {
  constructor(id, message, user, user_image ,date) {
    this.id = id;
    this.message = message;
    this.user = user;
    this.user_image = user_image;
    this.date = date
  };

  static async saveToDB(content, user, user_image) {
      await connection.pool.query(`INSERT INTO posts (message, username, user_image) VALUES ('${content}', '${user}', '${user_image}')`);
  };

  static async getPosts() {
    let allPostsArray = [];
    let allPosts = await connection.pool.query("SELECT id, message, username, user_image, date FROM posts ORDER BY date DESC");
    allPosts.rows.forEach((element) => {
      element.date = element.date.toString().substring(0, 24);
      allPostsArray.push(new Post(element.id, element.message, element.username, element.user_image, element.date))
    });
    return allPostsArray;
  }
}

module.exports = Post;
